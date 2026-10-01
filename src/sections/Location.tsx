import { Clock3, ExternalLink, MapPin, Navigation } from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';
import { WhatsAppIcon } from '../components/ui/WhatsAppIcon';
import { MAPS_DIRECTIONS_URL, MAPS_EMBED_URL, MAPS_PLACE_URL, STORE, openChat, openExternal } from '../lib/contact';

/** Em ambientes que bloqueiam iframes (prévia), use VITE_STATIC_MAP=1 para mostrar só o mapa ilustrado. */
const STATIC_MAP = import.meta.env.VITE_STATIC_MAP === '1';

export function Location() {
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <section id="contato" aria-labelledby="contato-titulo" className="section">
      <div className="container-site">
        <SectionHeading
          id="contato-titulo"
          eyebrow="Localização"
          title="Venha conhecer a Handy."
          highlight={[3]}
          description="Estamos no centro de Tatuí, prontos para te receber e ajudar a escolher o seu próximo Apple."
        />

        <Reveal className="mt-12" y={32}>
          <GlassCard className="grid overflow-hidden lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
            <div className="flex flex-col gap-8 p-6 sm:p-8 lg:p-10">
              <div className="space-y-6">
                <InfoRow icon={<MapPin className="h-[18px] w-[18px]" />} label="Endereço">
                  {STORE.address}
                  <br />
                  {STORE.city}
                </InfoRow>
                <InfoRow icon={<WhatsAppIcon className="h-[18px] w-[18px]" />} label="Atendimento">
                  Fale com a nossa equipe pelo WhatsApp.
                </InfoRow>
                <InfoRow icon={<Clock3 className="h-[18px] w-[18px]" />} label="Horário">
                  Consulte os horários de funcionamento pelo atendimento.
                </InfoRow>
              </div>
              <div className="mt-auto grid gap-3 sm:grid-cols-2">
                <Button
                  icon={<Navigation className="h-4 w-4" />}
                  iconPosition="left"
                  onClick={() => openExternal(MAPS_DIRECTIONS_URL)}
                  className="w-full"
                >
                  Como chegar
                </Button>
                <Button
                  variant="secondary"
                  icon={<WhatsAppIcon className="h-4 w-4 text-[#25D366]" />}
                  iconPosition="left"
                  onClick={() => openChat('Olá, Handy! Gostaria de visitar a loja. Podem me ajudar?')}
                  className="w-full"
                >
                  WhatsApp
                </Button>
              </div>
            </div>

            <div className="relative min-h-[300px] overflow-hidden border-t border-white/[0.06] sm:min-h-[360px] lg:min-h-[440px] lg:border-l lg:border-t-0">
              <MapIllustration />
              {!STATIC_MAP && (
                <iframe
                  title={`Mapa — ${STORE.fullAddress}`}
                  src={MAPS_EMBED_URL}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  onLoad={() => setMapLoaded(true)}
                  className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-700 ${mapLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
              )}
              <button
                onClick={() => openExternal(MAPS_PLACE_URL)}
                className="absolute bottom-4 right-4 z-10 inline-flex h-9 items-center gap-1.5 rounded-full bg-white px-3.5 text-[12.5px] font-medium text-ink-950 shadow-lg transition hover:-translate-y-px hover:bg-handy-50"
              >
                Abrir no Google Maps
                <ExternalLink className="h-3.5 w-3.5" />
              </button>
            </div>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}

function InfoRow({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06] text-handy-200 ring-1 ring-inset ring-white/10">
        {icon}
      </span>
      <div className="min-w-0">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/40">{label}</span>
        <p className="mt-1 text-[15px] leading-relaxed text-white/85">{children}</p>
      </div>
    </div>
  );
}

/** Mapa ilustrado do entorno, exibido enquanto o mapa real carrega (ou no lugar dele). */
function MapIllustration() {
  return (
    <div className="absolute inset-0 bg-[#e9ebf0]">
      <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 800 500" aria-hidden>
        <rect width="800" height="500" fill="#e9ebf0" />
        <g fill="#dde0e7">
          <rect x="40" y="30" width="190" height="120" rx="10" />
          <rect x="270" y="30" width="210" height="120" rx="10" />
          <rect x="520" y="30" width="240" height="120" rx="10" />
          <rect x="40" y="200" width="190" height="110" rx="10" />
          <rect x="520" y="200" width="240" height="110" rx="10" />
          <rect x="40" y="360" width="190" height="120" rx="10" />
          <rect x="270" y="360" width="210" height="120" rx="10" />
          <rect x="520" y="360" width="240" height="120" rx="10" />
        </g>
        <rect x="270" y="200" width="210" height="110" rx="10" fill="#d3ecd9" />
        <g stroke="#ffffff" strokeLinecap="round" fill="none">
          <path d="M0 175 H800" strokeWidth="26" />
          <path d="M0 335 H800" strokeWidth="18" />
          <path d="M250 0 V500" strokeWidth="18" />
          <path d="M500 0 V500" strokeWidth="26" />
        </g>
        <g fill="#8a90a3" fontFamily="Inter, system-ui, sans-serif" fontSize="13" fontWeight="500">
          <text x="600" y="170">Rua Capitão Lisboa</text>
        </g>
      </svg>
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-full flex-col items-center">
        <span className="rounded-full bg-ink-950 px-3.5 py-1.5 text-[12.5px] font-medium text-white shadow-xl">
          Handy · {STORE.address}
        </span>
        <span className="-mt-px h-3 w-3 rotate-45 bg-ink-950" />
        <span className="mt-1 h-3 w-3 rounded-full bg-handy-600 ring-4 ring-handy-600/25" />
      </div>
    </div>
  );
}
