import { AnimatePresence, m } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { ShopCard } from '../components/ShopCard';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/SectionHeading';
import { BRANDS, CATEGORIES } from '../data/catalog';
import { useCatalogFilter, type CategoryFilter } from '../hooks/useCatalogFilter';
import { openChat } from '../lib/contact';
import { EASE } from '../lib/motion';

const TABS: { id: CategoryFilter; label: string }[] = [{ id: 'todos', label: 'Todos' }, ...CATEGORIES];

export function Catalog() {
  const { category, setCategory, brand, setBrand, query, setQuery, items, searching } = useCatalogFilter();
  const description = searching
    ? `Resultados para “${query.trim()}” em todo o catálogo`
    : category === 'todos'
      ? 'Todo o catálogo da Handy'
      : CATEGORIES.find((c) => c.id === category)?.description;

  return (
    <section id="produtos" className="section" aria-labelledby="produtos-titulo">
      <div className="container-site">
        <SectionHeading
          id="produtos-titulo"
          eyebrow="Catálogo"
          title="Escolha uma categoria."
          highlight={[2]}
          description="Tudo o que você encontra na loja física da Handy, organizado para facilitar sua escolha."
        />

        <Reveal className="mt-10 flex flex-col gap-4" y={16}>
          {/* Busca */}
          <label className="relative block max-w-md">
            <span className="sr-only">Buscar produto</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              id="busca-produtos"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar: iPhone 17, AirPods, JBL, capinha…"
              className="h-11 w-full rounded-full border border-white/10 bg-white/[0.04] pl-11 pr-10 text-[14px] text-white placeholder:text-white/35 focus:border-handy-400 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Limpar busca"
                className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full text-white/50 hover:bg-white/10 hover:text-white"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </label>

          {/* Categorias */}
          <div
            role="tablist"
            aria-label="Categorias"
            className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {TABS.map((c) => {
              const selected = !searching && c.id === category;
              return (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={selected}
                  onClick={() => {
                    setCategory(c.id);
                    setQuery('');
                  }}
                  className={`h-10 shrink-0 rounded-full px-4 text-[13.5px] font-medium transition-colors duration-200 ${
                    selected ? 'bg-white text-ink-950' : 'text-white/60 ring-1 ring-inset ring-white/10 hover:text-white'
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          {/* Marcas */}
          <div className="flex flex-wrap items-center gap-2 text-[12.5px]" aria-label="Filtrar por marca">
            <span className="text-white/40">Marca:</span>
            {(['todas', ...BRANDS] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBrand(b)}
                aria-pressed={brand === b}
                className={`h-8 rounded-full px-3 transition-colors ${
                  brand === b ? 'bg-handy-600/40 text-white ring-1 ring-inset ring-handy-300/40' : 'text-white/55 hover:text-white'
                }`}
              >
                {b === 'todas' ? 'Todas' : b}
              </button>
            ))}
          </div>
        </Reveal>

        <p className="mt-6 text-[13.5px] text-white/45" aria-live="polite">
          {description} · {items.length} {items.length === 1 ? 'produto' : 'produtos'}
        </p>

        <div className="mt-6 min-h-[360px]">
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={`${category}-${brand}-${searching ? query : ''}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.3, ease: EASE }}
              className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 md:gap-6 lg:grid-cols-4"
            >
              {items.map((p, i) => (
                <ShopCard key={p.id} product={p} index={i} animateOnMount />
              ))}
            </m.div>
          </AnimatePresence>

          {items.length === 0 && (
            <div className="rounded-3xl border border-dashed border-white/10 p-10 text-center">
              <p className="text-[15px] text-white/70">Nenhum produto encontrado.</p>
              <button
                onClick={() => openChat(`Olá, Handy! Estou procurando: ${query || 'um produto'}. Vocês têm?`)}
                className="mt-3 text-[14px] text-handy-300 hover:underline"
              >
                Pergunte à Handy pelo WhatsApp
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
