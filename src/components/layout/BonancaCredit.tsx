import { withBase } from '../../lib/images';

/** Assinatura de quem criou o site, com o sol original do logo da Bonança. */
export function BonancaCredit() {
  return (
    <div className="mx-auto mt-10 flex w-fit items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-5 py-3.5 text-[#f2efe8] transition-colors duration-300 hover:border-white/15">
      <img
        src={withBase('/images/bonanca-sol.webp')}
        alt=""
        width={150}
        height={154}
        loading="lazy"
        decoding="async"
        className="h-12 w-auto shrink-0"
      />
      <div className="leading-none">
        <span className="block text-[10.5px] uppercase tracking-[0.22em] text-white/40">Site criado por</span>
        <span className="mt-1.5 block font-display text-[19px] font-semibold uppercase tracking-[0.06em]">Bonança</span>
        <span className="mt-1 block text-[11.5px] text-white/50">creative technology studio</span>
      </div>
    </div>
  );
}
