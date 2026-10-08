"use client";

import { useEffect, useState } from "react";

// Indicação de "arraste para o lado" sob uma fileira rolável: um texto curto, uma seta e
// pontos que acompanham o cartão atual. Só aparece quando a fileira realmente transborda
// (no celular); é decorativa para leitores de tela, que já percorrem a lista item a item.
export function SwipeHint({ targetId, className }: { targetId: string; className?: string }) {
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(0);
  const [overflow, setOverflow] = useState(false);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;
    const items = () => Array.from(target.querySelectorAll<HTMLElement>(":scope > li, :scope > ul > li"));

    const measure = () => {
      setOverflow(target.scrollWidth > target.clientWidth + 4);
      setCount(items().length);
    };
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const list = items();
        const start = target.getBoundingClientRect().left + parseFloat(getComputedStyle(target).scrollPaddingLeft || "0");
        let best = 0;
        let bestDistance = Infinity;
        list.forEach((item, index) => {
          const distance = Math.abs(item.getBoundingClientRect().left - start);
          if (distance < bestDistance) { bestDistance = distance; best = index; }
        });
        // No fim da fileira o último cartão pode não alinhar ao início: ele vence.
        if (target.scrollLeft + target.clientWidth >= target.scrollWidth - 4) best = list.length - 1;
        setActive(best);
      });
    };

    measure();
    onScroll();
    const resize = new ResizeObserver(() => { measure(); onScroll(); });
    resize.observe(target);
    target.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      target.removeEventListener("scroll", onScroll);
    };
  }, [targetId]);

  if (!overflow || count < 2) return null;

  return (
    <div className={`swipe-hint${className ? ` ${className}` : ""}`} aria-hidden="true">
      <span className="swipe-hint__label">
        Arraste para o lado
        <svg viewBox="0 0 24 24"><path d="M5 12h13m-5-5 5 5-5 5" /></svg>
      </span>
      <span className="swipe-hint__dots">
        {Array.from({ length: count }, (_, index) => (
          <span key={index} className={index === active ? "is-active" : undefined} />
        ))}
      </span>
    </div>
  );
}
