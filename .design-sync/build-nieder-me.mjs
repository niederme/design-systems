#!/usr/bin/env node
// Off-script design-sync layout for nieder-me-design-system. The system is one
// specimen page (index.html) styled by the nieder.me site CSS, which lives in
// the nieder.me repo, not here. This script takes the page's own sections as
// cards and ships the exact stylesheets the page loads, plus fonts and icons.
//
// Usage: node .design-sync/build-nieder-me.mjs <system-dir> [--site <nieder.me repo>]
// Reads <system-dir>/.design-sync/config.json, writes <system-dir>/ds-bundle/.

import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';
import { homedir } from 'node:os';

const SYS = resolve(process.argv[2] ?? '');
const cfg = JSON.parse(readFileSync(join(SYS, '.design-sync', 'config.json'), 'utf8'));
const siteFlag = process.argv.indexOf('--site');
const SITE = resolve(siteFlag > 0 ? process.argv[siteFlag + 1] : cfg.siteRepo.replace(/^~/, homedir()));
const OUT = join(SYS, 'ds-bundle');
const read = (p) => readFileSync(p, 'utf8');
const write = (rel, data) => {
  const p = join(OUT, rel);
  mkdirSync(join(p, '..'), { recursive: true });
  writeFileSync(p, data);
};
if (!existsSync(join(SITE, 'assets', 'css'))) throw new Error(`site repo not found at ${SITE} (set siteRepo or pass --site)`);

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

// Tokens, fonts, icons.
cpSync(join(SYS, 'design-tokens.json'), join(OUT, 'tokens', 'design-tokens.json'));
if (cfg.shipFonts) cpSync(join(SITE, 'assets', 'fonts'), join(OUT, 'fonts'), { recursive: true, filter: (s) => basename(s) !== '.DS_Store' });
cpSync(join(SITE, 'assets', 'icons'), join(OUT, 'assets', 'icons'), { recursive: true, filter: (s) => basename(s) !== '.DS_Store' });

// The stylesheets the specimen page loads, in its order. Fonts and icons are
// rebased onto the bundle root; case-study photography stays on the live site.
const css = cfg.stylesheets.map((f) => `/* ${f} from ${cfg.siteRepo} */\n` + read(join(SITE, f))).join('\n\n')
  .replace(/url\("\.\.\/fonts\//g, cfg.shipFonts ? 'url("./fonts/' : 'url("https://nieder.me/assets/fonts/')
  // SVG icons inline as data URIs, as in build-css-ds.mjs: masks need an
  // image/svg+xml response, and designs may not carry relative image urls.
  .replace(/url\("\.\.\/icons\/([^"]+\.svg)"\)/g, (_, rel) => {
    const svg = read(join(SITE, 'assets', 'icons', rel)).replace(/\s+/g, ' ').trim();
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  })
  .replace(/url\("\.\.\/icons\//g, 'url("./assets/icons/')
  .replace(/url\("\.\.\/images\//g, 'url("https://nieder.me/assets/images/');
write('_ds_bundle.css', css);
write('styles.css', '@import "./_ds_bundle.css";\n');

// Cards: top-level <section>s of the page, picked by id or class.
const page = read(join(SYS, 'index.html'));
function sectionAt(start) {
  const re = /<\/?section\b[^>]*>/g;
  re.lastIndex = start;
  let depth = 0, m;
  while ((m = re.exec(page))) {
    depth += m[0][1] === '/' ? -1 : 1;
    if (depth === 0) return page.slice(start, re.lastIndex);
  }
  throw new Error(`unclosed section at ${start}`);
}
function block(sel) {
  const open = sel.tag ?? 'section';
  const re = new RegExp(`<${open}\\b[^>]*${sel.id ? `id="${sel.id}"` : `class="${sel.class}"`}[^>]*>`);
  const at = page.search(re);
  if (at < 0) throw new Error(`card source not found: ${JSON.stringify(sel)}`);
  if (open === 'section') return sectionAt(at);
  const close = page.indexOf(`</${open}>`, at);
  return page.slice(at, close + open.length + 3);
}
const dedent = (s) => {
  const lines = s.split('\n');
  const pad = Math.min(...lines.slice(1).filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length));
  return [lines[0], ...lines.slice(1).map((l) => l.slice(pad))].join('\n');
};

const components = [];
for (const c of cfg.cards) {
  const markup = dedent(block(c.source)).replace(/(src|href)="\.\.\/assets\//g, '$1="../../../assets/');
  const dir = `components/${c.group}/${c.name}`;
  const attrs = `group="${c.group}" height=${c.height} subtitle="${c.subtitle}"`;
  write(`${dir}/${c.name}.html`, `<!-- @dsCard ${attrs} -->
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="../../../styles.css">
<title>${c.name}</title>${c.previewCss ? `\n<style>/* preview only, not part of the system */ ${c.previewCss}</style>` : ''}
</head>
<body class="policy-page is-subpage design-system-page">
<div id="root" class="work-page"><main class="work-article">
${markup}
</main></div>
</body>
</html>
`);
  const markupForDoc = markup.replace(/\.\.\/\.\.\/\.\.\/assets\//g, 'assets/');
  write(`${dir}/${c.name}.prompt.md`, `${c.name}: ${c.summary}

${c.notes ?? ''}

## Markup

CSS only: no JS component. Load \`styles.css\`, put the page in \`<body class="policy-page is-subpage design-system-page">\` > \`<div class="work-page">\` > \`<main class="work-article">\`, and write this markup:

\`\`\`html
${markupForDoc}
\`\`\`
`.replace(/\n{3,}/g, '\n\n'));
  components.push({ ...c, dir });
}

const header = cfg.readmeHeader && existsSync(join(SYS, cfg.readmeHeader)) ? read(join(SYS, cfg.readmeHeader)).trim() + '\n\n' : '';
const spec = read(join(SYS, 'design-system.md')).trim();
const index = ['## Components', '', ...components.map((c) => `- **${c.name}** (${c.group}): ${c.subtitle}. Usage: \`${c.dir}/${c.name}.prompt.md\`; card: \`${c.dir}/${c.name}.html\`.`), ''].join('\n');
write('README.md', header + spec + '\n\n' + index);

const meta = { namespace: cfg.globalName, components: [], sourceHashes: {}, inlinedExternals: [], builtBy: 'cc-design-sync' };
write('_ds_bundle.js', `/* @ds-bundle: ${JSON.stringify(meta).replace(/\*\//g, '*\\/')} */\n/* CSS-only design system: no JS components. Styles load from styles.css. */\n`);
write('_ds_needs_recompile', JSON.stringify({ by: 'design-sync-cli' }));
write('.ds-build-meta.json', JSON.stringify({ shape: 'package', componentCount: components.length, offScript: 'css-only' }, null, 2));
console.error(`built ${OUT}: ${components.length} components (${components.map((c) => c.name).join(', ')})`);
