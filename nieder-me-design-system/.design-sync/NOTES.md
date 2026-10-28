# design-sync notes: nieder.me

## How this sync works

- Off-script sync: these systems are CSS classes + HTML previews, not React, so the design-sync converter (package-build.mjs) does not apply. `tools/design-sync/build.mjs <system-dir>` assembles the upload layout from `.design-sync/config.json`. Validate with the skill's `package-validate.mjs <system-dir>/ds-bundle` (stage it into `.ds-sync/` with esbuild, ts-morph and playwright).
- No `_ds_sync.json` anchor is produced (no React manifest to hash), so every re-sync re-verifies everything. That is cheap here: rebuild, validate, look at the contact sheet.
- Upload incl. `assets/**` (not in the skill's default plan globs). Pass `mimeType: image/svg+xml` for .svg files.
- The validator's render server does not serve SVGs to `<img>`/CSS masks properly; its screenshots show broken or missing icons. Over a plain `python3 -m http.server` they load. Not a real defect.
- The card previews (`components/<Name>/preview.html`) and `README.md` are the source. The build only relinks stylesheets to `styles.css`, rebases asset paths, fills a missing `@dsCard group`, and turns READMEs into `<Name>.prompt.md`.

## This system

- **Söhne is licensed (Klim). Never commit font files to this public repo** (.gitignore blocks *.woff2 etc.). The build reads them from the local nieder.me checkout via `fontsDir` (`../../nieder.me/assets/fonts`, i.e. ~/~Repos/nieder.me) and copies only the files the CSS references into the gitignored `ds-bundle/assets/fonts/`.
- `assets/css/` and `assets/icons/` are copies from the nieder.me repo, kept at the site's own `assets/` layout so the CSS's `../icons` and `../fonts` urls resolve. The design-system page loads only `work-case-study.css` + `styleguide.css`, not the homepage `styles.css`.
- Cards were split out of `index.html` (one per styleguide section, plus SiteNav and SiteFooter); the Tokens section was left out (tokens ship as `tokens/design-tokens.json`).
- Not in the bundle (they live in homepage `styles.css` only): `case-study-promo-cta`, `--about-surface`, `--colophon-surface`, `--grid-col-width`, `--lede-size`. `design-system.md` still names some of them; the conventions header and card docs don't. Prominent links in this bundle are `styleguide-button-lg`/`-md`.
- SiteNav: the desktop rail shows from 960px; below that only the mobile bar shows.
- [FONT_MISSING] for SF Pro Text / SF Pro Display / Arial Nova is expected: they're fallbacks after Söhne.

## Re-sync risks

- `assets/css/*.css` and icons are copies of ~/~Repos/nieder.me (last synced from its commit 71c9d02). Re-copy them when the site changes, and diff `index.html` against `nieder.me/design-system/index.html`.
- A build on a machine without the nieder.me checkout fails at `fontsDir` (by design; fonts aren't in git).
- Case-study hero images referenced by work-case-study.css aren't shipped (not needed by any card); they 404 harmlessly.

## Project

- Claude Design: https://claude.ai/design/p/ed6d8d2f-125b-4866-b856-f38510657509 (first synced 2026-10-24, account john@nieder.me). The older hand-made "nieder.me Design System" project (5b9f3f1c-…) is separate and was left untouched.
