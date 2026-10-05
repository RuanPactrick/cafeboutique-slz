# Fotografia

Cinco imagens em uso, todas reais. Quatro vêm de publicações abertas de `@cafeboutique.slz`; a arte botânica é ilustração do próprio projeto.

| Arquivo | Onde entra | Origem |
| --- | --- | --- |
| `cafe-equipe-vitrine.jpg` | Hero da home | Reel público `Ddjx_9ntNAl` |
| `bolos-assados-formas.jpg` | Favorito: bolo amanteigado | Publicação `Dd19iFsmyyC` |
| `fatia-bolo-com-cafe.jpg` | Favorito: café coado | Reel público `DduQNtpNCyk` |
| `sobremesa-morango-chocolate.jpg` | Favorito: supreme de morango | Publicação `Dc4NlJ4N4p1` |
| `preparo-bolos-formas.jpg` | Nossa história: preparo | Reel público `DdW4qYptxL5` |
| `hero-botanical-art.png` | Ornamento do hero | Ilustração do projeto |

A procedência completa está versionada em `public/assets/instagram/PROVENANCE.md` no repositório.

## Como as fotos são tratadas

- Os arquivos ficam **sem alteração**. Todo enquadramento é CSS (`object-fit: cover` + `object-position`), então a mesma foto serve a recortes diferentes.
- Proporção por contexto: 1.38 em cartão de doce, 1.8 em cartão de bebida, 361/640 na moldura do hero.
- Luz quente, fundo neutro, produto em primeiro plano. Nada de filtro frio nem alto contraste.
- Zoom de 4–4,5% no hover, em 450–500ms. Nunca mais que isso.

## Lacunas

Quatorze posições do site ainda estão como `pending` em `src/data/site.ts`. As mais sentidas: fachada, salão, vitrine e equipe. Enquanto não houver foto real, a posição mostra a lacuna identificada (fundo `paper-deep`, rótulo em `pending`). **Foto de banco de imagens não entra neste site.**
