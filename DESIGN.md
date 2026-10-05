---
name: "Café Boutique"
description: "A light editorial café identity in warm paper, espresso contrast, and source-backed photography."
colors:
  espresso: "#2A170F"
  cream: "#F8F4CC"
  paper: "#F8F5EE"
  paper-soft: "#FFFFFF"
  paper-secondary: "#F2EEE5"
  taupe: "#988C74"
  cocoa: "#71452F"
  ink: "#3C311B"
  muted: "#655C50"
  rule: "#DDD5C8"
typography:
  display:
    fontFamily: "Antic Didone, Georgia, serif"
    fontSize: "clamp(3.25rem, 5vw, 4.8rem)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Antic Didone, Georgia, serif"
    fontSize: "clamp(2.3rem, 4vw, 3.7rem)"
    fontWeight: 400
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Antic Didone, Georgia, serif"
    fontSize: "clamp(1.3rem, 1.8vw, 1.65rem)"
    fontWeight: 400
    lineHeight: 1.04
  body:
    fontFamily: "Lustria, Georgia, serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.58
  label:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "0.7rem"
rounded:
  pill: "999px"
  field: "6px"
  selector: "5px"
  card: "8px"
  frame: "10px"
spacing:
  page-gutter: "clamp(20px, 5.5vw, 76px)"
  content-max: "1280px"
  section-large: "clamp(66px, 8.2vw, 112px)"
components:
  button-primary:
    backgroundColor: "{colors.espresso}"
    textColor: "{colors.paper-soft}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.7rem 1.3rem"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.paper-soft}"
    textColor: "{colors.espresso}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.espresso}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.7rem 1.3rem"
    height: "48px"
  button-light:
    backgroundColor: "{colors.paper-soft}"
    textColor: "{colors.espresso}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
  navigation-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
  input-search:
    backgroundColor: "{colors.paper-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.field}"
    padding: "0.7rem 0.9rem"
    height: "48px"
  chip-category:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.42rem 0.8rem"
    height: "38px"
  chip-category-selected:
    backgroundColor: "{colors.espresso}"
    textColor: "{colors.paper-soft}"
  card-featured:
    backgroundColor: "{colors.paper-soft}"
    rounded: "{rounded.card}"
    padding: "0.95rem 1rem 1rem"
  home-menu-tab:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0.45rem 0.85rem"
    height: "39px"
  variant-select:
    backgroundColor: "{colors.paper-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.selector}"
    padding: "0.35rem 2rem 0.35rem 0.55rem"
    height: "38px"
---

# Design System: Café Boutique

## Overview

**Creative North Star: "Editorial Assimétrico"**

Café Boutique uses warm paper fields, espresso anchors and a serif pairing. The user-supplied panoramic café video leads the page with HTML headline and CTA. Immediately below it, the user-requested highlights reference supplies the photographic and floral treatment. The supplied logo remains an image asset; official Instagram photography stays linked to its documented sources.

The home page presents the animated hero, a five-card “Os queridinhos da Boutique” feature, an editorial café introduction, the user-provided “Nossa história” copy, five linked Instagram posts, and location, hours and pickup details. Detailed item discovery belongs to the separate searchable menu. The product cards use cleaned illustrative artwork with independent HTML labels, current catalog prices and WhatsApp links; the fifth card uses the verified cake photograph. The café introduction follows the same warm paper palette and uses HTML for its heading, copy, and WhatsApp link. Its three-photo collage is clearly labeled illustrative because it is not verified photography of the actual shop. The following story section keeps the supplied portrait as an illustration; its headline, narrative, side list, and CTA are HTML rather than baked into the image.

**Key Characteristics:**
- Light paper surfaces with espresso contrast, cream highlights, taupe details, and fine rules.
- Antic Didone display type and Lustria reading type, each with Georgia serif fallback; Arial/Helvetica for interface controls.
- Source-backed photography at deliberate proportions, restrained actions, and one mobile photo strip.

## Colors

The palette balances espresso brown with layered warm whites, a soft yellow-cream highlight, taupe, and quiet neutral rules.

### Primary
- **Espresso**: The main contrast color for headlines, primary actions, story and ordering panels, and the footer.

### Secondary
- **Warm Taupe**: Focus outlines, navigation underlines, scrollbar accents, and small supporting details.

### Tertiary
- **Cream**: A restrained warm highlight within the supplied identity.

### Neutral
- **Warm Paper**: The page frame and primary light surface.
- **Pure White**: Product card, caption, and inverse button surfaces.
- **Secondary Paper**: The outer canvas, social strip, and image backing.
- **Café Ink**: Reading text on light surfaces.
- **Muted Brown**: Secondary copy, captions, menu counts, and notes.
- **Divider**: Fine borders and section rules.

**The Espresso Anchor Rule.** Use espresso for the strongest contrast; reserve cream and taupe for small highlights and interaction details.

## Typography

**Display Font:** Antic Didone (with Georgia, serif fallback)  
**Body Font:** Lustria (with Georgia, serif fallback)  
**Label/Mono Font:** Arial, Helvetica, sans-serif for interface text; Georgia is the serif fallback, and no mono face is defined.

**Character:** Antic Didone gives the headings their high-contrast editorial character. Lustria carries reading copy, while the familiar sans-serif stack keeps navigation, prices, and controls compact.

