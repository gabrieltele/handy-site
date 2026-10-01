import { m } from 'framer-motion';
import { Coffee, MapPin, Navigation, Store as StoreIcon, Wrench } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Picture } from '../components/ui/Picture';
import { GlassCard } from '../components/ui/GlassCard';
import { InstagramIcon } from '../components/ui/InstagramIcon';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';
import { STORE_PHOTOS } from '../data/catalog';
import { MAPS_DIRECTIONS_URL, STORE, openExternal } from '../lib/contact';
import { EASE } from '../lib/motion';

const HIGHLIGHTS = [
  { icon: StoreIcon, title: 'Loja física', text: 'Veja, segure e compare os aparelhos antes de comprar.' },
  { icon: Wrench, title: 'Assistência no local', text: 'Bancada técnica própria para diagnóstico e reparos.' },
  { icon: Coffee, title: 'Atendimento sem pressa', text: 'Tire suas dúvidas com quem entende de Apple.' },
];

/** Nossa loja: galeria com fotos reais do ambiente (quando cadastradas) e destaques da loja física. */
export function Store() {
  const hasPhotos = STORE_PHOTOS.length > 0;

  return (
    <section id="loja" aria-labelledby="loja-titulo" className="section">
      <div className="container-site">
        <SectionHeading
          id="loja-titulo"
          eyebrow="Nossa loja"
          title="Uma loja de verdade, no centro de Tatuí."
          highlight={[3]}
          description={`Há mais de ${STORE.years} anos recebendo clientes na ${STORE.address}. Passe para conhecer os produtos pessoalmente.`}
        />

        {hasPhotos && (
          <div className="mt-14 grid auto-rows-[220px] grid-cols-2 gap-3 md:auto-rows-[260px] md:grid-cols-4">
            {STORE_PHOTOS.slice(0, 5).map((photo, i) => (
              <m.figure
                key={photo.src}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
                className={`group relative overflow-hidden rounded-[22px] bg-ink-800 ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
              >
                <Picture
                  src={photo.src}
                  alt={photo.alt}
                  sizes={i === 0 ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 25vw, 50vw'}
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-premium group-hover:scale-[1.03]"
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-[13px] text-white/85">
                  {photo.alt}
                </figcaption>
              </m.figure>
            ))}
          </div>
        )}

        <div className={`${hasPhotos ? 'mt-4' : 'mt-14'} grid gap-4 lg:grid-cols-[1.3fr_1fr]`}>
          <Reveal>
            <GlassCard className="grid h-full gap-6 p-7 sm:grid-cols-3 md:p-9">
              {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
                <div key={title}>
                  <Icon className="h-6 w-6 text-handy-300" strokeWidth={1.6} />
                  <h3 className="mt-4 text-[15.5px] font-semibold text-white">{title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/50">{text}</p>
                </div>
              ))}
            </GlassCard>
          </Reveal>
          <Reveal delay={0.1}>
            <GlassCard className="flex h-full flex-col justify-between gap-6 p-7 md:p-9">
              <div className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/[0.06] text-handy-200 ring-1 ring-inset ring-white/10">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[16px] text-white">{STORE.address}</p>
                  <p className="text-[14px] text-white/50">{STORE.city}</p>
                </div>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button icon={<Navigation className="h-4 w-4" />} iconPosition="left" onClick={() => openExternal(MAPS_DIRECTIONS_URL)} className="flex-1">
                  Como chegar
                </Button>
                <Button
                  variant="secondary"
                  icon={<InstagramIcon className="h-4 w-4" />}
                  iconPosition="left"
                  onClick={() => openExternal(STORE.instagramUrl)}
                  className="flex-1"
                >
                  @{STORE.instagram}
                </Button>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
