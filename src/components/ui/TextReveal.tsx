import { m } from 'framer-motion';
import { EASE } from '../../lib/motion';

interface TextRevealProps {
  id?: string;
  text: string;
  className?: string;
  /** Palavras (índices) com destaque em gradiente. */
  highlight?: number[];
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  /** Controla a animação manualmente (hero); sem ele, anima ao entrar na tela. */
  play?: boolean;
}

/** Revela o texto palavra por palavra, subindo de dentro de uma máscara. */
export function TextReveal({ id, text, className = '', highlight = [], delay = 0, as = 'h2', play }: TextRevealProps) {
  const Tag = m[as];
  const words = text.split(' ');
  const trigger = play !== undefined ? { animate: play ? 'show' : 'hidden' } : { whileInView: 'show', viewport: { once: true, margin: '0px 0px -10% 0px' } };

  return (
    <Tag
      id={id}
      className={className}
      initial="hidden"
      {...trigger}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] align-bottom" aria-hidden>
          <m.span
            className={`inline-block ${highlight.includes(i) ? 'text-gradient-brand' : ''}`}
            variants={{
              hidden: { y: '110%', opacity: 0 },
              show: { y: '0%', opacity: 1, transition: { duration: 0.9, ease: EASE } },
            }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </m.span>
        </span>
      ))}
    </Tag>
  );
}
