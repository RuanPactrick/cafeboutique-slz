import Image from "next/image";
import { menuItems, formatPrice } from "@/data/menu";
import { createWhatsAppUrl } from "@/data/site";
import { ProductRail } from "./product-rail";
import styles from "./boutique-highlights.module.css";

// Each product photo is an independent asset; all product labels are HTML.
const highlights = [
  { id: "croissant-americano", category: "Croissants", description: "Croissant recheado para acompanhar a sua pausa.", photo: "/cafe-boutique/destaques/croissant-americano.webp", alt: "Croissant dourado e recheado, servido em um prato." },
  { id: "capuccino-tradicional-150ml", category: "Cafés", title: "Capuccino Tradicional", description: "Seu capuccino tradicional, servido em uma xícara de 150 ml.", photo: "/cafe-boutique/destaques/cappuccino-tradicional.webp", alt: "Xícara de capuccino em uma mesa de madeira." },
  { id: "sanduiche-americano-pao-frances", category: "Sanduíches", title: "Sanduíche Americano", description: "Presunto, queijo, requeijão, ovo, tomate e alface no pão francês.", photo: "/cafe-boutique/destaques/sanduiche-americano.webp", alt: "Sanduíche com queijo e salada, imagem ilustrativa." },
] as const;

function ArtworkPhoto({ src, alt }: { src: string; alt: string }) {
  return (
    <div className={styles.photo}>
      <Image
        className={styles.photoImage}
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 760px) 82vw, (max-width: 1050px) 31vw, 23vw"
        quality={92}
      />
    </div>
  );
}

function OrderLink({ name }: { name: string }) {
  return (
    <a
      className={styles.order}
      href={createWhatsAppUrl(`Olá! Vim pelo site da Café Boutique e gostaria de consultar a disponibilidade de ${name}.`)}
      target="_blank"
      rel="noreferrer"
      aria-label={`Consultar ${name} no WhatsApp`}
    >
      <span aria-hidden="true">+</span>
    </a>
  );
}

export function BoutiqueHighlights() {
  const desserts = menuItems.filter((item) => item.category === "sobremesas-gourmet" && item.availability === "listed-in-source");
  const dessertPrice = Math.min(...desserts.map((item) => item.priceCents));
  const cake = menuItems.find((item) => item.id === "fatia-bolo-amanteigado-com-cobertura");

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
      <ProductRail>
        {highlights.map((highlight) => {
          const item = menuItems.find((entry) => entry.id === highlight.id);
          if (!item) return null;
          return (
            <li className={styles.card} key={item.id}>
              <ArtworkPhoto src={highlight.photo} alt={highlight.alt} />
              <div className={styles.copy}>
                <p className={styles.category}>{highlight.category}</p>
                <h3>{"title" in highlight ? highlight.title : item.name}</h3>
                <p className={styles.description}>{highlight.description}</p>
                <div className={styles.cardBottom}>
                  <data className={styles.price} value={(item.priceCents / 100).toFixed(2)}>{formatPrice(item.priceCents)}</data>
                  <OrderLink name={item.name} />
                </div>
              </div>
            </li>
          );
        })}
        <li className={styles.card}>
          <ArtworkPhoto src="/cafe-boutique/destaques/sobremesa-chocolate.webp" alt="Sobremesa de chocolate com morango em uma panelinha, imagem ilustrativa." />
          <div className={styles.copy}>
            <p className={styles.category}>Sobremesas</p>
            <h3>Sobremesas da Boutique</h3>
            <p className={styles.description}>Supreme de morango, surpresa de uva e tortinha de banana.</p>
            <div className={styles.cardBottom}>
              <data className={styles.price} value={(dessertPrice / 100).toFixed(2)}>{formatPrice(dessertPrice)}</data>
              <OrderLink name="sobremesas" />
            </div>
          </div>
        </li>
        {cake?.image && (
          <li className={`${styles.card} ${styles.cake}`}>
            <Image src={cake.image.src} alt={cake.image.alt} fill sizes="(max-width: 760px) 82vw, 23vw" quality={92} className={styles.singlePhoto} />
            <div className={styles.copy}>
              <p className={styles.category}>Bolos</p>
              <h3>Fatia de Bolo Amanteigado</h3>
              <p className={styles.description}>Uma fatia com cobertura para acompanhar o seu café.</p>
              <div className={styles.cardBottom}>
                <data className={styles.price} value={(cake.priceCents / 100).toFixed(2)}>{formatPrice(cake.priceCents)}</data>
                <OrderLink name={cake.name} />
              </div>
            </div>
          </li>
        )}
      </ProductRail>
    </section>
  );
}
