import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Product } from '../../data/catalog';
import { ProductImage } from '../ProductImage';
import type { GalleryImage } from './gallery';
import { Thumb } from './Thumb';
import { ZoomImage } from './ZoomImage';
import { hasImage } from '../../lib/images';

interface ProductGalleryProps {
  product: Product;
  images: GalleryImage[];
  index: number;
  direction: number;
  onSelect: (i: number) => void;
  onStep: (delta: number) => void;
}

/** Miniaturas (verticais no desktop) + foto grande com zoom. */
export function ProductGallery({ product, images, index, direction, onSelect, onStep }: ProductGalleryProps) {
  const current = images[index];
  const multiple = images.length > 1;

  return (
    <div className="flex min-w-0 flex-col-reverse gap-3 md:flex-row">
      {multiple && (
        <div className="flex gap-2 overflow-x-auto p-0.5 [scrollbar-width:none] md:max-h-[520px] md:flex-col md:overflow-y-auto md:overflow-x-visible">
          {images.map((img, i) => (
            <Thumb key={img.src} src={img.src} label={img.label} selected={i === index} onSelect={() => onSelect(i)} selectOnHover />
          ))}
        </div>
      )}

      <div className="relative min-w-0 flex-1">
        {hasImage(current.src) ? (
          <ZoomImage
            key={current.src}
            src={current.src}
            alt={`${product.name} — ${current.label}`}
            direction={direction}
            onSwipe={multiple ? onStep : undefined}
          />
        ) : (
          <ProductImage product={product} className="aspect-square rounded-[20px]" imgClassName="p-10" priority />
        )}
        {multiple && (
          <>
            <NavButton side="left" onClick={() => onStep(-1)} />
            <NavButton side="right" onClick={() => onStep(1)} />
          </>
        )}
      </div>
    </div>
  );
}

function NavButton({ side, onClick }: { side: 'left' | 'right'; onClick: () => void }) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === 'left' ? 'Foto anterior' : 'Próxima foto'}
      className={`absolute top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink-950 shadow transition-colors hover:bg-white md:hidden ${
        side === 'left' ? 'left-2' : 'right-2'
      }`}
    >
      <Icon className="h-5 w-5" aria-hidden />
    </button>
  );
}
