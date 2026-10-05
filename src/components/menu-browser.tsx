"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { formatPrice, getMenuPriceLabel, menuCategories, menuItems, menuSectionNotes, type MenuItem } from "@/data/menu";
import { createWhatsAppUrl } from "@/data/site";

type MenuGroup = {
  key: string;
  title: string;
  items: MenuItem[];
  variants?: boolean;
};

type CategorySection = (typeof menuCategories)[number] & {
  groups: MenuGroup[];
  count: number;
};

type Cart = Record<string, number>;

const featuredProducts = [
  { id: "croissant-americano", category: "Croissants", src: "/cafe-boutique/destaques/croissant-americano.webp", alt: "Croissant Americano servido em um prato." },
  { id: "capuccino-tradicional-150ml", category: "Capuccinos", src: "/cafe-boutique/destaques/cappuccino-tradicional.webp", alt: "Capuccino tradicional da Café Boutique." },
  { id: "sanduiche-americano-pao-frances", category: "Sanduíches", src: "/cafe-boutique/destaques/sanduiche-americano.webp", alt: "Sanduíche Americano servido em um prato." },
  { id: "fatia-bolo-amanteigado-com-cobertura", category: "Doces", src: "/cafe-boutique/products/cafe-e-bolo-amanteigado.jpg", alt: "Fatia de bolo amanteigado com cobertura acompanhada de café." },
] as const;

const categoryArt: Record<string, { src: string; alt: string }> = {
  doces: { src: "/cafe-boutique/products/cafe-e-bolo-amanteigado.jpg", alt: "Fatia de bolo amanteigado com cobertura, item do cardápio de doces." },
  "sobremesas-gourmet": { src: "/cafe-boutique/destaques/sobremesa-chocolate.webp", alt: "Sobremesa de chocolate apresentada em uma composição da Café Boutique." },
  capuccinos: { src: "/cafe-boutique/destaques/cappuccino-tradicional.webp", alt: "Capuccino tradicional preparado em uma xícara da Café Boutique." },
  sanduiches: { src: "/cafe-boutique/destaques/sanduiche-americano.webp", alt: "Sanduíche Americano servido em um prato." },
  croissants: { src: "/cafe-boutique/destaques/croissant-americano.webp", alt: "Croissant Americano servido em um prato." },
  salgados: { src: "/cafe-boutique/cozinha/quiche-e-empadas.jpg", alt: "Quiches e empadas durante o preparo na cozinha." },
};

const categoryDescriptions: Record<string, string> = {
  doces: "Bolos, tortas e fatias para acompanhar sua pausa.",
  "sobremesas-gourmet": "Sobremesas em porções individuais, conforme o cardápio.",
  cafes: "Cafés clássicos preparados na hora.",
  espressos: "Opções de espresso em diferentes medidas.",
  latte: "Cafés com leite e outras combinações da casa.",
  capuccinos: "Capuccinos e bebidas quentes em diferentes versões.",
  chas: "Blends quentes e opções para levar.",
  gelados: "Bebidas geladas para acompanhar sua pausa.",
  bebidas: "Bebidas para completar o seu pedido.",
  sucos: "Sucos de fruta e de polpa, conforme o cardápio.",
  sanduiches: "Pães e combinações para uma pausa mais completa.",
  croissants: "Versões doces e salgadas do clássico folhado.",
  salgados: "Salgados, empadas e quiches do cardápio.",
  tapiocas: "Tapiocas preparadas com os recheios listados.",
  omeletes: "Omeletes com as combinações disponíveis no cardápio.",
  crepiocas: "Crepiocas com opções de recheio para escolher.",
  cuscuz: "Combinações de cuscuz para diferentes momentos.",
  extras: "Adicionais e complementos para montar o seu pedido.",
};

