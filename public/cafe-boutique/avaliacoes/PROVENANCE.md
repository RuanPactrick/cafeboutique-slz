# Proveniência dos elementos das avaliações

- `mesa.webp`, `xicara.webp` e `rosca.webp`: recortes da imagem de referência da seção de avaliações enviada pelo usuário, com as bordas esfumadas em transparência para pousar no fundo cacau. São decorativos (`alt=""`).
- `gipsofila.svg`: raminho de gipsófila desenhado em vetor (gerado por código), no lugar do recorte borrado da mesma referência.
- Nota, total e resumos das avaliações ficam em `src/data/reviews.ts`, como snapshot da ficha pública no Google Maps.

- Atualização (7 out. 2026): `salao-fundo.jpg` e `salao-fundo-mobile.jpg` são a foto do salão enviada pelo cliente, com tratamento de luz e cor (sem IA generativa), enquadramento levemente fechado e desfoque gaussiano aplicado no arquivo para que nenhum cliente fotografado fique identificável. A versão de celular é um recorte na vitrine. Usadas como fundo da seção de avaliações; os recortes decorativos (mesa, gipsofila, xícara, rosca) deixaram de ser usados.
- Ajuste (7 out. 2026): desfoque geral reduzido para um leve amaciamento (raio 1,6 px), para o salão ficar reconhecível; o desfoque forte ficou só nas áreas com pessoas (clientes à esquerda e atendente). Arquivos renomeados para `salao-fundo-2.jpg` e `salao-fundo-mobile-2.jpg`.
