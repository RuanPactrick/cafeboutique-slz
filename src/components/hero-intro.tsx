"use client";

import { useEffect, useRef, useState } from "react";

const SEEN_KEY = "cb-hero-intro";

// Abertura do hero: os closes do grão até a xícara rodam uma vez, sem texto, e ao fim o vídeo
// se dissolve na foto de sempre enquanto o título sobe. O hero chega do servidor em
// data-intro="pending"; aqui ele passa a "playing" e termina em "done". Quem prefere menos
// movimento, economiza dados ou já viu a abertura nesta visita vai direto para o fim.
export function HeroIntro() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    const hero = video?.closest<HTMLElement>(".home-hero");
    if (!video || !hero) return;

    let finished = false;
    let cancelled = false;
    const finish = () => {
      if (finished || cancelled) return;
      finished = true;
      hero.dataset.intro = "done";
      try { sessionStorage.setItem(SEEN_KEY, "1"); } catch {}
      window.setTimeout(() => setActive(false), 1400);
    };

    let seen = false;
    try { seen = sessionStorage.getItem(SEEN_KEY) === "1"; } catch {}
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (seen || saveData || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      setActive(false);
      return;
    }

    // O React não reflete `muted` no elemento; sem isso o navegador bloqueia o autoplay.
    video.muted = true;
    video.src = window.matchMedia("(max-width: 760px)").matches
      ? "/cafe-boutique/hero/abertura-mobile.mp4"
      : "/cafe-boutique/hero/abertura-1440.mp4";
    hero.dataset.intro = "playing";

    // Sem início em 3 s (rede lenta, autoplay bloqueado), o visitante não fica esperando.
    const stall = window.setTimeout(() => { if (video.paused) finish(); }, 3000);
    video.addEventListener("ended", finish);
    video.addEventListener("error", finish);
    video.play().catch(finish);

    return () => {
      cancelled = true;
      window.clearTimeout(stall);
      video.removeEventListener("ended", finish);
      video.removeEventListener("error", finish);
    };
  }, []);

  if (!active) return null;

  return (
    <>
      <video
        ref={videoRef}
        className="home-hero__video"
        poster="/cafe-boutique/hero/abertura-poster.jpg"
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
      />
      <button
        className="home-hero__skip"
        type="button"
        onClick={() => {
          videoRef.current?.pause();
          videoRef.current?.dispatchEvent(new Event("ended"));
        }}
      >
        Pular abertura
      </button>
    </>
  );
}
