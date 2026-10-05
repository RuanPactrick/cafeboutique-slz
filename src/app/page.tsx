import type { CSSProperties } from "react";
import Image from "next/image";
import { CafeExperience } from "@/components/cafe-experience";
import { CafeStory } from "@/components/cafe-story";
import { BoutiqueHighlights } from "@/components/boutique-highlights";
import { ClockIcon, MapPinIcon, PhoneIcon, PickupIcon } from "@/components/icons";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { cafeBoutiqueMedia, instagramSelections } from "@/data/media-assets";
import { localBusinessSchema, siteConfig } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <div className="site-shell">
        <div className="site-page-frame">
          <SiteHeader />
          <main id="conteudo">
            <section className="home-hero" id="inicio" aria-labelledby="hero-title">
              <Image
                className="home-hero__photo"
                src={cafeBoutiqueMedia.heroPanoramic.src}
                alt={cafeBoutiqueMedia.heroPanoramic.alt}
                fill
                preload
                quality={90}
                sizes="(max-width: 1440px) 100vw, 1380px"
                style={{
                  "--position-desktop": cafeBoutiqueMedia.heroPanoramic.objectPositionDesktop,
                  "--position-mobile": cafeBoutiqueMedia.heroPanoramic.objectPositionMobile,
                } as CSSProperties & { "--position-desktop": string; "--position-mobile": string }}
              />
              <video
                className="home-hero__video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={cafeBoutiqueMedia.heroPanoramic.src}
                aria-hidden="true"
                style={{
                  "--position-desktop": cafeBoutiqueMedia.heroPanoramic.objectPositionDesktop,
                  "--position-mobile": cafeBoutiqueMedia.heroPanoramic.objectPositionMobile,
                } as CSSProperties & { "--position-desktop": string; "--position-mobile": string }}
              >
                <source src="/cafe-boutique/hero/hero-cafe-boutique-animado.webm" type="video/webm" />
              </video>
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

            <section className="instagram-section" id="instagram" aria-labelledby="instagram-title">
              <div className="instagram-section__heading instagram-section__inner">
                <div>
                  <h2 id="instagram-title">A Boutique em imagens.</h2>
                  <p>Produtos e bastidores publicados no perfil oficial.</p>
                </div>
                <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">
                  {siteConfig.instagram}
                </a>
              </div>
              <ul className="instagram-grid instagram-section__inner">
                {instagramSelections.map(({ media, title, date, dateTime }, index) => (
                  <li className={`instagram-card${index === 0 ? " instagram-card--lead" : ""}`} key={media.src}>
                    <a
                      href={media.sourceUrl ?? siteConfig.instagramUrl}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${title}, publicação de ${date}, abrir no Instagram`}
                    >
                      <span
                        className="instagram-card__image"
                        style={{
                          "--position-desktop": media.objectPositionDesktop,
                          "--position-mobile": media.objectPositionMobile,
                        } as CSSProperties & { "--position-desktop": string; "--position-mobile": string }}
                      >
                        <Image
                          src={media.src}
                          alt={media.alt}
                          width={media.width}
                          height={media.height}
                          sizes={index === 0
                            ? "(max-width: 760px) 82vw, (max-width: 1024px) 46vw, 500px"
                            : "(max-width: 760px) 82vw, (max-width: 1024px) 23vw, 250px"}
                          quality={75}
                        />
                      </span>
                      <span className="instagram-card__copy">
                        <strong>{title}</strong>
                        <time dateTime={dateTime}>{date}</time>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            <section className="visit-band" id="localizacao" aria-labelledby="visit-title">
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
                <div className="visit-band__visual">
                  <div className="visit-band__facade">
                    <Image
                      src="/cafe-boutique/localizacao-fachada.webp"
                      alt="Fachada iluminada da Café Boutique com a entrada e o salão visíveis."
                      fill
                      quality={90}
                      sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 610px"
                    />
                  </div>
                  <div className="visit-band__location-row">
                    <div className="visit-map" role="img" aria-label={`Mapa ilustrativo da região de ${siteConfig.address.lines[1]}`}>
                      <span className="visit-map__road visit-map__road--one" aria-hidden="true" />
                      <span className="visit-map__road visit-map__road--two" aria-hidden="true" />
                      <span className="visit-map__road visit-map__road--three" aria-hidden="true" />
                      <span className="visit-map__pin"><MapPinIcon /></span>
                      <span className="visit-map__label">{siteConfig.address.lines[1].split(" · ")[0]}</span>
                    </div>
                    <div className="visit-location">
                      <p className="visit-band__eyebrow">Nossa localização</p>
                      <a className="button visit-location__primary" href={siteConfig.mapsUrl} target="_blank" rel="noreferrer">
                        <MapPinIcon />
                        Abrir localização
                      </a>
                      <a className="visit-location__secondary" href={siteConfig.mapsUrl} target="_blank" rel="noreferrer">Ver no Google Maps</a>
                    </div>
                  </div>
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
