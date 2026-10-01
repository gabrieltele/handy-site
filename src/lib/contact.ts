/**
 * Canal de atendimento da Handy.
 * O número fica encapsulado aqui: a interface exibe apenas botões de atendimento,
 * nunca a URL direta.
 */
const WHATSAPP_NUMBER = '5515996210403';

export const STORE = {
  name: 'Handy',
  instagram: 'handyshoptatui',
  instagramUrl: 'https://instagram.com/handyshoptatui',
  address: 'Rua Capitão Lisboa, 1055',
  city: 'Tatuí - SP',
  fullAddress: 'Rua Capitão Lisboa, 1055 - Tatuí-SP',
  years: 14,
};

const MAPS_QUERY = encodeURIComponent('Rua Capitão Lisboa, 1055 - Tatuí - SP');
export const MAPS_EMBED_URL = `https://www.google.com/maps?q=${MAPS_QUERY}&output=embed`;
export const MAPS_PLACE_URL = `https://www.google.com/maps/search/?api=1&query=${MAPS_QUERY}`;
export const MAPS_DIRECTIONS_URL = `https://www.google.com/maps/dir/?api=1&destination=${MAPS_QUERY}`;

export const DEFAULT_MESSAGE = 'Olá, Handy! Vim pelo site e gostaria de atendimento.';

/** Abre um link externo em nova aba por meio de um link real (funciona inclusive em páginas incorporadas). */
export function openExternal(url: string) {
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/** Abre o atendimento da Handy no WhatsApp com uma mensagem já preenchida. */
export function openChat(message: string = DEFAULT_MESSAGE) {
  openExternal(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`);
}
