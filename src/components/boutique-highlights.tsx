import type { CSSProperties } from "react";
import Image from "next/image";
import { menuItems, formatPrice } from "@/data/menu";
import { createWhatsAppUrl } from "@/data/site";
import styles from "./boutique-highlights.module.css";

type Highlight = {
  key: string;
  name: string;
  orderName: string;
  description: string;
  priceCents: number;
  photo: string;
  /** Enquadramento da foto na metade de cima do cartão. */
  position: string;
  alt: string;
};

// Each product photo is an independent asset; all product labels are HTML.
function getHighlights(): Highlight[] {
  const byId = (id: string) => menuItems.find((entry) => entry.id === id);
  const desserts = menuItems.filter((item) => item.category === "sobremesas-gourmet" && item.availability === "listed-in-source");
  const dessertPrice = Math.min(...desserts.map((item) => item.priceCents));
  const croissant = byId("croissant-americano");
  const capuccino = byId("capuccino-tradicional-150ml");
  const sandwich = byId("sanduiche-americano-pao-frances");
  const cake = byId("fatia-bolo-amanteigado-com-cobertura");

  const list: (Highlight | null | undefined)[] = [
    croissant && { key: croissant.id, name: croissant.name, orderName: croissant.name, description: "Croissant recheado para acompanhar a sua pausa.", priceCents: croissant.priceCents, photo: "/cafe-boutique/destaques/croissant-americano-hd.jpg", position: "50% 66%", alt: "Croissant recheado com presunto, queijo e salada, servido em um prato." },
    capuccino && { key: capuccino.id, name: "Capuccino Tradicional", orderName: capuccino.name, description: "Seu capuccino tradicional, servido em uma xícara de 150 ml.", priceCents: capuccino.priceCents, photo: "/cafe-boutique/destaques/cappuccino-tradicional.webp", position: "50% 26%", alt: "Xícara de capuccino em uma mesa de madeira." },
    sandwich && { key: sandwich.id, name: "Sanduíche Americano", orderName: sandwich.name, description: "Presunto, queijo, requeijão, ovo, tomate e alface no pão francês.", priceCents: sandwich.priceCents, photo: "/cafe-boutique/destaques/sanduiche-americano.webp", position: "50% 26%", alt: "Sanduíche com queijo e salada, imagem ilustrativa." },
    { key: "sobremesas", name: "Sobremesas da Boutique", orderName: "sobremesas", description: "Supreme de morango, surpresa de uva e tortinha de banana.", priceCents: dessertPrice, photo: "/cafe-boutique/destaques/sobremesa-surpresa-de-uva-hd.jpg", position: "50% 60%", alt: "Surpresa de uva servida no copo, com chocolate por cima." },
    cake?.image ? { key: cake.id, name: "Fatia de Bolo Amanteigado", orderName: cake.name, description: "Uma fatia com cobertura para acompanhar o seu café.", priceCents: cake.priceCents, photo: "/cafe-boutique/destaques/fatia-bolo-amanteigado-hd.jpg", position: "50% 68%", alt: "Fatia de bolo amanteigado com cobertura, servida com uma xícara de café." } : null,
  ];
  return list.filter((item): item is Highlight => Boolean(item));
}

function ProductCard({ item, clone }: { item: Highlight; clone?: boolean }) {
  return (
    <li className={styles.card} aria-hidden={clone || undefined}>
      <div className={styles.photo}>
        <Image className={styles.photoImage} src={item.photo} alt={clone ? "" : item.alt} fill sizes="(max-width: 760px) 240px, 270px" quality={90} style={{ objectPosition: item.position }} />
      </div>
      <div className={styles.copy}>
        <h3>{item.name}</h3>
        <p className={styles.description}>{item.description}</p>
        <div className={styles.cardBottom}>
          <data className={styles.price} value={(item.priceCents / 100).toFixed(2)}>{formatPrice(item.priceCents)}</data>
          <a
            className={styles.order}
            href={createWhatsAppUrl(`Olá! Vim pelo site da Café Boutique e gostaria de consultar a disponibilidade de ${item.orderName}.`)}
            target="_blank"
            rel="noreferrer"
            aria-label={`Consultar ${item.orderName} no WhatsApp`}
            tabIndex={clone ? -1 : undefined}
          >
            <span aria-hidden="true">+</span>
          </a>
        </div>
      </div>
    </li>
  );
}

export function BoutiqueHighlights() {
  const highlights = getHighlights();

  return (
    <section className={styles.section} id="queridinhos" aria-labelledby="boutique-highlights-title">
      <div className={styles.flora} aria-hidden="true" />
      <div className={styles.heading}>
        <div>
          <p className={styles.eyebrow}>Nosso cardápio</p>
          <h2 id="boutique-highlights-title">Os queridinhos<br />da Boutique.</h2>
        </div>
        <div className={styles.intro}>
          <p>Bolos, cafés e sabores para acompanhar diferentes momentos do dia.</p>
          <a href="/cardapio">Ver cardápio completo</a>
        </div>
      </div>
      {/* Carrossel contínuo: a lista aparece duas vezes e a segunda cópia fica fora da leitura e do Tab. */}
      <div className={styles.railView}>
        <ul className={styles.rail} aria-label="Destaques do cardápio" style={{ "--items": highlights.length } as CSSProperties}>
          {highlights.map((item) => <ProductCard item={item} key={item.key} />)}
          {highlights.map((item) => <ProductCard item={item} key={`${item.key}-clone`} clone />)}
        </ul>
      </div>
    </section>
  );
}
