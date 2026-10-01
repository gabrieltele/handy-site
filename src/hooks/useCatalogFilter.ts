import { useDeferredValue, useMemo, useState } from 'react';
import { PRODUCTS, type CategoryId, type Product } from '../data/catalog';
import { hasImage } from '../lib/images';

export type CategoryFilter = CategoryId | 'todos';

const normalize = (text: string) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

/** Produtos com foto primeiro, mantendo a ordem do catálogo. */
const byPhoto = (a: Product, b: Product) => Number(hasImage(b.image)) - Number(hasImage(a.image));

/** Estado e resultado dos filtros do catálogo (categoria, marca e busca). */
export function useCatalogFilter() {
  const [category, setCategory] = useState<CategoryFilter>('iphone');
  const [brand, setBrand] = useState<Product['brand'] | 'todas'>('todas');
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);

  const items = useMemo(() => {
    const terms = normalize(deferredQuery).split(/\s+/).filter(Boolean);
    return PRODUCTS.filter((p) => {
      if (terms.length === 0 && category !== 'todos' && p.category !== category) return false;
      if (brand !== 'todas' && p.brand !== brand) return false;
      const haystack = normalize(`${p.name} ${p.brand} ${p.description}`);
      return terms.every((t) => haystack.includes(t));
    }).sort(byPhoto);
  }, [category, brand, deferredQuery]);

  return { category, setCategory, brand, setBrand, query, setQuery, items, searching: deferredQuery.trim().length > 0 };
}
