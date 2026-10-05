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

export const menuCategories: MenuCategory[] = [
  { id: "doces", label: "Doces" },
  { id: "sobremesas-gourmet", label: "Sobremesas gourmet" },
  { id: "cafes", label: "Cafés" },
  { id: "espressos", label: "Espressos" },
  { id: "latte", label: "Latte" },
  { id: "capuccinos", label: "Capuccinos" },
  { id: "chas", label: "Chá quente" },
  { id: "gelados", label: "Gelados" },
  { id: "bebidas", label: "Bebidas" },
  { id: "sucos", label: "Sucos" },
  { id: "sanduiches", label: "Sanduíches" },
  { id: "croissants", label: "Croissants" },
  { id: "salgados", label: "Salgados" },
  { id: "tapiocas", label: "Tapiocas" },
  { id: "omeletes", label: "Omeletes" },
  { id: "crepiocas", label: "Crepiocas" },
  { id: "cuscuz", label: "Cuscuz" },
  { id: "extras", label: "Extras" },
];

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
