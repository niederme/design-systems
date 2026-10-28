# Building with the AIQuota Website design system

This is the AIQuota 2.0 website, matched to the shipping apps. There are no JS components: `window.AIQuotaWebsite` is empty. You build with plain HTML, the `aq-*` classes and the CSS custom properties below.

## Setup

- `styles.css` loads everything: `tokens/tokens.css`, then `_ds_bundle.css` (the component classes, plus Inter from Google Fonts).
- Put `class="aq-root"` on `<body>` or on your root element. It sets `box-sizing` for everything inside it.
- Dark is the default. The page follows `prefers-color-scheme`, and `data-theme="light"` or `data-theme="dark"` on `<html>` overrides it. The `ThemeToggle` card shows the switch.
- Open a page with `aq-wash` as its hero background. Glass (`aq-glass`) only reads correctly over the wash or `--canvas`.

## Styling idiom

Classes for components, tokens for your own layout. Never hard-code hex values or pixel spacing.

| Family | Real names |
|---|---|
| Type | `aq-display`, `aq-lead`, `aq-eyebrow` |
| Grounds | `aq-wash`, `aq-glass` |
| Actions | `aq-btn aq-btn--primary`, `aq-btn aq-btn--secondary aq-glass`, `aq-btn--plain`, `aq-btn--lg`, `aq-icongroup` |
| Navigation | `aq-nav`, `aq-nav--raised`, `aq-nav__brand`, `aq-nav__links`, `aq-nav__link`, `aq-theme`, `aq-theme--compact` |
| Dial | `aq-dial`, `aq-dial--single`, `aq-dial--lg`, `aq-dial--warning`, `aq-dial--critical`, `aq-dial__track`, `aq-dial__track--off`, `aq-dial__fill`, `aq-dial__fill--secondary`, `aq-dial__values` |
| Cards and data | `aq-card aq-glass`, `aq-card__top`, `aq-card__body`, `aq-card__name`, `aq-card__plan`, `aq-card__reset`, `aq-card__meta`, `aq-heat`, `aq-heatwrap`, `aq-tag`, `aq-tag--warning`, `aq-tag--critical`, `aq-tag--off` |
| Panels | `aq-sheet`, `aq-sheet__head`, `aq-sheet__services`, `aq-svc`, `aq-notice`, `aq-notice--mac` |

Tokens: ink `--ink`, `--ink-2`, `--ink-3`; grounds `--canvas`, `--surface`, `--surface-2`, `--glass`, `--glass-edge`, `--line`; brand `--accent`, `--brand`, `--on-brand`; state `--warning`, `--critical` (with `-ink` variants); heat `--data-0` to `--data-4`; spacing `--space-1` to `--space-32`; radii `--radius-xs` to `--radius-lg`, `--radius-card`, `--radius-pill`; `--shadow-float`; type `--font-sans`, `--font-mono`.

## Where the truth lives

Read `tokens/tokens.css` and `_ds_bundle.css` before you style anything. Each `components/<Group>/<Name>/<Name>.prompt.md` gives that component's rules and copy. Its `<Name>.html` is working markup. Copy the dial's SVG from `QuotaDial.html` rather than drawing your own arcs. The app icon is `assets/Logos/aiquota-app-icon.png`.

## Example

```html
<body class="aq-root">
  <section class="aq-wash" style="padding: var(--space-32) var(--space-24); display: grid; gap: var(--space-16)">
    <p class="aq-eyebrow">For Mac, iPhone and iPad</p>
    <h1 class="aq-display">Know before you hit the limit.</h1>
    <p class="aq-lead">AIQuota shows how much of your Codex and Claude allowance is left.</p>
    <div style="display: flex; gap: var(--space-3)">
      <a class="aq-btn aq-btn--primary" href="#">Download for Mac</a>
      <a class="aq-btn aq-btn--secondary aq-glass" href="#">Get the iPhone app</a>
    </div>
  </section>
</body>
```
