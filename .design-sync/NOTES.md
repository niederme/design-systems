# design-sync notes

Three CSS-only design systems, each synced to its own claude.ai/design project. Each system folder is its own config home (`<system>/.design-sync/config.json`, with `projectId` once pinned). The design-sync converter (`package-build.mjs`) expects a React package, so these use off-script generators in this folder:

- `build-css-ds.mjs <system>`: AIQuota App and AIQuota Website (tokens.css + components/bundle.css + components/<Name>/preview.html + README.md).
- `build-nieder-me.mjs <system>`: nieder.me. Pulls `work-case-study.css` + `styleguide.css`, Söhne fonts and icons from the nieder.me repo (`siteRepo`, default `~/~Repos/nieder.me`) and cuts `index.html` into cards by section.

Both write `<system>/ds-bundle/`. Gate with `node .ds-sync/package-validate.mjs <system>/ds-bundle` (stage `.ds-sync/` per the skill; install `playwright@1.59.0` there, which matches the cached chromium-1217, plus `ts-morph`).

## Projects (first synced 2026-10-24, account john@nieder.me)

- AIQuota App Design System: https://claude.ai/design/p/2deee27f-2073-4d6d-9c88-a9a6ea8b7585
- AIQuota Website Design System: https://claude.ai/design/p/d5c84a77-9e77-41cf-8ee6-7a0e3571b340
- nieder.me Design System (synced): https://claude.ai/design/p/ed6d8d2f-125b-4866-b856-f38510657509. The older hand-made "nieder.me Design System" project (5b9f3f1c-…) was left untouched.

Re-syncs go to the pinned `projectId` in one pass: rebuild, validate, then upload with full writes. Delete only remote files the new build no longer produces.

## Gotchas

- **Söhne is licensed: never commit the font files.** This repo is public. Fonts reach `ds-bundle/fonts/` only at build time, and `.gitignore` blocks `*.woff2`, `*.woff`, `*.otf` and `*.ttf` repo-wide. Uploading them to the private Claude Design project is fine (John's OK, 2026-10-24).
- SVG masks and icons are inlined into `_ds_bundle.css` as data URIs. The local preview server (`storybook/http-serve.mjs`) serves `.svg` as `application/octet-stream`, which breaks CSS masks, and designs may not carry relative image urls anyway.
- nieder.me's specimen page loads `work-case-study.css`, not the home page's `styles.css`. Classes only in `styles.css` (for example `case-study-promo-cta`) are absent by design; the conventions note names `styleguide-button-lg`/`-md` instead.
- nieder.me card heights are measured at 1280px wide (section bottom + 40px) and stored in config. Re-measure if the site layout changes. SiteFooter zeroes the footer's 320px top margin in the card only (`previewCss`).
- Cover cards had no `group`; they're grouped `Brand` via `groups` in config.
- No `.d.ts`/`.jsx` per component and an empty-bodied `_ds_bundle.js` (no exports): there is no JS API. The agent builds with classes, documented in each `.prompt.md` (the README plus the card's markup) and the conventions header.
- No `_ds_sync.json` anchor: these are off-script layouts, so every sync re-verifies everything (about 30 cards, quick).

## Known render warns

- `_ds_sync.json absent` on all three: expected (off-script).
- nieder.me `[FONT_MISSING] "SF Pro Text", "SF Pro Display", "Arial Nova"`: system fallbacks after Söhne in the stack, not brand fonts.

## Re-sync risks

- nieder.me CSS, fonts and icons come from the local nieder.me checkout at build time. Pull it first, or the sync ships stale site CSS.
- `index.html` here is a copy of `design-system/index.html` in the nieder.me repo; card sources are found by section id or class. A renamed section fails the build loudly.
- AIQuota previews are hand-maintained HTML stand-ins for SwiftUI views. Nothing checks them against the apps.
- The conventions notes name classes and tokens; re-validate them against `_ds_bundle.css` after any CSS change.
