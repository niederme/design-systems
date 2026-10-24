# How to build with AIQuota Website

CSS only: there are no React components and nothing on `window.AIQuotaWebsite`. Build plain HTML/JSX with the system's classes and tokens. Everything loads from `styles.css` (tokens, then the component CSS, then Inter from Google Fonts).

## Setup

- Put the page inside `<body class="aq-root">` (or a wrapper `div.aq-root`). Without it the base type and colours are off.
- The theme follows the visitor's system setting. To force one, set `data-theme="light"` or `data-theme="dark"` on `<html>`. Dark is the lead theme.
- The hero sits in `.aq-wash`. Everything on it is glass (`.aq-glass`). Readings are dials.

## Vocabulary (BEM, `aq-` prefix)

| Family | Classes |
|---|---|
| Type | `aq-display`, `aq-lead`, `aq-eyebrow` |
| Buttons | `aq-btn` + `--primary` (one per view, `brand` fill), `--secondary` (glass), `--plain`, `--lg`; `aq-icongroup` |
| Nav | `aq-nav aq-glass` > `aq-nav__brand`, `aq-nav__links` > `aq-nav__link`; `aq-nav--raised` |
| Theme | `aq-theme`, `aq-theme--compact` |
| Dial | `aq-dial` + `--warning` / `--critical` / `--single` / `--lg`; `aq-dial__track`, `aq-dial__track--off`, `aq-dial__fill`, `aq-dial__fill--secondary`, `aq-dial__values` |
| Service card | `aq-card aq-glass` > `aq-card__top`, `aq-card__body`, `aq-card__name`, `aq-card__plan`, `aq-card__reset`, `aq-card__meta`, `aq-card__chev` |
| Mac panel | `aq-sheet` (`__head`, `__body`, `__services`, `__foot`) with rows `aq-svc` (`__name`, `__plan`, `__reset`) |
| Status | `aq-tag` + `--warning` / `--critical` / `--off` |
| Notice | `aq-notice` > `aq-notice__title`, `aq-notice__text`, `aq-notice__link`, `aq-notice__close`; `aq-notice--mac` |
| Heatmap | `aq-heatwrap` > `aq-heat`, `aq-heat__months` (cells use `--data-0` to `--data-4`) |

Your own layout glue: plain flex/grid with `var(--space-1 … --space-32)`, radii `var(--radius-xs … --radius-sheet)`, colours from tokens only: `--canvas`, `--surface`, `--surface-2`, `--ink`, `--ink-2`, `--ink-3`, `--accent`, `--accent-ink` (purple words), `--brand`/`--on-brand`, `--warning`, `--critical`, `--line`. Never hard-code a hex value.

## Rules

- Purple is the quota colour; red (`critical`) only when an allowance is spent. State by the worst window: 85% and up `--warning`, 95% and up `--critical`, applied to the whole dial.
- Show the app, don't describe it: use the service card, Mac panel and notice with sample readings, not screenshots.
- Copy: short, literal, sentence case, numbers first.

## Where the truth lives

`_ds_bundle.css` (every class), `tokens/tokens.css` (every token), and each component's `components/<group>/<Name>/<Name>.prompt.md`, whose markup block is a working example. Copy dial SVGs from the QuotaDial or ServiceCard example and change only the fill arc.

```html
<body class="aq-root"><section class="aq-wash" style="padding:var(--space-24)">
  <p class="aq-eyebrow">For Mac, iPhone and iPad</p>
  <h1 class="aq-display">Know before you hit the limit.</h1>
  <div style="display:flex;gap:var(--space-3)">
    <a class="aq-btn aq-btn--primary aq-btn--lg" href="#">Download for Mac</a>
    <a class="aq-btn aq-btn--secondary aq-btn--lg" href="#">Get the iPhone app</a>
  </div>
</section></body>
```
