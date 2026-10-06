import { googleReviews } from "@/data/reviews";
import { siteConfig } from "@/data/site";
import { ChevronRightIcon, ExternalLinkIcon, GoogleIcon, SprigIcon, StarIcon } from "./icons";

function Stars({ value, large, idPrefix }: { value: number; large?: boolean; idPrefix: string }) {
  return (
    <span className={`rv-stars${large ? " rv-stars--lg" : ""}`}>
      {[0, 1, 2, 3, 4].map((index) => (
        <StarIcon key={index} fill={Math.max(0, Math.min(1, value - index))} id={`${idPrefix}-${index}`} />
      ))}
    </span>
  );
}

export function Reviews() {
  const { ratingValue, ratingLabel, ratingCount, checkedLabel, items } = googleReviews;

  return (
    <section className="rv" id="avaliacoes" aria-labelledby="rv-title">
      {/* Cena de mesa recortada da referência aprovada; decorativa. */}
      <img className="rv-prop rv-prop--table" src="/cafe-boutique/avaliacoes/mesa.webp" alt="" aria-hidden="true" />
      <img className="rv-prop rv-prop--flowers" src="/cafe-boutique/avaliacoes/gipsofila.svg" alt="" aria-hidden="true" />
      <img className="rv-prop rv-prop--cup" src="/cafe-boutique/avaliacoes/xicara.webp" alt="" aria-hidden="true" />
      <img className="rv-prop rv-prop--pastry" src="/cafe-boutique/avaliacoes/rosca.webp" alt="" aria-hidden="true" />
      <div className="rv-inner">
        <div className="rv-top">
          <div className="rv-copy">
            <p className="rv-eyebrow">O que dizem de nós</p>
            <h2 id="rv-title">Histórias que<br />a gente <em>guarda.</em></h2>
            <p className="rv-lede">Avaliações reais de quem já viveu a experiência da Café Boutique e fez parte da nossa história.</p>
          </div>
          <div className="rv-score">
            <p className="rv-score__num"><strong>{ratingLabel}</strong><span>de 5</span></p>
            <span role="img" aria-label={`Nota ${ratingLabel} de 5`}>
              <Stars value={ratingValue} large idPrefix="rv-score" />
            </span>
            <p className="rv-score__count">{ratingCount} avaliações no Google Maps</p>
            <p className="rv-score__date">Consultado em {checkedLabel}</p>
            <a className="rv-button" href={siteConfig.mapsUrl} target="_blank" rel="noreferrer">
              <GoogleIcon />
              <span>Ver todas as avaliações</span>
              <ChevronRightIcon />
            </a>
          </div>
        </div>
        <ul className="rv-cards">
          {items.map((review) => (
            <li className="rv-card" key={review.name}>
              <div className="rv-card__top">
                <span className="rv-avatar" aria-hidden="true">{review.initials}</span>
                <span role="img" aria-label={`${review.rating} de 5 estrelas`}>
                  <Stars value={review.rating} idPrefix={review.initials} />
                </span>
                <span className="rv-when">{review.when}</span>
                <GoogleIcon />
              </div>
              <p className="rv-quote">“{review.summary}”</p>
              <p className="rv-by"><span aria-hidden="true" />{review.name}</p>
            </li>
          ))}
        </ul>
        <div className="rv-note">
          <SprigIcon />
          <div>
            <p>Resumos dos comentários públicos no Google Maps, não transcrições.</p>
            <a href={siteConfig.mapsUrl} target="_blank" rel="noreferrer">
              Ver as avaliações no Google
              <ExternalLinkIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
