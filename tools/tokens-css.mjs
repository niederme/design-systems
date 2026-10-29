#!/usr/bin/env node
// Writes <system-dir>/tokens.css from <system-dir>/tokens.json.
// Colours are per theme (dark in :root, light under [data-theme="light"]); every
// other group is theme-independent and goes in :root after the colours.
//
// Usage: node tools/tokens-css.mjs <system-dir>

import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const SYS = resolve(process.argv[2] ?? '');
const j = JSON.parse(readFileSync(join(SYS, 'tokens.json'), 'utf8'));
const [first, ...rest] = j.color.themes.map((t) => t.id);
const groups = ['spacing', 'radius', 'stroke', 'size', 'opacity', 'blur'];

const lines = ['/* AIQuota App Design System: generated from tokens.json */', ':root {'];
for (const t of j.color.tokens) lines.push(`  --${t.name}: ${t.value[first]};`);
for (const g of groups) for (const t of j[g]?.tokens ?? []) lines.push(`  --${t.name}: ${t.value};`);
for (const [name, stack] of Object.entries(j.type.families)) lines.push(`  --font-${name}: ${stack};`);
lines.push('}');
for (const theme of rest) {
  lines.push(`[data-theme="${theme}"] {`);
  for (const t of j.color.tokens) lines.push(`  --${t.name}: ${t.value[theme]};`);
  lines.push('}');
}
writeFileSync(join(SYS, 'tokens.css'), lines.join('\n') + '\n');
