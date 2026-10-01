import { m } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { Reveal, Stagger, staggerItem } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';
import { REPAIR_STEPS, SERVICES } from '../data/content';
import { openChat } from '../lib/contact';
import { WhatsAppIcon } from '../components/ui/WhatsAppIcon';

export function Services() {
  return (
    <section id="assistencia" aria-labelledby="assistencia-titulo" className="section overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-40 h-[600px] w-[900px] -translate-x-1/2 " style={{ background: 'radial-gradient(closest-side, rgba(63,79,194,.22), transparent)' }} />

      <div className="container-site relative">
        <div className="grid items-end gap-10 lg:grid-cols-[1.2fr_1fr]">
          <SectionHeading
            id="assistencia-titulo"
            eyebrow="Assistência técnica"
            title="Seu iPhone merece cuidado especializado."
            highlight={[4]}
            description="Diagnóstico transparente, reparos feitos por quem entende de Apple e atenção a cada detalhe do seu aparelho."
          />
          <Reveal delay={0.2} className="flex lg:justify-end">
            <Button
              size="lg"
              variant="brand"
              icon={<WhatsAppIcon className="h-4 w-4" />}
              iconPosition="left"
              onClick={() => openChat('Olá, Handy! Preciso de assistência técnica para meu aparelho.')}
            >
              Solicitar orçamento
            </Button>
          </Reveal>
        </div>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6" stagger={0.07}>
          {SERVICES.map(({ icon: Icon, title, description }) => (
            <m.div key={title} variants={staggerItem}>
              <GlassCard
                className="group h-full p-7 transition-all duration-500 ease-premium hover:-translate-y-1 hover:border-white/15 md:p-8"
              >
                <div className="flex items-start justify-between">
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-handy-500/40 to-handy-800/40 ring-1 ring-inset ring-white/10 transition-transform duration-500 ease-premium group-hover:scale-105">
                    <Icon className="h-[22px] w-[22px] text-white" strokeWidth={1.6} />
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-white/20 transition-all duration-500 ease-premium group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white/70" />
                </div>
                <h3 className="mt-8 font-display text-xl font-semibold tracking-tight text-white">{title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-white/55">{description}</p>
              </GlassCard>
            </m.div>
          ))}
        </Stagger>

        {/* Como funciona */}
        <Reveal className="mt-6">
          <GlassCard className="p-7 md:p-12">
            <div>
              <span className="text-[12px] font-medium uppercase tracking-[0.22em] text-handy-300">Como funciona</span>
              <h3 className="mt-3 font-display text-3xl font-semibold tracking-tight text-white md:text-4xl">
                Simples, transparente e rápido.
              </h3>
              <Stagger className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
                {REPAIR_STEPS.map((s) => (
                  <m.div key={s.n} variants={staggerItem} className="relative border-t border-white/10 pt-5">
                    <span className="font-display text-sm font-medium text-handy-300">{s.n}</span>
                    <h3 className="mt-2 text-[16px] font-semibold text-white">{s.title}</h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-white/50">{s.text}</p>
                  </m.div>
                ))}
              </Stagger>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}
