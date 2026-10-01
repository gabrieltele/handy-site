/**
 * Otimiza as fotos dos produtos.
 *
 * Coloque fotos (.jpg, .png ou .webp) em public/images/produtos/ (produtos) ou
 * public/images/loja/ (fotos da loja) e rode `npm run images`.
 * Para cada foto são gerados:
 *   nome.webp / nome.avif         → até 1000 px (página do produto)
 *   nome-480.webp / nome-480.avif → 480 px (cards no celular)
 * e o manifesto src/data/images.json com largura/altura de cada imagem,
 * usado pelo site para reservar espaço (sem saltos de layout) e saber quais fotos existem.
 */
import { readdir, stat, writeFile, unlink } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIRS = ['produtos', 'loja'].map((d) => path.join(ROOT, 'public/images', d));
const MANIFEST = path.join(ROOT, 'src/data/images.json');
const MAX = 1000;
const SMALL = 480;
const VARIANT = /-(480)\.(webp|avif)$/;

async function walk(dir) {
  const out = [];
  let entries = [];
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

async function newer(src, dest) {
  try {
    return (await stat(src)).mtimeMs > (await stat(dest)).mtimeMs;
  } catch {
    return true;
  }
}

const files = (await Promise.all(DIRS.map(walk))).flat();
const sources = files.filter((f) => /\.(jpe?g|png|webp)$/i.test(f) && !VARIANT.test(f));
const manifest = {};

for (const src of sources) {
  const base = src.replace(/\.(jpe?g|png|webp)$/i, '');
  const webp = `${base}.webp`;
  const input = sharp(src).rotate();

  // Converte JPG/PNG enviados para WebP e remove o original.
  if (!src.endsWith('.webp')) {
    await input.clone().resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true }).webp({ quality: 86 }).toFile(webp);
    await unlink(src);
  }

  const targets = [
    [`${base}.avif`, (s) => s.resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true }).avif({ quality: 58, effort: 4 })],
    [`${base}-${SMALL}.webp`, (s) => s.resize({ width: SMALL, height: SMALL, fit: 'inside', withoutEnlargement: true }).webp({ quality: 82 })],
    [`${base}-${SMALL}.avif`, (s) => s.resize({ width: SMALL, height: SMALL, fit: 'inside', withoutEnlargement: true }).avif({ quality: 55, effort: 4 })],
  ];
  for (const [dest, fn] of targets) {
    if (await newer(webp, dest)) await fn(sharp(webp)).toFile(dest);
  }

  const { width, height } = await sharp(webp).metadata();
  manifest[`/${path.relative(path.join(ROOT, 'public'), webp).split(path.sep).join('/')}`] = [width, height];
}

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
await writeFile(MANIFEST, `${JSON.stringify(sorted, null, 0).replace(/\],"/g, '],\n"')}\n`);
console.log(`${Object.keys(sorted).length} imagens otimizadas → src/data/images.json`);
