# Cartão de favorito

Mostra um item da vitrine com foto, nome, uma linha de descrição e preço. É o único cartão do site que leva foto.

## Anatomia

- **Foto** em `aspect-ratio: 1.38` (1.8 quando o item é bebida, para a xícara não ficar espremida). No hover a foto dá zoom de 4,5% em 450ms.
- **Corpo** com altura mínima de 138px, para que três cartões lado a lado tenham a mesma linha de base mesmo com descrições de tamanhos diferentes.
- **Nome** em Antic Didone 1,45rem.
- **Descrição** em `muted` 0,75rem, uma linha, no máximo duas.
- **Preço** empurrado para o rodapé do corpo com `margin-top: auto`. Peso normal — preço não é grito.

## Regras

- Nome e preço vêm de `src/data/menu.json`, sem reescrita. "Fatia bolo Amanteigado Simples" fica assim mesmo, com a grafia da fonte.
- Sem foto real, use a lacuna identificada (fundo `paper-deep`, rótulo "Foto a confirmar" em `pending`). Nunca substitua por foto de banco de imagens.
- O cartão inteiro é a área clicável quando ele leva ao cardápio; se não leva a lugar nenhum, não é link.
- Grade: 3 colunas no desktop, 2 abaixo de 1050px, 2 ainda abaixo de 760px com gap menor.

## O que o consumidor fornece

Um item do cardápio (`name`, `priceCents`, `description`) e um caminho de imagem de `mediaAssets`. A formatação do preço em real é do consumidor, não do cartão.
