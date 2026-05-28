import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

function walk(dir) {
  let r = [];
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) r = r.concat(walk(p));
    else if (e.endsWith('.html')) r.push(p);
  }
  return r;
}

const get = (html, re, grp = 1) => { const m = html.match(re); return m ? m[grp].trim() : null; };
const files = walk('dist').sort();

console.log('=== META AUDIT ===');
const titles = {}, descs = {};
for (const f of files) {
  const rel = relative('dist', f).replace(/\\/g, '/');
  const h = readFileSync(f, 'utf8');
  const title = get(h, /<title[^>]*>([\s\S]*?)<\/title>/i);
  const titleCount = (h.match(/<title[^>]*>/gi) || []).length;
  const desc = get(h, /<meta[^>]*name=["']description["'][^>]*content=(["'])([\s\S]*?)\1/i, 2);
  const descCount = (h.match(/name=["']description["']/gi) || []).length;
  const canon = get(h, /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  const ogTitle = get(h, /<meta[^>]*property=["']og:title["'][^>]*content=["']([\s\S]*?)["']/i);
  const h1Count = (h.match(/<h1[\s>]/gi) || []).length;
  if (title) (titles[title] ??= []).push(rel);
  if (desc) (descs[desc] ??= []).push(rel);
  const flags = [];
  if (!title) flags.push('NO-TITLE');
  if (titleCount > 1) flags.push(`DUP-TITLE(${titleCount})`);
  if (title && (title.length < 30 || title.length > 65)) flags.push(`TITLE-LEN(${title.length})`);
  if (!desc) flags.push('NO-DESC');
  if (descCount > 1) flags.push(`DUP-DESC(${descCount})`);
  if (desc && (desc.length < 70 || desc.length > 165)) flags.push(`DESC-LEN(${desc.length})`);
  if (!canon) flags.push('NO-CANONICAL');
  if (h1Count === 0) flags.push('NO-H1');
  if (h1Count > 1) flags.push(`MULTI-H1(${h1Count})`);
  if (!ogTitle) flags.push('NO-OG');
  console.log(`${rel.padEnd(48)} ${flags.length ? '⚠ ' + flags.join(', ') : '✓ OK'}`);
}

console.log('\n=== DUPLICATE TITLES (same title on >1 page) ===');
let dt = 0;
for (const [t, ps] of Object.entries(titles)) if (ps.length > 1) { console.log(`"${t.slice(0, 60)}" → ${ps.join(', ')}`); dt++; }
if (!dt) console.log('none');

console.log('\n=== DUPLICATE DESCRIPTIONS (same on >1 page) ===');
let dd = 0;
for (const [d, ps] of Object.entries(descs)) if (ps.length > 1) { console.log(`"${d.slice(0, 60)}…" → ${ps.join(', ')}`); dd++; }
if (!dd) console.log('none');
