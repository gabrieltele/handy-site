const HEADER_OFFSET = 80;

/** Rolagem suave nativa até uma seção, compensando a altura do header. */
export function scrollToId(id: string) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const behavior: ScrollBehavior = reduce ? 'auto' : 'smooth';
  if (id === 'inicio') {
    window.scrollTo({ top: 0, behavior });
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET, behavior });
}

/** Trava a rolagem da página (usado por janelas modais e pelo menu mobile). */
export function lockScroll(locked: boolean) {
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}
