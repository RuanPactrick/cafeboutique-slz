"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { cakeCoverings, formatPrice, getMenuPriceLabel, hasCoveringChoice, menuCategories, menuItems, menuSectionNotes, type MenuItem } from "@/data/menu";
import { createWhatsAppUrl, siteConfig } from "@/data/site";

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

const CART_KEY = "cb-menu-cart";
const WEEKDAYS = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];

function pad(value: number) {
  return String(value).padStart(2, "0");
}

// Horários de retirada dentro do funcionamento (seg. a sáb., 15h–20h), de meia em meia hora.
// Hoje só entra se ainda houver horário com pelo menos 30 minutos de folga.
function pickupTimes(day: Date, now: Date) {
  const times: string[] = [];
  for (let minutes = 15 * 60; minutes <= 19 * 60 + 30; minutes += 30) {
    const slot = new Date(day.getFullYear(), day.getMonth(), day.getDate(), Math.floor(minutes / 60), minutes % 60);
    if (slot.getTime() - now.getTime() < 30 * 60 * 1000) continue;
    times.push(`${Math.floor(minutes / 60)}h${minutes % 60 ? "30" : ""}`);
  }
  return times;
}

function pickupDays(now: Date) {
  const days: { value: string; label: string; date: Date }[] = [];
  for (let offset = 0; days.length < 6 && offset < 10; offset += 1) {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() + offset);
    if (date.getDay() === 0) continue;
    if (offset === 0 && pickupTimes(date, now).length === 0) continue;
    const short = `${WEEKDAYS[date.getDay()]} ${date.getDate()}/${date.getMonth() + 1}`;
    days.push({
      value: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
      label: offset === 0 ? `Hoje · ${short}` : offset === 1 ? `Amanhã · ${short}` : short,
      date,
    });
  }
  return days;
}

// Mesmas fotos e enquadramentos dos destaques da home: a foto ocupa o cartão inteiro.
const featuredProducts = [
  { id: "croissant-americano", category: "Croissants", src: "/cafe-boutique/destaques/croissant-americano-hd.jpg", position: "50% 66%", alt: "Croissant Americano servido em um prato." },
  { id: "capuccino-tradicional-150ml", category: "Capuccinos", src: "/cafe-boutique/destaques/cappuccino-tradicional.webp", position: "50% 26%", alt: "Capuccino tradicional da Café Boutique." },
  { id: "sanduiche-americano-pao-frances", category: "Sanduíches", src: "/cafe-boutique/destaques/sanduiche-americano.webp", position: "50% 26%", alt: "Sanduíche Americano servido em um prato." },
  { id: "fatia-bolo-amanteigado-com-cobertura", category: "Doces", src: "/cafe-boutique/destaques/fatia-bolo-amanteigado-hd.jpg", position: "50% 68%", alt: "Fatia de bolo amanteigado com cobertura acompanhada de café." },
] as const;

const categoryArt: Record<string, { src: string; alt: string; position?: string }> = {
  doces: { src: "/cafe-boutique/destaques/fatia-bolo-amanteigado-hd.jpg", position: "50% 39%", alt: "Fatia de bolo amanteigado com cobertura, item do cardápio de doces." },
  "sobremesas-gourmet": { src: "/cafe-boutique/destaques/sobremesa-surpresa-de-uva-hd.jpg", position: "50% 74%", alt: "Surpresa de uva servida no copo, com chocolate por cima." },
  capuccinos: { src: "/cafe-boutique/destaques/cappuccino-tradicional.webp", position: "50% 29%", alt: "Capuccino tradicional preparado em uma xícara da Café Boutique." },
  sanduiches: { src: "/cafe-boutique/destaques/sanduiche-americano.webp", position: "50% 41%", alt: "Sanduíche Americano servido em um prato." },
  croissants: { src: "/cafe-boutique/destaques/croissant-americano-hd.jpg", position: "50% 78%", alt: "Croissant Americano servido em um prato." },
  salgados: { src: "/cafe-boutique/cozinha/quiche-e-empadas.jpg", position: "50% 50%", alt: "Quiches e empadas durante o preparo na cozinha." },
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

function ChevronIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>;
}

