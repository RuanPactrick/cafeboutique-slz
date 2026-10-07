"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/brand-logo";
import { CloseIcon, MenuIcon, WhatsAppGlyph } from "@/components/icons";
import { navigationItems, siteConfig } from "@/data/site";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  // No cardápio a tarefa é pedir: o botão do topo diz isso.
  const onMenu = usePathname() === "/cardapio";
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  function closeMenu() {
    setMenuOpen(false);
  }

  // Menu do celular aberto: Esc fecha (e devolve o foco ao botão) e um toque fora dele também.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      toggleRef.current?.focus();
    };
    const onPointer = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [menuOpen]);

  return (
    <header className="site-header" ref={headerRef}>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="site-header__inner">
        <a className="site-header__brand" href="/" aria-label="Café Boutique — início">
          <BrandLogo />
        </a>

        <nav className="site-header__nav" aria-label="Navegação principal">
          {navigationItems.map((item) => (
            <a href={item.href} key={item.href} target={"external" in item ? "_blank" : undefined} rel={"external" in item ? "noreferrer" : undefined}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="site-header__actions">
          <a className="button button--header" href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer">
            <WhatsAppGlyph className="whatsapp-glyph" />
            <span>{onMenu ? "Pedir no WhatsApp" : "Fale conosco"}</span>
          </a>
          <button
            ref={toggleRef}
            className="mobile-menu-toggle"
            type="button"
            aria-label={menuOpen ? "Fechar navegação" : "Abrir navegação"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <nav className="mobile-nav" id="mobile-navigation" aria-label="Navegação principal" hidden={!menuOpen}>
        {navigationItems.map((item) => (
          <a href={item.href} key={item.href} target={"external" in item ? "_blank" : undefined} rel={"external" in item ? "noreferrer" : undefined} onClick={closeMenu}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
