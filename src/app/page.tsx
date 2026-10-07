import type { CSSProperties } from "react";
import Image from "next/image";
import { CafeExperience } from "@/components/cafe-experience";
import { CafeStory } from "@/components/cafe-story";
import { BoutiqueHighlights } from "@/components/boutique-highlights";
import { HeroIntro } from "@/components/hero-intro";
import { ChevronRightIcon, ClockIcon, MapPinIcon, PhoneIcon, PickupIcon } from "@/components/icons";
import { Reviews } from "@/components/reviews";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { cafeBoutiqueMedia } from "@/data/media-assets";
import { localBusinessSchema, siteConfig } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <div className="site-shell">
        <div className="site-page-frame">
          <SiteHeader />
          <main id="conteudo">
            <section className="home-hero" id="inicio" aria-labelledby="hero-title" data-intro="pending">
              <Image
                className="home-hero__photo"
                src={cafeBoutiqueMedia.heroPanoramic.src}
                alt={cafeBoutiqueMedia.heroPanoramic.alt}
                fill
                preload
                quality={90}
                sizes="100vw"
                style={{
                  "--position-desktop": cafeBoutiqueMedia.heroPanoramic.objectPositionDesktop,
                  "--position-mobile": cafeBoutiqueMedia.heroPanoramic.objectPositionMobile,
                } as CSSProperties & { "--position-desktop": string; "--position-mobile": string }}
              />
              <HeroIntro />
              <div className="home-hero__copy">
                <h1 id="hero-title">
                  <span>Mais que um café,</span>
                  <em>uma pausa afetiva.</em>
                </h1>
                <div className="home-hero__actions">
                  <a className="button button--hero" href="/cardapio">
                    <span>Ver cardápio</span>
                  </a>
                </div>
              </div>
            </section>

            <BoutiqueHighlights />

            <CafeExperience />

            <CafeStory />

            <Reviews />

            <section className="visit-band" id="localizacao" aria-labelledby="visit-title" data-scroll-reveal="true">
              <div className="visit-band__inner section-wrap">
                <div className="visit-band__copy">
                  <p className="visit-band__eyebrow">Nossa cafeteria</p>
                  <h2 id="visit-title">Venha nos visitar.</h2>
                  <p className="visit-band__intro">
                    Um cantinho feito com carinho para te receber, com cafés especiais, bolos autorais e momentos que ficam na memória.
                  </p>
                  <dl className="visit-details">
                    <div className="visit-detail">
                      <span className="visit-detail__icon"><ClockIcon /></span>
                      <div className="visit-detail__copy">
                        <dt>Horário</dt>
                        <dd className="visit-detail__hours">
                          {siteConfig.openingHoursLabel.split(" · ").map((part, index) => <span key={part} data-separator={index > 0 ? "true" : undefined}>{part}</span>)}
                        </dd>
                      </div>
                    </div>
                    <div className="visit-detail">
                      <span className="visit-detail__icon"><MapPinIcon /></span>
                      <div className="visit-detail__copy">
                        <dt>Endereço</dt>
                        <dd>
                          {siteConfig.address.lines.map((line, index) => (
                            <span key={line}>
                              {index === 0 ? line.replace(/(Loja) (\d+)/, "$1\u00a0$2") : line.replace(/\s·\s/g, "\u00a0·\u00a0")}
                            </span>
                          ))}
                        </dd>
                      </div>
                    </div>
                    <div className="visit-detail">
                      <span className="visit-detail__icon"><PickupIcon /></span>
                      <div className="visit-detail__copy">
                        <dt>Encomendas</dt>
                        <dd>{siteConfig.pickupOnly ? "Retirada na loja" : "Consulte a equipe"}</dd>
                      </div>
                    </div>
                    <div className="visit-detail">
                      <span className="visit-detail__icon"><PhoneIcon /></span>
                      <div className="visit-detail__copy">
                        <dt>Contato</dt>
                        <dd>
                          <span>{siteConfig.phone}</span>
                          <a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer">Chamar no WhatsApp</a>
                        </dd>
                      </div>
                    </div>
                  </dl>
                </div>
                <div className="visit-band__visual vb">
                  <figure className="vb-photo">
                    <Image
                      src="/cafe-boutique/localizacao/fachada-entrada.jpg"
                      alt="Fachada da Café Boutique no Holandeses Center, com a placa da marca, a vitrine de vidro e mesas na entrada."
                      fill
                      quality={90}
                      sizes="(max-width: 760px) 92vw, 380px"
                    />
                  </figure>
                  <a className="vb-route" href={siteConfig.directionsUrl} target="_blank" rel="noreferrer">
                    <MapPinIcon />
                    <span>Como chegar</span>
                    <ChevronRightIcon />
                  </a>
                </div>
              </div>
            </section>
          </main>
          <SiteFooter />
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
    </>
  );
}
