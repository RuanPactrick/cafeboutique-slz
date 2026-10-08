"use client";

import { useEffect, useRef, useState } from "react";

const SEEN_KEY = "cb-hero-intro";

// Versão em teste: o vídeo completo (11,4 s). O recorte só com os closes (6,1 s) está guardado
// em /cafe-boutique/hero/recorte/; para voltar a ele, troque este objeto pelo comentado.
const CLIP = {
  desktop: "/cafe-boutique/hero/completo-1440.mp4",
  mobile: "/cafe-boutique/hero/completo-mobile.mp4",
  poster: "/cafe-boutique/hero/completo-poster.jpg",
};
// const CLIP = {
//   desktop: "/cafe-boutique/hero/recorte/abertura-1440.mp4",
//   mobile: "/cafe-boutique/hero/recorte/abertura-mobile.mp4",
//   poster: "/cafe-boutique/hero/recorte/abertura-poster.jpg",
// };

// Abertura do hero: o vídeo roda uma vez, sem texto; ao fim o título sobe e o vídeo continua
// em loop como fundo (data-video="loop"). O hero chega do servidor em data-intro="pending";
// aqui ele passa a "playing" e termina em "done". Quem já viu a abertura nesta visita vê o vídeo
// em loop com o texto desde o início. Quem prefere menos movimento ou economiza dados fica com
// a foto, que também é o que aparece se o vídeo falhar.
export function HeroIntro() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(true);
  const [intro, setIntro] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    const hero = video?.closest<HTMLElement>(".home-hero");
    if (!video || !hero) return;

    let finished = false;
    let cancelled = false;
    // Sem vídeo (erro, autoplay bloqueado): a foto assume e o elemento sai.
    const fallBack = () => {
      if (cancelled) return;
      delete hero.dataset.video;
      hero.dataset.intro = "done";
      window.setTimeout(() => setActive(false), 1400);
    };
    const finish = () => {
      if (finished || cancelled) return;
      finished = true;
      hero.dataset.intro = "done";
      setIntro(false);
      try { sessionStorage.setItem(SEEN_KEY, "1"); } catch {}
      video.loop = true;
      if (video.paused) video.play().catch(fallBack);
    };

    let seen = false;
    try { seen = sessionStorage.getItem(SEEN_KEY) === "1"; } catch {}
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (saveData || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      hero.dataset.intro = "done";
      setActive(false);
      return;
    }

    // O React não reflete `muted` no elemento; sem isso o navegador bloqueia o autoplay.
    video.muted = true;
    video.src = window.matchMedia("(max-width: 760px)").matches
      ? CLIP.mobile
      : CLIP.desktop;
    hero.dataset.video = "loop";

    // Fora da tela, o vídeo pausa: poupa bateria e dados enquanto a pessoa lê o resto da página.
    const observer = new IntersectionObserver(([entry]) => {
      if (!finished) return;
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    });
    observer.observe(hero);
    video.addEventListener("error", fallBack);

    if (seen) {
      finish();
      return () => {
        cancelled = true;
        observer.disconnect();
        video.removeEventListener("error", fallBack);
      };
    }

    hero.dataset.intro = "playing";
    // Sem início em 3 s (rede lenta, autoplay bloqueado), o visitante não fica esperando.
    const stall = window.setTimeout(() => { if (video.paused) { finished = true; fallBack(); } }, 3000);
    video.addEventListener("ended", finish);
    video.play().catch(() => { finished = true; fallBack(); });

    return () => {
      cancelled = true;
      window.clearTimeout(stall);
      observer.disconnect();
      video.removeEventListener("ended", finish);
      video.removeEventListener("error", fallBack);
    };
  }, []);

  if (!active) return null;

  return (
    <>
      <video
        ref={videoRef}
        className="home-hero__video"
        poster={CLIP.poster}
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      />
      {intro ? <button
        className="home-hero__skip"
        type="button"
        onClick={() => {
          videoRef.current?.pause();
          videoRef.current?.dispatchEvent(new Event("ended"));
        }}
      >
        Pular abertura
      </button> : null}
    </>
  );
}
