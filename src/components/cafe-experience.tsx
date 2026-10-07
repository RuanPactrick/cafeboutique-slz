import Image from "next/image";

// Fotos reais do espaço, com o mesmo tratamento de cor das fotos de "Nossa história".
const photos = [
  { src: "/cafe-boutique/espaco/salao.jpg", alt: "Balcão da cafeteria com vitrine de bolos, prateleiras iluminadas, plantas e xícaras.", caption: "Interior" },
  { src: "/cafe-boutique/espaco/area-externa.jpg", alt: "Mesas e cadeiras coloridas na área externa, rodeada por plantas.", caption: "Área externa" },
  { src: "/cafe-boutique/espaco/cantinho-infantil.jpg", alt: "Mesinhas, cadeiras coloridas e brinquedos no cantinho infantil.", caption: "Cantinho infantil" },
] as const;

export function CafeExperience() {
  return (
    <section className="cb cb--cream" id="a-casa" aria-labelledby="cafe-experience-title">
      <div className="cb-inner">
        <div className="cb-head">
          <div>
            <p className="cb-eyebrow">Nosso espaço</p>
            <h2 id="cafe-experience-title">Um cantinho<br />para <em>bons encontros.</em></h2>
          </div>
          <div className="cb-head__side">
            <p className="cb-lede">
              Em São Luís, a Café Boutique reúne cafés, bolos, sobremesas e lanches para acompanhar diferentes momentos. Conheça os sabores da casa e fale com a equipe para combinar sua retirada.
            </p>
          </div>
        </div>
        <ul className="cb-photos">
          {photos.map((photo) => (
            <li key={photo.src}>
              <figure>
                <div className="cb-photo">
                  <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 760px) 78vw, 400px" quality={90} />
                </div>
                <figcaption>{photo.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
