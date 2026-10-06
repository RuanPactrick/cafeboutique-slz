import Image from "next/image";
import { ChevronRightIcon } from "./icons";

export function CafeStory() {
  return (
    <section className="cb cb--latte" id="cafe-story" aria-labelledby="cafe-story-title">
      <div className="cb-inner cb-story">
        <figure className="cb-story__photo">
          <div className="cb-photo cb-photo--portrait">
            <Image
              src="/cafe-boutique/historia/retrato.jpg"
              alt="A dona da Café Boutique sorrindo com um bolo nas mãos, em frente à vitrine de doces."
              fill
              sizes="(max-width: 760px) 86vw, 380px"
              quality={88}
            />
          </div>
          <figcaption>Sempre um bom motivo para voltar.</figcaption>
        </figure>
        <div className="cb-story__copy">
          <p className="cb-eyebrow">Nossa história</p>
          <h2 id="cafe-story-title">Um espaço<br />para <em>boas pessoas.</em></h2>
          <p className="cb-lede">
            A Café Boutique nasceu do desejo de unir café de verdade, sabores especiais e encontros que fazem sentido. Mais que uma cafeteria, somos um espaço para desacelerar, conversar e viver bons momentos.
          </p>
          <a className="cb-cta" href="/cardapio">
            <span>Conheça nossa história</span>
            <ChevronRightIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
