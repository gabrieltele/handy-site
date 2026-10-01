import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'brand';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
}

const variants: Record<Variant, string> = {
  primary: 'bg-white text-ink-950 hover:bg-white/90 shadow-[0_10px_30px_-10px_rgba(255,255,255,.35)]',
  brand:
    'bg-handy-600 text-white hover:bg-handy-500 shadow-[0_12px_36px_-12px_rgba(63,79,194,.9)] ring-1 ring-inset ring-white/10',
  secondary: 'bg-white/[0.06] text-white ring-1 ring-inset ring-white/15 hover:bg-white/[0.12]',
  ghost: 'text-white/80 hover:text-white hover:bg-white/[0.06]',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-[13px]',
  md: 'h-10 px-5 text-sm',
  lg: 'h-12 px-6 text-[14.5px]',
};

/** Botão com microinterações: leve elevação no hover, pressão no clique e ícone deslizando. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', icon, iconPosition = 'right', className = '', children, type = 'button', ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={`group relative inline-flex select-none whitespace-nowrap items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-[-0.01em] transition-all duration-300 ease-premium hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-handy-300 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950 ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {/* Brilho que atravessa o botão no hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-700 ease-premium group-hover:left-[120%] group-hover:opacity-100"
      />
      {icon && iconPosition === 'left' && <span className="relative transition-transform duration-300 ease-premium group-hover:-translate-x-0.5">{icon}</span>}
      <span className="relative">{children}</span>
      {icon && iconPosition === 'right' && <span className="relative transition-transform duration-300 ease-premium group-hover:translate-x-0.5">{icon}</span>}
    </button>
  );
});
