---
type: processo-operacional
title: Mecanismo de li??es aprendidas
description: Como o Doceo consulta o hist?rico de tentativas para n?o repetir caminhos reprovados e promover rotas validadas.
tags: [doceo, aprendizado, ledger, processo]
timestamp: 2026-07-11T20:00:00-03:00
---

# Mecanismo de li??es aprendidas

Este mecanismo existe para impedir repeti??o de caminhos que j? falharam e para transformar o que funcionou em padr?o de execu??o.

## Ordem de consulta

1. Ler `_learnings.md` primeiro.
2. Ler `log.md` em seguida.
3. Usar a skill `decision-ledger` quando a tarefa envolver depura??o, itera??o, diagramas, HTMLs ou escolha entre alternativas.
4. Se existir um caminho validado para a mesma classe de tarefa, seguir esse caminho antes de testar algo novo.
5. Se a falha anterior tiver a mesma causa e n?o houver delta material, n?o repetir a rota.

## Regras pr?ticas

- Falhou duas vezes pela mesma causa: bloquear por padr?o.
- Funcionou duas vezes: tornar preferencial.
- Mudan?a material no contexto: a tentativa pode ser refeita, mas a diferen?a precisa ser registrada.
- Antes de concluir uma tarefa relevante, registrar o que foi tentado, o que funcionou e o que n?o vale repetir.

## Onde isso se aplica

- Gera??o e revis?o de HTML.
- Diagramas e fluxos de li??o.
- Ajustes de estrutura em Markdown.
- Itera??es com caminhos alternativos de implementa??o.

## Rela??o com os arquivos do reposit?rio

- `_learnings.md` guarda regras est?veis.
- `log.md` guarda o hist?rico operacional curto.
- `index.md` aponta para este mecanismo e para os documentos principais.
