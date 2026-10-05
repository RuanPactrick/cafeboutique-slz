---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets:
  - "src/app/cardapio/page.tsx"
  - "src/app/globals.css"
  - "src/components/boutique-highlights.tsx"
  - "src/components/boutique-highlights.module.css"
  - "src/components/product-rail.tsx"
  - "src/components/cafe-experience.tsx"
  - "src/components/menu-browser.tsx"
  - "src/components/site-header.tsx"
  - "src/components/site-footer.tsx"
  - "src/data/menu.ts"
  - "src/data/media-assets.ts"
  - "src/data/site.ts"
---

# Café Boutique home and menu

Scope: Official Brazilian Portuguese homepage and searchable menu for Café Boutique.
Mode: Persuade.
Audience and job: People in São Luís discovering the café, browsing its menu, planning a visit, or ordering for pickup.
Content and constraints: Preserve the supplied logo, warm palette, Antic Didone/Lustria pairing, 174-item menu, and WhatsApp flow. Use only the local, provenance-recorded images. Do not invent product matches, stories, reviews, or prices.

## Direction contract

THESIS: Lead with the user-supplied animated café scene and HTML headline. Follow with the requested photographic highlights section, maintaining catalog-sourced prices and direct WhatsApp consultation. Use the rest of the homepage for cafeteria identity, sourced Instagram records and location.

OWN-WORLD: Espresso #2A170F, cream #F8F4CC, paper #F8F5EE, secondary paper #F2EEE5, taupe #988C74, ink #3C311B, muted #655C50, and rule #DDD5C8. Use Antic Didone, Lustria, and the existing Arial/Helvetica interface stack. Keep surfaces flat and photography specific to the café.

STORY: Home sequence: panoramic animated hero, five-card “Os queridinhos da Boutique” horizontal feature, editorial café introduction, the user-provided “Nossa história” copy, five dated Instagram posts, location/hours, footer. The highlight section uses cleaned reference artwork with all copy, prices and controls in HTML. Four reference photos are illustrative, the fifth uses the verified cake photo; the dessert photograph represents the category rather than a claimed exact product. The café introduction keeps its heading, paragraph, and WhatsApp CTA in HTML beside a cleaned three-photo illustrative montage. A visible note says the photos do not necessarily represent the actual shop. The following story section uses a cleaned illustration; its user-provided narrative, categories, heading and CTA remain HTML. The catalog page exposes all 174 items in 18 categories with search, filters, disclosure sections, bread variants, prices and WhatsApp links.

FIRST VIEWPORT: A borderless header precedes the inset, rounded panoramic video hero. The provided artwork and video frame the HTML “Mais que um café, uma pausa afetiva.” headline and “Ver cardápio” link. Use the poster for reduced motion. The highlights section follows directly below.

MEDIA AND FACTS: `src/data/media-assets.ts` is the local media registry with intrinsic dimensions, alt text, source links, crop positions, and verified menu mappings. The coffee-and-cake Reel is the only image mapped to an exact menu entry. Other photos link to their original Instagram posts and carry no menu price. Seven project-linked posts were inspected; the full Instagram history was not available to unauthenticated browsing. The address is marked for confirmation. The official profile snapshot lists Monday–Saturday, 15:00–20:00; Linktree says orders are for pickup.

FINISH: Keep this document aligned with shipped source. Record viewport checks and any access limitation after visual review; do not report uninspected screenshots as verified.

REVIEW (2026-10-05): Highlights inspected at 1440px and 390px. Five cards and all 13 page images loaded; document width matched the viewport in both sizes. Next-arrow navigation moved the rail and enabled the previous arrow. Product-specific WhatsApp URLs and catalog prices inspected, TypeScript check passed. Screenshots saved in `.impeccable/review/screenshots/*-queridinhos.png`.

REVIEW (2026-10-05, follow-up): The café-space and brand-story sections were inspected at 1440px and 390px. Headlines fit, desktop and mobile compositions showed their intended image crops, and the document width matched each viewport. The story image alt describes the scene without identifying a specific team member. TypeScript passed and `/` returned HTTP 200. Screenshots are saved as `.impeccable/review/screenshots/home-final-cdp-{1440,390}-cafe-story.png`.
