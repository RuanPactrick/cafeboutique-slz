import { BrandLogo } from "@/components/brand-logo";
import { ArrowUpRightIcon, InstagramIcon, MapPinIcon, PhoneIcon, WhatsAppGlyph } from "@/components/icons";
import { siteConfig } from "@/data/site";

const exploreLinks = [
  { label: "Início", href: "/" },
  { label: "Cardápio", href: "/cardapio" },
  { label: "Nossa história", href: "/nossa-historia" },
  { label: "Avaliações", href: "/#avaliacoes" },
  { label: "Dúvidas frequentes", href: "/#duvidas" },
  { label: "Localização", href: "/#localizacao" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer" data-scroll-reveal="true">
      {/* Fecho da página: a frase da marca e as duas ações que importam. */}
      <div className="footer-cta">
        <p className="footer-cta__line">Mais que um café,<br /><em>uma pausa afetiva.</em></p>
        <div className="footer-cta__actions">
          <a className="footer-button footer-button--solid" href="/cardapio">Ver cardápio e pedir</a>
          <a className="footer-button" href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer">
            <WhatsAppGlyph className="footer-button__glyph" />
            Chamar no WhatsApp
          </a>
        </div>
      </div>

      <div className="site-footer__inner">
        <div className="footer-brand">
          <a href="/" aria-label="Café Boutique — início"><BrandLogo compact /></a>
          <p>Bolos, cafés e encontros no Calhau, em São Luís. Pedidos e encomendas para retirada na loja.</p>
          <div className="footer-social">
            <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" aria-label={`Instagram ${siteConfig.instagram}`}><InstagramIcon /></a>
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp da Café Boutique"><WhatsAppGlyph className="footer-social__glyph" /></a>
          </div>
        </div>

        <nav className="footer-col" aria-label="Links do site">
          <h2>Navegue</h2>
          <ul>
            {exploreLinks.map((link) => <li key={link.href}><a href={link.href}>{link.label}</a></li>)}
          </ul>
        </nav>

        <div className="footer-col">
          <h2>Visite</h2>
          <address className="footer-address">
            {siteConfig.address.lines.map((line) => <span key={line}>{line}</span>)}
          </address>
          <a className="footer-inline-link" href={siteConfig.directionsUrl} target="_blank" rel="noreferrer">
            <MapPinIcon />
            Como chegar
          </a>
        </div>

        <div className="footer-col">
          <h2>Horário</h2>
          <p className="footer-hours">{siteConfig.openingHoursLabel}</p>
          <h2 className="footer-col__sub">Contato</h2>
          <a className="footer-inline-link" href={siteConfig.phoneHref}>
            <PhoneIcon />
            {siteConfig.phone}
          </a>
          <a className="footer-inline-link" href={siteConfig.instagramUrl} target="_blank" rel="noreferrer">
            <InstagramIcon />
            {siteConfig.instagram}
          </a>
        </div>
      </div>

      <div className="footer-credit">
        <p>© 2026 Café Boutique · São Luís, Maranhão. Todos os direitos reservados.</p>
        <p className="footer-credit__dev">
          Design e desenvolvimento por <strong>Ruan Pactrick</strong>
        </p>
        <a className="footer-top" href="#">
          Voltar ao topo
          <ArrowUpRightIcon />
        </a>
      </div>
    </footer>
  );
}
