---
type: doceo-lesson
title: Como o Doceo usa o _profile.md
description: Como o perfil do aprendiz calibra linguagem, profundidade e exemplos sem virar memória de cada conversa.
domain: ferramentas-de-conhecimento
topic: Como o Doceo usa o _profile.md
assumes: [o-que-e-o-doceo]
tags: [doceo, profile, aprendizagem, calibração, conhecimento, okf]
date: 2026-07-11
timestamp: 2026-07-11T00:00:00-03:00
rating: pending
---

# Como o Doceo usa o _profile.md, em uma frase

O _profile.md funciona como a ficha de calibragem do Doceo: mostra quem está aprendendo, o que já sabe e como prefere receber uma explicação.

## Imagem

<!-- diagram:como-o-doceo-usa-o-profile:start -->
```mermaid
flowchart TB
    duvida["Dúvida"]
    perfil["Perfil"]
    calibracao["Calibração"]
    licao["Lição"]
    feedback["Feedback"]
    mudou{"Perfil mudou?"}
    atualiza["Atualiza perfil"]
    duvida --> perfil
    perfil --> calibracao
    calibracao --> licao
    licao --> feedback
    feedback --> mudou
    mudou -->|Sim| atualiza
    mudou -->|Não| perfil
    atualiza --> perfil
    classDef coral fill:#FEF1EA,stroke:#D97757,color:#141413,stroke-width:2px
    classDef blue fill:#FFFFFF,stroke:#6A9BCC,color:#141413,stroke-width:2px
    classDef green fill:#F0F4ED,stroke:#788C5D,color:#141413,stroke-width:2px
    classDef ink fill:#FFFFFF,stroke:#141413,color:#141413,stroke-width:2px
    class duvida coral
    class perfil blue
    class calibracao green
    class licao ink
    class feedback coral
    class mudou blue
    class atualiza green
```
<!-- diagram:como-o-doceo-usa-o-profile:end -->

O perfil orienta a lição. Ele só muda quando surge uma informação confirmada sobre conhecimento, lacuna ou preferência.

## Analogia

Pense no _profile.md como o briefing de um cliente antes de uma reunião de produto. Você consulta o contexto para não começar do zero, mas só altera o briefing quando uma informação foi confirmada, não a cada frase da conversa.

## Onde isso se encaixa

Antes de explicar, o Doceo consulta o perfil para escolher a altitude da conversa. No seu caso, ele pode partir de produtos, negócios e engenharia, mas não deve presumir domínio operacional de toda biblioteca ou ferramenta web.

O perfil é contexto relativamente estável. As regras aprendidas e o feedback registram ajustes mais frequentes sobre como ensinar.

## Como funciona

1. **Contexto:** lê papel, domínios conhecidos e preferências.  
   **Pronto quando:** sabe o ponto de partida do leitor.
2. **Calibragem:** escolhe linguagem, profundidade e exemplo.  
   **Pronto quando:** a explicação tem a altitude certa.
3. **Lição:** entrega resposta, imagem mental, analogia e aplicação.  
   **Pronto quando:** o leitor entende sem reler.
4. **Atualização:** muda o perfil somente com evidência confirmada.  
   **Pronto quando:** a nova informação é uma regra confiável, não um palpite.

## Verifique se entendeu

<details>
<summary>O que o _profile.md calibra?</summary>

A linguagem, a profundidade, os exemplos e o ponto de partida da explicação.
</details>

<details>
<summary>Por que ele não deve mudar a cada pergunta?</summary>

Porque uma pergunta mostra uma necessidade pontual. O perfil só deve registrar uma mudança confirmada sobre conhecimento, lacuna ou preferência.
</details>

## Vá além

- [Perfil de aprendizagem](../_profile.md)
- [Regras acumuladas do Doceo](../_learnings.md)
- [O que é o Doceo](2026-07-11%20-%20o-que-e-o-doceo.md)
- [Mapa de ferramentas de conhecimento](../maps/ferramentas-de-conhecimento.md)

## Próximas lições

- Como o feedback atualiza _learnings.md.
- Como uma lição é armazenada em OKF.
- Como o índice conecta lições.

## Citações

- [Repositório do Doceo](https://github.com/eugeniughelbur/doceo)
