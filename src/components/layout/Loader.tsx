import { m } from 'framer-motion';
import { EASE } from '../../lib/motion';

/** Loading inicial curto: brackets se abrem revelando a marca, linha de progresso e saída em cortina. */
export function Loader() {
  return (
    <m.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: EASE } }}
    >
      <div className="flex flex-col items-center">
        <div className="flex items-center font-display text-2xl font-semibold uppercase tracking-[0.2em] text-white sm:text-3xl">
          <m.span
            className="font-light text-white/70"
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            [
          </m.span>
          <span className="overflow-hidden">
            <m.span
              className="inline-block px-1"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.25 }}
            >
              HANDY
            </m.span>
          </span>
          <m.span
            className="font-light text-white/70"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            ]
          </m.span>
        </div>
        <div className="mt-6 h-px w-40 overflow-hidden bg-white/10">
          <m.div
            className="h-full bg-gradient-to-r from-handy-400 to-white"
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
          />
        </div>
      </div>
    </m.div>
  );
}
