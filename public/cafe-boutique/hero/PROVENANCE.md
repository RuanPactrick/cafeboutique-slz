# Proveniência da abertura do hero

- `recorte/abertura-1440.mp4`, `recorte/abertura-mobile.mp4` e `recorte/abertura-poster.jpg` (guardados, fora de uso no teste atual): recortes de `teste boutique(1).mp4`, fornecido pelo proprietário em 6 out. 2026 (11,4 s, exportado em 2560×1440 com detalhe real de 1080p). Substituiu `teste boutique.mp4`, que tinha detalhe de 720p.
- Ficaram só os closes de produto (grãos no moedor, extração e a xícara com o logo), 6,1 s no total. Saíram as cenas com o barista e o salão, que não correspondem à equipe nem ao espaço reais da Café Boutique.
- Codificação: H.264 sem áudio, mantendo os 60 fps e a resolução do original (CRF 20, aq-mode 3 para não manchar as sombras). Desktop em 2560×1440 (6,2 MB); celular em recorte central 3:4, 1080×1440 (3,1 MB). O pôster é o primeiro quadro do recorte. A primeira versão (1080p/720p, 30 fps, CRF 25) perdia nitidez visível.
- `completo-1440.mp4` (12,1 MB), `completo-mobile.mp4` (5,9 MB) e `completo-poster.jpg`: o vídeo inteiro, sem cortes, com a mesma codificação; em teste no hero desde 6 out. 2026 para avaliar a versão completa antes de um novo vídeo com o espaço real.
- `hero-cafe-boutique-limpo.png`: foto do hero que aparece ao fim da abertura.
- Uso: `src/components/hero-intro.tsx` e `src/app/page.tsx`.
