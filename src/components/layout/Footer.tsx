import { ArrowUp, MapPin } from 'lucide-react';
import { NAV_LINKS } from '../../data/content';
import { MAPS_DIRECTIONS_URL, STORE, openChat, openExternal } from '../../lib/contact';
import { scrollToId } from '../../lib/scroll';
import { InstagramIcon } from '../ui/InstagramIcon';
import { Logo } from '../ui/Logo';
import { BonancaCredit } from './BonancaCredit';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/[0.06] pb-24 pt-20 md:pb-10">
      <div className="container-site">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="col-span-2 lg:col-span-1">
            <Logo className="text-xl" />
            <p className="mt-5 max-w-xs text-[14.5px] leading-relaxed text-white/50">
              Loja de celulares especializada em toda a linha Apple e assistência técnica. Mais de {STORE.years} anos em Tatuí-SP.
            </p>
            <div className="mt-6 flex gap-2">
              <SocialButton label="Instagram da Handy" onClick={() => openExternal(STORE.instagramUrl)}>
                <InstagramIcon className="h-[18px] w-[18px]" />
              </SocialButton>
              <SocialButton label="Atendimento Handy" onClick={() => openChat()}>
                <WhatsAppIcon className="h-[18px] w-[18px]" />
              </SocialButton>
              <SocialButton label="Como chegar" onClick={() => openExternal(MAPS_DIRECTIONS_URL)}>
                <MapPin className="h-[18px] w-[18px]" />
              </SocialButton>
            </div>
          </div>

          <FooterCol title="Navegação">
            {NAV_LINKS.map((l) => (
              <FooterLink key={l.id} onClick={() => scrollToId(l.id)}>
                {l.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Atendimento">
            <FooterLink onClick={() => openChat('Olá, Handy! Quero comprar um iPhone.')}>Comprar iPhone</FooterLink>
            <FooterLink onClick={() => openChat('Olá, Handy! Quero vender ou dar meu aparelho na troca.')}>Vender meu aparelho</FooterLink>
            <FooterLink onClick={() => openChat('Olá, Handy! Preciso de assistência técnica.')}>Assistência técnica</FooterLink>
            <FooterLink onClick={() => openChat()}>Falar com a Handy</FooterLink>
          </FooterCol>

          <FooterCol title="Loja">
            <address className="text-[14px] not-italic leading-relaxed text-white/60">
              Handy
              <br />
              {STORE.address}
              <br />
              {STORE.city}
            </address>
            <FooterLink onClick={() => openExternal(STORE.instagramUrl)}>@{STORE.instagram}</FooterLink>
            <FooterLink onClick={() => openExternal(MAPS_DIRECTIONS_URL)}>Como chegar</FooterLink>
          </FooterCol>
        </div>

        <div className="hairline mt-16" />
        <div className="mt-8 flex flex-col-reverse items-center justify-between gap-4 text-center text-[12.5px] text-white/45 sm:flex-row sm:text-left">
          <p>© {year} Handy · Tatuí-SP. Todos os direitos reservados.</p>
          <p className="text-center">Apple, iPhone, Apple Watch, AirPods, iPad e Mac são marcas da Apple Inc.</p>
          <button
            onClick={() => scrollToId('inicio')}
            className="group flex items-center gap-2 text-white/50 transition-colors hover:text-white"
          >
            Voltar ao topo
            <ArrowUp className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
        <BonancaCredit />
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/35">{title}</h2>
      <div className="mt-5 flex flex-col items-start gap-3">{children}</div>
    </div>
  );
}

function FooterLink({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="relative text-[14px] text-white/60 transition-colors duration-300 after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:text-white hover:after:w-full"
    >
      {children}
    </button>
  );
}

function SocialButton({ children, label, onClick }: { children: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.05] text-white/70 ring-1 ring-inset ring-white/10 transition-all duration-300 ease-premium hover:-translate-y-0.5 hover:bg-white hover:text-ink-950"
    >
      {children}
    </button>
  );
}
