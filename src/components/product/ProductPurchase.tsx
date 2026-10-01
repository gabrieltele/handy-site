import { ShieldCheck, Store, Wrench } from 'lucide-react';
import type { ReactNode } from 'react';
import type { Product } from '../../data/catalog';
import type { ProductOption } from '../../data/details';
import { STORE, openChat } from '../../lib/contact';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';
import type { GalleryImage } from './gallery';
import { Thumb } from './Thumb';

interface ProductPurchaseProps {
  product: Product;
  categoryLabel?: string;
  condition: string;
  images: GalleryImage[];
  index: number;
  colorName?: string;
  option?: ProductOption;
  variant: string;
  onSelectImage: (i: number) => void;
  onSelectVariant: (v: string) => void;
}

/** Coluna de compra: título completo, preço, cor, variação e botões de atendimento. */
export function ProductPurchase({
  product,
  categoryLabel,
  condition,
  images,
  index,
  colorName,
  option,
  variant,
  onSelectImage,
  onSelectVariant,
}: ProductPurchaseProps) {
  const showVariant = option && option.values.length > 1 ? variant : '';
  const brandPrefix = product.brand === 'Apple' && !product.name.startsWith('Apple') ? 'Apple ' : '';
  const summary = [product.name, showVariant, colorName ? `cor ${colorName}` : ''].filter(Boolean).join(', ');
  const buyMessage = `Olá, Handy! Tenho interesse no ${summary}. Está disponível? Qual o valor?`;
  const hasColors = images.some((i) => i.hex);

  return (
    <div className="flex min-w-0 flex-col">
      <div className="flex flex-wrap items-center gap-2 text-[12px]">
        <span className="rounded-full bg-handy-600/30 px-2.5 py-1 font-medium text-handy-200">{condition}</span>
        <span className="text-white/45">
          {product.brand} · {categoryLabel}
        </span>
      </div>

      <h2 id="produto-titulo" className="mt-3 font-display text-[21px] font-semibold leading-snug tracking-tight text-white sm:text-[25px]">
        {brandPrefix}
        {product.name}
        {showVariant && <span className="text-white/70"> ({showVariant})</span>}
        {colorName && <span className="text-white/70"> - {colorName}</span>}
      </h2>

      <div className="mt-5 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-4">
        <span className="text-[12px] text-white/45">Preço</span>
        <div className="mt-0.5 flex flex-wrap items-baseline gap-x-3">
          <span className="font-display text-[26px] font-semibold text-white">{product.price}</span>
          <span className="text-[13px] text-emerald-400">Consulte condições no Pix e no cartão</span>
        </div>
        <button
          type="button"
          onClick={() => openChat(`${buyMessage} Quais as formas de pagamento?`)}
          className="mt-1 text-[13px] text-handy-300 hover:underline"
        >
          Ver meios de pagamento e parcelamento
        </button>
      </div>

      {hasColors && (
        <Choice label="Cor" value={colorName}>
          {images.map((img, i) =>
            img.hex ? (
              <Thumb
                key={img.src}
                src={img.src}
                label={img.label}
                selected={i === index}
                onSelect={() => onSelectImage(i)}
                className="h-[60px] w-[60px] p-1"
              />
            ) : null,
          )}
        </Choice>
      )}

      {option && (
        <Choice label={option.label} value={variant}>
          {option.values.map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => onSelectVariant(v)}
              aria-pressed={v === variant}
              className={`h-10 rounded-xl px-4 text-[13.5px] transition-colors ${
                v === variant ? 'bg-white/[0.06] text-white ring-2 ring-handy-400' : 'text-white/70 ring-1 ring-white/15 hover:text-white hover:ring-white/40'
              }`}
            >
              {v}
            </button>
          ))}
        </Choice>
      )}

      <div className="mt-7 grid gap-2.5">
        <button
          type="button"
          onClick={() => openChat(buyMessage)}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#25D366] text-[15px] font-semibold text-white transition-colors hover:bg-[#1fbe5b]"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Comprar pelo WhatsApp
        </button>
        <button
          type="button"
          onClick={() => openChat(`Olá, Handy! Tenho uma dúvida sobre o ${product.name}.`)}
          className="h-12 rounded-xl bg-white/[0.06] text-[15px] font-medium text-white ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.1]"
        >
          Tirar dúvidas
        </button>
      </div>

      <ul className="mt-6 space-y-3 text-[13.5px] text-white/60">
        <Perk icon={<Store className="h-4 w-4" />}>
          <span className="text-emerald-400">Retire na loja</span> · {STORE.address}, {STORE.city}
        </Perk>
        <Perk icon={<ShieldCheck className="h-4 w-4" />}>Procedência garantida</Perk>
        <Perk icon={<Wrench className="h-4 w-4" />}>Assistência técnica própria da Handy</Perk>
      </ul>
    </div>
  );
}

function Choice({ label, value, children }: { label: string; value?: string; children: ReactNode }) {
  return (
    <div className="mt-6">
      <p className="text-[14px] text-white/60">
        {label}: <span className="font-medium text-white">{value}</span>
      </p>
      <div className="mt-2.5 flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Perk({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <li className="flex items-start gap-2.5">
      <span className="mt-0.5 text-white/40" aria-hidden>
        {icon}
      </span>
      <span>{children}</span>
    </li>
  );
}
