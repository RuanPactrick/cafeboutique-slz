"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import styles from "./cafe-experience.module.css";

const photos = [
  {
    src: "/cafe-boutique/espaco/espaco-salao.webp",
    alt: "Balcão de cafeteria com bolos, plantas e iluminação aconchegante.",
    caption: "Interior",
  },
  {
    src: "/cafe-boutique/espaco/espaco-varanda.webp",
    alt: "Mesas e cadeiras em uma área externa rodeada por plantas.",
    caption: "Área externa",
  },
  {
    src: "/cafe-boutique/espaco/espaco-infantil.webp",
    alt: "Mesinhas, cadeiras coloridas e brinquedos em um espaço infantil.",
    caption: "Cantinho infantil",
  },
];

export function CafeExperienceCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const updateActiveSlide = () => {
    const track = trackRef.current;
    if (!track) return;

    const center = track.getBoundingClientRect().left + track.clientWidth / 2;
    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;

    Array.from(track.children).forEach((slide, index) => {
      const bounds = slide.getBoundingClientRect();
      const distance = Math.abs(bounds.left + bounds.width / 2 - center);

      if (distance < nearestDistance) {
        nearestIndex = index;
        nearestDistance = distance;
      }
    });

    setActiveSlide(nearestIndex);
  };

  const goToSlide = (index: number) => {
    const track = trackRef.current;
    const slide = track?.children.item(index) as HTMLElement | null;
    if (!track || !slide) return;

    const left =
      slide.offsetLeft -
      track.offsetLeft -
      (track.clientWidth - slide.clientWidth) / 2;
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth";

    track.scrollTo({ left, behavior });
  };

  return (
    <div className={styles.mobileGallery}>
      <div
        ref={trackRef}
        className={styles.galleryTrack}
        role="group"
        aria-label="Fotos dos espaços da cafeteria"
        onScroll={updateActiveSlide}
      >
        {photos.map((photo, index) => (
          <figure
            className={styles.gallerySlide}
            key={photo.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} de ${photos.length}`}
          >
            <div className={styles.galleryPhoto}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 480px) 82vw, (max-width: 980px) 62vw, 1px"
                quality={90}
              />
            </div>
            <figcaption className={styles.galleryCaption}>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>

      <div className={styles.galleryControls}>
        <button
          className={styles.galleryButton}
          type="button"
          onClick={() => goToSlide(activeSlide - 1)}
          disabled={activeSlide === 0}
          aria-label="Foto anterior"
        >
          Anterior
        </button>
        <div className={styles.galleryStatus}>
          <div className={styles.galleryPagination} role="group" aria-label="Escolher foto">
            {photos.map((photo, index) => (
              <button
                className={styles.galleryDot}
                key={photo.src}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Ver foto: ${photo.caption}`}
                aria-current={activeSlide === index ? "true" : undefined}
              />
            ))}
          </div>
          <span className={styles.galleryCount} aria-live="polite">
            {activeSlide + 1} / {photos.length}
          </span>
        </div>
        <button
          className={styles.galleryButton}
          type="button"
          onClick={() => goToSlide(activeSlide + 1)}
          disabled={activeSlide === photos.length - 1}
          aria-label="Próxima foto"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
