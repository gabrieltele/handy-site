import { m, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { ArrowDown, ArrowRight, BadgeCheck, ShieldCheck, Wrench } from 'lucide-react';
import { useRef, type MouseEvent, type ReactNode } from 'react';
import { useProductModal } from '../components/product/ProductModalContext';
import { Button } from '../components/ui/Button';
import { Picture } from '../components/ui/Picture';
import { TextReveal } from '../components/ui/TextReveal';
import { WhatsAppIcon } from '../components/ui/WhatsAppIcon';
import { STORE, openChat } from '../lib/contact';
import { EASE } from '../lib/motion';
import { scrollToId } from '../lib/scroll';

const HERO_PRODUCT = 'iphone-17-pro-max';
const PHONES = {
  center: { src: '/images/produtos/iphone-17-pro-max/deep-blue.webp', alt: 'iPhone 17 Pro Max Azul-intenso' },
  left: { src: '/images/produtos/iphone-17-pro-max/cosmic-orange.webp', alt: 'iPhone 17 Pro Max Laranja-cósmico' },
  right: { src: '/images/produtos/iphone-17-pro-max/silver.webp', alt: 'iPhone 17 Pro Max Prateado' },
};

const TRUST = [
  { icon: BadgeCheck, text: `${STORE.years}+ anos no mercado` },
  { icon: ShieldCheck, text: 'Procedência garantida' },
  { icon: Wrench, text: 'Assistência especializada' },
];

export function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const openProduct = useProductModal();

  // Parallax de rolagem (somente transform/opacity)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const phonesY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Deslocamento sutil acompanhando o mouse (desktop)
  const mx = useMotionValue(0);
  const spring = { stiffness: 90, damping: 20 };
  const near = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), spring);
  const far = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), spring);

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (e.nativeEvent instanceof PointerEvent && e.nativeEvent.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
  };

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.7, ease: EASE, delay },
  });

  return (
    <section
      id="inicio"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => mx.set(0)}
      aria-labelledby="hero-titulo"
      className="relative overflow-hidden pb-12 pt-24 sm:pt-32 lg:flex lg:min-h-[100svh] lg:items-center lg:pb-16 lg:pt-24"
    >
      {/* Fundo: gradientes estáticos (sem filtros de blur) */}
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(40rem 28rem at 72% 42%, rgba(63,79,194,.28), transparent 70%), radial-gradient(30rem 22rem at 10% 90%, rgba(30,42,107,.35), transparent 70%)',
        }}
      />

      <div className="container-site relative grid items-center gap-8 sm:gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-6">
        <m.div style={{ y: textY, opacity: fade }} className="relative z-10 text-center lg:text-left">
          <m.div {...enter(0.1)}>
            <span className="eyebrow">Especialistas Apple · Tatuí-SP</span>
          </m.div>

          <TextReveal
            as="h1"
            id="hero-titulo"
            play={ready}
            delay={0.2}
            text="Seu próximo iPhone está na Handy."
            highlight={[5]}
            className="mt-6 font-display text-[clamp(2.1rem,4.8vw,3.9rem)] font-semibold leading-[1] tracking-tightest text-white"
          />

          <m.p {...enter(0.55)} className="mx-auto mt-5 max-w-md text-[16px] leading-relaxed text-white/60 sm:text-[17px] lg:mx-0">
            Apple, tecnologia e assistência especializada em um só lugar.
          </m.p>

          <m.div {...enter(0.7)} className="mt-7 flex flex-col items-center gap-2.5 sm:flex-row sm:justify-center lg:justify-start">
            <Button size="lg" icon={<ArrowRight className="h-4 w-4" />} onClick={() => scrollToId('produtos')} className="w-full sm:w-auto">
              Ver produtos
            </Button>
            <Button
              size="lg"
              variant="secondary"
              icon={<WhatsAppIcon className="h-4 w-4 text-[#25D366]" />}
              iconPosition="left"
              onClick={() => openChat()}
              className="w-full sm:w-auto"
            >
              Falar com a Handy
            </Button>
          </m.div>

          <m.ul {...enter(0.85)} className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[12.5px] sm:mt-8 sm:gap-x-5 sm:text-[13px] text-white/55 lg:justify-start">
            {TRUST.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-handy-300" aria-hidden />
                {text}
              </li>
            ))}
          </m.ul>
        </m.div>

        {/* Composição com fotos reais */}
        <m.div style={{ y: phonesY }} className="relative mx-auto w-full max-w-[340px] sm:max-w-[420px] lg:max-w-[480px]">
          <m.div
            initial={{ opacity: 0, y: 40 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 1, ease: EASE, delay: 0.3 }}
            className="relative aspect-[1/0.95]"
          >
            {/* Reflexo no chão */}
            <div
              aria-hidden
              className="absolute inset-x-[12%] bottom-[2%] h-[10%] rounded-[50%]"
              style={{ background: 'radial-gradient(closest-side, rgba(141,156,245,.35), transparent)' }}
            />
            <Phone offset={far} className="left-[4%] top-[12%] w-[30%] -rotate-[8deg] opacity-90" {...PHONES.left} />
            <Phone offset={far} className="right-[4%] top-[12%] w-[30%] rotate-[8deg] opacity-90" {...PHONES.right} />
            <button
              type="button"
              onClick={() => openProduct(HERO_PRODUCT)}
              aria-label="Ver fotos e detalhes do iPhone 17 Pro Max"
              className="absolute left-1/2 top-0 w-[40%] -translate-x-1/2 transition-transform duration-500 ease-premium hover:-translate-y-1"
            >
              <m.span style={{ x: near }} className="block drop-shadow-[0_30px_40px_rgba(0,0,0,.55)]">
                <Picture
                  src={PHONES.center.src}
                  alt={PHONES.center.alt}
                  sizes="(min-width: 1024px) 200px, 40vw"
                  priority
                  className="h-auto w-full"
                />
              </m.span>
            </button>

            <FloatingChip className="-right-10 bottom-[30%] xl:-right-16" delay={0.9} ready={ready}>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-handy-600">
                <ShieldCheck className="h-4 w-4" aria-hidden />
              </span>
              <span className="text-left">
                <span className="block text-[11px] text-white/55">Aparelhos</span>
                <span className="block text-[13px] font-medium">Revisados</span>
              </span>
            </FloatingChip>
            <FloatingChip className="-left-10 top-[8%] xl:-left-16" delay={1.05} ready={ready} reverse>
              <span className="font-display text-2xl font-semibold leading-none">{STORE.years}+</span>
              <span className="text-left text-[12px] leading-tight text-white/60">
                anos de
                <br />
                experiência
              </span>
            </FloatingChip>
          </m.div>
        </m.div>
      </div>

      <m.button
        type="button"
        onClick={() => scrollToId('destaques')}
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/45 transition-colors hover:text-white/80 lg:flex"
      >
        Role para explorar
        <ArrowDown className="h-3.5 w-3.5" aria-hidden />
      </m.button>
    </section>
  );
}

function Phone({ src, alt, className, offset }: { src: string; alt: string; className: string; offset: MotionValue<number> }) {
  return (
    <m.div style={{ x: offset }} className={`absolute ${className}`}>
      <Picture src={src} alt={alt} sizes="(min-width: 1024px) 150px, 30vw" loading="eager" className="h-auto w-full drop-shadow-[0_24px_30px_rgba(0,0,0,.5)]" />
    </m.div>
  );
}

/** Selo flutuante: entrada com framer, flutuação contínua em CSS (roda no compositor). */
function FloatingChip({
  children,
  className = '',
  delay,
  ready,
  reverse = false,
}: {
  children: ReactNode;
  className?: string;
  delay: number;
  ready: boolean;
  reverse?: boolean;
}) {
  return (
    <m.div
      initial={{ opacity: 0, y: 12 }}
      animate={ready ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.6, ease: EASE, delay }}
      className={`absolute z-10 hidden lg:block ${className}`}
    >
      <div
        className={`flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-900/95 px-3.5 py-2.5 shadow-[0_16px_32px_-16px_rgba(0,0,0,.8)] motion-safe:animate-float ${
          reverse ? '[animation-direction:reverse]' : ''
        }`}
      >
        {children}
      </div>
    </m.div>
  );
}
