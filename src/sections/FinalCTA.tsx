import { m, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { TextReveal } from '../components/ui/TextReveal';
import { openChat } from '../lib/contact';
import { scrollToId } from '../lib/scroll';
import { WhatsAppIcon } from '../components/ui/WhatsAppIcon';

export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.94, 1]);

  return (
    <section ref={ref} aria-labelledby="cta-titulo" className="relative px-3 py-16 sm:px-5 md:py-24">
      <m.div
        style={{ scale }}
        className="relative mx-auto max-w-[1320px] overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-b from-handy-800 via-handy-900 to-ink-950 px-6 py-24 text-center md:rounded-[48px] md:py-32"
      >
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 " style={{ background: 'radial-gradient(closest-side, rgba(63,79,194,.22), transparent)' }} />

        <div className="relative mx-auto max-w-3xl">
          <Reveal y={12}>
            <span className="eyebrow">Handy · Tatuí-SP</span>
          </Reveal>
          <TextReveal
            id="cta-titulo"
            text="Pronto para encontrar seu próximo iPhone?"
            highlight={[5]}
            className="mt-6 font-display text-[clamp(2rem,4.4vw,3.4rem)] font-semibold leading-[1.02] tracking-tightest text-white"
          />
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-lg text-[17px] leading-relaxed text-white/60">
              Fale com a nossa equipe, tire suas dúvidas e descubra condições especiais para o seu próximo Apple.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" icon={<WhatsAppIcon className="h-4 w-4" />} iconPosition="left" onClick={() => openChat()} className="w-full sm:w-auto">
              Falar com a Handy
            </Button>
            <Button size="lg" variant="secondary" icon={<ArrowRight className="h-4 w-4" />} onClick={() => scrollToId('produtos')} className="w-full sm:w-auto">
              Ver produtos
            </Button>
          </Reveal>
        </div>
      </m.div>
    </section>
  );
}
