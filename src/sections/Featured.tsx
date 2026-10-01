import { ArrowRight } from 'lucide-react';
import { ShopCard } from '../components/ShopCard';
import { Button } from '../components/ui/Button';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';
import { FEATURED } from '../data/catalog';
import { scrollToId } from '../lib/scroll';

export function Featured() {
  return (
    <section id="destaques" aria-labelledby="destaques-titulo" className="section">
      <div className="container-site">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            id="destaques-titulo"
            eyebrow="Produtos em destaque"
            title="Os mais procurados na Handy."
            highlight={[4]}
            description="Apple, JBL e Logitech com procedência. Consulte disponibilidade, cores e condições com nossa equipe."
          />
          <Reveal delay={0.15} className="shrink-0">
            <Button variant="secondary" icon={<ArrowRight className="h-4 w-4" />} onClick={() => scrollToId('produtos')}>
              Ver catálogo completo
            </Button>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 md:gap-6 min-[480px]:grid-cols-2 lg:grid-cols-4">
          {FEATURED.slice(0, 8).map((p, i) => (
            <ShopCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
