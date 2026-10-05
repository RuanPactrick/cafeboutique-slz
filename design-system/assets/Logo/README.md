# Logo

Um arquivo, fornecido pela própria casa: `logo-cafe-boutique.webp`, **1522 × 1033**, WebP com transparência.

A marca é deitada — proporção **1,47:1**. Todo tamanho de aplicação respeita essa razão, para não sobrar moldura nem distorcer.

## Uso

| Contexto | Tamanho renderizado |
| --- | --- |
| Cápsula do cabeçalho na home | 106 × 72 |
| Cápsula nas páginas internas | 85 × 58 |
| Rodapé | 91 × 62 |
| Home no mobile (< 760px) | 79 × 54 |
| Interna no mobile (< 760px) | 68 × 46 |

Sempre com `object-fit: contain`. O `alt` é "Café Boutique" — nunca "logo" nem "logotipo". No site ela passa pelo `next/image`, que serve o tamanho certo para cada tela; não use `unoptimized`, ou os 183 KB do arquivo cheio vão para um logo de 100px.

## Fundo

A marca é escura sobre transparente. Ela **só** aparece sobre papel ou creme — na prática, sempre dentro da cápsula do cabeçalho ou no rodapé escuro, onde o contorno claro do ornamento a sustenta. Nunca direto sobre foto ou vídeo.

## Proibido

- Recriar a marca com texto, mesmo em Antic Didone.
- Substituir por arte parecida, ícone de xícara ou qualquer desenho "equivalente".
- Aplicar filtro, sombra, contorno, inversão ou recorte.
- Esticar fora da proporção 1,47:1.

Se a logo não carregar, o espaço fica vazio com o `alt` — não existe fallback desenhado.

## Histórico

A primeira versão deste sistema usava um PNG de 150 × 150 vindo do Instagram, que ficava visivelmente borrado em tela retina. O arquivo atual foi fornecido pela casa e substituiu aquele.

## Falta

Não há versão vetorial (SVG) nem versão monocromática para fundo escuro. Não há favicon.