const categoryTitles: Record<string, string> = {
  doces: "Um carinho em forma de doce.",
  "sobremesas-gourmet": "Momentos mais doces.",
  cafes: "Cafés que fazem sentido.",
  espressos: "O espresso no seu ritmo.",
  latte: "Cafés com outras camadas.",
  capuccinos: "Uma xícara mais cremosa.",
  chas: "Uma pausa quentinha.",
  gelados: "Frescor em cada gole.",
  bebidas: "Bebidas para acompanhar.",
  sucos: "Frutas em forma de pausa.",
  sanduiches: "Uma pausa mais completa.",
  croissants: "Croissants que conquistam.",
  salgados: "Salgados para qualquer hora.",
  tapiocas: "Leveza com muito sabor.",
  omeletes: "Combinações em cada omelete.",
  crepiocas: "Crepiocas para variar o cardápio.",
  cuscuz: "Sabor regional à mesa.",
  extras: "Complete sua experiência.",
};

function searchKey(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function makeGroups(categoryId: string, items: MenuItem[]): MenuGroup[] {
  if (categoryId === "sanduiches") {
    const sandwichGroups = new Map<string, MenuItem[]>();
    const individualItems: MenuItem[] = [];

    for (const item of items) {
      const match = item.name.match(/^(.*?) Pão (Francês|Semi Italiano|Ciabatta|Folha Libanês)$/i);
      if (!match) {
        individualItems.push(item);
        continue;
      }
      const title = match[1];
      sandwichGroups.set(title, [...(sandwichGroups.get(title) ?? []), item]);
    }

    const grouped = [...sandwichGroups.entries()].map(([title, variants]) => ({
      key: title,
      title,
      items: variants,
      variants: variants.length > 1,
    }));
    return [...individualItems.map((item) => ({ key: item.id, title: "", items: [item] })), ...grouped];
  }

  const groups = new Map<string, MenuItem[]>();
  for (const item of items) {
    const key = item.subCategory ?? "";
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }
  return [...groups.entries()].map(([title, entries]) => ({
    key: title || categoryId,
    title,
    items: entries,
  }));
}

function variantLabel(group: MenuGroup, item: MenuItem) {
  if (group.key.startsWith("Sanduíche")) return item.name.slice(group.title.length).trim();
  return item.name.replace(/^(Tapioca|Omelete|Crepioca)\s+/i, "");
}

function PlusIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>;
}

function SearchIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 4.5 4.5" /></svg>;
}

function BagIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></svg>;
}

function MenuProduct({ item, group, onAdd }: { item: MenuItem; group: MenuGroup; onAdd: (item: MenuItem) => void }) {
  const [selectedId, setSelectedId] = useState(item.id);
  const selected = group.items.find((entry) => entry.id === selectedId) ?? group.items[0];

  if (group.variants) {
    return (
      <li className="menu-item menu-item--variant">
        <div className="menu-item__copy">
          <h4>{group.title}</h4>
          {selected.description ? <p>{selected.description}</p> : null}
          {selected.note ? <p className="menu-item__pending">{selected.note}</p> : null}
        </div>
        <label className="menu-variant-select">
          <span>Escolha uma opção</span>
          <select value={selected.id} onChange={(event) => setSelectedId(event.currentTarget.value)}>
            {group.items.map((variant) => (
              <option key={variant.id} value={variant.id}>{variantLabel(group, variant)} — {getMenuPriceLabel(variant)}</option>
            ))}
          </select>
        </label>
        <span className="menu-item__price">{getMenuPriceLabel(selected)}</span>
        <button className="menu-item__add" type="button" onClick={() => onAdd(selected)} aria-label={`Adicionar ${selected.name} ao pedido`}><PlusIcon /></button>
      </li>
    );
  }

  return (
    <li className={`menu-item${item.category === "extras" ? " menu-item--extra" : ""}`}>
      <div className="menu-item__copy">
        <h4>{item.name}</h4>
        {item.description ? <p>{item.description}</p> : null}
        {item.note ? <p className="menu-item__pending">{item.note}</p> : null}
      </div>
      <span className="menu-item__price">{getMenuPriceLabel(item)}</span>
      <button className="menu-item__add" type="button" onClick={() => onAdd(item)} aria-label={`Adicionar ${item.name} ao pedido`}><PlusIcon /></button>
    </li>
  );
}

