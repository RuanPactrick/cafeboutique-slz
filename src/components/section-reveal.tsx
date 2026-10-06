"use client";

import { useEffect } from "react";

const selector = "[data-scroll-reveal='true']";

export function SectionReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-scroll-revealed");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -8% 0px" },
    );

    document.querySelectorAll<HTMLElement>(selector).forEach((section) => {
      const bounds = section.getBoundingClientRect();
      if (bounds.top < window.innerHeight * 0.82 && bounds.bottom > 0) {
        section.classList.add("is-scroll-revealed");
      } else {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
