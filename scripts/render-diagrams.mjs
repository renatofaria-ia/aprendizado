import { mkdtemp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const directory = resolve(root, "diagrams");
const configPath = resolve(root, "scripts", "mermaid-config.json");
const mode = process.argv.includes("--check") ? "check" : process.argv.includes("--write") ? "write" : null;
if (!mode) throw new Error("Use --write para gerar ou --check para validar.");
const fence = String.fromCharCode(96).repeat(3);
const css = [
"    .diagram-figure { margin: 0; padding: clamp(20px, 3vw, 36px); background: var(--paper); border: 1px solid var(--line); border-radius: 12px; }",
"    .diagram-kicker { margin: 0 0 8px; color: var(--coral-deep); font: 600 .85rem/1 Poppins, Arial, sans-serif; }",
"    .diagram-figure h3 { margin: 0 0 20px; color: var(--ink); font: 600 clamp(1.35rem, 2.5vw, 2rem)/1.08 Poppins, Arial, sans-serif; letter-spacing: -.03em; text-wrap: balance; }",
"    .diagram-viewport { max-inline-size: 100%; overflow: auto; padding: 12px; background: var(--surface); border: 1px solid var(--line); border-radius: 12px; }",
"    .diagram-viewport > svg { display: block; width: max(100%, 44rem) !important; height: auto !important; overflow: visible; }",
"    .diagram-caption { margin: 16px 0 0; color: var(--muted); font: 500 .92rem/1.45 Lora, Georgia, serif; }",
"    .diagram-details { margin-top: 18px; border-top: 1px solid var(--line); }",
"    .diagram-detail { padding: 16px 0; border-bottom: 1px solid var(--line); }",
"    .diagram-detail summary { cursor: pointer; color: var(--ink); font: 600 1rem/1.25 Poppins, Arial, sans-serif; }",
"    .diagram-detail summary:focus-visible { outline: 3px solid var(--coral); outline-offset: 4px; }",
"    .diagram-detail p { max-width: 68ch; margin: 12px 0 16px; color: var(--muted); }",
"    .diagram-detail .diagram-viewport { padding: 10px; background: var(--surface-alt); }",
"    .diagram-detail .diagram-viewport > svg { width: max(100%, 36rem) !important; }",
"    @media (max-width: 760px) { .diagram-figure { padding: 20px; } .diagram-viewport { margin-inline: -4px; } }",
""].join("\n");

const esc = (v) => String(v).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const escRe = (v) => String(v).replace(/[^A-Za-z0-9_-]/g, "\\$&");
const stripBom = (text) => text.charCodeAt(0) === 0xFEFF ? text.slice(1) : text;
const readUtf8 = async (path) => stripBom(await readFile(path, "utf8"));
const writeUtf8 = (path, text) => writeFile(path, text, { encoding: "utf8" });
const nodeSyntax = (n) => n.shape === "decision" ? n.id + '{"' + String(n.diagramLabel || n.label).replaceAll('"', "'") + '"}' : n.id + '["' + String(n.diagramLabel || n.label).replaceAll('"', "'") + '"]';
function definition(model, spec, fallback) {
  const lookup = new Map(model.nodes.map((n) => [n.id, n]));
  const ids = spec.nodes || model.nodes.map((n) => n.id);
  const nodes = ids.map((id) => { const n = lookup.get(id); if (!n) throw new Error(model.id + ": n? inexistente"); return n; });
  const allowed = new Set(ids), edges = spec.edges || model.edges.filter((e) => allowed.has(e.from) && allowed.has(e.to));
  for (const e of edges) if (!allowed.has(e.from) || !allowed.has(e.to)) throw new Error(model.id + ": conex?o fora do diagrama");
  return { direction: spec.direction || fallback || "LR", nodes, edges };
}
function source(def) {
  const lines = ["flowchart " + def.direction];
  for (const n of def.nodes) lines.push("    " + nodeSyntax(n));
  for (const e of def.edges) lines.push("    " + e.from + " -->" + (e.label ? "|" + e.label + "|" : "") + " " + e.to);
  lines.push("    classDef coral fill:#FEF1EA,stroke:#D97757,color:#141413,stroke-width:2px");
  lines.push("    classDef blue fill:#FFFFFF,stroke:#6A9BCC,color:#141413,stroke-width:2px");
  lines.push("    classDef green fill:#F0F4ED,stroke:#788C5D,color:#141413,stroke-width:2px");
  lines.push("    classDef ink fill:#FFFFFF,stroke:#141413,color:#141413,stroke-width:2px");
  for (const n of def.nodes) lines.push("    class " + n.id + " " + ({ coral:"coral", blue:"blue", green:"green", ink:"ink" }[n.tone] || "ink"));
  return lines.join("\n");
}
function runMmdc(input, output) {
  const command = resolve(root, "node_modules", ".bin", process.platform === "win32" ? "mmdc.cmd" : "mmdc");
  return new Promise((ok, fail) => {
    const child = spawn(command, ["-i", input, "-o", output, "-c", configPath, "-b", "transparent"], { cwd: root, shell: process.platform === "win32", stdio: ["ignore", "pipe", "pipe"] });
    let stderr = "";
    child.stderr.on("data", (chunk) => { stderr += String(chunk); });
    child.on("error", fail);
    child.on("close", (code) => code === 0 ? ok() : fail(new Error("Mermaid CLI falhou: " + stderr.trim())));
  });
}
function scopeSvg(svg, prefix, label) {
  if (/<foreignObject\b/i.test(svg) || /<script\b/i.test(svg)) throw new Error(prefix + ": SVG inseguro");
  let clean = svg.replace(/<\?xml[^>]*>\s*/i, "").replace(/<!DOCTYPE[^>]*>\s*/i, "");
  clean = clean.replaceAll("#0f0b12", "#141413").replaceAll("#0b0b0b", "#141413").replaceAll("#000000", "#141413").replaceAll("#000", "#141413").replaceAll("hsl(21, 50.9090909091%, 85.6862745098%)", "#FEF1EA").replaceAll("border-radius:2px", "border-radius:3px");
  const ids = new Map();
  clean = clean.replace(/\bid="([^"]+)"/g, (_, id) => { const next = prefix + "-" + id; ids.set(id, next); return 'id="' + next + '"'; });
  for (const [id, next] of ids) clean = clean.replace(new RegExp("#" + escRe(id) + "\\b", "g"), "#" + next);
  return clean.replace(/<svg\b([^>]*)>/i, (_, attributes) => '<svg role="img" aria-label="' + esc(label) + '" focusable="false"' + attributes.replace(/\s(?:width|height|style)="[^"]*"/gi, "") + '>').trim();
}
async function svg(sourceText, key, label) {
  const temp = await mkdtemp(join(tmpdir(), "konok-mermaid-"));
  try {
    const input = join(temp, key + ".mmd"), output = join(temp, key + ".svg");
    await writeUtf8(input, sourceText);
    await runMmdc(input, output);
    return scopeSvg(await readUtf8(output), key, label);
  } finally { await rm(temp, { recursive: true, force: true }); }
}
async function staticBlock(model) {
  const overviewSpec = model.html.overview || { nodes: model.nodes.map((n) => n.id), edges: model.edges, direction: model.markdown.direction };
  if (overviewSpec.nodes.length > 5) throw new Error(model.id + ": vis?o geral com mais de cinco conceitos");
  const overview = definition(model, overviewSpec, model.markdown.direction);
  const overviewSvg = await svg(source(overview), model.id + "-overview", model.html.title);
  const details = [];
  for (const item of model.html.details || []) {
    const subflow = definition(model, item, "TB");
    if (subflow.nodes.length > 5) throw new Error(model.id + ": subfluxo com mais de cinco conceitos");
    details.push('<details class="diagram-detail">\n<summary>' + esc(item.summary) + '</summary>\n<p>' + esc(item.description) + '</p>\n<div class="diagram-viewport">' + await svg(source(subflow), model.id + "-" + item.id, item.summary) + '</div>\n</details>');
  }
  return ['<!-- diagram:' + model.id + ':start -->','<figure class="diagram-figure" data-diagram-id="' + model.id + '">','<p class="diagram-kicker">O mapa</p>','<h3>' + esc(model.html.title) + '</h3>','<div class="diagram-viewport">' + overviewSvg + '</div>','<figcaption class="diagram-caption">' + esc(model.html.caption) + '</figcaption>',details.length ? '<div class="diagram-details">' + details.join("\n") + '</div>' : '', '</figure>','<!-- diagram:' + model.id + ':end -->'].filter(Boolean).join("\n");
}
function replaceMarkdown(content, model, block) {
  const start = '<!-- diagram:' + model.id + ':start -->', end = '<!-- diagram:' + model.id + ':end -->';
  const marker = start + "\n" + block + "\n" + end;
  const pattern = new RegExp("<!-- diagram:\\s*" + model.id + "\\s*:start -->[\\s\\S]*?<!-- diagram:\\s*" + model.id + "\\s*:end -->");
  if (pattern.test(content)) return content.replace(pattern, marker);
  const old = new RegExp(fence + "mermaid\\s*\\n[\\s\\S]*?\\n" + fence);
  if (!old.test(content)) throw new Error(model.id + ": bloco Mermaid n?o encontrado");
  return content.replace(old, marker);
}
function ensureCss(content) {
  if (content.includes(".diagram-figure {")) return content;
  return content.replace("</style>", css + "\n  </style>");
}
function replaceHtml(content, model, block) {
  const pattern = new RegExp("<!-- diagram:\\s*" + model.id + "\\s*:start -->[\\s\\S]*?<!-- diagram:\\s*" + model.id + "\\s*:end -->");
  const hasMarker = pattern.test(content);
  let next = content;
  if (hasMarker) {
    next = content.replace(pattern, block);
  } else {
    next = next.replace(/<figure class="diagram-wrap">[\s\S]*?<\/figure>/, block);
    if (next === content) next = next.replace(/<figure class="diagram">[\s\S]*?<\/figure>/, block);
  }
  if (!hasMarker && next === content) throw new Error(model.id + ": ?rea visual n?o encontrada");
  return ensureCss(next);
}
async function sync(path, before, after, label, changes) {
  if (before === after) return;
  if (mode === "check") { changes.push(label + " est? desatualizado"); return; }
  await writeUtf8(path, after); changes.push(label + " atualizado");
}
const names = (await readdir(directory)).filter((name) => name.endsWith(".json")).sort(), changes = [];
for (const name of names) {
  const model = JSON.parse(await readUtf8(resolve(directory, name)));
  if (!model.id || !model.markdownPath || !model.htmlPath || !Array.isArray(model.nodes) || !Array.isArray(model.edges) || !model.html) throw new Error(name + ": modelo incompleto");
  const full = definition(model, { nodes: model.nodes.map((n) => n.id), edges: model.edges, direction: model.markdown.direction }, model.markdown.direction);
  const markdownBlock = fence + "mermaid\n" + source(full) + "\n" + fence;
  const block = await staticBlock(model);
  const markdownPath = resolve(root, model.markdownPath), htmlPath = resolve(root, model.htmlPath);
  const markdown = await readUtf8(markdownPath), html = await readUtf8(htmlPath);
  await sync(markdownPath, markdown, replaceMarkdown(markdown, model, markdownBlock), model.markdownPath, changes);
  await sync(htmlPath, html, replaceHtml(html, model, block), model.htmlPath, changes);
}
if (mode === "check" && changes.length) { for (const change of changes) console.error(change); process.exit(1); }
console.log(changes.length ? changes.join("\n") : "Diagramas sincronizados.");
