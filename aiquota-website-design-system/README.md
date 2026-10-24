The AIQuota 2.0 website design system, matched to the shipping Mac and iOS apps. The site should look like the app opened up to full width: plum-black under a purple wash, Liquid Glass cards that pick up the purple behind them, rings and readings in the app's purple, and red only when an allowance is spent. Dark is the lead theme because it is how the app is seen; light mirrors it token for token. The site follows the visitor's system setting by default and offers a `ThemeToggle` (System, Light, Dark) to override it.

Rounds 1 and 2 are kept as they were. This round replaces their guesses with the real app: colours sampled from John's Mac menu-bar sheet and iPhone overview, checked against main@49381cb.

## Principles

- **Wash, glass, rings.** The hero sits in the iOS wash (`HeroWash`). Everything on it is glass (`glass`, `aq-glass`). Readings are dials.
- **Purple is the quota colour.** `accent` draws rings and highlights, `accent-ink` sets every purple word, `brand` fills the one primary button. Ground and text stay plum-neutral.
- **State colour means state.** `warning` from 85%, `critical` from 95% or at the limit, applied to the whole dial as the apps do: ring and numbers together.
- **Show the app, don't describe it.** Use `ServiceCard`, `MacSheet` and `NoticeBanner` with sample readings instead of screenshots wherever a section needs a picture.

## Colour

- Ground: `canvas`. Under the hero, `HeroWash`. Mac panels: `MacSheet` (`sheet`, `glow`, `glow-2`). Opaque panels: `surface`; wells: `surface-2`.
- Cards, nav and secondary buttons: `glass` with the theme's blur (`glass-blur-dark` darkens what is behind, as iOS glass does) and a `glass-edge` rim.
- Text: `ink` for names, plans and headings; `ink-2` for footnotes, spend lines and status lines; `ink-3` only for disabled text.
- Purple words: `accent-ink` (reset times, links, dial readings).
- Primary button: `brand` with `on-brand`.
- News: `notice`, accent at 22%.
- Heatmap: `data-0` to `data-4`.

Every text token's usage note names the grounds where it holds 4.5:1. Two app colours miss and are kept exact: the light `warning` ring (2.0:1) and `ink-3`. Both always sit beside readable words. In dark, keep `ink-2` and `accent-ink` off glass in the brightest 200px of the wash.

## Type

The system font stack (`sans`), which is SF Pro on Apple devices, with Inter (loaded by `bundle.css`) as the first fallback elsewhere.

- Hero: `display-1`, bold, as the app sets its large title. Sections: `display-2`. Inner pages: `title-1`.
- Service names: `title-2` on iOS-style cards, `title-3` on the Mac sheet. Plans and banner titles: `headline`.
- Reset lines, links, buttons: `callout`. Captions and month labels: `footnote`.
- Under headings: `lead` in `ink-2`. Running text: `body`. Above headings: `eyebrow`, sentence case.
- Readings: `numeral-sm` in 124px dials, `numeral` in 248px dials, `numeral-xl` alone. Always tabular.

## Shape and space

- 4px spacing steps, `space-1` to `space-32`.
- `radius-card` (28px) for iOS-style cards and banners, `radius-sheet` (18px) for Mac panels, `radius-md` (10px) for the Mac banner, `radius-pill` for buttons and the nav.
- Dials: `stroke-ring` (8px) for two windows, `stroke-ring-single` (12px) for one, doubled at 248px. Tracks in `track`.
- Hairlines in `line` split a Mac sheet's header and footer.

## Motion

Buttons press to 97%. Dials may fill once from empty when they scroll into view, about 600ms, ease-out. The nav gains `shadow-float` after scrolling. Nothing loops; with reduced motion nothing moves.

## Voice

The apps' own words: short, literal, numbers first. *7d resets Tue 10:07 PM*, *Limit reached*, *$65.57 of $100.00 monthly spend*, *Codex usage reset announced*. Sentence case, no exclamation marks, no emoji. Sample readings are labelled as samples. The product is *AIQuota*, one word, no space, everywhere: headings, prose, the nav and the page title.

## Logos and icons

- The app icon (`assets/Logos/aiquota-app-icon.png`) is the logo: 28px in the nav, 26px in a MacSheet header, 96px or more in download bands on `icon-ground`.
- `aiquota-mark-on-dark.svg`: the icon's arcs and spark without the tile, for dark grounds only.
- Interface icons: SF Symbols-style inline SVG in `currentColor`. The apps show OpenAI's and Anthropic's glyphs inside dials; the site does not, and names the service in text.

## Not synced

Built from niederme/ai-quota at main@49381cb plus John's screenshots of the Mac sheet and iPhone overview (2026-10-22). Site-only decisions: the spacing and web type scale, the CSS glass recipe and its dark brightness filter, the `brand` button colour (the icon violet), and `surface` in light. Components are static HTML previews styled by `components/bundle.css`, with no JavaScript library.
