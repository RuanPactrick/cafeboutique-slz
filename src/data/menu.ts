import source from "./menu.json";
import { menuItemMedia, type CafeBoutiqueMedia } from "./media-assets";

export type MenuItem = {
  id: string;
  category: string;
  subCategory: string | null;
  name: string;
  priceCents: number;
  description: string | null;
  note: string | null;
  availability: "listed-in-source" | "ask-at-store" | "pending-confirmation";
  image: CafeBoutiqueMedia | null;
  tags: string[];
};

export type MenuCategory = {
  id: string;
  label: string;
};

export const menuItems = source.items.map((item) => ({
  ...item,
  image: menuItemMedia[item.id] ?? null,
})) as MenuItem[];
export const menuSectionNotes = source.sectionNotes as Record<string, string>;

// Ordem de cardápio: comidas, depois doces e sobremesas, depois bebidas e, por fim, os adicionais.
export const menuCategories: MenuCategory[] = [
  // Comidas
  { id: "sanduiches", label: "Sanduíches" },
  { id: "croissants", label: "Croissants" },
  { id: "salgados", label: "Salgados" },
  { id: "tapiocas", label: "Tapiocas" },
  { id: "crepiocas", label: "Crepiocas" },
  { id: "omeletes", label: "Omeletes" },
  { id: "cuscuz", label: "Cuscuz" },
  // Doces e sobremesas
  { id: "doces", label: "Doces" },
  { id: "sobremesas-gourmet", label: "Sobremesas gourmet" },
  // Bebidas
  { id: "cafes", label: "Cafés" },
  { id: "espressos", label: "Espressos" },
  { id: "capuccinos", label: "Capuccinos" },
  { id: "latte", label: "Latte" },
  { id: "chas", label: "Chá quente" },
  { id: "gelados", label: "Gelados" },
  { id: "sucos", label: "Sucos" },
  { id: "bebidas", label: "Bebidas" },
  // Adicionais
  { id: "extras", label: "Extras" },
];

// Coberturas citadas no material do cardápio (nota da seção Doces), sujeitas à disponibilidade.
export const cakeCoverings = [
  "Chocolate",
  "Ninho",
  "Doce de leite",
  "Limão",
  "Romeu e Julieta",
  "Castanha",
  "Ameixa",
  "Castanha com ameixa",
  "Castanha do Pará com cupuaçu",
] as const;

export function hasCoveringChoice(item: { id: string }) {
  return item.id.includes("com-cobertura");
}

export function formatPrice(priceCents: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(priceCents / 100);
}

export function getMenuPriceLabel(item: MenuItem) {
  return item.availability === "pending-confirmation" ? "Consultar" : formatPrice(item.priceCents);
}

export const featuredItemIds = [
  "fatia-bolo-amanteigado-com-cobertura",
];
