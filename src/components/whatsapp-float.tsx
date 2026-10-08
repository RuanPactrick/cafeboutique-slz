import { WhatsAppGlyph } from "@/components/icons";
import { siteConfig } from "@/data/site";

// Atalho fixo para o único canal de pedidos da loja. Fica abaixo do diálogo de pedido e,
// no cardápio, sobe para não cobrir a barra do carrinho (regras em globals.css).
export function WhatsAppFloat() {
  return (
    <a className="wa-float" href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer" aria-label="Conversar com a Café Boutique no WhatsApp">
      <WhatsAppGlyph className="wa-float__glyph" />
      <span className="wa-float__label" aria-hidden="true">Fale conosco</span>
    </a>
  );
}
