interface LogoProps {
  className?: string;
  /** Exibe o selo circular azul da marca, como no perfil. */
  badge?: boolean;
}

/** Logotipo [HANDY] — brackets e tipografia geométrica da identidade. */
export function Logo({ className = '', badge = false }: LogoProps) {
  const word = (
    <span className="font-display font-semibold uppercase tracking-[0.18em]">
      <span className="font-light opacity-80">[</span>
      HANDY
      <span className="font-light opacity-80">]</span>
    </span>
  );

  if (!badge) return <span className={`inline-flex items-center text-white ${className}`}>{word}</span>;

  return (
    <span
      className={`inline-flex aspect-square items-center justify-center rounded-full bg-handy-700 text-white shadow-[0_0_0_1px_rgba(255,255,255,.08),0_20px_60px_-20px_rgba(63,79,194,.8)] ${className}`}
    >
      {word}
    </span>
  );
}