### Hierarchy
- **Display** (400, clamp(3.25rem, 5vw, 4.8rem), 1.05): Global h1 scale; the homepage and menu heroes apply their own responsive sizing.
- **Headline** (400, clamp(2.3rem, 4vw, 3.7rem), 1.05): Section headlines.
- **Title** (400, clamp(1.3rem, 1.8vw, 1.65rem), 1.04): Smaller serif headings; card and menu titles use local adjustments.
- **Body** (400, 16px, 1.58): Default reading copy and paragraphs.
- **Label** (Arial, 0.7rem baseline): Navigation, category labels, metadata, prices, and controls use compact local sizes.

**The Two-Voice Rule.** Keep Antic Didone for headings and Lustria for reading copy; use Arial/Helvetica for interface controls and compact utility text.

## Layout

The page fills the viewport without an outer frame. Shared content caps at 1280px, while the inset panoramic hero and highlights rail span the page. The header has no bottom divider and centers its navigation. The hero layers HTML over the supplied looping café video and uses the cleaned photo as fallback. The menu route uses a plain paper introduction.

Homepage order: animated hero, “Os queridinhos da Boutique”, editorial café introduction, “Nossa história”, five sourced Instagram posts, location/contact, footer. The highlights feature follows the user’s 5 October 2026 reference: cream floral background, two-column editorial heading, portrait food cards, dark lower photo areas, real prices and circular plus links. Desktop shows four full cards and part of a fifth; mobile uses an 82vw scroll-snap rail. The introduction follows the visual reference’s asymmetric cream composition; on narrow screens its HTML copy comes first, followed by the three images. A caption marks that collage as illustrative. The story section adapts the supplied dark–photo–cream composition and places the user-provided title, narrative, side list, and CTA in HTML. Arrow buttons and keyboard focus provide additional navigation. Full item browsing remains on `/cardapio`.

The menu route presents a data-driven 174-item catalogue in 18 categories. Search and category filtering update the list, native disclosure panels open category sections, and sandwich bread options share one selector per base sandwich. Other distinct preparations remain separate items. The mobile catalogue remains a single-column list.

**The Source-Size Rule.** Keep low-resolution official portrait photography at its natural width. Crop only where a component needs a fixed aspect ratio; set a per-image object position for that crop.

## Elevation & Depth

The page is flat by default: there are no resting box shadows or entrance animations. Region depth comes from paper surfaces, espresso contrast, image placement, fine rules, and short link-state transitions.

**The Tonal-Depth Rule.** Separate sections with the established warm surfaces and fine rules; do not add resting box shadows.

## Shapes

Primary actions and catalogue filter controls use pill ends (999px). Product and social photography has no card frame. Search fields and variant selects use modest corners. The outer frame uses an 8px radius. Fine 1px rules divide navigation, menu rows, and section details.

## Components

### Buttons
- **Character:** Compact sans-serif actions with strong contrast and clear text labels.
- **Shape:** Full pill ends (999px), with a 48px minimum height.
- **Primary:** Espresso fill and white text; the hover state inverts the fill and text.
- **Outline / Light:** Outline starts transparent with espresso text; the light inverse starts white with espresso text. Each reverses on hover.
- **Focus:** Global keyboard focus uses a 3px taupe outline with 4px offset.

### Chips
- **Style:** Home category tabs are underlined text controls. Catalogue filters use restrained pill controls.
- **State:** Both expose a clear selected state; category controls scroll horizontally when needed.

### Cards / Containers
- **Corner Style:** Photography remains square-edged.
- **Background:** Warm paper with no nested containers.
- **Shadow Strategy:** Flat, with no resting shadow.
- **Image Behavior:** The verified menu photograph uses a 4:5 crop; social photographs use source dimensions and per-image crop metadata.

### Inputs / Fields
- **Style:** Catalogue search has a 1px divider border, white surface, 6px corners, and a 48px minimum height.
- **Focus:** The global taupe focus outline applies.
- **Variant Select:** Variant selectors use a white surface, divider border, 5px corners, and 38px minimum height.
- **Error / Disabled:** No separate error or disabled visual treatment is defined.

### Navigation
- **Style:** Sticky warm-paper header with a supplied image logo, centered compact links, a pickup order action, and a thin lower divider.
- **States:** Links underline on hover; keyboard focus uses the global outline.
- **Mobile:** At 760px and below, links move into a two-column menu behind a circular control.

### Data-Driven Menu
- The catalogue groups 174 entries into 18 categories. Search is accent-insensitive, filters can be combined with a category, sections expand with native disclosure controls, and variant groups update the displayed price and WhatsApp order message from the selected item.
- Keep the homepage focused on recognizing the cafeteria, its people, its photography, and its location. Direct detailed item discovery to `/cardapio`.

### Media
- Images use Next Image with intrinsic dimensions, sizes, AVIF/WebP optimization, and source-specific object-position metadata. The media registry maps only one verified Instagram image to a menu item. Five additional posts are presented as linked editorial records, without menu prices. The supplied kitchen video is retained in the asset inventory but is not autoplayed or used as a visual placeholder.

## Do's and Don'ts

### Do:
- **Do** use the exact palette and type roles in the frontmatter.
- **Do** keep the supplied logo as its original image asset.
- **Do** use only the provenance-tracked real photo and video files; leave unavailable product media unassigned.
- **Do** preserve the menu and its WhatsApp ordering behavior across mobile and desktop.
- **Do** keep menu, location, hours, WhatsApp, and pickup content tied to centralized source data.

### Don't:
- **Don't** add box shadows to resting surfaces; the implemented page has no shadow vocabulary.
- **Don't** use generated food or café photography to fill missing media.
- **Don't** invent product mappings, menu details, customer comments, or photo content.
- **Don't** replace the original logo with typeset brand text.
