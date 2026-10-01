import { Check, Info } from 'lucide-react';
import type { Product } from '../../data/catalog';
import type { ProductOption } from '../../data/details';

interface ProductDetailsProps {
  product: Product;
  condition: string;
  features: string[];
  specs: { chip?: string; lancamento?: string };
  option?: ProductOption;
  colors: string[];
}

/** "O que você precisa saber" + tabela de características. */
export function ProductDetails({ product, condition, features, specs, option, colors }: ProductDetailsProps) {
  const rows: [string, string][] = [
    ['Marca', product.brand],
    ['Modelo', product.name],
    ['Condição', condition],
    ...(specs.chip ? ([['Chip', specs.chip]] as [string, string][]) : []),
    ...(specs.lancamento ? ([['Ano de lançamento', specs.lancamento]] as [string, string][]) : []),
    ...(option ? ([[option.label, option.values.join(' · ')]] as [string, string][]) : []),
    ...(colors.length ? ([['Cores', colors.join(', ')]] as [string, string][]) : []),
  ];

  return (
    <div className="grid gap-8 border-t border-white/[0.06] p-4 sm:p-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-10 lg:p-8">
      <div>
        <h3 className="font-display text-lg font-semibold text-white">O que você precisa saber sobre este produto</h3>
        <p className="mt-2 text-[14.5px] leading-relaxed text-white/60">{product.description}</p>
        {features.length > 0 && (
          <ul className="mt-4 space-y-2.5">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2.5 text-[14px] text-white/75">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-handy-300" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <h3 className="font-display text-lg font-semibold text-white">Características</h3>
        <dl className="mt-4 overflow-hidden rounded-xl border border-white/[0.07] text-[13.5px]">
          {rows.map(([label, value]) => (
            <div key={label} className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] border-b border-white/[0.06] last:border-b-0 odd:bg-white/[0.03]">
              <dt className="px-3.5 py-2.5 text-white/50">{label}</dt>
              <dd className="px-3.5 py-2.5 text-white/85">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 flex items-start gap-1.5 text-[12px] leading-relaxed text-white/40">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden />
          Imagens ilustrativas do fabricante. Cores, capacidades e preços sujeitos à disponibilidade na loja.
        </p>
      </div>
    </div>
  );
}
