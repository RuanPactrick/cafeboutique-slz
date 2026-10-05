# Faixa escura

Bloco de página inteira sobre `coffee`. O site tem duas: a chamada do cardápio e a seção de visita/avaliações. O rodapé é uma terceira, um tom abaixo, em `footer-ink`.

A faixa escura é o contraponto do papel. Use no máximo duas por página — a terceira cansa.

## Pares de cor dentro dela

| Elemento | Token | Razão sobre `coffee` |
| --- | --- | --- |
| Título e nome de autor | `on-coffee` | 15,7:1 |
| Corpo do depoimento | `on-coffee-body` | 12,8:1 |
| Data, contagem, metadado | `on-coffee-muted` | 7,6:1 |
| Eyebrow | `#ccb993` | 8,9:1 |

Cartão dentro da faixa: fundo `rgba(255,250,241,.06)` e borda `rgba(255,250,241,.18)`. Um cartão por bloco pode inverter para `cream` sólido (`--featured`) — é assim que o depoimento principal ganha peso sem mudar de tamanho.

## Avaliações

- Nota, contagem e data de consulta vêm de `siteConfig.reviews`, incluindo o rótulo "Consultado em 3 out. 2026". A data fica visível: avaliação é dado datado.
- Os textos exibidos são **paráfrases** dos comentários públicos do Google Maps, não citações. Não transforme em aspas.
- Nunca acrescente avaliação que não esteja na fonte, e nunca arredonde a nota para cima.
- As estrelas são decorativas (`aria-hidden`); a nota em texto é que informa.

## O que o consumidor fornece

`siteConfig.reviews` inteiro e, na seção de visita, o endereço — que hoje está marcado como `pending-confirmation` e não deve ir ao ar sem checagem.
