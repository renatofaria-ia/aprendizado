---
type: padrao-diagramas
title: Padrão de diagramas das lições
description: Fonte canônica, geração e critérios visuais para fluxos das lições.
tags: [padrao, diagramas, mermaid, html]
timestamp: 2026-07-11
---

# Padrão de diagramas das lições

## Decisão

Cada fluxo nasce em `diagrams/<slug>.json` e gera dois artefatos: o bloco Mermaid da nota Markdown e o SVG Mermaid estático da página HTML.

~~~text
diagrams/<slug>.json
        ├── Mermaid no Markdown
        └── SVG Mermaid inline no HTML
~~~

A página HTML não carrega Mermaid, CDN ou JavaScript para renderizar o diagrama. O SVG é produzido durante a build e fica incorporado ao artefato publicável.

## Limite de complexidade

- A visão geral tem no máximo cinco conceitos.
- Cada rótulo deve ter de uma a três palavras.
- Relações adicionais entram em `html.details` como subfluxos em `details`.
- Cada subfluxo também tem no máximo cinco conceitos.
- Em telas pequenas, o SVG rola horizontalmente em vez de reduzir o texto demais.

## Modelo

`nodes` e `edges` descrevem o fluxo completo para o Markdown. `html.overview` escolhe a visão de orientação. `html.details` é opcional e aprofunda uma relação sem crescer o primeiro diagrama.

## Renderização

O Mermaid CLI gera SVG inline com `htmlLabels: false`, conectores lineares, cores KonoK e IDs determinísticos. O gerador bloqueia SVG com `foreignObject` ou script.

## Guardas automáticos

- `npm run diagramas:render`: reescreve Markdown e HTML a partir da fonte canônica.
- `npm run diagramas:check`: detecta Markdown ou HTML fora de sincronia com `diagrams/`.
- `npm run integridade:check`: detecta caracteres corrompidos e diagramas sem modelo canônico.
- `npm run conteudo:check`: executa as verificações de integridade e sincronização antes de concluir uma tarefa.

## Fluxo de trabalho

1. Atualize `diagrams/<slug>.json`.
2. Execute `npm run diagramas:render`.
3. Revise a visão geral e os subfluxos no HTML.
4. Execute `npm run conteudo:check` antes de concluir.

## Regras de consistência

- Não criar manualmente um novo fluxo em `lessons/` ou `html/`.
- Todo marcador `<!-- diagram:<id>:start -->` deve apontar para um único modelo em `diagrams/<id>.json`.
- Se o HTML e o `.md` divergirem, a fonte correta é `diagrams/<id>.json`, não a versão editada manualmente.

## Citações

- [Mermaid](https://github.com/mermaid-js/mermaid): sintaxe e renderização dos diagramas.
