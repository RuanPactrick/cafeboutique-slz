import type { CSSProperties } from "react";
import Image from "next/image";
import styles from "./cafe-story.module.css";

const artwork = "/cafe-boutique/historia/historia-sem-texto.png";

function MobilePortrait() {
  const photoCrop = {
    "--art-width": `${1672 / 738 * 100}%`,
    "--art-height": "100%",
    "--art-left": `${-626 / 738 * 100}%`,
    "--art-top": "0%",
  } as CSSProperties;

  return (
    <div className={styles.mobilePortrait}>
      <Image
        className={styles.mobilePortraitImage}
        src={artwork}
        alt="Pessoa segurando um bolo em uma cafeteria."
        width={1672}
        height={941}
        sizes="(max-width: 980px) 200vw, 1px"
        style={photoCrop}
        quality={90}
      />
    </div>
  );
}

export function CafeStory() {
  return (
    <section className={styles.section} id="cafe-story" aria-labelledby="cafe-story-title" data-scroll-reveal="true">
      <div className={styles.composition}>
        <Image
          className={styles.desktopArtwork}
          src={artwork}
          alt="Pessoa segurando um bolo em uma cafeteria, ao lado de uma vitrine de doces."
          width={1672}
          height={941}
          sizes="100vw"
          quality={90}
        />

        <div className={styles.copy}>
          <p className={styles.eyebrow}>Nossa história</p>
          <h2 id="cafe-story-title">Um espaço<br />para <em>boas pessoas.</em></h2>
          <p className={styles.description}>
            A Café Boutique nasceu do desejo de unir café de verdade, sabores especiais e encontros que fazem sentido. Mais que uma cafeteria, somos um espaço para desacelerar, conversar e viver bons momentos.
          </p>
          <a className={styles.button} href="/cardapio">
            <span>Conheça nossa história</span>
          </a>
        </div>

        <MobilePortrait />

        <aside className={styles.aside} aria-label="Café, pessoas, sabores e encontros">
          <ul className={styles.categories}>
            <li>Café</li>
            <li>Pessoas</li>
            <li>Sabores</li>
            <li>Encontros</li>
          </ul>
          <span className={styles.rule} aria-hidden="true" />
          <p className={styles.tagline}>Sempre<br />um bom motivo<br />para voltar.</p>
        </aside>
      </div>
    </section>
  );
}
