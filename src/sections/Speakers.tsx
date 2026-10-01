import { Droplets, Music2, Zap } from 'lucide-react';
import { ShopCard } from '../components/ShopCard';
import { SectionHeading } from '../components/ui/SectionHeading';
import { SPEAKERS } from '../data/catalog';
import { hasImage } from '../lib/images';

const PERKS = [
  { icon: Droplets, text: 'Modelos à prova d’água' },
  { icon: Zap, text: 'Bateria para o dia todo' },
  { icon: Music2, text: 'Teste o som na loja' },
];

/** Mínimo de caixas com foto real para a vitrine aparecer (evita vitrine com blocos vazios). */
const MIN_WITH_PHOTO = 3;

/** Vitrine dedicada às caixas de som Bluetooth. Aparece quando as fotos forem adicionadas. */
export function Speakers() {
  const withPhoto = SPEAKERS.filter((p) => hasImage(p.image));
  if (withPhoto.length < MIN_WITH_PHOTO) return null;

  return (
    <section id="caixas-de-som" className="section" aria-labelledby="caixas-titulo">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="caixas-titulo"
            eyebrow="Caixas de som Bluetooth"
            title="Som JBL para levar a qualquer lugar."
            highlight={[1]}
            description="Da Go 4, que cabe no bolso, à Boombox 3 para festas. Venha ouvir cada modelo na loja antes de escolher."
          />
          <ul className="flex flex-wrap gap-2">
            {PERKS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-2 text-[13px] text-white/65">
                <Icon className="h-4 w-4 text-handy-300" aria-hidden />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-5">
          {withPhoto.map((p, i) => (
            <ShopCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
