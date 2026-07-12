# Log de decisões
- 2026-07-11 | publicacao de lessons | primeiro commit no GitHub | feat/publicar-lessons, 1f43308, lessons/ | workspace sem .git; remoto configurado; stage limitado a lessons/; validacao especifica passou; npm run integridade:check permaneceu pendente por problemas de encoding fora do escopo

- 2026-07-11 | licao do Doceo | nota Markdown e pagina HTML | `lessons/2026-07-11 - como-uma-licao-vira-nota-markdown-e-pagina-html.md`, `html/como-uma-licao-vira-nota-markdown-e-pagina-html.html`, `index.md`, `maps/ferramentas-de-conhecimento.md` | uma mesma licao gera memoria e publicacao
- 2026-07-11 | checklist operacional | guia curto para evitar repetição de rotas | `docs/checklist-operacional.md`, `AGENTS.md`, `_learnings.md`, `index.md` | consultar antes de insistir em uma mesma estratégia
- 2026-07-11 | decisão-ledger | skill criada | registra caminhos reprovados e validados | consultar antes de repetir tentativas
- 2026-07-11 | diagramas do Doceo | Mermaid no navegador | lento, instável e difícil de manter | manter SVG estático na build
- 2026-07-11 | encoding no terminal | `Get-Content` não é prova final de Unicode | `_learnings.md`, `lessons/2026-07-11 - como-uma-licao-vira-nota-markdown-e-pagina-html.md`, `html/como-uma-licao-vira-nota-markdown-e-pagina-html.html` | validar UTF-8 real por bytes ou `unicode_escape`
- 2026-07-11 | fluxo canônico de diagramas | corrigir na fonte, não na saída | `diagrams/como-uma-licao-vira-nota-markdown-e-pagina-html.json`, `lessons/2026-07-11 - como-uma-licao-vira-nota-markdown-e-pagina-html.md`, `html/como-uma-licao-vira-nota-markdown-e-pagina-html.html` | editar `diagrams/*.json` e depois rodar `npm run diagramas:render`
