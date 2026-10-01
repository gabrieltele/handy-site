import { m } from 'framer-motion';
import { ArrowUpRight, Images } from 'lucide-react';
import { interestMessage, type Product } from '../data/catalog';
import { openChat } from '../lib/contact';
import { galleryCount, hasImage } from '../lib/images';
import { EASE } from '../lib/motion';
import { useProductModal } from './product/ProductModalContext';
import { ProductImage } from './ProductImage';

interface ShopCardProps {
  product: Product;
  index?: number;
  /** Anima ao montar (troca de filtro) em vez de ao entrar na tela. */
  animateOnMount?: boolean;
}

/** Card de produto: foto real em fundo claro, marca, nome, descrição, preço e "Tenho interesse". */
export function ShopCard({ product, index = 0, animateOnMount = false }: ShopCardProps) {
  const openProduct = useProductModal();
  const photos = galleryCount(product.id);
  const reveal = animateOnMount
    ? { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.45, ease: EASE, delay: Math.min(index, 8) * 0.04 } }
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '0px 0px -8% 0px' },
        transition: { duration: 0.6, ease: EASE, delay: (index % 4) * 0.06 },
      };

  return (
    <m.article
      {...reveal}
      className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-white/[0.07] bg-ink-800 transition-colors duration-300 hover:border-white/15"
    >
      <button
        onClick={() => openProduct(product.id)}
        className="relative block w-full text-left focus-visible:outline-offset-[-3px]"
        aria-label={`Ver fotos e detalhes: ${product.name}`}
      >
        <ProductImage product={product} className="aspect-[4/3.4]" imgClassName="p-6 md:p-8" />
        {hasImage(product.image) && (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-medium text-white">
            <Images className="h-3.5 w-3.5" aria-hidden />
            {photos > 1 ? `${photos} fotos · detalhes` : 'Ver detalhes'}
          </span>
        )}
      </button>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-handy-300">{product.brand}</span>
        <h3 className="mt-1.5 font-display text-[16px] font-semibold leading-snug tracking-tight text-white">
          <button onClick={() => openProduct(product.id)} className="text-left hover:underline hover:decoration-white/30 hover:underline-offset-4">
            {product.name}
          </button>
        </h3>
        <p className="mt-2 text-[13.5px] leading-relaxed text-white/55">{product.description}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
          <span className="font-display text-[15px] font-medium text-white">{product.price}</span>
          <button
            onClick={() => openChat(interestMessage(product))}
            className="group/btn inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-4 text-[13px] font-medium text-ink-950 transition-[transform,background-color] duration-200 hover:-translate-y-px hover:bg-handy-200 active:scale-[0.97]"
          >
            Tenho interesse
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:rotate-45" aria-hidden />
          </button>
        </div>
      </div>
    </m.article>
  );
}
