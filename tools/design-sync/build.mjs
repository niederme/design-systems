#!/usr/bin/env node
// Builds one design system in this repo into the claude.ai/design upload layout.
//
// These systems are CSS classes and HTML previews, not React components, so the
// design-sync converter (which bundles a React package's dist/) doesn't apply.
// This script produces the same contract by hand:
//   _ds_bundle.js       empty namespace with the @ds-bundle header (no JS components)
//   styles.css          @imports tokens/tokens.css, any extra CSS, then _ds_bundle.css
//   _ds_bundle.css      the system's components/bundle.css, asset urls rebased
//   tokens/             tokens.css + tokens.json (or design-tokens.json)
//   fonts/, assets/     copied as-is
//   components/<Group>/<Name>/<Name>.html       the preview, linked to styles.css
//   components/<Group>/<Name>/<Name>.prompt.md  the component README
//   README.md           conventions header + system README + component index
//
// Usage: node tools/design-sync/build.mjs <system-dir>

import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';

const SYS = resolve(process.argv[2] ?? '');
if (!process.argv[2] || !existsSync(join(SYS, '.design-sync/config.json'))) {
  console.error('usage: node tools/design-sync/build.mjs <system-dir>  (needs <system-dir>/.design-sync/config.json)');
  process.exit(1);
}
const cfg = JSON.parse(readFileSync(join(SYS, '.design-sync/config.json'), 'utf8'));
const OUT = join(SYS, 'ds-bundle');
const read = (p) => readFileSync(p, 'utf8');
const write = (p, s) => { mkdirSync(join(p, '..'), { recursive: true }); writeFileSync(p, s); };
const skip = (name) => name === '.DS_Store' || name.endsWith('.md');
const copyTree = (from, to) => cpSync(from, to, { recursive: true, filter: (src) => !skip(src.split('/').pop()) || statSync(src).isDirectory() });

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

