import { Picture } from '../ui/Picture';

interface ThumbProps {
  src: string;
  label: string;
  selected: boolean;
  onSelect: () => void;
  /** Troca a foto ao passar o mouse (miniaturas da galeria). */
  selectOnHover?: boolean;
  className?: string;
}

/** Miniatura clicável usada na galeria e no seletor de cor. */
export function Thumb({ src, label, selected, onSelect, selectOnHover = false, className = 'h-16 w-16 md:h-[72px] md:w-[72px]' }: ThumbProps) {
  return (
    <button
      type="button"
      onMouseEnter={selectOnHover ? onSelect : undefined}
      onClick={onSelect}
      aria-label={label}
      aria-pressed={selected}
      title={label}
      className={`shrink-0 overflow-hidden rounded-xl bg-[#f2f2f4] p-1.5 transition-shadow ${className} ${
        selected ? 'ring-2 ring-handy-400' : 'ring-1 ring-white/10 hover:ring-white/40'
      }`}
    >
      <Picture src={src} alt="" sizes="72px" className="h-full w-full object-contain" />
    </button>
  );
}
