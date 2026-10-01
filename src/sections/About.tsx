import { m, useScroll, useTransform } from 'framer-motion';
import { Handshake, HeartHandshake, ShieldCheck } from 'lucide-react';
import { useRef } from 'react';
import { Counter } from '../components/ui/Counter';
import { GlassCard } from '../components/ui/GlassCard';
import { Logo } from '../components/ui/Logo';
import { Reveal, Stagger, staggerItem } from '../components/ui/Reveal';
import { TextReveal } from '../components/ui/TextReveal';
import { STORE } from '../lib/contact';

const VALUES = [
  { icon: ShieldCheck, title: 'Confiança', text: 'Produtos com procedência e transparência em cada negociação.' },
  { icon: HeartHandshake, title: 'Atendimento próximo', text: 'Gente de verdade, que conhece você e o seu aparelho.' },
  { icon: Handshake, title: 'Compra e venda', text: 'Venda seu Apple ou use-o na troca pelo próximo.' },
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const bigY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section id="sobre" aria-labelledby="sobre-titulo" ref={ref} className="section overflow-hidden">
      <div className="hairline container-site absolute inset-x-0 top-0" />

      {/* Número gigante em parallax */}
      <m.div
        style={{ y: bigY }}
        aria-hidden
        className="pointer-events-none absolute -right-10 top-10 select-none font-display text-[42vw] font-semibold leading-none tracking-tightest text-white/[0.025] md:text-[26vw]"
      >
        14
      </m.div>

      <div className="container-site relative grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <Reveal y={12}>
            <span className="eyebrow">Sobre a Handy</span>
          </Reveal>
          <TextReveal
            id="sobre-titulo"
            text="Mais de 14 anos no mercado."
            highlight={[2, 3]}
            className="mt-5 font-display text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[1.02] tracking-tightest text-white"
          />
          <Reveal delay={0.15}>
            <div className="mt-7 space-y-5 text-[16.5px] leading-relaxed text-white/60">
              <p>
                A Handy nasceu em Tatuí com um propósito claro: oferecer tecnologia de qualidade com um atendimento em que você
                pode confiar. Ao longo de mais de 14 anos, nos especializamos em toda a linha Apple — da venda à assistência técnica.
              </p>
              <p>
                Aqui você encontra o seu próximo iPhone, negocia o seu aparelho atual e conta com especialistas para cuidar dele
                depois da compra. Tudo em um só lugar, na Rua Capitão Lisboa.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col gap-4">
          <Stagger className="grid grid-cols-2 gap-4" stagger={0.1}>
            <m.div variants={staggerItem}>
              <GlassCard className="h-full p-7">
                <div className="font-display text-5xl font-semibold tracking-tightest text-white md:text-6xl">
                  <Counter to={STORE.years} suffix="+" />
                </div>
                <p className="mt-3 text-[14px] text-white/50">anos no mercado de celulares</p>
              </GlassCard>
            </m.div>
            <m.div variants={staggerItem}>
              <GlassCard className="h-full p-7">
                <div className="font-display text-5xl font-semibold tracking-tightest text-white md:text-6xl">
                  <Counter to={4.4} decimals={1} suffix="k+" />
                </div>
                <p className="mt-3 text-[14px] text-white/50">seguidores acompanhando a Handy</p>
              </GlassCard>
            </m.div>
            <m.div variants={staggerItem} className="col-span-2">
              <GlassCard className="flex items-center justify-between gap-6 p-7">
                <div>
                  <div className="font-display text-5xl font-semibold tracking-tightest text-white md:text-6xl">
                    <Counter to={100} suffix="%" />
                  </div>
                  <p className="mt-3 text-[14px] text-white/50">dedicada ao ecossistema Apple</p>
                </div>
                <Logo badge className="h-24 w-24 shrink-0 text-[10px] md:h-28 md:w-28 md:text-[11px]" />
              </GlassCard>
            </m.div>
          </Stagger>

          <Stagger className="grid gap-4 sm:grid-cols-3" stagger={0.08} delay={0.1}>
            {VALUES.map(({ icon: Icon, title, text }) => (
              <m.div key={title} variants={staggerItem} className="rounded-3xl border border-white/[0.06] p-5">
                <Icon className="h-5 w-5 text-handy-300" strokeWidth={1.7} />
                <h3 className="mt-4 text-[15px] font-semibold text-white">{title}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/50">{text}</p>
              </m.div>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
