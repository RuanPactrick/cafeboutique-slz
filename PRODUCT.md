# Product

<!-- impeccable:product-schema 1 -->

## Platform

Web. Next.js and TypeScript.

## Users

People in São Luís who want to discover Café Boutique, browse the menu, plan a visit, or place an order for pickup.

## Product purpose

The official site introduces Café Boutique, shows its source-backed menu and available photography, and gives visitors direct routes to Instagram, WhatsApp, and the location listing.

## Positioning

Café Boutique centers cakes and coffee, with the supplied brand line “Mais que um bolo, uma memória afetiva.” Keep the voice warm and direct in Brazilian Portuguese.

## Capabilities and constraints

- Present the 174 source-backed menu entries in 18 categories on `/cardapio`.
- Support accent-insensitive search, category filtering, native disclosure sections, sandwich bread selection, current listed prices, and WhatsApp links.
- Lead the homepage with Café Boutique as a real cafeteria and confectionery in São Luís; keep detailed product browsing on `/cardapio`.
- Immediately after the animated hero, show the user-requested “Os queridinhos da Boutique” horizontal feature: three product cards, one dessert-category card and the verified coffee-and-cake item. Render copy, prices and WhatsApp controls in HTML; prices derive from the source menu. Detailed discovery stays on `/cardapio`.
- Follow the highlights with an editorial introduction to the café. Keep its heading, description, and WhatsApp link as HTML; the cleaned three-photo montage is illustrative and is labeled accordingly.
- Follow the café introduction with the “Nossa história” copy supplied by the user. Keep its heading, narrative, categories, and CTA in HTML instead of embedding text in the illustration.
- Map photography to a menu entry only when the official source supports that identification. At present, one photo is mapped to `Fatia Bolo Amanteigado com Cobertura`.
- Use five dated Instagram posts as editorial links. Posts without an exact matching catalog entry must not imply a price or availability.
- Orders are for pickup. The official Instagram bio snapshot checked on 2026-10-03 lists Monday to Saturday, 15:00–20:00; this may need a future confirmation.
- Show the address supplied with the brand material with a note to confirm the map point because public listings diverge.
- Keep orders and contact on the configured WhatsApp and phone links. Checkout is out of scope.
- Do not add testimonials, sales metrics, founder stories, product details, or photography without evidence. Customer quotes must be literal excerpts of public reviews approved by the owner.

## Brand commitments

- Use the supplied logo, espresso/cream/warm-paper palette, Antic Didone display face, and Lustria reading face.
- Preserve Brazilian Portuguese and the brand’s hospitality context.
- Keep menu, business details, and image provenance centralized and editable.
- Keep unverified product photography out of the source menu registry. User-supplied hero and highlight artwork may be used as illustrative marketing media, with source/edit history documented alongside the assets. Do not claim exact item matches from that artwork.

## Evidence and limits

- `src/data/menu.json` contains the source-transcribed menu. Pending notes and prices remain visible for confirmation.
- `src/data/media-assets.ts` is the media registry for local image paths, intrinsic dimensions, descriptions, Instagram URLs, crop positions, and verified menu mappings.
- `public/cafe-boutique/PROVENANCE.md` records the inspected source posts and local assets.
- Seven official posts with known project links were inspected. The complete Instagram history and private/highlight content were not available to unauthenticated browsing; the displayed selection is limited to those verified posts.
- The address in `src/data/site.ts` remains marked pending confirmation. Opening hours and pickup-only ordering are tied to the official profile and Linktree snapshots.
- The home shows a Google Maps reviews block (`src/data/reviews.ts`): the public rating, review count and check date, plus verbatim excerpts (complete sentences) of three public reviews under the name each reviewer uses on Google, published with the owner's approval on 2026-10-07. Keep excerpts literal, never paraphrased inside quotation marks, and refresh rating, count and date together.

## Product principles

- Make the menu, price, pickup terms, and contact path easy to find.
- Keep information in one source of truth and label uncertainty plainly.
- Preserve usable keyboard focus, legible contrast, natural image proportions, and responsive behavior.
