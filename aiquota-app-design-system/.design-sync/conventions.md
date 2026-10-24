# How to build with AIQuota App

CSS only: there are no React components and nothing on `window.AIQuotaApp`. Build plain HTML/JSX with the system's classes and tokens. Everything loads from `styles.css` (tokens, then the component CSS, then Inter from Google Fonts).

## Setup

- Put the screen inside `<body class="aq">` (or a wrapper `div.aq`). Without it, `box-sizing` and the base type are off.
- Dark is the default. Light: set `data-theme="light"` on `<html>`.
- Ground every screen in `.aq-wash` (the overview's purple wash) or `.aq-surface` (sheets). Cards and the notice go on top as `.aq-glass`. Never put glass on plain black.

## Vocabulary (BEM, `aq-` prefix)

| Family | Classes |
|---|---|
| Grounds | `aq-wash`, `aq-surface`, `aq-glass`, `aq-glass--raised` |
| Buttons | `aq-btn aq-btn--prominent` (filled accent), `aq-btn aq-btn--glass aq-glass`, `aq-btn--small`, `aq-iconbtn` in `aq-toolbar aq-glass`, `aq-iconbtn--mac`, `aq-link` |
| Dial | `aq-dial` + `--warning` / `--critical` / `--off` / `--mac`; `aq-dial__track`, `aq-dial__fill`, `aq-dial__fill--2`, `aq-dial__body`, `aq-dial__values`, `aq-dial__label`; glyph `aq-glyph aq-glyph--openai` / `--claude` |
| Service card | `aq-card aq-glass` > `aq-card__head` (`aq-card__name`, `aq-card__plan`, `aq-chev`), `aq-card__details`, `aq-card__reset`, `aq-card__meta`, `aq-card__status`; `aq-card--stacked` at large text |
| Heatmap | `aq-heat` > `aq-heat__title`, `aq-heat__grid`, `aq-heat__months` |
| Notice | `aq-notice aq-glass` > `aq-notice__title`, `aq-notice__text`, `aq-notice__link`, `aq-notice__close`; `aq-notice--mac` |
| Mac | `aq-macsheet` (`__head`, `__body`, `__foot`), `aq-macrow` (`__name`, `__plan`, `__cap`, `__warn`) |
| iPhone frame | `aq-phone`, `aq-island`, `aq-screen`, `aq-navbar`, `aq-home` |
| Numbers | `aq-num` (tabular digits) |

Your own layout glue: plain flex/grid with `var(--space-4 … --space-24)`, radii `var(--radius-card)`, colours from tokens only (`--primary`, `--secondary`, `--tertiary`, `--accent`, `--warning`, `--critical`, `--base`). Never hard-code a hex value.

## Rules

- State colour by the worst window: under 85% default (accent), 85% and up `aq-dial--warning`, 95% and up `aq-dial--critical`, disconnected `aq-dial--off`. The whole dial changes, not one ring.
- Dial arcs: SVG `viewBox="0 0 124 124"`, centre (62, 62). A ring of radius r starts at angle 135° and sweeps 270°×percent clockwise: point(θ) = (62 + r·cos θ, 62 + r·sin θ), path `M start A r r 0 <large> 1 end`, with large = 1 when the sweep is over 180°. Two windows: outer r 58 and inner r 48, stroke-width 8; one window: r 56, stroke-width 12. Draw the full 270° as `aq-dial__track` first.
- Copy: short, literal, sentence case, numbers first (*62% 5h*, *5h resets 3:40 PM*).

## Where the truth lives

`_ds_bundle.css` (every class), `tokens/tokens.css` (every token), and each component's `components/<group>/<Name>/<Name>.prompt.md`, whose markup block is a working example to copy.

```html
<body class="aq"><div class="aq-wash" style="padding:var(--space-24)">
  <div class="aq-notice aq-glass">
    <p class="aq-notice__title">Codex usage reset announced</p>
    <a class="aq-notice__link" href="#">Read more on Codex Resets ↗</a>
  </div>
  <button class="aq-btn aq-btn--prominent" type="button">Continue</button>
</div></body>
```
