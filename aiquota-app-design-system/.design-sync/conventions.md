# Building with the AIQuota App design system

These are HTML and CSS stand-ins for the SwiftUI apps (iPhone, iPad, Mac). There are no JS components: `window.AIQuotaApp` is empty. You build with plain HTML, the `aq-*` classes and the CSS custom properties below.

## Setup

- `styles.css` loads everything: `tokens/tokens.css`, then `_ds_bundle.css` (the component classes, plus Inter from Google Fonts as the fallback off Apple devices).
- Put `class="aq"` on `<body>` or on your root element. It sets `box-sizing` for everything inside it.
- Dark is the default. Add `data-theme="light"` to `<html>` for light mode. Every token, and the glass filter, re-resolve from that.
- Screens sit on a ground: `aq-wash` (the overview's purple wash) or `aq-surface` (sheets). Glass only reads correctly over a ground.
- Service glyphs: `<i class="aq-glyph aq-glyph--openai"></i>` or `aq-glyph--claude`. They're CSS masks with the SVG built into the stylesheet, drawn in `currentColor`, so inside a dial they take its state colour.

## Styling idiom

Classes for components, tokens for your own layout. Never hard-code hex values or pixel spacing.

| Family | Real names |
|---|---|
| Grounds and depth | `aq-wash`, `aq-surface`, `aq-glass`, `aq-glass--raised` |
| Actions | `aq-btn aq-btn--prominent`, `aq-btn aq-btn--glass aq-glass`, `aq-btn--small`, `aq-toolbar`, `aq-iconbtn`, `aq-iconbtn--mac`, `aq-link` |
| Dial | `aq-dial`, `aq-dial--warning`, `aq-dial--critical`, `aq-dial--off`, `aq-dial--mac`, `aq-dial__track`, `aq-dial__fill`, `aq-dial__fill--2`, `aq-dial__values` |
| Cards | `aq-card aq-glass`, `aq-card--stacked`, `aq-card__summary`, `aq-card__name`, `aq-card__plan`, `aq-card__reset`, `aq-card__status`; Mac: `aq-macrow`, `aq-macsheet` |
| Data, banners | `aq-heat`, `aq-heat__grid`, `aq-notice`, `aq-notice--mac`, `aq-status`, `aq-num` (tabular digits) |
| Device frames | `aq-phone`, `aq-screen`, `aq-island`, `aq-home`, `aq-grabber` |

Tokens: text `--primary`, `--secondary`, `--tertiary`; state `--accent` (under 85%), `--warning` (85% and up), `--critical` (95% and up), `--reset-accent`; grounds `--base`, `--glass`, `--glass-edge`; heat ramp `--heat-0` to `--heat-4`; spacing `--space-2` to `--space-24`; radii `--radius-card` (iOS 28), `--radius-mac-card`, `--radius-pill`; type `--font-sans`, `--font-rounded`.

## Where the truth lives

Read `tokens/tokens.css` and `_ds_bundle.css` before you style anything. Each `components/<Group>/<Name>/<Name>.prompt.md` gives that component's rules and the exact strings the app uses. Its `<Name>.html` is working markup. Copy the dial's SVG geometry from `QuotaDial.html` rather than drawing your own arcs.

## Example

```html
<body class="aq">
  <main class="aq-wash" style="padding: var(--space-24); display: grid; gap: var(--space-24)">
    <!-- a service card: copy the full markup from components/Cards/ServiceCard/ServiceCard.html -->
    <button class="aq-btn aq-btn--prominent" type="button">Connect</button>
    <button class="aq-btn aq-btn--glass aq-glass" type="button">Try Demo</button>
  </main>
</body>
```
