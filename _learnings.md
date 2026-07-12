---
type: regras-de-aprendizagem
title: Regras acumuladas do Doceo
description: Regras derivadas de feedback para melhorar a geração de conhecimento.
tags: [doceo, aprendizagem, okf]
timestamp: 2026-07-11T00:00:00-03:00
---

# Regras acumuladas do Doceo

- Uma tela. Uma imagem. Uma analogia. Palavras simples.
- 2026-07-11: Quando um caminho já falhou sem delta material, consulte o ledger e pare de insistir.
- 2026-07-11: Em diagramas do Doceo, manter Mermaid na build e não no navegador quando o SVG estável já resolve legibilidade e portabilidade.
- 2026-07-11: Quando o workspace nao tiver .git, inicializar o repositorio, configurar o remoto e confirmar a branch antes de publicar.
- 2026-07-11: Ao publicar apenas um diretorio, fazer stage por caminho explicito para nao incluir arquivos nao relacionados, como node_modules.
- 2026-07-11: Se a validacao global falhar por arquivos fora do escopo, separar a falha preexistente da validacao especifica do material publicado e registrar a pendencia sem declarar a validacao global como aprovada.
- 2026-07-11: Antes de repetir uma tentativa, consultar o checklist operacional e o log.
- 2026-07-11: Para problemas de encoding, não confiar no `Get-Content` como prova final; validar o conteúdo real do arquivo em UTF-8 por bytes ou `unicode_escape`.
- 2026-07-11: Em lições com diagrama, corrigir primeiro `diagrams/<slug>.json`; depois executar `npm run diagramas:render` para regravar Markdown e HTML canônicos.
