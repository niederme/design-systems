#!/usr/bin/env node
// Off-script design-sync layout for the CSS-only design systems in this repo.
// The design-sync converter expects a React package; these systems are tokens,
// one component stylesheet, and hand-written preview cards. This script lays
// them out in the claude.ai/design upload format (README, styles.css closure,
// components/<group>/<Name>/<Name>.{html,prompt.md}, empty-bodied
// _ds_bundle.js) so package-validate.mjs can gate them like any other sync.
//
// Usage: node .design-sync/build-css-ds.mjs <system-dir>
// Reads <system-dir>/.design-sync/config.json, writes <system-dir>/ds-bundle/.

import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';

const SYS = resolve(process.argv[2] ?? '');
const cfg = JSON.parse(readFileSync(join(SYS, '.design-sync', 'config.json'), 'utf8'));
const OUT = join(SYS, 'ds-bundle');
const read = (p) => readFileSync(p, 'utf8');
const write = (rel, data) => {
  const p = join(OUT, rel);
  mkdirSync(join(p, '..'), { recursive: true });
  writeFileSync(p, data);
};
const skipJunk = (src) => basename(src) !== '.DS_Store';

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

// Tokens and assets ship as-is.
const tokenFiles = cfg.tokens ?? ['tokens.css', 'tokens.json'];
for (const f of tokenFiles) cpSync(join(SYS, f), join(OUT, 'tokens', basename(f)));
if (existsSync(join(SYS, 'assets'))) cpSync(join(SYS, 'assets'), join(OUT, 'assets'), { recursive: true, filter: skipJunk });

// Component CSS. SVG masks are inlined as data URIs: designs receive the
// styles.css import closure, and a relative image url() may not travel with it.
let bundleCss = read(join(SYS, cfg.componentCss ?? 'components/bundle.css'));
bundleCss = bundleCss.replace(/url\("\.\.\/(assets\/[^"]+\.svg)"\)/g, (_, rel) => {
  const svg = read(join(SYS, rel)).replace(/\s+/g, ' ').trim();
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
});
bundleCss = bundleCss.replace(/url\("\.\.\/assets\//g, 'url("./assets/');
write('_ds_bundle.css', bundleCss);
write('styles.css', [...tokenFiles.filter((f) => f.endsWith('.css')).map((f) => `@import "./tokens/${basename(f)}";`), '@import "./_ds_bundle.css";', ''].join('\n'));

// Cards and usage docs, one per components/<Name>/preview.html.
const components = [];
const compRoot = join(SYS, 'components');
for (const name of readdirSync(compRoot).sort()) {
  const previewPath = join(compRoot, name, 'preview.html');
  if (!existsSync(previewPath)) continue;
  let html = read(previewPath);
  const [first, ...rest] = html.split('\n');
  const card = /^<!--\s*@dsCard\b(.*?)-->/.exec(first);
  if (!card) throw new Error(`${previewPath}: first line isn't an @dsCard comment`);
  let attrs = card[1].trim();
  let group = /group="([^"]*)"/.exec(attrs)?.[1];
  if (!group) {
    group = cfg.groups?.[name] ?? 'Brand';
    attrs = `group="${group}" ${attrs}`;
  }
  const subtitle = /subtitle="([^"]*)"/.exec(attrs)?.[1] ?? '';
  html = rest.join('\n')
    .replace(/<link rel="stylesheet" href="\.\.\/\.\.\/tokens\.css">\s*<link rel="stylesheet" href="\.\.\/bundle\.css">/, '<link rel="stylesheet" href="../../../styles.css">')
    .replace(/(["(])\.\.\/\.\.\/assets\//g, '$1../../../assets/')
    .replace(/(<body[^>]*>)([\s\S]*)(<\/body>)/, '$1\n<div id="root">$2</div>\n$3');
  if (html.includes('tokens.css') || html.includes('bundle.css')) throw new Error(`${previewPath}: stylesheet links not rewritten`);
  const dir = `components/${group}/${name}`;
  write(`${dir}/${name}.html`, `<!-- @dsCard ${attrs} -->\n${html}`);

  // Usage doc: summary line first (the element index reads it), then the
  // component README, then the preview's own markup as the worked example.
  const readmePath = join(compRoot, name, 'README.md');
  const readme = existsSync(readmePath) ? read(readmePath).replace(/^#[^\n]*\n+/, '').trim() : '';
  const [lead, ...paras] = readme ? readme.split(/\n\s*\n/) : [];
  const summary = lead ? lead.replace(/\s+/g, ' ') : (cfg.summaries?.[name] ?? `${name} card.`);
  const body = /<body[^>]*>([\s\S]*)<\/body>/.exec(read(previewPath))?.[1].trim() ?? '';
  const style = /<style>([\s\S]*?)<\/style>/.exec(read(previewPath))?.[1].trim() ?? '';
  const prompt = [
    `${name}: ${summary}`,
    '',
    paras.join('\n\n'),
    '',
    `## Markup`,
    '',
    `CSS only: no JS component. Load \`styles.css\` and write this markup. Preview-only layout rules (not part of the system) were:`,
    '',
    '```css', style, '```',
    '',
    '```html', body, '```',
    '',
  ].join('\n').replace(/\n{3,}/g, '\n\n');
  write(`${dir}/${name}.prompt.md`, prompt);
  components.push({ name, group, subtitle, dir });
}

// README: conventions header, the system's own README, then a component index.
const header = cfg.readmeHeader && existsSync(join(SYS, cfg.readmeHeader)) ? read(join(SYS, cfg.readmeHeader)).trim() + '\n\n' : '';
const index = ['## Components', '', ...components.map((c) => `- **${c.name}** (${c.group})${c.subtitle ? `: ${c.subtitle}` : ''}. Usage: \`${c.dir}/${c.name}.prompt.md\`; card: \`${c.dir}/${c.name}.html\`.`), ''].join('\n');
write('README.md', header + read(join(SYS, 'README.md')).trim() + '\n\n' + index);

// No JS exports: the header lists none so the self-check expects none.
const meta = { namespace: cfg.globalName, components: [], sourceHashes: {}, inlinedExternals: [], builtBy: 'cc-design-sync' };
write('_ds_bundle.js', `/* @ds-bundle: ${JSON.stringify(meta).replace(/\*\//g, '*\\/')} */\n/* CSS-only design system: no JS components. Styles load from styles.css. */\n`);
write('_ds_needs_recompile', JSON.stringify({ by: 'design-sync-cli' }));
write('.ds-build-meta.json', JSON.stringify({ shape: 'package', componentCount: components.length, offScript: 'css-only' }, null, 2));
console.error(`built ${OUT}: ${components.length} components (${components.map((c) => c.name).join(', ')})`);
