import { AnimatePresence, m } from 'framer-motion';
import { useScrolled } from '../../hooks/useScrolled';
import { openChat } from '../../lib/contact';
import { EASE } from '../../lib/motion';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';

/** Botão flutuante de atendimento pelo WhatsApp, aparece após o hero. */
export function FloatingChat() {
  const visible = useScrolled(600);
  return (
    <AnimatePresence>
      {visible && (
        <m.button
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.45, ease: EASE }}
          onClick={() => openChat()}
          aria-label="Falar com a Handy pelo WhatsApp"
          className="group fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center gap-2 rounded-full bg-[#25D366] text-white shadow-[0_12px_32px_-10px_rgba(37,211,102,.7)] ring-1 ring-inset ring-white/20 transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:bg-[#1fbe5b] active:scale-95 md:bottom-7 md:right-7 md:w-auto md:pl-3.5 md:pr-4"
        >
          <WhatsAppIcon className="h-6 w-6 md:h-5 md:w-5" />
          <span className="hidden text-[13.5px] font-medium md:inline">Falar com a Handy</span>
        </m.button>
      )}
    </AnimatePresence>
  );
}
