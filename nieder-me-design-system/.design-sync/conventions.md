# How to build with nieder.me

CSS only: there are no React components and nothing on `window.NiederMe`. Build plain HTML/JSX with the site's own classes and tokens. Everything loads from `styles.css`: the nieder.me site stylesheet (`work-case-study.css`), the style guide stylesheet (`styleguide.css`), and the Söhne `@font-face` rules with their font files in `fonts/`.

## Setup

- Page shell, as the site writes it: `<body class="policy-page is-subpage">` > `<div class="work-page">` > `<main class="work-article">`. Without this shell, the grid, rail and type scale don't apply.
- Dark is the default (`--bg` black, `--fg` white). Light: set `data-theme="light"` on `<html>` and every token remaps. Design dark first.
- Family: `font-family: "Sohne"` at weights 300, 400 and 700 (italics too). It's already the body font, so don't set another.

## Vocabulary

| Family | Classes |
|---|---|
| Page title | `section.work-index-header` > `div.rule` + `div.work-index-header-copy` > `h1` + `h2` (the second line renders in accent red) |
| Article blocks | `section.work-article-grid` > `div.work-article-section` (`h2` + `div.work-article-body`); meta cards `work-article-meta-card` with `work-article-meta-label` / `work-article-meta-value` |
| Numbered sections | `section.styleguide-section` > `div.rule` + `div.styleguide-section-grid` > `header.styleguide-section-head` (`p.styleguide-section-index` "01", `h2`) + `div.styleguide-section-body` (`p.styleguide-section-intro`) |
| Rules | `div.rule`: the hairline that opens every section |
| Links and buttons | `a.text-link` inline; `a.styleguide-button-lg` / `a.styleguide-button-md` (white fill, black text, 5px radius) for the one emphasised action. Links do most of the work, buttons are rare. |
| Footer | `footer.site-footer`: copy the SiteFooter example whole; social icons are `span.social-icon.social-icon-{github,linkedin,x,instagram,email}` |
| Utility | `visually-hidden` |

Tokens for your own glue: `--bg`, `--fg`, `--muted`, `--line`, `--accent`, `--accent-hover`, `--focus-ring`, `--grid-gutter` (40px rhythm), `--grid-width` (1268px max). Spacing steps 5, 8, 10, 12, 15, 20, 24, 28, 40px. Radii 0 for rules and squares, 999px for pills. Never hard-code a colour: use the tokens so light mode keeps working.

## Rules

- Editorial and typography-led: large display type sets the tone; body copy stays at a measured width (about 60 to 70 characters).
- One accent: red (`--accent`) carries all emphasis and interaction. Nothing else is coloured.
- Structure stays visible: every section opens with `div.rule` and its numbered head.

## Where the truth lives

`_ds_bundle.css` (every class and token), `tokens/design-tokens.json` (W3C tokens with light values), this README's spec below, and each card's `components/<group>/<Name>/<Name>.prompt.md`, whose markup block is the site's own HTML.

```html
<body class="policy-page is-subpage"><div class="work-page"><main class="work-article">
  <section class="work-index-header">
    <div class="rule"></div>
    <div class="work-index-header-copy"><h1>Selected</h1><h2>Work</h2></div>
  </section>
  <section class="styleguide-section">
    <div class="rule"></div>
    <div class="styleguide-section-grid">
      <header class="styleguide-section-head"><p class="styleguide-section-index">01</p><h2>About</h2></header>
      <div class="styleguide-section-body"><p class="styleguide-section-intro">Product design and direction, with <a class="text-link" href="#">case studies</a>.</p></div>
    </div>
  </section>
</main></div></body>
```
