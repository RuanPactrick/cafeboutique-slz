import { googleReviews } from "@/data/reviews";
import { siteConfig } from "@/data/site";
import { Line } from "./motion";
import { SwipeHint } from "./swipe-hint";
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
      {/* O salão da Boutique ao fundo, quase nítido; só as pessoas da foto são desfocadas no próprio arquivo,
          para nenhum cliente virar o "rosto" de uma avaliação. No celular, o recorte é a vitrine. */}
      <picture className="rv-bg" aria-hidden="true">
        <source media="(max-width: 760px)" srcSet="/cafe-boutique/avaliacoes/salao-fundo-mobile-2.jpg" />
        <img src="/cafe-boutique/avaliacoes/salao-fundo-2.jpg" alt="" loading="lazy" decoding="async" />
      </picture>
      <div className="rv-inner">
        <div className="rv-top">
          <div className="rv-copy">
            <p className="rv-eyebrow">O que dizem de nós</p>
            <h2 id="rv-title" data-reveal="lines"><Line>Histórias que</Line><Line>a gente <em>guarda.</em></Line></h2>
            <p className="rv-lede">Avaliações reais de quem já viveu a experiência da Café Boutique e fez parte da nossa história.</p>
          </div>
          <div className="rv-score" data-reveal="score">
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
        <ul className="rv-cards" id="avaliacoes-cards" data-reveal="cards">
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
              <blockquote className="rv-quote"><p>“{review.quote}”</p></blockquote>
              <p className="rv-by"><span aria-hidden="true" />{review.name}</p>
            </li>
          ))}
        </ul>
        <SwipeHint targetId="avaliacoes-cards" className="swipe-hint--dark" />
        <div className="rv-note">
          <SprigIcon />
          <div>
            <p>Trechos de avaliações públicas no Google Maps, com o nome que cada pessoa usa lá.</p>
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
