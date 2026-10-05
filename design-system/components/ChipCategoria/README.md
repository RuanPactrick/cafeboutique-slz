# Filtros do cardápio

A barra de controles e os chips de categoria que ficam acima da lista. São o único lugar do site com estado de interface.

## Partes

**Barra de controles** — campo de busca à esquerda (até 420px), contagem de resultados à direita, dentro de um painel `cream` com borda `rule` e raio 10px. Abaixo de 760px vira coluna e o campo ocupa a largura toda.

**Chips** — botões em pílula, 42px de altura, rolagem horizontal quando não cabem (`.category-scroller` com `scrollbar-width: thin`). O chip ativo inverte para fundo `coffee`.

## Regras

- Estado ativo é `aria-pressed="true"`, não uma classe. A cor inverte junto, mas quem informa é o atributo.
- A contagem de resultados é texto vivo: muda com a busca e com o filtro, e é o que avisa quando o resultado é zero.
- Busca vazia + chip "Tudo" é o estado inicial; sempre dê um caminho de volta a ele (o estado vazio traz um link "limpar filtros").
- Campo de busca tem 48px de altura. O chip pode ter 42px porque é um alvo largo.
- Nada de ícone de lupa dentro do campo: o rótulo acima já diz o que ele faz, e o rótulo é lido por leitor de tela.

## O que o consumidor fornece

A lista de categorias (derivada de `menu.json`, não escrita à mão), o termo de busca e o manejo de estado. Os chips não guardam estado por si.
