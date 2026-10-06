"use client";

import { useState } from "react";
import { BrandLogo } from "@/components/brand-logo";
import { MenuIcon, WhatsAppGlyph } from "@/components/icons";
import { navigationItems, siteConfig } from "@/data/site";

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="site-header">
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
            <span>Fale conosco</span>
          </a>
          <button
            className="mobile-menu-toggle"
            type="button"
            aria-label={menuOpen ? "Fechar navegação" : "Abrir navegação"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuIcon />
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
