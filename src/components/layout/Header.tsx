import { AnimatePresence, m } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NAV_LINKS } from '../../data/content';
import { useScrolled } from '../../hooks/useScrolled';
import { openChat } from '../../lib/contact';
import { EASE } from '../../lib/motion';
import { lockScroll, scrollToId } from '../../lib/scroll';
import { Button } from '../ui/Button';
import { Logo } from '../ui/Logo';

export function Header({ ready }: { ready: boolean }) {
  const scrolled = useScrolled(24);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>('inicio');

  // Destaca o link da seção visível
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    lockScroll(open);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    // Destrava a rolagem antes de rolar (o menu mobile a mantém travada enquanto aberto).
    lockScroll(false);
    requestAnimationFrame(() => scrollToId(id));
  };

  return (
    <>
      <m.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -24, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
      >
        <div
          className={`transition-all duration-500 ease-premium ${
            scrolled
              ? 'border-b border-white/[0.07] bg-ink-950/60 shadow-[0_10px_40px_-20px_rgba(0,0,0,.8)] backdrop-blur-lg'
              : 'border-b border-transparent bg-transparent'
          }`}
        >
          <nav
            className={`container-site flex items-center justify-between transition-all duration-500 ease-premium ${
              scrolled ? 'h-[72px]' : 'h-[88px]'
            }`}
            aria-label="Principal"
          >
            <button onClick={() => go('inicio')} className="text-[19px] lg:text-[21px]" aria-label="Handy — início">
              <Logo />
            </button>

            <ul className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => go(link.id)}
                    className={`relative rounded-full px-4 py-2.5 text-[15px] transition-colors duration-300 ${
                      active === link.id ? 'text-white' : 'text-white/55 hover:text-white'
                    }`}
                  >
                    {active === link.id && (
                      <m.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/[0.07] ring-1 ring-inset ring-white/10"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <Button
                size="md"
                variant="primary"
                className="hidden sm:inline-flex"
                icon={<ArrowUpRight className="h-4 w-4" />}
                onClick={() => openChat('Olá, Handy! Quero comprar um produto. Podem me ajudar?')}
              >
                Comprar agora
              </Button>
              <button
                onClick={() => setOpen((v) => !v)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06] ring-1 ring-inset ring-white/10 transition hover:bg-white/10 lg:hidden"
                aria-label={open ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={open}
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>
      </m.header>

      {/* Menu mobile */}
      <AnimatePresence>
        {open && (
          <m.div
            className="fixed inset-0 z-40 bg-ink-950/[0.97] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
          >
            <m.ul
              className="container-site flex h-full flex-col justify-center gap-1 pb-16 pt-24"
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
            >
              {NAV_LINKS.map((link) => (
                <m.li
                  key={link.id}
                  variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
                >
                  <button
                    onClick={() => go(link.id)}
                    className="flex w-full items-center justify-between border-b border-white/[0.06] py-4 font-display text-3xl font-medium tracking-tight text-white/90"
                  >
                    {link.label}
                    <ArrowUpRight className="h-5 w-5 text-white/30" />
                  </button>
                </m.li>
              ))}
              <m.li
                className="pt-8"
                variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } }}
              >
                <Button
                  size="lg"
                  className="w-full"
                  icon={<ArrowUpRight className="h-4 w-4" />}
                  onClick={() => {
                    setOpen(false);
                    openChat('Olá, Handy! Quero comprar um produto. Podem me ajudar?');
                  }}
                >
                  Comprar agora
                </Button>
              </m.li>
            </m.ul>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
