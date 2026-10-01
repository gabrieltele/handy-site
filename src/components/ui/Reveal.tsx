import { m, type HTMLMotionProps } from 'framer-motion';
import type { ReactNode } from 'react';
import { EASE } from '../../lib/motion';

interface RevealProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  blur?: boolean;
  once?: boolean;
}

/** Fade + slide ao entrar na viewport. */
export function Reveal({ children, delay = 0, y = 28, x = 0, blur = false, once = true, ...rest }: RevealProps) {
  return (
    <m.div
      initial={{ opacity: 0, y, x, filter: blur ? 'blur(8px)' : 'blur(0px)' }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: 'blur(0px)' }}
      viewport={{ once, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </m.div>
  );
}

/** Container para animações em cascata (stagger). */
export function Stagger({
  children,
  className,
  stagger = 0.08,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </m.div>
  );
}

export const staggerItem = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
};