export function MenuBrowser() {
  const [activeCategory, setActiveCategory] = useState("todos");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<Cart>({});
  const [orderOpen, setOrderOpen] = useState(false);
  const normalizedQuery = searchKey(query.trim());

  useEffect(() => {
    const categoryId = window.location.hash.replace("#categoria-", "");
    if (menuCategories.some((category) => category.id === categoryId)) setActiveCategory(categoryId);
  }, []);

  useEffect(() => {
    if (!orderOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOrderOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [orderOpen]);

  const sections = useMemo<CategorySection[]>(() => {
    return menuCategories
      .filter((category) => activeCategory === "todos" || category.id === activeCategory)
      .map((category) => {
        const matches = menuItems.filter((item) => {
          if (item.category !== category.id) return false;
          if (!normalizedQuery) return true;
          const searchable = searchKey([item.name, item.description, item.subCategory, item.note, category.label].filter(Boolean).join(" "));
          return searchable.includes(normalizedQuery);
        });
        return { ...category, groups: makeGroups(category.id, matches), count: matches.length };
      })
      .filter((category) => category.count > 0);
  }, [activeCategory, normalizedQuery]);

  const resultCount = sections.reduce((total, section) => total + section.count, 0);
  const cartEntries = Object.entries(cart).flatMap(([id, quantity]) => {
    const item = menuItems.find((entry) => entry.id === id);
    return item && quantity > 0 ? [{ item, quantity }] : [];
  });
  const cartCount = cartEntries.reduce((total, entry) => total + entry.quantity, 0);
  const cartTotal = cartEntries.reduce((total, entry) => total + (entry.item.availability === "pending-confirmation" ? 0 : entry.item.priceCents * entry.quantity), 0);
  const pendingCartCount = cartEntries.filter((entry) => entry.item.availability === "pending-confirmation").reduce((total, entry) => total + entry.quantity, 0);

  const addToCart = (item: MenuItem) => setCart((current) => ({ ...current, [item.id]: (current[item.id] ?? 0) + 1 }));
  const changeQuantity = (item: MenuItem, amount: number) => setCart((current) => {
    const next = { ...current };
    const quantity = (next[item.id] ?? 0) + amount;
    if (quantity <= 0) delete next[item.id];
    else next[item.id] = quantity;
    return next;
  });

  const orderMessage = [
    "Olá! Vim pelo site da Café Boutique e gostaria de pedir:",
    ...cartEntries.map(({ item, quantity }) => `• ${item.name} x${quantity} — ${getMenuPriceLabel(item)}`),
    pendingCartCount ? "Alguns itens estão sujeitos à confirmação de disponibilidade e valor." : "",
    "Pedido para retirada na loja.",
  ].filter(Boolean).join("\n");

  return (
    <div className="menu-browser">
      <section className="menu-hero" aria-labelledby="menu-page-title">
        <Image className="menu-hero__photo" src="/cafe-boutique/hero/hero-cafe-boutique-limpo.png" alt="Xícara de café sobre a mesa de madeira da Café Boutique." fill priority sizes="100vw" />
        <div className="menu-hero__copy">
          <p className="menu-eyebrow">Nosso cardápio</p>
          <h1 id="menu-page-title">Sabores para<br />cada momento.</h1>
          <p className="menu-hero__description">Bolos, cafés, salgados e sabores regionais reunidos para acompanhar a sua pausa.</p>
          <label className="menu-search menu-search--hero">
            <SearchIcon />
            <span className="visually-hidden">Buscar no cardápio</span>
            <input id="busca" type="search" value={query} onChange={(event) => setQuery(event.currentTarget.value)} placeholder="Buscar bolo, café, tapioca..." autoComplete="off" />
            <span className="menu-search__count" aria-live="polite">{resultCount} {resultCount === 1 ? "item" : "itens"}</span>
          </label>
        </div>
      </section>

      <nav className="category-scroller" aria-label="Categorias do cardápio">
        <div className="category-list">
          <button type="button" className="category-chip" aria-pressed={activeCategory === "todos"} onClick={() => setActiveCategory("todos")}>Todos</button>
          {menuCategories.map((category) => (
            <button key={category.id} type="button" className="category-chip" aria-pressed={activeCategory === category.id} onClick={() => setActiveCategory(category.id)}>{category.label}</button>
          ))}
        </div>
      </nav>

      <section className="menu-featured section-wrap" id="cardapio-do-site" aria-labelledby="featured-menu-title">
        {activeCategory === "todos" && !normalizedQuery ? (
          <>
            <header className="menu-section-heading menu-featured__heading">
              <div><p className="menu-eyebrow">Queridinhos da Boutique</p><h2 id="featured-menu-title">Nossos clássicos, sempre uma boa ideia.</h2></div>
              <span className="menu-section-heading__aside">{menuCategories.length} categorias</span>
            </header>
            <ul className="featured-menu-grid">
              {featuredProducts.map((featured) => {
                const item = menuItems.find((entry) => entry.id === featured.id);
                if (!item) return null;
                return (
                  <li className="featured-menu-card" key={featured.id}>
                    <div className="featured-menu-card__photo"><Image src={featured.src} alt={featured.alt} fill sizes="(max-width: 600px) 76vw, (max-width: 900px) 42vw, 23vw" /></div>
                    <div className="featured-menu-card__copy">
                      <span className="featured-menu-card__category">{featured.category}</span>
                      <h3>{item.name}</h3>
                      {item.description ? <p>{item.description}</p> : null}
                      <span className="featured-menu-card__price">{getMenuPriceLabel(item)}</span>
                      <button type="button" className="featured-menu-card__add" onClick={() => addToCart(item)} aria-label={`Adicionar ${item.name} ao pedido`}><PlusIcon /></button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        ) : null}

        {(query || activeCategory !== "todos") ? (
          <div className="menu-controls">
            <p className="menu-results" aria-live="polite">{resultCount === 1 ? "1 item encontrado" : `${resultCount} itens encontrados`}</p>
            <button className="menu-reset" type="button" onClick={() => { setQuery(""); setActiveCategory("todos"); }}>Limpar filtros</button>
          </div>
        ) : null}

        {sections.length === 0 ? (
          <div className="menu-empty" role="status"><h3>Nenhum item encontrado</h3><p>Confira a escrita ou escolha outra categoria.</p><button className="menu-reset" type="button" onClick={() => { setQuery(""); setActiveCategory("todos"); }}>Limpar busca e filtros</button></div>
        ) : (
          <div className="menu-sections">
            {sections.map((section) => {
              const art = categoryArt[section.id];
              return (
                <section className={`menu-category${section.id === "extras" ? " menu-category--extras" : ""}${art ? " menu-category--illustrated" : ""}`} key={section.id} id={`categoria-${section.id}`} aria-labelledby={`heading-${section.id}`}>
                  <header className="menu-section-heading menu-category__heading">
                    <div><p className="menu-eyebrow">{section.label}</p><h2 id={`heading-${section.id}`}>{categoryTitles[section.id]}</h2></div>
                    <p className="menu-category__description">{categoryDescriptions[section.id]}</p>
                    <span className="menu-section-heading__aside">{section.count} {section.count === 1 ? "item" : "itens"}</span>
                  </header>
                  <div className="menu-category__body">
                    {art ? <figure className="menu-category__photo"><Image src={art.src} alt={art.alt} fill sizes="(max-width: 760px) 92vw, (max-width: 1050px) 40vw, 32vw" /></figure> : null}
                    <div className="menu-category__products">
                      {section.id === "extras" ? <p className="menu-extras-intro">Adicione complementos ao seu pedido.</p> : null}
                      {section.groups.map((group) => (
                        <div className="menu-group" key={section.id + "-" + (group.key || "geral")}>
                          {group.title && section.id !== "extras" && !group.variants ? <h3 className="menu-group__title">{group.title}</h3> : null}
                          <ul className={section.id === "extras" ? "menu-list menu-list--extras" : "menu-list"}>
                            {(group.variants ? group.items.slice(0, 1) : group.items).map((item) => <MenuProduct key={group.key + item.id} item={item} group={group} onAdd={addToCart} />)}
                          </ul>
                        </div>
                      ))}
                      {menuSectionNotes[section.id] ? <p className="menu-section-note">{menuSectionNotes[section.id]}</p> : null}
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </section>

      <section className="menu-closing" aria-labelledby="menu-closing-title">
        <div className="menu-closing__copy"><p className="menu-eyebrow">Café Boutique</p><h2 id="menu-closing-title">Tudo fica melhor com um bom café.</h2><p>Escolha seus favoritos e monte seu pedido para retirada.</p><a className="button button--light" href="#inicio-cardapio">Voltar ao cardápio</a></div>
        <div className="menu-closing__photo"><Image src="/cafe-boutique/destaques/cappuccino-tradicional.webp" alt="Capuccino tradicional servido em uma xícara da Café Boutique." fill sizes="(max-width: 760px) 100vw, 48vw" /></div>
      </section>

      {cartCount > 0 ? (
        <div className="menu-cart-bar">
          <div className="menu-cart-bar__summary"><span className="menu-cart-bar__icon"><BagIcon /><span>{cartCount}</span></span><span>{cartCount} {cartCount === 1 ? "item" : "itens"} · {cartTotal > 0 ? formatPrice(cartTotal) : "valor a confirmar"}</span></div>
          <button className="button button--light" type="button" onClick={() => setOrderOpen(true)}>Ver pedido</button>
        </div>
      ) : null}

      {orderOpen ? (
        <div className="menu-order-overlay">
          <button className="menu-order-overlay__backdrop" type="button" aria-label="Fechar pedido" onClick={() => setOrderOpen(false)} />
          <section className="menu-order-dialog" role="dialog" aria-modal="true" aria-labelledby="menu-order-title">
            <header className="menu-order-dialog__heading"><div><p className="menu-eyebrow">Seu pedido</p><h2 id="menu-order-title">Confira seus itens.</h2></div><button type="button" className="menu-order-dialog__close" onClick={() => setOrderOpen(false)} aria-label="Fechar pedido">×</button></header>
            <ul className="menu-order-list">
              {cartEntries.map(({ item, quantity }) => (
                <li className="menu-order-line" key={item.id}>
                  <div><h3>{item.name}</h3><p>{getMenuPriceLabel(item)}{quantity > 1 ? ` · ${quantity} unidades` : ""}</p></div>
                  <div className="menu-order-line__actions"><button type="button" onClick={() => changeQuantity(item, -1)} aria-label={`Remover uma unidade de ${item.name}`}>−</button><span>{quantity}</span><button type="button" onClick={() => changeQuantity(item, 1)} aria-label={`Adicionar uma unidade de ${item.name}`}>+</button></div>
                </li>
              ))}
            </ul>
            <div className="menu-order-total"><span>Subtotal dos itens com preço informado</span><strong>{cartTotal > 0 ? formatPrice(cartTotal) : "A confirmar"}</strong></div>
            {pendingCartCount > 0 ? <p className="menu-order-dialog__note">{pendingCartCount} {pendingCartCount === 1 ? "item depende" : "itens dependem"} de confirmação de disponibilidade e valor.</p> : null}
            <a className="button menu-order-dialog__submit" href={createWhatsAppUrl(orderMessage)} target="_blank" rel="noreferrer">Continuar pelo WhatsApp</a>
            <p className="menu-order-dialog__note">Os pedidos são para retirada na loja. A equipe confirma a disponibilidade.</p>
          </section>
        </div>
      ) : null}
    </div>
  );
}