function ArrowIcon({ back }: { back?: boolean }) {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d={back ? "m15 6-6 6 6 6" : "m9 6 6 6-6 6"} /></svg>;
}

function BagIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8h14l1 13H4L5 8Z" /><path d="M9 9V6a3 3 0 0 1 6 0v3" /></svg>;
}

function MenuProduct({ item, group, onAdd, nested }: { item: MenuItem; group: MenuGroup; onAdd: (item: MenuItem) => void; nested: boolean }) {
  const [selectedId, setSelectedId] = useState(item.id);
  const Name = nested ? "h4" : "h3";
  const selected = group.items.find((entry) => entry.id === selectedId) ?? group.items[0];

  if (group.variants) {
    return (
      <li className="menu-item menu-item--variant">
        <div className="menu-item__copy">
          <Name>{group.title}</Name>
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
        <Name>{item.name}</Name>
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
  const [cartLoaded, setCartLoaded] = useState(false);
  const [lastAdded, setLastAdded] = useState<{ name: string; at: number } | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [pickupDay, setPickupDay] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [now, setNow] = useState<Date | null>(null);
  const [orderNotes, setOrderNotes] = useState("");
  const [coverings, setCoverings] = useState<Record<string, string>>({});
  const dialogRef = useRef<HTMLElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const [chipEdges, setChipEdges] = useState({ start: true, end: true });
  const openerRef = useRef<HTMLButtonElement>(null);
  // No celular, com "Todos" e sem busca, cada categoria chega fechada e abre com um toque.
  const [compact, setCompact] = useState(false);
  const [openIds, setOpenIds] = useState<Set<string>>(() => new Set());
  const normalizedQuery = searchKey(query.trim());

  useEffect(() => {
    const categoryId = window.location.hash.replace("#categoria-", "");
    if (menuCategories.some((category) => category.id === categoryId)) setActiveCategory(categoryId);
  }, []);

  useEffect(() => {
    const narrow = window.matchMedia("(max-width: 760px)");
    const sync = () => setCompact(narrow.matches);
    sync();
    narrow.addEventListener("change", sync);
    return () => narrow.removeEventListener("change", sync);
  }, []);

  // A faixa de categorias avisa quando há mais opções para os lados: esmaece a borda e,
  // em telas com mouse, mostra setas. A categoria escolhida sempre fica à vista.
  useEffect(() => {
    const track = chipsRef.current;
    if (!track) return;
    const update = () => setChipEdges({
      start: track.scrollLeft <= 4,
      end: track.scrollLeft + track.clientWidth >= track.scrollWidth - 4,
    });
    update();
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      track.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const track = chipsRef.current;
    const chip = track?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!track || !chip) return;
    const left = chip.offsetLeft - track.offsetLeft;
    if (left < track.scrollLeft || left + chip.offsetWidth > track.scrollLeft + track.clientWidth) {
      track.scrollTo({ left: left - 24, behavior: "smooth" });
    }
  }, [activeCategory]);

  const scrollChips = (direction: 1 | -1) => {
    const track = chipsRef.current;
    if (track) track.scrollBy({ left: direction * track.clientWidth * 0.7, behavior: "smooth" });
  };

  // O carrinho fica guardado durante a visita: recarregar ou voltar de outra página não o esvazia.
  useEffect(() => {
    try {
      const saved = JSON.parse(sessionStorage.getItem(CART_KEY) ?? "{}") as Cart;
      const valid = Object.fromEntries(Object.entries(saved).filter(([id, quantity]) => menuItems.some((item) => item.id === id) && Number.isInteger(quantity) && quantity > 0));
      setCart(valid);
    } catch {}
    setCartLoaded(true);
  }, []);

  useEffect(() => {
    if (!cartLoaded) return;
    try { sessionStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch {}
  }, [cart, cartLoaded]);

  useEffect(() => {
    if (!lastAdded) return;
    const timer = window.setTimeout(() => setLastAdded(null), 2600);
    return () => window.clearTimeout(timer);
  }, [lastAdded]);

  // Janela do pedido: o foco entra nela e fica preso até fechar, a página atrás não rola,
  // Esc fecha e o foco volta para o botão "Ver pedido".
  useEffect(() => {
    if (!orderOpen) return;
    setNow(new Date());
    const dialog = dialogRef.current;
    const opener = openerRef.current;
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    dialog?.querySelector<HTMLElement>("h2")?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOrderOpen(false); return; }
      if (event.key !== "Tab" || !dialog) return;
      const focusables = [...dialog.querySelectorAll<HTMLElement>("a[href], button, input, select, textarea")].filter((el) => !el.hasAttribute("disabled"));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      root.style.overflow = previousOverflow;
      // Se o carrinho esvaziou, o botão "Ver pedido" sumiu: o foco vai para a busca.
      if (opener?.isConnected) opener.focus();
      else document.getElementById("busca")?.focus({ preventScroll: true });
    };
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

  const collapsible = compact && activeCategory === "todos" && !normalizedQuery;
  const toggleSection = (id: string) => setOpenIds((current) => {
    const next = new Set(current);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  });

  const resultCount = sections.reduce((total, section) => total + section.count, 0);
  const cartEntries = Object.entries(cart).flatMap(([id, quantity]) => {
    const item = menuItems.find((entry) => entry.id === id);
    return item && quantity > 0 ? [{ item, quantity }] : [];
  });
  const cartCount = cartEntries.reduce((total, entry) => total + entry.quantity, 0);
  const cartTotal = cartEntries.reduce((total, entry) => total + (entry.item.availability === "pending-confirmation" ? 0 : entry.item.priceCents * entry.quantity), 0);
  const pendingCartCount = cartEntries.filter((entry) => entry.item.availability === "pending-confirmation").reduce((total, entry) => total + entry.quantity, 0);

  // Trocar de categoria leva o visitante ao começo da lista, sem pular para o topo da página.
  const selectCategory = (id: string) => {
    setActiveCategory(id);
    const list = document.getElementById("cardapio-do-site");
    if (list && list.getBoundingClientRect().top < 0) list.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  const addToCart = (item: MenuItem) => {
    setCart((current) => ({ ...current, [item.id]: (current[item.id] ?? 0) + 1 }));
    setLastAdded({ name: item.name, at: Date.now() });
  };
  const changeQuantity = (item: MenuItem, amount: number) => setCart((current) => {
    const next = { ...current };
    const quantity = (next[item.id] ?? 0) + amount;
    if (quantity <= 0) delete next[item.id];
    else next[item.id] = quantity;
    return next;
  });

  const days = now ? pickupDays(now) : [];
  const selectedDay = days.find((day) => day.value === pickupDay);
  const times = selectedDay && now ? pickupTimes(selectedDay.date, now) : [];
  const pickupLabel = selectedDay ? `${selectedDay.label}${pickupTime && times.includes(pickupTime) ? ` às ${pickupTime}` : ", horário a combinar"}` : "dia e horário a combinar";

  // Sem itens não há pedido: a janela fecha sozinha quando o último item sai.
  useEffect(() => {
    if (orderOpen && cartCount === 0) setOrderOpen(false);
  }, [orderOpen, cartCount]);

  const orderMessage = [
    "Olá! Vim pelo site da Café Boutique e gostaria de pedir:",
    ...cartEntries.map(({ item, quantity }) => `• ${item.name}${hasCoveringChoice(item) ? ` (cobertura: ${coverings[item.id] ?? "a combinar"})` : ""} x${quantity} — ${getMenuPriceLabel(item)}`),
    pendingCartCount ? "Alguns itens estão sujeitos à confirmação de disponibilidade e valor." : "",
    customerName.trim() ? `Nome: ${customerName.trim()}` : "",
    `Retirada na loja: ${pickupLabel}.`,
    orderNotes.trim() ? `Observações: ${orderNotes.trim()}` : "",
  ].filter(Boolean).join("\n");

  return (
    <div className={`menu-browser${cartCount > 0 ? " menu-browser--with-cart" : ""}`}>
      <section className="menu-hero" id="inicio-cardapio" aria-labelledby="menu-page-title">
        <Image className="menu-hero__photo" src="/cafe-boutique/hero/hero-cafe-boutique-limpo.png" alt="Xícara de café sobre a mesa de madeira da Café Boutique." fill priority quality={90} sizes="(max-width: 760px) 300vw, 100vw" />
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

      <nav className="category-scroller" aria-label="Categorias do cardápio" data-scroll-reveal="true">
        <button type="button" className="category-scroller__arrow category-scroller__arrow--prev" onClick={() => scrollChips(-1)} hidden={chipEdges.start} aria-label="Ver categorias anteriores"><ArrowIcon back /></button>
        <div className="category-scroller__track" ref={chipsRef} data-start={chipEdges.start || undefined} data-end={chipEdges.end || undefined}>
        <div className="category-list">
          <button type="button" className="category-chip" aria-pressed={activeCategory === "todos"} onClick={() => selectCategory("todos")}>Todos</button>
          {menuCategories.map((category) => (
            <button key={category.id} type="button" className="category-chip" aria-pressed={activeCategory === category.id} onClick={() => selectCategory(category.id)}>{category.label}</button>
          ))}
        </div>
        </div>
        <button type="button" className="category-scroller__arrow category-scroller__arrow--next" onClick={() => scrollChips(1)} hidden={chipEdges.end} aria-label="Ver mais categorias"><ArrowIcon /></button>
      </nav>

      <section className="menu-featured section-wrap" id="cardapio-do-site" aria-labelledby="featured-menu-title" data-scroll-reveal="true">
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
                  // Toque, foco ou mouse abrem a descrição sob o nome, como nos destaques da home.
                  <li className="featured-menu-card" key={featured.id} tabIndex={0}>
                    <Image className="featured-menu-card__img" src={featured.src} alt={featured.alt} fill sizes="(max-width: 760px) 78vw, 300px" quality={90} style={{ objectPosition: featured.position }} />
                    <div className="featured-menu-card__copy">
                      <span className="featured-menu-card__category">{featured.category}</span>
                      <div className="featured-menu-card__row">
                        <div className="featured-menu-card__title">
                          <h3>{item.name}</h3>
                          <span className="featured-menu-card__price">{getMenuPriceLabel(item)}</span>
                        </div>
                        <button type="button" className="featured-menu-card__add" onClick={() => addToCart(item)} aria-label={`Adicionar ${item.name} ao pedido`}><PlusIcon /></button>
                      </div>
                      {item.description ? <div className="featured-menu-card__more"><p>{item.description}</p></div> : null}
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
          <div className={`menu-sections${sections.length === 1 ? " menu-sections--single" : ""}`}>
            {sections.map((section) => {
              const art = categoryArt[section.id];
              const open = !collapsible || openIds.has(section.id);
              return (
                <section className={`menu-category${section.id === "extras" ? " menu-category--extras" : ""}${art ? " menu-category--illustrated" : ""}${collapsible ? " menu-category--collapsible" : ""}${open ? "" : " menu-category--closed"}`} key={section.id} id={`categoria-${section.id}`} aria-labelledby={`heading-${section.id}`} data-scroll-reveal="true">
                  <header className="menu-section-heading menu-category__heading">
                    {collapsible ? (
                      // No celular o nome da categoria é o que se procura: ele lidera, a frase vem embaixo.
                      <div>
                        <h2 id={`heading-${section.id}`}>
                          <button type="button" className="menu-category__toggle" aria-expanded={open} aria-controls={`itens-${section.id}`} onClick={() => toggleSection(section.id)}>{section.label}</button>
                        </h2>
                        <p className="menu-category__tagline">{categoryTitles[section.id]}</p>
                      </div>
                    ) : (
                      <div>
                        <p className="menu-eyebrow">{section.label}</p>
                        <h2 id={`heading-${section.id}`}>{categoryTitles[section.id]}</h2>
                      </div>
                    )}
                    <p className="menu-category__description">{categoryDescriptions[section.id]}</p>
                    <span className="menu-section-heading__aside">{section.count} {section.count === 1 ? "item" : "itens"}{collapsible ? <ChevronIcon /> : null}</span>
                  </header>
                  <div className="menu-category__body" id={`itens-${section.id}`} hidden={!open}>
                    {art ? <figure className="menu-category__photo"><Image src={art.src} alt={art.alt} fill quality={90} sizes="(max-width: 900px) 92vw, 600px" style={art.position ? { objectPosition: art.position } : undefined} /></figure> : null}
                    <div className="menu-category__products">
                      {section.id === "extras" ? <p className="menu-extras-intro">Adicione complementos ao seu pedido.</p> : null}
                      {section.groups.map((group) => (
                        <div className="menu-group" key={section.id + "-" + (group.key || "geral")}>
                          {group.title && section.id !== "extras" && !group.variants ? <h3 className="menu-group__title">{group.title}</h3> : null}
                          <ul className={section.id === "extras" ? "menu-list menu-list--extras" : "menu-list"}>
                            {(group.variants ? group.items.slice(0, 1) : group.items).map((item) => <MenuProduct key={group.key + item.id} item={item} group={group} onAdd={addToCart} nested={Boolean(group.title && section.id !== "extras" && !group.variants)} />)}
                          </ul>
                        </div>
                      ))}
                      {menuSectionNotes[section.id] ? <p className="menu-section-note">{menuSectionNotes[section.id]}</p> : null}
                      {collapsible ? (
                        // Fechar pelo fim da lista devolve o visitante ao título da categoria.
                        <button type="button" className="menu-category__close" aria-controls={`itens-${section.id}`} onClick={() => {
                          toggleSection(section.id);
                          document.getElementById(`categoria-${section.id}`)?.scrollIntoView({ block: "start" });
                        }}>Fechar {section.label}<ChevronIcon /></button>
                      ) : null}
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </section>

      <section className="menu-closing" aria-labelledby="menu-closing-title" data-scroll-reveal="true">
        <div className="menu-closing__copy"><p className="menu-eyebrow">Café Boutique</p><h2 id="menu-closing-title">Tudo fica melhor com um bom café.</h2><p>Escolha seus favoritos e monte seu pedido para retirada.</p><a className="button button--light" href="#inicio-cardapio">Voltar ao cardápio</a></div>
        <div className="menu-closing__photo"><Image src="/cafe-boutique/destaques/cappuccino-tradicional.webp" alt="Capuccino tradicional servido em uma xícara da Café Boutique." fill sizes="(max-width: 760px) 100vw, 48vw" /></div>
      </section>

      <p className="visually-hidden" role="status" aria-live="polite">{lastAdded ? `${lastAdded.name} adicionado ao pedido. ${cartCount} ${cartCount === 1 ? "item" : "itens"} no pedido.` : ""}</p>
      {cartCount > 0 ? (
        <div className="menu-cart-bar">
          <div className="menu-cart-bar__summary">
            <span className="menu-cart-bar__icon" key={lastAdded?.at}><BagIcon /><span>{cartCount}</span></span>
            {lastAdded ? <span className="menu-cart-bar__added">{lastAdded.name} adicionado</span> : <span>{cartCount} {cartCount === 1 ? "item" : "itens"} · {cartTotal > 0 ? formatPrice(cartTotal) : "valor a confirmar"}</span>}
          </div>
          <button ref={openerRef} className="button button--light" type="button" onClick={() => setOrderOpen(true)}>Ver pedido</button>
        </div>
      ) : null}

      {orderOpen ? (
        <div className="menu-order-overlay">
          <button className="menu-order-overlay__backdrop" type="button" aria-label="Fechar pedido" onClick={() => setOrderOpen(false)} />
          <section ref={dialogRef} className="menu-order-dialog" role="dialog" aria-modal="true" aria-labelledby="menu-order-title">
            <header className="menu-order-dialog__heading"><div><p className="menu-eyebrow">Seu pedido</p><h2 id="menu-order-title" tabIndex={-1}>Confira seus itens.</h2></div><button type="button" className="menu-order-dialog__close" onClick={() => setOrderOpen(false)} aria-label="Fechar pedido">×</button></header>
            <ul className="menu-order-list">
              {cartEntries.map(({ item, quantity }) => (
                <li className="menu-order-line" key={item.id}>
                  <div className="menu-order-line__copy">
                    <h3>{item.name}</h3>
                    <p>{getMenuPriceLabel(item)}{quantity > 1 ? ` · ${quantity} unidades` : ""}</p>
                    {hasCoveringChoice(item) ? (
                      <label className="menu-order-covering">
                        <span>Cobertura</span>
                        <select value={coverings[item.id] ?? ""} onChange={(event) => { const value = event.currentTarget.value; setCoverings((current) => ({ ...current, [item.id]: value })); }}>
                          <option value="">A combinar</option>
                          {cakeCoverings.map((covering) => <option key={covering} value={covering}>{covering}</option>)}
                        </select>
                      </label>
                    ) : null}
                  </div>
                  <div className="menu-order-line__actions"><button type="button" onClick={() => changeQuantity(item, -1)} aria-label={`Remover uma unidade de ${item.name}`}>−</button><span>{quantity}</span><button type="button" onClick={() => changeQuantity(item, 1)} aria-label={`Adicionar uma unidade de ${item.name}`}>+</button></div>
                </li>
              ))}
            </ul>
            <div className="menu-order-total"><span>Subtotal</span><strong>{cartTotal > 0 ? formatPrice(cartTotal) : "A confirmar"}</strong></div>
            {pendingCartCount > 0 ? <p className="menu-order-dialog__note">{pendingCartCount} {pendingCartCount === 1 ? "item depende" : "itens dependem"} de confirmação de disponibilidade e valor.</p> : null}
            <fieldset className="menu-order-pickup">
              <legend>Retirada na loja</legend>
              <p className="menu-order-pickup__hours">Horário de funcionamento: {siteConfig.openingHoursLabel}. Tudo aqui é opcional: o que ficar em branco, a equipe combina com você no WhatsApp.</p>
              <label className="menu-order-field menu-order-field--wide">
                <span>Seu nome</span>
                <input type="text" value={customerName} onChange={(event) => setCustomerName(event.currentTarget.value)} autoComplete="name" maxLength={60} placeholder="Como podemos te chamar?" />
              </label>
              <label className="menu-order-field">
                <span>Dia</span>
                <select value={pickupDay} onChange={(event) => { setPickupDay(event.currentTarget.value); setPickupTime(""); }}>
                  <option value="">A combinar</option>
                  {days.map((day) => <option key={day.value} value={day.value}>{day.label}</option>)}
                </select>
              </label>
              <label className="menu-order-field">
                <span>Horário</span>
                <select value={pickupTime} onChange={(event) => setPickupTime(event.currentTarget.value)} disabled={!selectedDay}>
                  <option value="">{selectedDay ? "A combinar" : "—"}</option>
                  {times.map((time) => <option key={time} value={time}>{time}</option>)}
                </select>
              </label>
              <label className="menu-order-field menu-order-field--wide">
                <span>Observações</span>
                <textarea value={orderNotes} onChange={(event) => setOrderNotes(event.currentTarget.value)} rows={3} maxLength={300} placeholder="Ex.: sem cebola, vela de aniversário, para 10 pessoas" />
              </label>
            </fieldset>
            <a className="button menu-order-dialog__submit" href={createWhatsAppUrl(orderMessage)} target="_blank" rel="noreferrer">Continuar pelo WhatsApp</a>
            <p className="menu-order-dialog__note">A mensagem abre pronta no WhatsApp, com os itens e a retirada. A equipe confirma a disponibilidade antes de preparar.</p>
          </section>
        </div>
      ) : null}
    </div>
  );
}
