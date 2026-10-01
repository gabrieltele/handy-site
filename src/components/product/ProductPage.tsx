import { m } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CATEGORIES, type Product } from '../../data/catalog';
import { CONDITION, FEATURES, OPTIONS } from '../../data/details';
import { EASE } from '../../lib/motion';
import { getGallery } from './gallery';
import { ProductDetails } from './ProductDetails';
import { ProductGallery } from './ProductGallery';
import { ProductPurchase } from './ProductPurchase';

interface ProductPageProps {
  product: Product;
  onClose: () => void;
}

/** Página do produto (estilo marketplace) aberta sobre o site. */
export default function ProductPage({ product, onClose }: ProductPageProps) {
  const { images, specs } = useMemo(() => getGallery(product), [product]);
  const option = OPTIONS[product.id];
  const condition = CONDITION[product.id] ?? 'Novo';
  const colors = images.filter((i) => i.hex).map((i) => i.label);
  const categoryLabel = CATEGORIES.find((c) => c.id === product.category)?.label;

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [variant, setVariant] = useState(option?.values[0] ?? '');
  const current = images[index];
  const colorName = current.hex ? current.label : colors[0];
  const closeRef = useRef<HTMLButtonElement>(null);

  const select = useCallback((i: number) => {
    setIndex((prev) => {
      setDirection(i >= prev ? 1 : -1);
      return i;
    });
  }, []);

  const step = useCallback(
    (delta: number) => {
      setDirection(delta);
      setIndex((i) => (i + delta + images.length) % images.length);
    },
    [images.length],
  );

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [step, onClose]);

  return (
    <m.div
      className="fixed inset-0 z-[80] flex items-stretch justify-center sm:p-4 lg:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="produto-titulo"
    >
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />

      <m.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16, transition: { duration: 0.2 } }}
        transition={{ duration: 0.4, ease: EASE }}
        className="relative w-full max-w-6xl overflow-y-auto overscroll-contain bg-ink-900 sm:rounded-[24px] sm:border sm:border-white/10"
      >
        <div className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-white/[0.06] bg-ink-900/95 px-4 py-3 sm:px-6">
          <button type="button" onClick={onClose} className="inline-flex h-9 items-center gap-2 text-[13px] text-white/65 transition-colors hover:text-white">
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Voltar <span className="hidden sm:inline">· {categoryLabel}</span>
          </button>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] text-white/80 transition-colors hover:bg-white/[0.12]"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        <div className="grid gap-8 p-4 sm:p-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-10 lg:p-8">
          <ProductGallery product={product} images={images} index={index} direction={direction} onSelect={select} onStep={step} />
          <ProductPurchase
            product={product}
            categoryLabel={categoryLabel}
            condition={condition}
            images={images}
            index={index}
            colorName={colorName}
            option={option}
            variant={variant}
            onSelectImage={select}
            onSelectVariant={setVariant}
          />
        </div>

        <ProductDetails product={product} condition={condition} features={FEATURES[product.id] ?? []} specs={specs} option={option} colors={colors} />
      </m.div>
    </m.div>
  );
}
