import { readdir, readFile, access } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const diagramsDir = resolve(root, "diagrams");
const textRoots = [
  root,
  resolve(root, "docs"),
  resolve(root, "maps"),
  resolve(root, "lessons"),
  resolve(root, "html"),
  resolve(root, "diagrams"),
  resolve(root, "scripts")
];
const allowedExt = new Set([".md", ".html", ".json", ".mjs"]);
const suspiciousPatterns = [
  { name: "double-question", regex: /\?\?/g },
  { name: "embedded-question", regex: /[A-Za-z?-?_]\?[A-Za-z?-?_]/g },
  { name: "replacement-char", regex: new RegExp("\uFFFD", "g") }
];

const hasBom = (text) => text.charCodeAt(0) === 0xFEFF;
const stripBom = (text) => hasBom(text) ? text.slice(1) : text;

async function readUtf8(file) {
  const text = await readFile(file, "utf8");
  return { text: stripBom(text), hadBom: hasBom(text) };
}

async function exists(file) {
  try {
    await access(file, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function listFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = resolve(dir, entry.name);
    if (entry.isDirectory()) files.push(...await listFiles(full));
    else if (allowedExt.has(extname(entry.name))) files.push(full);
  }
  return files;
}

function collectSuspicious(text) {
  const lines = text.split(/\r?\n/);
  const findings = [];
  for (let i = 0; i < lines.length; i += 1) {
    for (const pattern of suspiciousPatterns) {
      if (pattern.regex.test(lines[i])) {
        findings.push({ line: i + 1, kind: pattern.name, text: lines[i].trim() });
      }
      pattern.regex.lastIndex = 0;
    }
  }
  return findings;
}

function collectMarkers(text) {
  return [...text.matchAll(/<!--\s*diagram:([^:]+):start\s*-->/g)].map((m) => m[1]);
}

const errors = [];
const allFiles = [];
for (const dir of textRoots) if (await exists(dir)) allFiles.push(...await listFiles(dir));

for (const file of allFiles) {
  const { text, hadBom } = await readUtf8(file);
  if (hadBom) errors.push(`${file}: arquivo salvo com BOM; regrave como UTF-8 sem BOM`);
  for (const item of collectSuspicious(text)) {
    errors.push(`${file}:${item.line} texto suspeito de encoding (${item.kind}): ${item.text}`);
  }
}

const diagramFiles = (await readdir(diagramsDir)).filter((name) => name.endsWith(".json")).sort();
const diagramModels = new Map();
for (const file of diagramFiles) {
  const full = resolve(diagramsDir, file);
  const { text } = await readUtf8(full);
  const model = JSON.parse(text);
  if (!model.id) {
    errors.push(`${full}: modelo sem id`);
    continue;
  }
  diagramModels.set(model.id, model);
  const markdownPath = resolve(root, model.markdownPath || "");
  const htmlPath = resolve(root, model.htmlPath || "");
  if (!model.markdownPath || !await exists(markdownPath)) errors.push(`${full}: markdownPath ausente ou inexistente`);
  if (!model.htmlPath || !await exists(htmlPath)) errors.push(`${full}: htmlPath ausente ou inexistente`);
}

const lessonFiles = await listFiles(resolve(root, "lessons"));
for (const file of lessonFiles) {
  const { text } = await readUtf8(file);
  const markers = collectMarkers(text);
  for (const id of markers) {
    if (!diagramModels.has(id)) errors.push(`${file}: marcador de diagrama sem modelo can?nico em diagrams/${id}.json`);
  }
  if (/```mermaid/.test(text) && markers.length === 0) {
    errors.push(`${file}: bloco Mermaid sem marcador de diagrama can?nico`);
  }
}

const htmlFiles = await listFiles(resolve(root, "html"));
for (const file of htmlFiles) {
  const { text } = await readUtf8(file);
  const markers = collectMarkers(text);
  for (const id of markers) {
    if (!diagramModels.has(id)) errors.push(`${file}: marcador de diagrama sem modelo can?nico em diagrams/${id}.json`);
  }
}

if (errors.length) {
  for (const error of errors) console.error(error);
  process.exit(1);
}

console.log("Integridade OK.");
