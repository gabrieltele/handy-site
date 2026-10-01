import { animate, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface CounterProps {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}

/** Contador animado que dispara ao entrar na viewport. */
export function Counter({ to, prefix = '', suffix = '', decimals = 0, duration = 1.6, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  const formatted = value.toLocaleString('pt-BR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return (
    <span ref={ref} className={`tabular-nums ${className ?? ''}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
