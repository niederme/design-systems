# design-sync notes: AIQuota Website

## How this sync works

- Off-script sync: these systems are CSS classes + HTML previews, not React, so the design-sync converter (package-build.mjs) does not apply. `tools/design-sync/build.mjs <system-dir>` assembles the upload layout from `.design-sync/config.json`. Validate with the skill's `package-validate.mjs <system-dir>/ds-bundle` (stage it into `.ds-sync/` with esbuild, ts-morph and playwright).
- No `_ds_sync.json` anchor is produced (no React manifest to hash), so every re-sync re-verifies everything. That is cheap here: rebuild, validate, look at the contact sheet.
- Upload incl. `assets/**` (not in the skill's default plan globs). Pass `mimeType: image/svg+xml` for .svg files.
- The validator's render server does not serve SVGs to `<img>`/CSS masks properly; its screenshots show broken or missing icons. Over a plain `python3 -m http.server` they load. Not a real defect.
- The card previews (`components/<Name>/preview.html`) and `README.md` are the source. The build only relinks stylesheets to `styles.css`, rebases asset paths, fills a missing `@dsCard group`, and turns READMEs into `<Name>.prompt.md`.

## This system

- 11 cards. `Cover` has no README; config `promptFallback` covers it.
- Known validator false positive: `[RENDER] HeroWash.html: root empty`. The card renders fully (checked by screenshot). The check looks for a React mount (`#root`); something about this card's markup trips it where the others pass. Ignore it unless the screenshot is actually empty.

## Re-sync risks

- Matched to the shipping apps by hand; stale when the apps change.
- Inter comes from Google Fonts at runtime.

## Project

- Claude Design: https://claude.ai/design/p/d5c84a77-9e77-41cf-8ee6-7a0e3571b340 (first synced 2026-10-24, account john@nieder.me)
