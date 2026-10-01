import type { ImgHTMLAttributes } from 'react';
import { imageSize, srcSets, withBase } from '../../lib/images';

interface PictureProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet' | 'width' | 'height'> {
  src: string;
  alt: string;
  /** Largura exibida, para o navegador escolher a versão certa (ex.: "(min-width: 1024px) 300px, 50vw"). */
  sizes: string;
  /** Imagem principal da tela: carrega com prioridade e sem lazy loading. */
  priority?: boolean;
}

/** Em prévias sem as variantes AVIF/480 publicadas, use VITE_SIMPLE_IMAGES=1 (só WebP). */
const SIMPLE = import.meta.env.VITE_SIMPLE_IMAGES === '1';

/** Imagem responsiva em AVIF/WebP com dimensões reservadas (sem saltos de layout). */
export function Picture({ src, alt, sizes, priority = false, ...rest }: PictureProps) {
  const [width, height] = imageSize(src);
  const sets = srcSets(src);
  return (
    <picture className="contents">
      {!SIMPLE && <source type="image/avif" srcSet={sets.avif} sizes={sizes} />}
      {!SIMPLE && <source type="image/webp" srcSet={sets.webp} sizes={sizes} />}
      <img
        src={withBase(src)}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        {...(priority ? { fetchpriority: 'high' } : {})}
        {...rest}
      />
    </picture>
  );
}
