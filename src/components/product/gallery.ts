import type { Product } from '../../data/catalog';
import galleryData from '../../data/gallery.json';

export interface GalleryImage {
  label: string;
  src: string;
  hex: string | null;
}

interface GalleryEntry {
  images: GalleryImage[];
  specs: { chip?: string; lancamento?: string };
}

const GALLERY = galleryData as Record<string, GalleryEntry>;

/** Produtos cuja foto é de um modelo representativo: não exibimos chip/ano para não confundir. */
const HIDE_SPECS = new Set(['macbook-air', 'macbook-pro', 'ipad-pro']);

/** Fotos (uma por cor ou vista) e dados técnicos de um produto. */
export function getGallery(product: Product) {
  const entry = GALLERY[product.id];
  return {
    images: entry?.images ?? [{ label: product.name, src: product.image, hex: null }],
    specs: HIDE_SPECS.has(product.id) ? {} : (entry?.specs ?? {}),
  };
}
