export type CafeBoutiqueMedia = {
  src: string;
  alt: string;
  width: number;
  height: number;
  source: "instagram" | "marca fornecida" | "arquivo fornecido";
  sourceUrl: string | null;
  objectPositionDesktop: string;
  objectPositionMobile: string;
  menuItemId?: string;
};

export type CafeBoutiqueVideo = Omit<CafeBoutiqueMedia, "width" | "height"> & {
  width: null;
  height: null;
  mediaType: "video";
};

const instagramPost = (shortcode: string, type: "p" | "reel" = "p") =>
  `https://www.instagram.com/cafeboutique.slz/${type}/${shortcode}/`;

export const cafeBoutiqueMedia = {
  logo: {
    src: "/cafe-boutique/marca/logo-cafe-boutique.webp",
    alt: "Logotipo Café Boutique",
    width: 1522,
    height: 1033,
    source: "marca fornecida",
    sourceUrl: null,
    objectPositionDesktop: "50% 50%",
    objectPositionMobile: "50% 50%",
  },
  hero: {
    src: "/cafe-boutique/equipe/hero-equipe-vitrine.jpg",
    alt: "Integrante da equipe apresenta um bolo diante da vitrine da Café Boutique.",
    width: 361,
    height: 640,
    source: "instagram",
    sourceUrl: instagramPost("Ddjx_9ntNAl", "reel"),
    objectPositionDesktop: "50% 50%",
    objectPositionMobile: "50% 43%",
  },
  heroPanoramic: {
    src: "/cafe-boutique/hero/hero-cafe-boutique-limpo.png",
    alt: "Xícara de café da Café Boutique sobre uma mesa de madeira no interior da cafeteria.",
    width: 1672,
    height: 941,
    source: "arquivo fornecido",
    sourceUrl: null,
    objectPositionDesktop: "50% 72%",
    objectPositionMobile: "62% 50%",
  },
  boloAmanteigadoProducao: {
    src: "/cafe-boutique/products/bolo-amanteigado-producao.jpg",
    alt: "Bolos em formas durante a produção na Café Boutique.",
    width: 499,
    height: 640,
    source: "instagram",
    sourceUrl: instagramPost("Dd19iFsmyyC"),
    objectPositionDesktop: "50% 48%",
    objectPositionMobile: "50% 52%",
  },
  fatiaBoloAmanteigadoComCobertura: {
    src: "/cafe-boutique/products/cafe-e-bolo-amanteigado.jpg",
    alt: "Fatia de bolo amanteigado com cobertura servida ao lado de café.",
    width: 360,
    height: 640,
    source: "instagram",
    sourceUrl: instagramPost("DduQNtpNCyk", "reel"),
    objectPositionDesktop: "50% 51%",
    objectPositionMobile: "50% 52%",
    menuItemId: "fatia-bolo-amanteigado-com-cobertura",
  },
  tortaCaramelito: {
    src: "/cafe-boutique/products/torta-caramelito.jpg",
    alt: "Torta Caramelito da Café Boutique, em registro publicado no Instagram.",
    width: 480,
    height: 640,
    source: "instagram",
    sourceUrl: instagramPost("DdR7UltNPs9"),
    objectPositionDesktop: "50% 50%",
    objectPositionMobile: "50% 50%",
  },
  panelinhaMorango: {
    src: "/cafe-boutique/products/panelinha-morango.jpg",
    alt: "Panelinha com morango, creme e chocolate em uma publicação da Café Boutique.",
    width: 480,
    height: 640,
    source: "instagram",
    sourceUrl: instagramPost("Dc4NlJ4N4p1"),
    objectPositionDesktop: "50% 52%",
    objectPositionMobile: "50% 52%",
  },
  panelinhaCaramelo: {
    src: "/cafe-boutique/products/panelinha-caramelo.jpg",
    alt: "Panelinha servida em uma panela pequena, em publicação da Café Boutique.",
    width: 507,
    height: 640,
    source: "instagram",
    sourceUrl: instagramPost("DdbxHpzNQsn"),
    objectPositionDesktop: "50% 52%",
    objectPositionMobile: "50% 52%",
  },
  quicheEmpadas: {
    src: "/cafe-boutique/cozinha/quiche-e-empadas.jpg",
    alt: "Quiches e empadas durante o preparo na Café Boutique.",
    width: 361,
    height: 640,
    source: "instagram",
    sourceUrl: instagramPost("DdW4qYptxL5", "reel"),
    objectPositionDesktop: "50% 57%",
    objectPositionMobile: "50% 57%",
  },
  videoCozinha: {
    src: "/cafe-boutique/cozinha/preparo-cozinha.mp4",
    alt: "Vídeo de preparo na cozinha da Café Boutique.",
    width: null,
    height: null,
    mediaType: "video",
    source: "arquivo fornecido",
    sourceUrl: null,
    objectPositionDesktop: "50% 50%",
    objectPositionMobile: "50% 50%",
  },
} as const satisfies Record<string, CafeBoutiqueMedia | CafeBoutiqueVideo>;

export const menuItemMedia: Record<string, CafeBoutiqueMedia> = {
  [cafeBoutiqueMedia.fatiaBoloAmanteigadoComCobertura.menuItemId!]:
    cafeBoutiqueMedia.fatiaBoloAmanteigadoComCobertura,
};

export const instagramSelections = [
  { media: cafeBoutiqueMedia.boloAmanteigadoProducao, title: "Bolos em produção", date: "28 set. 2026", dateTime: "2026-09-28" },
  { media: cafeBoutiqueMedia.panelinhaCaramelo, title: "Panelinhas", date: "18 set. 2026", dateTime: "2026-09-18" },
  { media: cafeBoutiqueMedia.quicheEmpadas, title: "Quiches e empadas", date: "16 set. 2026", dateTime: "2026-09-16" },
  { media: cafeBoutiqueMedia.tortaCaramelito, title: "Torta Caramelito", date: "14 set. 2026", dateTime: "2026-09-14" },
  { media: cafeBoutiqueMedia.panelinhaMorango, title: "Panelinha", date: "4 set. 2026", dateTime: "2026-09-04" },
] as const;
