import { m, type PanInfo } from 'framer-motion';
import { ZoomIn } from 'lucide-react';
import { useState, type PointerEvent } from 'react';
import { EASE } from '../../lib/motion';
import { Picture } from '../ui/Picture';

interface ZoomImageProps {
  src: string;
  alt: string;
  direction: number;
  /** Deslizar para trocar de foto (celular). */
  onSwipe?: (delta: number) => void;
}

/** Foto principal com zoom que acompanha o mouse; no celular, deslize para trocar. */
export function ZoomImage({ src, alt, direction, onSwipe }: ZoomImageProps) {
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -50) onSwipe?.(1);
    else if (info.offset.x > 50) onSwipe?.(-1);
  };

  return (
    <div
      onPointerMove={onMove}
      onPointerLeave={() => setZoom(null)}
      className="relative aspect-square overflow-hidden rounded-[20px] bg-[#f2f2f4] md:cursor-zoom-in"
    >
      <m.div
        initial={{ opacity: 0, x: direction * 40 }}
        animate={{ opacity: 1, x: 0, scale: zoom ? 2.2 : 1 }}
        transition={{ duration: 0.35, ease: EASE, scale: { duration: 0.2, ease: 'easeOut' } }}
        drag={onSwipe ? 'x' : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={onDragEnd}
        style={{ originX: zoom?.x ?? 0.5, originY: zoom?.y ?? 0.5 }}
        className="absolute inset-0 p-8 sm:p-12"
      >
        <Picture
          src={src}
          alt={alt}
          sizes="(min-width: 1024px) 560px, 92vw"
          priority
          draggable={false}
          className="h-full w-full select-none object-contain"
        />
      </m.div>
      {!zoom && (
        <span className="pointer-events-none absolute right-3 top-3 hidden items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 text-[11px] text-white md:inline-flex">
          <ZoomIn className="h-3.5 w-3.5" aria-hidden /> Passe o mouse para ampliar
        </span>
      )}
    </div>
  );
}