// Rebase relative url()s in a stylesheet at <SYS>/<srcRel> so they resolve from
// <OUT>/<destRel>. Targets keep their system-relative path (assets/..., fonts/...).
const rebase = (css, srcRel, destRel) => css.replace(/url\((["']?)(?![a-z]+:|\/|#)([^"')]+)\1\)/gi, (_, q, u) => {
  const rel = relative(dirname(destRel), relative(SYS, resolve(SYS, dirname(srcRel), u)));
  return `url(${q}${rel.startsWith('../') ? rel : `./${rel}`}${q})`;
});

// Tokens. cfg.tokensCss: null when the component CSS defines its own tokens.
const tokensCss = cfg.tokensCss === undefined ? 'tokens.css' : cfg.tokensCss;
if (tokensCss) write(join(OUT, 'tokens/tokens.css'), rebase(read(join(SYS, tokensCss)), tokensCss, 'tokens/tokens.css'));
for (const j of ['tokens.json', 'design-tokens.json']) {
  if (existsSync(join(SYS, j))) copyTree(join(SYS, j), join(OUT, 'tokens', j));
}

let fontsFrom = null;
// Fonts and assets (stylesheets excluded: they ship inside _ds_bundle.css).
// cfg.fontsDir points outside this repo for licensed fonts, copied to
// cfg.fontsDest in the gitignored ds-bundle/ only, never committed here.
for (const dir of ['fonts', 'assets']) {
  if (existsSync(join(SYS, dir))) cpSync(join(SYS, dir), join(OUT, dir), { recursive: true, filter: (src) => statSync(src).isDirectory() || !(skip(src.split('/').pop()) || src.endsWith('.css')) });
}
if (cfg.fontsDir) {
  const from = resolve(SYS, cfg.fontsDir);
  if (!existsSync(from)) throw new Error(`fontsDir ${from} not found (licensed fonts are read from a local checkout)`);
  fontsFrom = from;
}

// cfg.inlineSvg: SVG url()s become data URIs, so the CSS works without assets/
// beside it (designs only receive the styles.css import closure).
const inlineSvg = (css) => !cfg.inlineSvg ? css : css.replace(/url\((["']?)\.\/([^"')]+\.svg)\1\)/gi, (_, q, u) =>
  `url("data:image/svg+xml,${encodeURIComponent(read(join(SYS, u)).trim())}")`);

// Component CSS: cfg.componentCss (system-relative, in cascade order) joined
// into _ds_bundle.css. Remote @imports must lead the file, so they're hoisted.
const imports = [];
const bundleCss = (cfg.componentCss ?? ['components/bundle.css']).map((p) =>
  inlineSvg(rebase(read(join(SYS, p)), p, '_ds_bundle.css')).replace(/@import\s+url\([^)]*\)\s*;\s*/g, (m) => { imports.push(m.trim()); return ''; }),
).join('\n');
write(join(OUT, '_ds_bundle.css'), [...imports, bundleCss].join('\n'));

// Licensed fonts: copy only the files the shipped CSS references.
if (fontsFrom) {
  const dest = join(OUT, cfg.fontsDest ?? 'fonts');
  mkdirSync(dest, { recursive: true });
  for (const f of readdirSync(fontsFrom).filter((f) => bundleCss.includes(f))) cpSync(join(fontsFrom, f), join(dest, f));
}
write(join(OUT, 'styles.css'), [...(tokensCss ? ['./tokens/tokens.css'] : []), './_ds_bundle.css'].map((p) => `@import "${p}";`).join('\n') + '\n');

// Components.
const defaultGroup = cfg.defaultGroup ?? 'Brand';
const components = [];
for (const name of readdirSync(join(SYS, 'components')).sort()) {
  const dir = join(SYS, 'components', name);
  if (!statSync(dir).isDirectory() || !existsSync(join(dir, 'preview.html'))) continue;
  let html = read(join(dir, 'preview.html'));
  const [first, ...rest] = html.split('\n');
  const card = /^<!--\s*@dsCard\b(.*?)-->/.exec(first);
  if (!card) throw new Error(`${name}/preview.html: first line isn't an @dsCard comment`);
  let attrs = card[1].trim();
  const group = /group="([^"]*)"/.exec(attrs)?.[1] ?? defaultGroup;
  if (!/group="/.test(attrs)) attrs = `group="${group}" ${attrs}`.trim();
  // Local stylesheet links collapse into one styles.css link (where the first was).
  let linked = false;
  html = [`<!-- @dsCard ${attrs} -->`, ...rest].join('\n')
    .replace(/<link rel="stylesheet" href="(?![a-z]+:)[^"]*\.css(?:\?[^"]*)?"\s*\/?>(\s*)/g, (_, ws) => (linked ? '' : (linked = true, `<link rel="stylesheet" href="../../../styles.css">${ws}`)))
    .replace(/(["'(])\.\.\/\.\.\/(assets|fonts)\//g, '$1../../../$2/');
  if (!linked) throw new Error(`${name}/preview.html: no local stylesheet link to replace`);
  const base = join(OUT, 'components', group, name, name);
  write(`${base}.html`, html);
  const prompt = existsSync(join(dir, 'README.md'))
    ? read(join(dir, 'README.md'))
    : `# ${name}\n\n${cfg.promptFallback?.[name] ?? `The ${cfg.pkg} ${name} card. See README.md for the system's rules.`}\n`;
  write(`${base}.prompt.md`, prompt);
  const summary = prompt.split('\n').find((l) => l.trim() && !l.startsWith('#'))?.trim() ?? '';
  components.push({ name, group, summary });
}

// README: conventions header, the system README, then the component index.
const header = cfg.readmeHeader && existsSync(join(SYS, cfg.readmeHeader)) ? read(join(SYS, cfg.readmeHeader)).trim() + '\n\n' : '';
const groups = [...new Set(components.map((c) => c.group))];
const index = groups.map((g) => `### ${g}\n\n` + components.filter((c) => c.group === g)
  .map((c) => `- \`${c.name}\` (\`components/${g}/${c.name}/\`): ${c.summary}`).join('\n')).join('\n\n');
const sysReadme = existsSync(join(SYS, cfg.readme ?? 'README.md')) ? read(join(SYS, cfg.readme ?? 'README.md')).trim() + '\n\n' : '';
write(join(OUT, 'README.md'), `${header}${sysReadme}## Components\n\nEach component folder holds a live preview (\`<Name>.html\`) and its usage notes (\`<Name>.prompt.md\`). Read the notes before using a component; copy markup from the preview.\n\n${index}\n`);

// JS bundle: no components to import, but the app reads the header.
const meta = { namespace: cfg.globalName, components: [], sourceHashes: {}, inlinedExternals: [], builtBy: 'design-systems/tools/design-sync' };
write(join(OUT, '_ds_bundle.js'), `/* @ds-bundle: ${JSON.stringify(meta).replace(/\*\//g, '*\\/')} */\nwindow.${cfg.globalName} = window.${cfg.globalName} || {};\n`);
write(join(OUT, '_ds_needs_recompile'), '{"by":"design-sync-cli"}');
write(join(OUT, '.ds-build-meta.json'), JSON.stringify({ shape: 'package', componentCount: components.length }, null, 2));

console.error(`${cfg.pkg}: ${components.length} components in ${groups.length} groups -> ${OUT}`);
