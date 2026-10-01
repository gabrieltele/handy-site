import type { ReactNode } from 'react';
import { Reveal } from './Reveal';
import { TextReveal } from './TextReveal';

interface SectionHeadingProps {
  /** id do título, para a seção usar em aria-labelledby. */
  id?: string;
  eyebrow: string;
  title: string;
  highlight?: number[];
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({ id, eyebrow, title, highlight, description, align = 'left', className = '' }: SectionHeadingProps) {
  const centered = align === 'center';
  return (
    <div className={`${centered ? 'mx-auto text-center' : ''} max-w-3xl ${className}`}>
      <Reveal y={12}>
        <span className="eyebrow">{eyebrow}</span>
      </Reveal>
      <TextReveal
        id={id}
        text={title}
        highlight={highlight}
        className="mt-5 font-display text-[clamp(1.85rem,3.6vw,2.8rem)] font-semibold leading-[1.04] tracking-tightest text-white"
      />
      {description && (
        <Reveal delay={0.15} y={16}>
          <p className={`mt-4 text-[15px] leading-relaxed text-white/55 md:text-base ${centered ? 'mx-auto max-w-2xl' : 'max-w-xl'}`}>
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
