import { AnimatePresence } from 'framer-motion';
import { createContext, lazy, Suspense, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { PRODUCTS } from '../../data/catalog';
import { lockScroll } from '../../lib/scroll';

/** A página do produto (e a galeria) só é baixada quando alguém abre um produto. */
const ProductPage = lazy(() => import('./ProductPage'));

const HASH_PREFIX = '#produto-';
const ModalContext = createContext<(id: string) => void>(() => {});

/** Abre a página de detalhes de um produto pelo id. */
export const useProductModal = () => useContext(ModalContext);

const idFromHash = () => {
  const hash = window.location.hash;
  if (!hash.startsWith(HASH_PREFIX)) return null;
  const id = hash.slice(HASH_PREFIX.length);
  return PRODUCTS.some((p) => p.id === id) ? id : null;
};

/**
 * Controla qual produto está aberto e mantém um link compartilhável
 * (ex.: site.com/#produto-iphone-17-pro).
 */
export function ProductModalProvider({ children }: { children: ReactNode }) {
  const [productId, setProductId] = useState<string | null>(() => (typeof window === 'undefined' ? null : idFromHash()));
  const product = PRODUCTS.find((p) => p.id === productId) ?? null;

  const open = useCallback((id: string) => {
    setProductId(id);
    history.replaceState(null, '', `${HASH_PREFIX}${id}`);
  }, []);

  const close = useCallback(() => {
    setProductId(null);
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }, []);

  useEffect(() => {
    const onHash = () => setProductId(idFromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    lockScroll(!!product);
    return () => lockScroll(false);
  }, [product]);

  return (
    <ModalContext.Provider value={open}>
      {children}
      <Suspense fallback={null}>
        <AnimatePresence>{product && <ProductPage key={product.id} product={product} onClose={close} />}</AnimatePresence>
      </Suspense>
    </ModalContext.Provider>
  );
}
