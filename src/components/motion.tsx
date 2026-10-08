"use client";

import { useEffect, type ReactNode } from "react";

/**
 * Uma linha de título revelada por máscara: o texto sobe por trás de uma janela fixa.
 * Use dentro de um título com data-reveal="lines"; cada <Line> é uma linha do desenho original
 * (onde antes havia <br />). O atraso de cada linha vem da posição dela (--i).
 */
export function Line({ children }: { children: ReactNode }) {
  return (
    <span className="ml">
      <span className="ml__i">{children}</span>
    </span>
  );
}

/**
 * Diretor de movimento: observa os elementos com data-reveal e marca .is-in quando entram na tela.
 * Os estados escondidos só existem com html.motion, que o script do <head> liga antes da primeira
 * pintura (e só para quem não pede menos movimento). Sem JavaScript, ou se este componente não
 * chegar a rodar, a página aparece pronta.
 */
export function MotionDirector() {
  useEffect(() => {
    (window as Window & { __cbMotion?: boolean }).__cbMotion = true;
    const root = document.documentElement;
    if (!root.classList.contains("motion") || !("IntersectionObserver" in window)) {
      root.classList.remove("motion");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -6% 0px" },
    );

    const bound = new WeakSet<Element>();
    const scan = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)").forEach((element) => {
        if (bound.has(element)) return;
        bound.add(element);
        // A ordem dos filhos vira o atraso de cada um (linhas, cartões, blocos).
        Array.from(element.children).forEach((child, index) => (child as HTMLElement).style.setProperty("--i", String(index)));
        observer.observe(element);
      });
    };
    scan();
    // O cardápio troca de categoria sem recarregar: novos blocos também entram.
    const mutations = new MutationObserver(scan);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return null;
}
