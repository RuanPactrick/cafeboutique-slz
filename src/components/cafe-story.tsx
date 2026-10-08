import Image from "next/image";
import { ChevronRightIcon } from "./icons";
import { Line } from "./motion";

export function CafeStory() {
  return (
    <section className="cb cb--latte" id="cafe-story" aria-labelledby="cafe-story-title">
      <div className="cb-inner cb-story">
        <figure className="cb-story__photo">
          <div className="cb-photo cb-photo--portrait" data-reveal="frame">
            <Image
              src="/cafe-boutique/historia/retrato.jpg"
              alt="Alana, empreendedora da Café Boutique, sorri com um bolo amanteigado nas mãos diante da vitrine de doces."
              fill
              sizes="(max-width: 760px) 86vw, 460px"
              quality={90}
            />
          </div>
          <figcaption>Sempre um bom motivo para voltar.</figcaption>
        </figure>
        <div className="cb-story__copy">
          <p className="cb-eyebrow">Nossa história</p>
          <h2 id="cafe-story-title" data-reveal="lines"><Line>Um espaço</Line><Line>para <em>boas pessoas.</em></Line></h2>
          <p className="cb-lede">
            A Café Boutique nasceu do desejo de unir café de verdade, sabores especiais e encontros que fazem sentido. Mais que uma cafeteria, somos um espaço para desacelerar, conversar e viver bons momentos.
          </p>
          <a className="cb-cta" href="/nossa-historia">
            <span>Conheça nossa história</span>
            <ChevronRightIcon />
          </a>
        </div>
      </div>
    </section>
  );
}
