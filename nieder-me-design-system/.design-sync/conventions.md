# Building with the nieder.me design system

This is nieder.me's production CSS: semantic HTML, bespoke CSS, minimal JS. There are no JS components: `window.NiederMe` is empty. Build pages with plain HTML, the site's classes and the CSS custom properties below.

## Setup

- `styles.css` loads everything: `_ds_bundle.css` is the site's `work-case-study.css` (tokens, Söhne `@font-face`, page layout) followed by `styleguide.css`.
- Use the page shell the site uses, or nothing lays out:

```html
<body class="is-subpage">
  <div class="work-page">
    <!-- SiteNav: nav.mobile-nav, aside.rail, nav.global-nav -->
    <main class="work-article"> … sections … </main>
  </div>
</body>
```

- Dark is the default. `data-theme="light"` on `<html>` switches every token.
- Söhne (`"Sohne"`) ships as 300 Leicht, 400 Buch, 600 Dreiviertelfett and 700 Halbfett, with italics for 400 and 700 only. Don't substitute another family.

## Styling idiom

Tokens for color and rhythm; the site's classes for structure. Keep plain elements plain: `h1` to `h6`, `p`, `a`, `ul` and `blockquote` inside `main.work-article` are already styled.

| Family | Real names |
|---|---|
| Page top | `work-index-header`, `work-index-header-copy`, `rule` |
| Article layout (4/8 split) | `work-article-grid`, `work-article-meta`, `work-article-meta-card`, `work-article-meta-label`, `work-article-meta-value`, `work-article-body`, `work-article-section` |
| Actions | `styleguide-button-lg`, `styleguide-button-md` (prominent links); otherwise plain `<a>` |
| Navigation | `global-nav`, `global-nav-anchor`, `global-nav-popover`, `mobile-nav`, `mobile-nav-anchor`, `is-active`, `theme-toggle`, `cols-toggle` |
| Footer | `site-footer`, `site-footer-grid`, `site-footer-brand`, `site-footer-name`, `site-footer-role`, `site-footer-social`, `site-footer-column`, `site-footer-links` |
| Utility | `visually-hidden` |

Other `styleguide-*` classes exist only to document the system (specimens, swatches, token tables). Don't use them on site pages. The two button classes are the exception: they're the only prominent-link styles in this bundle.

Tokens: `--bg`, `--fg`, `--muted`, `--line`, `--accent`, `--accent-hover`, `--focus-ring`, `--footer-meta`; grid `--grid-cols` (12), `--grid-gutter` (40px), `--grid-width` (1268px), with 69px columns. Spacing steps are 8, 16, 24, 40 and 72px or more. Red is rare: emphasis, interaction, and the second line of a display headline.

## Where the truth lives

Read `README.md` (the written system), `tokens/design-tokens.json`, and `_ds_bundle.css` before you style anything. Each `components/<Group>/<Name>/<Name>.prompt.md` gives that pattern's rules. Its `<Name>.html` is working markup, so copy from it. Icons are in `assets/icons/` (`side-nav/`, `social/`, `logo-mark.svg`).

## Example

```html
<main class="work-article">
  <section class="work-index-header">
    <div class="rule"></div>
    <div class="work-index-header-copy"><h1>Selected</h1><h2>Work</h2></div>
  </section>
  <section class="work-article-grid">
    <aside class="work-article-meta">
      <div class="work-article-meta-card">
        <p class="work-article-meta-label">Role</p>
        <p class="work-article-meta-value">Design direction</p>
      </div>
    </aside>
    <article class="work-article-body">
      <section class="work-article-section">
        <h2>Overview</h2>
        <p>Measured copy, with an <a href="#">inline link</a>.</p>
        <a class="styleguide-button-lg" href="#">View Case Study</a>
      </section>
    </article>
  </section>
</main>
```
