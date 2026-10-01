import { Headphones, Keyboard, Laptop, Plug, Smartphone, Speaker, type LucideIcon } from 'lucide-react';
import { useState } from 'react';
import type { Product } from '../data/catalog';
import { hasImage } from '../lib/images';
import { Picture } from './ui/Picture';

const ICONS: Record<Product['category'], LucideIcon> = {
  iphone: Smartphone,
  apple: Laptop,
  audio: Headphones,
  'caixas-de-som': Speaker,
  acessorios: Plug,
  informatica: Keyboard,
};

interface ProductImageProps {
  product: Product;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Foto do produto sobre fundo claro neutro (padrão das fotos oficiais).
 * Sem foto cadastrada, mostra um bloco discreto com a marca — sem requisição extra.
 */
export function ProductImage({
  product,
  className = '',
  imgClassName = '',
  sizes = '(min-width: 1024px) 300px, (min-width: 480px) 45vw, 90vw',
  priority = false,
}: ProductImageProps) {
  const [loaded, setLoaded] = useState(false);
  const available = hasImage(product.image);
  const Icon = ICONS[product.category];

  return (
    <div className={`relative overflow-hidden bg-[#f2f2f4] ${className}`}>
      {available ? (
        <Picture
          src={product.image}
          alt={`${product.name} — foto do produto`}
          sizes={sizes}
          priority={priority}
          onLoad={() => setLoaded(true)}
          className={`absolute inset-0 h-full w-full object-contain transition-[opacity,transform] duration-700 ease-premium group-hover:scale-[1.03] ${
            loaded || priority ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 text-ink-950/30" role="img" aria-label={`${product.name} — foto em breve`}>
          <Icon className="h-8 w-8" strokeWidth={1.2} />
          <span className="text-[10.5px] font-medium uppercase tracking-[0.22em]">{product.brand}</span>
        </div>
      )}
    </div>
  );
}
