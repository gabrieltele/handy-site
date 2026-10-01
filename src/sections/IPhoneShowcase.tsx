import { AnimatePresence, m, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { useRef, useState } from 'react';
import { ProductImage } from '../components/ProductImage';
import { Picture } from '../components/ui/Picture';
import { hasImage } from '../lib/images';
import { useProductModal } from '../components/product/ProductModalContext';
import { PRODUCTS } from '../data/catalog';
import { Button } from '../components/ui/Button';
import { SectionHeading } from '../components/ui/SectionHeading';
import { SHOWCASE } from '../data/content';
import { openChat } from '../lib/contact';
import { EASE } from '../lib/motion';

/**
 * Destaque dos iPhones: a seção fica "presa" na tela enquanto o usuário rola;
 * cada etapa troca o modelo com transição suave e revela as informações em sequência.
 */
export function IPhoneShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const count = SHOWCASE.length;
  const openProduct = useProductModal();

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const next = Math.min(count - 1, Math.max(0, Math.floor(v * count)));
    setIndex((prev) => (prev === next ? prev : next));
  });

  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });
  const rotate = useTransform(scrollYProgress, [0, 1], [-1.5, 1.5]);
  const model = SHOWCASE[index];
  const product = PRODUCTS.find((p) => p.id === model.productId)!;

  return (
    <section id="iphones" className="relative" aria-labelledby="iphones-titulo">
      <div className="container-site pb-6 pt-20 md:pt-28">
        <SectionHeading
          id="iphones-titulo"
          eyebrow="iPhones"
          title="Encontre o iPhone que combina com você."
          highlight={[2]}
          description="Role para conhecer as linhas disponíveis na Handy — dos modelos Pro aos seminovos revisados."
        />
      </div>

      <div ref={trackRef} style={{ height: `${count * 90}vh` }} className="relative">
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 " style={{ background: 'radial-gradient(closest-side, rgba(63,79,194,.22), transparent)' }} />

          <div className="container-site relative grid w-full items-center gap-8 pt-16 lg:grid-cols-2 lg:gap-16 lg:pt-0">
            {/* Aparelho */}
            <div className="relative flex h-[46svh] items-center justify-center lg:order-2 lg:h-[76svh]">
              <AnimatePresence mode="popLayout" initial={false}>
                <m.div
                  key={model.id}
                  initial={{ opacity: 0, y: 60, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -40, scale: 0.97 }}
                  transition={{ duration: 0.7, ease: EASE }}
                  className="absolute"
                >
                  <m.div style={{ rotate }}>
                    <button
                      type="button"
                      onClick={() => openProduct(product.id)}
                      className="block"
                      aria-label={`Ver fotos e detalhes: ${product.name}`}
                    >
                      {hasImage(product.image) ? (
                        <Picture
                          src={product.image}
                          alt={`${product.name} — foto do produto`}
                          sizes="(min-width: 1024px) 260px, 40vw"
                          className="h-[40svh] w-auto drop-shadow-[0_30px_40px_rgba(0,0,0,.55)] lg:h-[62svh]"
                        />
                      ) : (
                        <ProductImage product={product} className="aspect-square w-[min(72vw,300px)] rounded-[28px]" imgClassName="p-8" />
                      )}
                    </button>
                  </m.div>
                </m.div>
              </AnimatePresence>
            </div>

            {/* Informações */}
            <div className="relative lg:order-1">
              <AnimatePresence mode="wait" initial={false}>
                <m.div
                  key={model.id}
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  variants={{
                    show: { transition: { staggerChildren: 0.07 } },
                    exit: { opacity: 0, y: -16, transition: { duration: 0.3, ease: EASE } },
                  }}
                  className="text-center lg:text-left"
                >
                  <m.span variants={item} className="text-[12px] font-medium uppercase tracking-[0.24em] text-handy-300">
                    {String(index + 1).padStart(2, '0')} — {model.kicker}
                  </m.span>
                  <m.h3
                    variants={item}
                    className="mx-auto mt-4 max-w-lg font-display text-[clamp(1.6rem,2.8vw,2.4rem)] font-semibold leading-[1.06] tracking-tightest text-white lg:mx-0"
                  >
                    {model.name}
                  </m.h3>
                  <m.p variants={item} className="mx-auto mt-4 hidden max-w-md text-[16px] leading-relaxed text-white/55 sm:block lg:mx-0">
                    {model.description}
                  </m.p>
                  <m.ul variants={item} className="mt-6 hidden flex-col gap-2.5 sm:flex sm:items-center lg:items-start">
                    {model.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2.5 text-[14.5px] text-white/75">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-handy-600/50 ring-1 ring-inset ring-handy-300/30">
                          <Check className="h-3 w-3" />
                        </span>
                        {h}
                      </li>
                    ))}
                  </m.ul>
                  <m.div variants={item} className="mt-7">
                    <Button variant="brand" icon={<ArrowUpRight className="h-4 w-4" />} onClick={() => openChat(model.message)}>
                      Consultar disponibilidade
                    </Button>
                  </m.div>
                </m.div>
              </AnimatePresence>

              {/* Indicador de progresso */}
              <div className="mt-10 flex items-center justify-center gap-4 lg:justify-start">
                <div className="flex gap-2">
                  {SHOWCASE.map((m, i) => (
                    <span
                      key={m.id}
                      className={`h-1.5 rounded-full transition-all duration-500 ease-premium ${
                        i === index ? 'w-8 bg-white' : 'w-1.5 bg-white/25'
                      }`}
                    />
                  ))}
                </div>
                <div className="hidden h-px w-32 overflow-hidden bg-white/10 sm:block">
                  <m.div style={{ scaleX: progress }} className="h-full origin-left bg-handy-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};
