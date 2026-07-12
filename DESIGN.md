---
name: KonoK Knowledge Lessons
description: Sistema visual editorial e tecnológico para lições de conhecimento publicáveis.
colors:
  brand-paper: "#FAF9F5"
  brand-ink: "#141413"
  brand-white: "#FFFFFF"
  brand-coral: "#D97757"
  brand-coral-deep: "#C96F51"
  brand-blue: "#6A9BCC"
  brand-green: "#788C5D"
  brand-peach: "#FEF1EA"
typography:
  display:
    fontFamily: "Poppins, Arial, sans-serif"
    fontSize: "clamp(2.2rem, 6vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  headline:
    fontFamily: "Poppins, Arial, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.15
  title:
    fontFamily: "Poppins, Arial, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 600
    lineHeight: 1.2
  body:
    fontFamily: "Lora, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.01em"
  label:
    fontFamily: "Poppins, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1
rounded:
  sm: "3px"
  md: "12px"
  lg: "16px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section: "64px"
components:
  lesson-surface:
    backgroundColor: "{colors.brand-paper}"
    textColor: "{colors.brand-ink}"
    rounded: "{rounded.md}"
    padding: "clamp(24px, 5vw, 52px)"
  answer-callout:
    backgroundColor: "{colors.brand-peach}"
    textColor: "{colors.brand-ink}"
    rounded: "{rounded.md}"
    padding: "18px 20px"
  quiz-disclosure:
    backgroundColor: "{colors.brand-white}"
    textColor: "{colors.brand-ink}"
    rounded: "{rounded.sm}"
    padding: "12px 0"
---

# Design System: KonoK Knowledge Lessons

## 1. Overview

**Creative North Star: "Sala de Redação do Conhecimento"**

Este sistema trata cada lição como uma peça editorial pronta para publicação, mas com a precisão de uma ferramenta técnica. A base vem da KonoK: fundo claro com personalidade, coral como sinal de ação, azul e verde como apoio e tipografia que combina Poppins com Lora. A referência tecnológica da Rockty entra na estrutura: métricas, estados claros, prova de funcionamento e copy direta.

O sistema rejeita templates genéricos de SaaS, apresentações corporativas vazias e efeitos que tentam substituir uma boa hierarquia. A página deve parecer uma redação pequena e competente: o leitor entra, encontra a resposta, enxerga o modelo mental e sai sabendo o próximo passo.

**Key Characteristics:**

- Editorial, tecnológico e publicável.
- Claro na primeira leitura.
- Contraste entre Poppins para orientação e Lora para explicação.
- Cor com função: coral chama para ação; azul e verde organizam estados.
- Movimento discreto, sempre dispensável.

**The Sala de Redação Rule.** Toda página precisa ter uma ideia principal que sobreviva fora da conversa que a originou.

## 2. Colors

A paleta usa os tokens reais declarados no sistema visual público da KonoK. O papel claro é uma superfície editorial, não um fundo decorativo para um template de IA; o coral concentra ação e o azul/verde apoiam informação.

### Primary

- **Coral KonoK** (`#D97757`): ações, destaques e chamadas que merecem decisão.
- **Coral profundo** (`#C96F51`): estado hover e reforço de ação.

### Secondary

- **Azul operacional** (`#6A9BCC`): estados informativos, ligações e dados de apoio.
- **Verde de operação** (`#788C5D`): confirmação, progresso e conclusão.

### Neutral

- **Papel KonoK** (`#FAF9F5`): superfície principal editorial.
- **Tinta KonoK** (`#141413`): texto principal e títulos.
- **Branco de superfície** (`#FFFFFF`): áreas de leitura e contraste.
- **Pêssego de resposta** (`#FEF1EA`): callouts e respostas em destaque.

**The One Signal Rule.** Use o coral para uma decisão por vez. Se tudo chama atenção, nada orienta.

## 3. Typography

**Display Font:** Poppins (com Arial, sans-serif como fallback)
**Body Font:** Lora (com Georgia, serif como fallback)
**Label/Mono Font:** Poppins (sem fonte mono obrigatória)

**Character:** Poppins organiza, sinaliza e dá ritmo tecnológico. Lora desacelera a leitura do corpo e dá à explicação a sensação de texto editorial confiável.

### Hierarchy

