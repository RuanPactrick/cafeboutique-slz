# Botão

A única família de ação do site: três variantes de botão e um link de texto, todos com no mínimo 48px de altura.

## Variantes

| Variante | Uso | Fundo em repouso |
| --- | --- | --- |
| `.button` (primário) | Encomendar no WhatsApp. Uma por tela, no máximo duas. | `coffee` |
| `.button--outline` | Ação secundária ao lado da primária — "Ver o cardápio". | `cream` a 80% |
| `.button--light` | Mesma hierarquia da primária, mas sobre fundo `coffee`. | `cream` |
| `.text-link` | Terceira ação, sem peso de botão. Sempre com seta. | nenhum |

Todas são **pílula** (`radius-pill`, 999px), com 48px de altura mínima e padding de `.7rem 1.5rem`. Todas invertem fundo e texto no hover; a primária e a secundária também sobem 2px. Transição de 180ms.

## Regras

- O rótulo diz o verbo e o destino: **"Encomendar no WhatsApp"**, não "Clique aqui".
- Ícone só à esquerda, 1,05rem, traço de 1px na cor atual. O botão nunca é só ícone.
- Botão no cabeçalho recebe `shadow-order`; nenhum outro botão tem sombra.
- Abaixo de 760px o rótulo do botão do cabeçalho encurta para "Encomendar". Ele **não** some em nenhuma largura: é o caminho de conversão do site.
- Foco: `outline: 3px solid gold; outline-offset: 4px`. Não substitua por mudança de cor.

## O que o consumidor fornece

O destino. Links de WhatsApp vêm sempre de `siteConfig.whatsappUrl`, que já carrega a mensagem pré-preenchida — nunca monte a URL na mão no componente.
