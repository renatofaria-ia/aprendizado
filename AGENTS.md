# Instruções do repositório de conhecimento

## Objetivo

Esta pasta é o `memory_root` do Doceo e funciona como um bundle de conhecimento pessoal de Renato de Melo Faria.

## Regras obrigatórias

1. Todo conteúdo deve ser escrito em português do Brasil.
2. Manter em inglês somente termos técnicos obrigatórios, como nomes de APIs, bibliotecas, classes, comandos, certificações e o próprio OKF.
3. Usar o Open Knowledge Format (OKF) como framework padrão para gerar conhecimento.
4. Salvar documentos em UTF-8 sem BOM.
5. Não incluir senhas, tokens, credenciais, dados pessoais de terceiros ou conteúdo proprietário de empregadores.

## Conformidade OKF

- Todo arquivo Markdown que não seja reservado deve começar com frontmatter YAML válido.
- Todo frontmatter deve conter um campo `type` não vazio.
- Usar `title`, `description`, `tags` e `timestamp` quando forem úteis.
- Usar Markdown estruturado, links entre conceitos e uma seção `## Citações` ou `# Citações` quando houver afirmações baseadas em fontes externas.
- Usar diretórios para organizar domínios e índices para navegação progressiva.
- `index.md` é arquivo reservado de índice e não deve receber frontmatter neste bundle.
- `log.md`, quando criado, deve registrar alterações em ordem decrescente de data.
- Não transformar `config.json` em documento OKF: ele é configuração operacional.

## Arquivos principais

- `_profile.md`: perfil de aprendizagem, conhecimentos conhecidos e preferências de ensino.
- `_learnings.md`: regras acumuladas a partir de feedback.
- `log.md`: ledger operacional curto com tentativas, resultados e decisões para a próxima vez.
- `index.md`: índice navegável do bundle.
- `maps/<domínio>.md`: mapa do conhecimento aprendido em um domínio.
- `lessons/`: notas de lições geradas pelo Doceo.
- `html/`: páginas HTML autocontidas das lições, quando produzidas pelo Doceo.

## Regras do Doceo

- Ler `_learnings.md` antes de `_profile.md`; regras acumuladas têm prioridade.
- Calibrar cada explicação pelo `_profile.md` e pelo histórico em `index.md`.
- Ensinar uma coisa por vez.
- Priorizar resposta direta, um mapa visual, uma analogia e aplicação prática.
- Evitar paredes de texto, jargão sem explicação, tom condescendente e conselhos genéricos.
- Atualizar `_profile.md` somente quando surgir conhecimento confirmado, uma lacuna corrigida ou uma preferência explicitamente demonstrada.
- Após uma lição, seguir o ciclo de feedback definido pela skill Doceo.

## Validação antes de concluir

- Confirmar idioma pt-BR.
- Confirmar UTF-8 sem BOM.
- Executar `npm run integridade:check` para detectar caracteres corrompidos e referências fora do fluxo canônico.
- Confirmar frontmatter e `type` nos conceitos OKF.
- Confirmar que `index.md` lista os documentos relevantes.
- Confirmar links e citações externas.
- Confirmar que não há dados sensíveis ou proprietários indevidos.

## Fonte normativa

- [Open Knowledge Format v0.1](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)

## HTML e sistema visual

- Usar a skill impeccable para criar, revisar, polir e validar todos os HTMLs.
- Ler PRODUCT.md e DESIGN.md antes de criar ou alterar uma interface.
- Manter o sistema visual alinhado à KonoK e à referência tecnológica da Rockty, sem copiar sua interface.
- Manter HTMLs em português do Brasil, responsivos, sem dependência de CDN e com suporte a teclado, contraste e prefers-reduced-motion.
- Preservar .impeccable/design.json quando o DESIGN.md for regenerado.

## Padrão de diagramas

- Usar `diagrams/<slug>.json` como fonte canônica de todo fluxo de lição.
- Não criar ou editar manualmente fluxos em `lessons/` ou `html/` quando houver diagrama. O modelo canônico deve nascer em `diagrams/`.
- Toda lição com marcador `<!-- diagram:<id>:start -->` precisa ter um modelo correspondente em `diagrams/<id>.json`.
- Executar `npm run diagramas:render` após alterar um modelo e `npm run conteudo:check` antes de concluir.
- O bloco Mermaid do Markdown e o SVG estático do HTML são gerados do mesmo modelo.
- O HTML incorpora SVG Mermaid produzido na build. Não renderizar Mermaid no navegador, não usar CDN e não manter uma pasta de runtime no material publicado.
- A visão geral pode ter no máximo cinco conceitos. Quando houver mais relações, criar subfluxos em `details`, com até cinco conceitos cada.
- Usar `htmlLabels: false`, conectores lineares, rótulos curtos e SVG sem `foreignObject`.
- Consultar `DIAGRAMAS.md` para o esquema do modelo, critérios de leitura e fluxo de trabalho.
