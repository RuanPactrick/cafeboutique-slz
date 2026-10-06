import type { Metadata } from "next";
import { Antic_Didone, Lustria } from "next/font/google";
import { SectionReveal } from "@/components/section-reveal";
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
    <html lang="pt-BR">
      <body className={`${anticDidone.variable} ${lustria.variable}`}>
        {children}
        <SectionReveal />
      </body>
    </html>
  );
}
