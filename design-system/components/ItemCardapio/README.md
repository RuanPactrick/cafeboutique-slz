# Item de cardápio

A linha do cardápio: nome à esquerda, preço à direita, divisor pontilhado embaixo. Vive dentro de uma categoria recolhível (`<details>`), que por sua vez vive numa grade de duas colunas no desktop e uma no mobile.

## Hierarquia

1. **Categoria** — `<summary>` de 84px de altura mínima, h2 em 2rem, contagem de itens em `muted`, chevron que gira 180° ao abrir.
2. **Subgrupo** — h3 em caixa alta, 0,65rem, na fonte do corpo (não na display). Só aparece quando a categoria tem subdivisão real na fonte.
3. **Item** — nome em 0,8rem peso normal; descrição opcional em `muted` 0,67rem; preço em `coffee`, `white-space: nowrap`.

Nome de item usa a fonte do corpo, não a display: a lista é para varrer, não para admirar.

## A regra que importa

**Ambiguidade da fonte fica visível.** Quando o material original traz algo estranho — "150l" em vez de "150ml", uma observação sem dono claro — o item ganha uma linha de nota em `pending` dizendo o que falta confirmar. Não corrija em silêncio e não esconda o item.

Observações de seção inteira (coberturas disponíveis, opcionais de omelete) ficam em `sectionNotes` e aparecem no fim da categoria, em `muted` 0,66rem.

## Regras

- Preço sempre em reais, com vírgula. Item sem preço na fonte mostra o estado pendente, nunca "—" nem zero.
- Divisor é pontilhado em `rule` e some no último item.
- A categoria aberta por padrão é a primeira; as demais vêm fechadas.

## O que o consumidor fornece

Um registro de `src/data/menu.json` (`name`, `priceCents`, `description`, `note`, `availability`). O componente não sabe buscar, filtrar nem formatar moeda — isso é do `menu-browser`.
