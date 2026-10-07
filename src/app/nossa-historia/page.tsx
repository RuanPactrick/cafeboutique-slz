import type { Metadata } from "next";
import Image from "next/image";
import { ChevronRightIcon, MapPinIcon } from "@/components/icons";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { cakeOrderUrl, siteConfig } from "@/data/site";
import styles from "./nossa-historia.module.css";

export const metadata: Metadata = {
  title: "Nossa história | Café Boutique",
  description:
    "Conheça a história da Café Boutique em São Luís: a ideia de Alana, o ambiente acolhedor e os sabores que fazem do café da tarde um ponto de encontro.",
};

const spacePhotos = [
  {
    src: "/cafe-boutique/espaco/salao.jpg",
    alt: "Balcão da cafeteria com vitrine de bolos, prateleiras iluminadas, plantas e xícaras.",
    caption: "O salão e a vitrine",
    className: "lead",
  },
  {
    src: "/cafe-boutique/espaco/area-externa.jpg",
    alt: "Mesas e cadeiras coloridas na área externa, rodeada por plantas.",
    caption: "Um lugar para ficar",
    className: "support",
  },
  {
    src: "/cafe-boutique/espaco/cantinho-infantil.jpg",
    alt: "Mesinhas, cadeiras coloridas e brinquedos no cantinho infantil.",
    caption: "Espaço para as crianças",
    className: "support",
  },
] as const;

