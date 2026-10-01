import manifest from '../data/images.json';

/** Manifesto gerado por `npm run images`: caminho → [largura, altura]. */
const SIZES = manifest as unknown as Record<string, [number, number]>;
const SMALL = 480;

/** Prefixa o caminho público com a base do site (ex.: /handy-site/ no GitHub Pages). */
export const withBase = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export const hasImage = (src: string | undefined): src is string => !!src && src in SIZES;

export function imageSize(src: string): [number, number] {
  return SIZES[src] ?? [1000, 1000];
}

/** srcset em AVIF e WebP (480 px para celular e a versão completa). */
export function srcSets(src: string) {
  const base = src.replace(/\.webp$/, '');
  const [w, h] = imageSize(src);
  const full = Math.max(w, h);
  const small = full > SMALL ? `${base}-${SMALL}` : null;
  const set = (ext: string) =>
    (small ? `${withBase(small)}.${ext} ${Math.round((w * SMALL) / full)}w, ` : '') + `${withBase(base)}.${ext} ${w}w`;
  return { avif: set('avif'), webp: set('webp') };
}

/** Quantidade de fotos da galeria de um produto (pasta /images/produtos/<id>/). */
export function galleryCount(productId: string) {
  const prefix = `/images/produtos/${productId}/`;
  return Object.keys(SIZES).filter((k) => k.startsWith(prefix)).length;
}
