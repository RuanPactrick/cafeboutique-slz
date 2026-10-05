# Cabeçalho (cápsula)

Uma pílula flutuante, não uma barra colada no topo. É a peça que dá identidade à navegação e resolve três problemas de uma vez.

## Forma

- `border-radius: 999px`, borda de 1px em `rgba(86,62,49,.13)`, fundo `rgba(251,247,238,.9)` com `backdrop-filter: blur(18px)`.
- Flutua a **14px** do topo da tela; o wrapper `.site-header` é transparente e só dá esse respiro.
- Largura igual à régua da página: `min(100% - 2×gutter, 1240px)`.
- Padding interno de `8px 10px 8px 26px` — mais folga à esquerda, onde fica a logo; o botão à direita quase encosta na borda, o que é proposital numa pílula.
- Altura: 100px na home, 88px nas internas, 78/72px no mobile.

## Estados

Um só: depois de **80px** de rolagem, a classe `site-header--home-scrolled` aumenta a opacidade do fundo (90% → 97%) e aprofunda a sombra. Transição de 220ms.

Não há estado transparente. Essa foi a correção: na versão anterior a cápsula nascia sem fundo na home, e abaixo de 1050px uma regra de media query sobrescrevia o estado rolado — o resultado era texto escuro boiando sobre foto.

## Por que ela resolve

1. **Legibilidade sobre vídeo.** A logo é uma marca escura em fundo transparente. Sobre vídeo ela sumiria; dentro da cápsula de papel, não.
2. **Destaque.** Flutuando e com sombra, a navegação se separa do conteúdo em vez de competir com ele.
3. **Coerência.** Pílula por fora, pílula por dentro: o botão de encomenda também é 999px.

## Conteúdo

Logo à esquerda, navegação ao centro, botão de encomenda à direita. Abaixo de 1050px a navegação vira o botão "Menu" e o menu suspenso aparece logo abaixo da cápsula, com raio de 26px e o mesmo blur.

**O menu suspenso não repete o botão de encomenda.** Ele está sempre visível na cápsula, inclusive abaixo de 420px, onde fica compacto.

## O que o consumidor fornece

`navigationItems` e `siteConfig.whatsappUrl`, ambos de `src/data/site.ts`. A prop `home` muda apenas a altura e o tamanho da logo.
