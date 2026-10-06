# Inventário de mídia Café Boutique

As fotos foram mantidas em arquivos locais e vinculadas às publicações conhecidas do perfil oficial. `src/data/media-assets.ts` mantém dimensão intrínseca, descrição, origem, URL, recorte e eventual relação com o catálogo. Os arquivos de Instagram têm entre 360 e 507 px de largura; use em retratos e cartões pequenos, sem ampliar para banners largos.

| Arquivo | Dimensão | Bytes | Uso no site | Relação confirmada | Origem |
| --- | ---: | ---: | --- | --- | --- |
| `equipe/hero-equipe-vitrine.jpg` | 361×640 | 31.265 | Hero, foto vertical em proporção natural no desktop e corte 4:5 no mobile | Equipe diante da vitrine; não é foto de produto | [Reel Ddjx_9ntNAl](https://www.instagram.com/cafeboutique.slz/reel/Ddjx_9ntNAl/) · 21 set. 2026 |
| `products/bolo-amanteigado-producao.jpg` | 499×640 | 38.255 | Publicação do Instagram | Produção de bolos; o post não identifica cada forma como um item específico do menu | [Post Dd19iFsmyyC](https://www.instagram.com/cafeboutique.slz/p/Dd19iFsmyyC/) · 28 set. 2026 |
| `products/cafe-e-bolo-amanteigado.jpg` | 360×640 | 25.728 | Destaque de produto 4:5 | `fatia-bolo-amanteigado-com-cobertura` | [Reel DduQNtpNCyk](https://www.instagram.com/cafeboutique.slz/reel/DduQNtpNCyk/) · 25 set. 2026 |
| `products/panelinha-caramelo.jpg` | 507×640 | 56.296 | Publicação do Instagram | Panelinhas; sem relação exata com nome do catálogo | [Post DdbxHpzNQsn](https://www.instagram.com/cafeboutique.slz/p/DdbxHpzNQsn/) · 18 set. 2026 |
| `cozinha/quiche-e-empadas.jpg` | 361×640 | 43.161 | Publicação do Instagram | Foto do conjunto de quiches e empadas; não atribuir a um item isolado | [Reel DdW4qYptxL5](https://www.instagram.com/cafeboutique.slz/reel/DdW4qYptxL5/) · 16 set. 2026 |
| `products/torta-caramelito.jpg` | 480×640 | 61.115 | Publicação do Instagram | Torta Caramelito; sem correspondência exata no catálogo transcrito | [Post DdR7UltNPs9](https://www.instagram.com/cafeboutique.slz/p/DdR7UltNPs9/) · 14 set. 2026 |
| `products/panelinha-morango.jpg` | 480×640 | 55.194 | Publicação do Instagram | Panelinha; não é o produto “Supreme de Morango” | [Post Dc4NlJ4N4p1](https://www.instagram.com/cafeboutique.slz/p/Dc4NlJ4N4p1/) · 4 set. 2026 |
| `marca/logo-cafe-boutique.webp` | 1522×1033 | 183.206 | Header e footer | Logotipo original; não substituir | Arquivo de marca fornecido no projeto |
| `localizacao/fachada.jpg` | 335×597 | 54.819 | Bloco de localização | Foto real da fachada, enviada pelo usuário; substitui a imagem anterior gerada por IA | Foto enviada pelo usuário · 6 out. 2026 |
| `cozinha/preparo-cozinha.mp4` | Vídeo | 6.035.849 | Mantido no inventário, sem reprodução automática no site | O briefing fornecido confirma Reel oficial; o permalink do Reel não foi localizado | Arquivo de vídeo já fornecido no projeto |

## Revisão do Instagram

Foram inspecionadas sete publicações/reels oficiais cujos links estavam disponíveis no material do projeto. As datas e rótulos acima refletem esses registros. O histórico completo, carrosséis adicionais e destaques não estavam acessíveis sem autenticação do Instagram; não inferir um catálogo visual mais amplo a partir dessa seleção.

## Regras de uso

- A foto de cada item do catálogo só é preenchida quando a publicação sustenta o nome do produto. O mapeamento atual fica em `menuItemMedia`.
- Publicações sem correspondência exata no menu aparecem como registros do Instagram, sem preço nem promessa de disponibilidade.
- Hero mantém o retrato original em desktop. Cortes de 4:5 só acontecem em áreas cuja proporção os exige; os pontos focais por dispositivo ficam no registro de mídia.
- As imagens locais têm compressão leve e dimensões pequenas; Next Image entrega os tamanhos responsivos em AVIF/WebP conforme o navegador.
- `cliente-com-xicara-cafe-boutique.jpg` não é usado no site, conforme o pedido anterior de não exibir essa foto de cliente.
