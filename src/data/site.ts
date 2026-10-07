const whatsappPhone = "5598988612563";
const whatsappMessage =
  "Olá! Vim pelo site da Café Boutique e gostaria de fazer uma encomenda.";

export function createWhatsAppUrl(message: string) {
  return "https://wa.me/" + whatsappPhone + "?text=" + encodeURIComponent(message);
}

export const siteConfig = {
  brand: "Café Boutique",
  city: "São Luís — Maranhão",
  phone: "+55 98 98861-2563",
  phoneHref: "tel:+5598988612563",
  whatsappMessage,
  whatsappUrl: `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(whatsappMessage)}`,
  instagram: "@cafeboutique.slz",
  instagramUrl: "https://www.instagram.com/cafeboutique.slz/",
  linktreeUrl: "https://linktr.ee/cafeboutiquesaoluiss",
  officialMenuUrl:
    "https://drive.google.com/file/d/1pdIE0CuN9dG4KNuPteYtuC2lqNjOKJit/view?usp=sharing",
  mapsUrl: "https://www.google.com/maps?cid=16815063733178608891",
  // Coordenadas da ficha da Café Boutique no Google Maps (mesmo cid acima).
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=-2.4935545%2C-44.2712488",
  address: {
    lines: [
      "Av. dos Holandeses, Loja 8",
      "Holandeses Center · Calhau",
      "São Luís — MA",
    ],
    status: "pending-confirmation",
    source: "Endereço inicial informado no material da marca; editável neste arquivo por haver divergência em listagens públicas.",
  },
  openingHoursLabel: "Segunda a sábado · 15h–20h",
  openingHoursSource: "Biografia do Instagram oficial, consultada em 3 out. 2026.",
  pickupOnly: true,
  canonicalUrl: null,
} as const;

// Bolo inteiro é sob consulta: a mensagem já pergunta o que a equipe precisa saber.
// Fora do site por enquanto (decisão de 7 out. 2026); fica pronto para voltar.
export const cakeOrderUrl = createWhatsAppUrl([
  "Olá! Vim pelo site da Café Boutique e gostaria de encomendar um bolo inteiro.",
  "Sabor:",
  "Cobertura:",
  "Para quantas pessoas:",
  "Dia da retirada:",
].join("\n"));

export const navigationItems = [
  { label: "A cafeteria", href: "/#a-casa" },
  { label: "Nossa história", href: "/nossa-historia" },
  { label: "Cardápio", href: "/cardapio" },
  { label: "Instagram", href: siteConfig.instagramUrl, external: true },
  { label: "Como chegar", href: "/#localizacao" },
] as const;

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "CafeOrCoffeeShop",
  name: siteConfig.brand,
  telephone: siteConfig.phone,
  sameAs: [siteConfig.instagramUrl],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "15:00",
      closes: "20:00",
    },
  ],
} as const;
