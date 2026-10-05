import type { Metadata } from "next";
import { MenuBrowser } from "@/components/menu-browser";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Cardápio | Café Boutique",
  description: "Consulte as categorias e os itens do cardápio da Café Boutique. Pedidos pelo WhatsApp, com retirada na loja.",
};

export default function MenuPage() {
  return (
    <div className="site-shell">
      <div className="site-page-frame">
        <SiteHeader />
        <main id="conteudo" className="menu-page">
          <MenuBrowser />
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