- **Display** (700, `clamp(2.2rem, 6vw, 4.5rem)`, 1.08): título principal da lição.
- **Headline** (600, `clamp(1.5rem, 3vw, 2.25rem)`, 1.15): blocos de apresentação e resposta.
- **Title** (600, `1.35rem`, 1.2): títulos de seções.
- **Body** (500, `1.125rem`, 1.5): explicações, com linha limitada a 65-75 caracteres visuais quando possível.
- **Label** (600, `0.875rem`, 1): metadados, estados e pequenos controles.

**The Two Voices Rule.** Poppins guia o leitor; Lora explica. Não misture as funções para criar hierarquia artificial.

## 4. Elevation

O sistema é plano por padrão e usa camadas tonais para separar leitura, resposta e interação. Sombras são estruturais e discretas, nunca o acabamento padrão de todo card. O foco deve aparecer por mudança de borda, cor ou contorno visível.

### Shadow Vocabulary

- **Sombra de apresentação** (`0 4px 8px rgba(20, 20, 19, 0.10)`): somente em uma superfície que precise se separar do fundo.
- **Sem sombra em repouso:** prefira borda, contraste tonal e espaçamento.

**The Flat-by-Default Rule.** Se a hierarquia funciona sem sombra, não adicione sombra.

## 5. Components

### Publication Hero

- **Shape:** bloco de apresentação em duas colunas, com cantos de 16px e espaçamento amplo.
- **Background:** Tinta KonoK (`#141413`) com Coral KonoK (`#D97757`) como sinal de ação.
- **Content:** título forte à esquerda, resposta principal e fatos resumidos à direita.
- **Behavior:** colapsa para uma coluna em telas menores; nenhum conteúdo depende de animação.

### Lesson Surface

- **Shape:** cantos discretos (12px), nunca uma cápsula.
- **Background:** Papel KonoK (`#FAF9F5`) ou branco (`#FFFFFF`).
- **Internal Padding:** 24px a 52px conforme a largura.
- **Behavior:** o conteúdo continua visível sem depender de animação.

### Answer Callout

- **Shape:** cantos de 12px.
- **Background:** Pêssego de resposta (`#FEF1EA`).
- **Text:** Tinta KonoK (`#141413`) em Poppins semibold.
- **Behavior:** resposta direta visualmente dominante, sem faixa lateral colorida.

### Fluxo editorial

- **Fonte:** `diagrams/<slug>.json` é o modelo canônico de uma lição.
- **Markdown:** recebe Mermaid gerado a partir do modelo.
- **HTML:** incorpora SVG Mermaid gerado na build; nunca renderiza Mermaid no navegador.
- **Visão geral:** no máximo cinco conceitos, rótulos curtos e conectores lineares.
- **Detalhes:** relações adicionais entram em subfluxos expansíveis com `details`, cada um com no máximo cinco conceitos.
- **Texto:** o SVG usa rótulos nativos, sem `foreignObject`, para evitar cortes por métricas de fonte.

### Quiz Disclosure

- **Shape:** separadores finos e cantos de 3px.
- **Typography:** pergunta em Poppins; resposta em Lora.
- **Focus:** contorno visível em coral.
- **Behavior:** usar `details` e `summary`, sem esconder a resposta da tecnologia assistiva.

## 6. Do's and Don'ts

### Do:

- **Faça** a resposta aparecer antes da ornamentação.
- **Faça** cada diagrama explicar uma relação real.
- **Faça** usar Poppins e Lora com propósito distinto.
- **Faça** testar contraste, teclado, zoom e movimento reduzido.
- **Faça** aproveitar a linguagem de tecnologia operacional da Rockty sem copiar sua interface.
- **Faça** manter o conteúdo em português do Brasil.

### Don't:

- **Não faça** um template genérico de SaaS ou dashboard sem contexto.
- **Não faça** fundo creme ou areia como padrão visual de inteligência artificial; o Papel KonoK só deve aparecer com função editorial.
- **Não faça** gradientes neon, texto com gradiente ou brilho decorativo.
- **Não faça** grades repetitivas de cards com ícone, título e parágrafo.
- **Não faça** excesso de etiquetas em caixa alta, marcadores numéricos decorativos ou bordas laterais coloridas.
- **Não faça** animações que escondem conteúdo ou transformam a leitura em espetáculo.
- **Não faça** visual acadêmico pesado, texto murado ou linguagem corporativa vazia.
- **Não faça** juntar borda de 1px com sombra ampla como decoração.
- **Não faça** usar cantos exageradamente arredondados ou ilustrações SVG desenhadas à mão.
