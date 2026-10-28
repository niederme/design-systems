# design-sync notes: AIQuota App

## How this sync works

- Off-script sync: these systems are CSS classes + HTML previews, not React, so the design-sync converter (package-build.mjs) does not apply. `tools/design-sync/build.mjs <system-dir>` assembles the upload layout from `.design-sync/config.json`. Validate with the skill's `package-validate.mjs <system-dir>/ds-bundle` (stage it into `.ds-sync/` with esbuild, ts-morph and playwright).
- No `_ds_sync.json` anchor is produced (no React manifest to hash), so every re-sync re-verifies everything. That is cheap here: rebuild, validate, look at the contact sheet.
- Upload incl. `assets/**` (not in the skill's default plan globs). Pass `mimeType: image/svg+xml` for .svg files.
- The validator's render server does not serve SVGs to `<img>`/CSS masks properly; its screenshots show broken or missing icons. Over a plain `python3 -m http.server` they load. Not a real defect.
- The card previews (`components/<Name>/preview.html`) and `README.md` are the source. The build only relinks stylesheets to `styles.css`, rebases asset paths, fills a missing `@dsCard group`, and turns READMEs into `<Name>.prompt.md`.

## This system

- 11 cards. `Cover` has no README and no group; config `promptFallback` covers the doc; the build files it under `Brand` (`defaultGroup`, default Brand).
- Glyph icons are CSS masks. `"inlineSvg": true` in config makes the build turn `assets/Glyphs/*.svg` url()s into data URIs in `_ds_bundle.css`, so they render without `assets/` beside the CSS (designs only get the styles.css closure). Added 2026-10-28 to match a project-side edit; without it the upload would regress the glyphs.

## Re-sync risks

- The project can change outside this repo (it did on 2026-10-28: inlined glyphs, a different README header). No `_ds_sync.json` anchor exists to detect that, so before uploading, `get_file` `README.md` and `_ds_bundle.css` and diff them against `ds-bundle/`.

- Cards and tokens are hand-matched to niederme/ai-quota (bundle.css header names the commit). They go stale when the SwiftUI changes; nothing checks this automatically.
- Inter comes from Google Fonts at runtime (remote @import).

## Project

- Claude Design: https://claude.ai/design/p/2deee27f-2073-4d6d-9c88-a9a6ea8b7585 (first synced 2026-10-24, account john@nieder.me)
