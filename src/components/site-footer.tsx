import { BrandLogo } from "@/components/brand-logo";
import { InstagramIcon, MapPinIcon, PhoneIcon, PickupIcon, WhatsAppIcon } from "@/components/icons";
import { siteConfig } from "@/data/site";

export function SiteFooter() {
  return (
    <footer className="site-footer" data-scroll-reveal="true">
      <div className="site-footer__inner">
        <div className="footer-brand">
          <a href="/#inicio" aria-label="Café Boutique — início"><BrandLogo compact /></a>
          <p>Mais que um bolo,<br />uma memória afetiva.</p>
          <p className="footer-brand__hours">{siteConfig.openingHoursLabel}</p>
        </div>

        <nav className="footer-links" aria-label="Links do site">
          <h2>Explore</h2>
          <a href="/nossa-historia">Nossa história</a>
          <a href="/cardapio">Cardápio completo</a>
          <a href="/#duvidas">Dúvidas frequentes</a>
          <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">Instagram · {siteConfig.instagram}</a>
          <a href={siteConfig.mapsUrl} target="_blank" rel="noreferrer">Como chegar</a>
        </nav>

        <div className="footer-contact">
          <h2>Contato</h2>
          <a className="footer-icon-link" href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer">
            <WhatsAppIcon />
            <span>Chamar no WhatsApp</span>
          </a>
          <a className="footer-icon-link" href={siteConfig.phoneHref}>
            <PhoneIcon />
            <span>{siteConfig.phone}</span>
          </a>
          <a className="footer-icon-link" href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">
            <InstagramIcon />
            <span>{siteConfig.instagram}</span>
          </a>
        </div>

        <div className="footer-pickup">
          <h2>Retirada</h2>
          <p className="footer-icon-copy">
            <PickupIcon />
            <span>{siteConfig.pickupOnly ? "Retirada na loja" : "Consulte a equipe"}</span>
          </p>
          <p className="footer-icon-copy">
            <MapPinIcon />
            <span>{siteConfig.address.lines.map((line) => <span key={line}>{line}</span>)}</span>
          </p>
        </div>
      </div>
      <div className="footer-credit">
        <p>Café Boutique · São Luís, Maranhão</p>
        <p className="footer-signature">Bolos <span>·</span> Cafés <span>·</span> Memórias</p>
      </div>
    </footer>
  );
}
