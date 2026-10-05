import Image from "next/image";
import { createWhatsAppUrl, siteConfig } from "@/data/site";
import { CafeExperienceCarousel } from "./cafe-experience-carousel";
import styles from "./cafe-experience.module.css";

const artwork = "/cafe-boutique/espaco/espaco-sem-texto.png";

export function CafeExperience() {
  const contactUrl = createWhatsAppUrl(
    "Olá! Vim pelo site da Café Boutique e gostaria de saber mais sobre o estabelecimento.",
  );

  return (
    <section className={styles.section} id="a-casa" aria-labelledby="cafe-experience-title">
      <div className={styles.composition}>
        <Image
          className={styles.desktopArtwork}
          src={artwork}
          alt="Montagem ilustrativa de interior de cafeteria, área externa e canto infantil."
          width={1672}
          height={941}
          sizes="100vw"
          quality={90}
        />

        <div className={styles.copy}>
          <p className={styles.eyebrow}>Nosso espaço</p>
          <h2 id="cafe-experience-title">Um cantinho<br />para bons<br />encontros.</h2>
          <p className={styles.description}>
            Em São Luís, a Café Boutique reúne cafés, bolos, sobremesas e lanches para acompanhar diferentes momentos. Conheça os sabores da casa e fale com a equipe para combinar sua retirada.
          </p>
          <a className={styles.link} href={contactUrl} target="_blank" rel="noreferrer">
            <span className={styles.linkLabel}>Conheça a Boutique</span>
          </a>
        </div>

        <CafeExperienceCarousel />
      </div>
    </section>
  );
}
