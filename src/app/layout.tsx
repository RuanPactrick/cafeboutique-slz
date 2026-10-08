import type { Metadata } from "next";
import { Antic_Didone, Lustria } from "next/font/google";
import { MotionDirector } from "@/components/motion";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import "./globals.css";

const anticDidone = Antic_Didone({
  variable: "--font-antic-didone",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const lustria = Lustria({
  variable: "--font-lustria",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  icons: {
    icon: "/cafe-boutique/marca/logo-cafe-boutique.webp",
  },
  title: "Café Boutique | Cardápio e encomendas em São Luís",
  description:
    "Conheça o cardápio da Café Boutique. Bolos, cafés, salgados e tortas em São Luís; encomendas para retirada.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Café Boutique",
    title: "Café Boutique | Cardápio e encomendas em São Luís",
    description:
      "Bolos, cafés, salgados e tortas em São Luís; encomendas para retirada.",
  },
  twitter: {
    card: "summary",
    title: "Café Boutique | Cardápio e encomendas em São Luís",
    description:
      "Bolos, cafés, salgados e tortas em São Luís; encomendas para retirada.",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${anticDidone.variable} ${lustria.variable}`} suppressHydrationWarning>
      <head>
        {/* Liga os estados de entrada antes da primeira pintura; se o diretor não rodar em 3 s, tudo aparece. */}
        <script dangerouslySetInnerHTML={{ __html: "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){var r=document.documentElement;r.classList.add('motion');setTimeout(function(){if(!window.__cbMotion)r.classList.remove('motion')},3000)}}catch(e){}" }} />
      </head>
      <body>
        {children}
        <WhatsAppFloat />
        <MotionDirector />
      </body>
    </html>
  );
}
