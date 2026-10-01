import { AnimatePresence, LazyMotion, MotionConfig, m, useScroll, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FloatingChat } from './components/layout/FloatingChat';
import { Footer } from './components/layout/Footer';
import { Header } from './components/layout/Header';
import { Loader } from './components/layout/Loader';
import { ProductModalProvider } from './components/product/ProductModalContext';
import { lockScroll } from './lib/scroll';
import { About } from './sections/About';
import { Catalog } from './sections/Catalog';
import { Featured } from './sections/Featured';
import { FinalCTA } from './sections/FinalCTA';
import { Hero } from './sections/Hero';
import { IPhoneShowcase } from './sections/IPhoneShowcase';
import { Location } from './sections/Location';
import { Services } from './sections/Services';
import { Speakers } from './sections/Speakers';
import { Store } from './sections/Store';

const loadFeatures = () => import('./lib/motionFeatures').then((mod) => mod.default);

/** Loading curto: só uma assinatura visual, sem segurar o conteúdo. */
const LOADER_MS = 650;

export default function App() {
  const [loading, setLoading] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    if (!loading) return;
    lockScroll(true);
    const t = setTimeout(() => {
      setLoading(false);
      lockScroll(false);
    }, LOADER_MS);
    return () => clearTimeout(t);
  }, [loading]);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  const ready = !loading;

  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">
        <ProductModalProvider>
          <a
            href="#produtos"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-ink-950"
          >
            Pular para os produtos
          </a>
          <AnimatePresence>{loading && <Loader key="loader" />}</AnimatePresence>

          <m.div
            aria-hidden
            style={{ scaleX: progress }}
            className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-handy-500 via-handy-300 to-white"
          />

          <Header ready={ready} />
          <main id="conteudo">
            <Hero ready={ready} />
            <Featured />
            <IPhoneShowcase />
            <Catalog />
            <Speakers />
            <Services />
            <About />
            <Store />
            <Location />
            <FinalCTA />
          </main>
          <Footer />
          <FloatingChat />
        </ProductModalProvider>
      </MotionConfig>
    </LazyMotion>
  );
}
