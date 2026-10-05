import type { CSSProperties } from "react";
import Image from "next/image";
import { featuredItemIds, formatPrice, menuCategories, menuItems } from "@/data/menu";
import { createWhatsAppUrl } from "@/data/site";

export function FeaturedProducts() {
  const items = featuredItemIds
    .map((id) => menuItems.find((item) => item.id === id))
    .filter((item) => item?.image);

  return (
    <ul className="featured-product-list" aria-label="Produto do cardápio com fotografia oficial">
      {items.map((item) => {
        if (!item?.image) return null;

        const category = menuCategories.find((entry) => entry.id === item.category);
        const message = `Olá! Vim pelo site da Café Boutique e gostaria de encomendar ${item.name}.`;

        return (
          <li className="featured-product" key={item.id}>
            <figure className="featured-product__image">
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
                sizes="(max-width: 760px) min(84vw, 361px), 361px"
                quality={75}
                style={{
                  "--position-desktop": item.image.objectPositionDesktop,
                  "--position-mobile": item.image.objectPositionMobile,
                } as CSSProperties & { "--position-desktop": string; "--position-mobile": string }}
              />
            </figure>
            <div className="featured-product__copy">
              <span className="featured-product__category">{category?.label}</span>
              <h3>{item.name}</h3>
              <data value={(item.priceCents / 100).toFixed(2)}>{formatPrice(item.priceCents)}</data>
              <a href={createWhatsAppUrl(message)} target="_blank" rel="noreferrer">
                Encomendar para retirada
              </a>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