export default function NossaHistoriaPage() {
  return (
    <div className="site-shell">
      <div className="site-page-frame">
        <SiteHeader />
        <main id="conteudo" className={styles.page}>
          <section className={styles.hero} aria-labelledby="history-title">
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}>Nossa história · São Luís</p>
              <h1 id="history-title">
                Um café para criar <em>memórias.</em>
              </h1>
              <p className={styles.heroLede}>
                À frente da Café Boutique está a empreendedora Alana, junto da
                equipe e de parceiros como a La Mia Dolce Vita. A marca nasceu
                com uma ideia simples: transformar o café da tarde em um ponto
                de encontro na Ilha.
              </p>
              <a className={styles.textLink} href="#a-casa">
                Conheça o que nos move <ChevronRightIcon />
              </a>
            </div>

            <figure className={styles.heroPhoto}>
              <div className={styles.heroImage}>
                <Image
                  src="/cafe-boutique/historia/retrato.jpg"
                  alt="Alana, empreendedora da Café Boutique, segura um bolo amanteigado diante da vitrine."
                  fill
                  preload
                  quality={90}
                  sizes="(max-width: 760px) 88vw, (max-width: 1100px) 42vw, 500px"
                />
              </div>
              <figcaption>Alana · Café Boutique</figcaption>
            </figure>

            <p className={styles.signature}>
              <span>Café</span>
              <span>Pessoas</span>
              <span>Sabores</span>
              <span>Encontros</span>
            </p>
          </section>

          <section
            className={styles.welcome}
            id="a-casa"
            aria-labelledby="welcome-title"
          >
            <div className={styles.welcomeInner}>
              <p className={styles.eyebrow}>O que nos inspira</p>
              <h2 id="welcome-title">
                Um espaço para desacelerar e se encontrar.
              </h2>
              <p>
                A Café Boutique nasceu em torno das memórias afetivas: um
                ambiente aconchegante, pet friendly e com espaço kids. Um lugar
                para chegar com a família, com os amigos ou com seu pet e fazer
                do café da tarde um momento compartilhado.
              </p>
            </div>
          </section>

          <section className={styles.space} aria-labelledby="space-title">
            <div className={styles.spaceCopy}>
              <p className={styles.eyebrow}>A casa</p>
              <h2 id="space-title">Cada cantinho acolhe um encontro.</h2>
              <p>
                No salão, na área externa ou no espaço kids, a ideia é que cada
                pessoa encontre seu jeito de aproveitar a visita. Acolhimento
                também faz parte do que a Café Boutique serve.
              </p>
            </div>

            <div className={styles.spaceGallery}>
              {spacePhotos.map((photo) => (
                <figure
                  className={
                    photo.className === "lead"
                      ? styles.spaceLead
                      : styles.spaceSupport
                  }
                  key={photo.src}
                >
                  <div className={styles.spaceImage}>
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      quality={90}
                      sizes="(max-width: 760px) 88vw, (max-width: 1100px) 48vw, 720px"
                    />
                  </div>
                  <figcaption>{photo.caption}</figcaption>
                </figure>
              ))}
            </div>
          </section>

          <section className={styles.flavors} aria-labelledby="flavors-title">
            <div className={styles.flavorPhotos}>
              <figure className={styles.flavorCake}>
                <div className={styles.flavorImage}>
                  <Image
                    src="/cafe-boutique/products/bolo-amanteigado-producao.jpg"
                    alt="Bolos amanteigados em formas durante a produção na Café Boutique."
                    fill
                    quality={90}
                    sizes="(max-width: 760px) 46vw, (max-width: 1100px) 28vw, 390px"
                  />
                </div>
                <figcaption>Bolos feitos para compartilhar</figcaption>
              </figure>
              <figure className={styles.flavorPanelinha}>
                <div className={styles.flavorImage}>
                  <Image
                    src="/cafe-boutique/products/panelinha-morango.jpg"
                    alt="Panelinha de chocolate com morangos, uma das sobremesas da casa."
                    fill
                    quality={90}
                    sizes="(max-width: 760px) 46vw, (max-width: 1100px) 24vw, 320px"
                  />
                </div>
                <figcaption>As panelinhas de sexta-feira</figcaption>
              </figure>
            </div>

            <div className={styles.flavorCopy}>
              <p className={styles.eyebrow}>Sabores da casa</p>
              <h2 id="flavors-title">Receitas que viram lembrança.</h2>
              <p>
                Bolos amanteigados em vários tamanhos e sabores, com coberturas
                de leite Ninho, chocolate e abacaxi caramelizado, dividem a
                vitrine com a Torta Belle, tortas de pistache e limão siciliano,
                quiches, empadas, coxinhas e mais de 20 sabores de sanduíches.
                Às sextas-feiras, as tradicionais panelinhas completam a mesa.
              </p>
              <p>
                As collabs e o trabalho com parceiros como a La Mia Dolce Vita
                também fazem parte dos sabores e encontros da Boutique.
              </p>
              <div className={styles.flavorLinks}>
                <a className={styles.textLink} href="/cardapio">
                  Ver o cardápio <ChevronRightIcon />
                </a>
                <a className={styles.textLink} href={cakeOrderUrl} target="_blank" rel="noreferrer">
                  Encomendar um bolo <ChevronRightIcon />
                </a>
              </div>
            </div>
          </section>

          <section className={styles.visit} aria-labelledby="visit-story-title">
            <div className={styles.visitCopy}>
              <p className={styles.eyebrow}>A história continua</p>
              <h2 id="visit-story-title">Venha viver esse encontro.</h2>
              <address>
                {siteConfig.address.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
              <p className={styles.hours}>{siteConfig.openingHoursLabel}</p>
              <div className={styles.visitActions}>
                <a className={styles.visitButton} href={siteConfig.directionsUrl}>
                  <MapPinIcon /> Como chegar
                </a>
                <a
                  className={styles.textLink}
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Fale com a equipe <ChevronRightIcon />
                </a>
              </div>
            </div>
            <figure className={styles.visitPhoto}>
              <div className={styles.visitImage}>
                <Image
                  src="/cafe-boutique/localizacao/fachada-entrada.jpg"
                  alt="Fachada da Café Boutique no Holandeses Center, com a placa da marca e mesas na entrada."
                  fill
                  quality={90}
                  sizes="(max-width: 760px) 88vw, (max-width: 1100px) 42vw, 520px"
                />
              </div>
              <figcaption>Holandeses Center · Calhau</figcaption>
            </figure>
          </section>
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
