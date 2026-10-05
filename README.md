# Café Boutique — São Luís

Site da Café Boutique, com apresentação da cafeteria, cardápio pesquisável e informações para visita e retirada de pedidos.

## Desenvolvimento

```bash
npm ci
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Produção

```bash
npm run build
npm run start
```

## Conteúdo

- Produtos, categorias, descrições e preços ficam em `src/data/menu.json`.
- As informações da cafeteria e os links ficam em `src/data/site.ts`.
- As fotos e vídeos usados pelo site ficam em `public/`.
- O cardápio permite buscar e filtrar itens, montar um pedido e continuar pelo WhatsApp para confirmar a retirada.
