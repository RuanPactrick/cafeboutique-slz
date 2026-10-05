"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./boutique-highlights.module.css";

export function ProductRail({ children }: { children: ReactNode }) {
  const railRef = useRef<HTMLUListElement>(null);
  const [position, setPosition] = useState({ atStart: true, atEnd: false });

  useEffect(() => {
    const rail = railRef.current;
    if (!rail) return;

    const updatePosition = () => setPosition({
      atStart: rail.scrollLeft <= 2,
      atEnd: rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2,
    });
    updatePosition();
    rail.addEventListener("scroll", updatePosition, { passive: true });
    const observer = new ResizeObserver(updatePosition);
    observer.observe(rail);
    return () => {
      rail.removeEventListener("scroll", updatePosition);
      observer.disconnect();
    };
  }, []);

  function move(direction: number) {
    const rail = railRef.current;
    if (!rail) return;
    const cardWidth = rail.firstElementChild?.getBoundingClientRect().width ?? rail.clientWidth;
    const gap = Number.parseFloat(getComputedStyle(rail).columnGap) || 0;
    rail.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  return (
    <>
      <ul ref={railRef} id="boutique-products" className={styles.rail} aria-label="Destaques do cardápio" tabIndex={0}>
        {children}
      </ul>
      <div className={styles.railFooter}>
        <div className={styles.controls} aria-label="Navegar pelos destaques">
          <button type="button" aria-label="Ver produtos anteriores" aria-controls="boutique-products" disabled={position.atStart} onClick={() => move(-1)}>
            Anterior
          </button>
          <button type="button" aria-label="Ver próximos produtos" aria-controls="boutique-products" disabled={position.atEnd} onClick={() => move(1)}>
            Próximo
          </button>
        </div>
      </div>
    </>
  );
}
