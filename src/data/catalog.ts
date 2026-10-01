/**
 * Catálogo da Handy.
 *
 * Todos os produtos abaixo existem no mercado. A foto principal fica em
 * `public/images/produtos/<id>.webp` e a galeria (cores/vistas) em `public/images/produtos/<id>/`.
 * Depois de adicionar fotos, rode `npm run images` (gera AVIF/WebP e o manifesto).
 * O campo `source` indica o site oficial do fabricante de onde a foto deve ser obtida.
 * Enquanto a foto não existir, o card mostra um bloco neutro com a marca.
 *
 * Para exibir preço, troque `price: 'Consulte'` por um valor, ex.: 'R$ 7.999'.
 */

export type CategoryId = 'iphone' | 'apple' | 'audio' | 'caixas-de-som' | 'acessorios' | 'informatica';

export interface Category {
  id: CategoryId;
  label: string;
  description: string;
}

export const CATEGORIES: Category[] = [
  { id: 'iphone', label: 'iPhone', description: 'Novos e seminovos revisados, com procedência.' },
  { id: 'apple', label: 'Apple', description: 'Apple Watch, iPad, MacBook e AirTag.' },
  { id: 'audio', label: 'Áudio', description: 'AirPods e fones de ouvido.' },
  { id: 'caixas-de-som', label: 'Caixas de Som', description: 'Caixas de som Bluetooth JBL.' },
  { id: 'acessorios', label: 'Acessórios', description: 'Capinhas, carregadores, cabos e películas.' },
  { id: 'informatica', label: 'Informática', description: 'Teclados e mouses Apple e Logitech.' },
];

export interface Product {
  id: string;
  name: string;
  brand: 'Apple' | 'JBL' | 'Logitech' | 'Handy';
  category: CategoryId;
  description: string;
  price: string;
  image: string;
  source: string;
  featured?: boolean;
}

const img = (id: string) => `/images/produtos/${id}.webp`;

export const PRODUCTS: Product[] = [
  // iPhone
  {
    id: 'iphone-17-pro-max',
    name: 'iPhone 17 Pro Max',
    brand: 'Apple',
    category: 'iphone',
    description: 'A maior tela da linha, sistema de câmeras Pro e a bateria que vai mais longe.',
    price: 'Consulte',
    image: img('iphone-17-pro-max'),
    source: 'https://www.apple.com/br/iphone-17-pro/',
    featured: true,
  },
  {
    id: 'iphone-17-pro',
    name: 'iPhone 17 Pro',
    brand: 'Apple',
    category: 'iphone',
    description: 'Desempenho Pro e câmeras profissionais em 6,3 polegadas.',
    price: 'Consulte',
    image: img('iphone-17-pro'),
    source: 'https://www.apple.com/br/iphone-17-pro/',
    featured: true,
  },
  {
    id: 'iphone-air',
    name: 'iPhone Air',
    brand: 'Apple',
    category: 'iphone',
    description: 'O iPhone mais fino já feito, com tela de 6,5 polegadas.',
    price: 'Consulte',
    image: img('iphone-air'),
    source: 'https://www.apple.com/br/iphone-air/',
    featured: true,
  },
  {
    id: 'iphone-17',
    name: 'iPhone 17',
    brand: 'Apple',
    category: 'iphone',
    description: 'Tela de 6,3 polegadas, câmera dupla e cores para todos os estilos.',
    price: 'Consulte',
    image: img('iphone-17'),
    source: 'https://www.apple.com/br/iphone-17/',
  },
  {
    id: 'iphone-17e',
    name: 'iPhone 17e',
    brand: 'Apple',
    category: 'iphone',
    description: 'A porta de entrada para o iPhone, com a experiência iOS completa.',
    price: 'Consulte',
    image: img('iphone-17e'),
    source: 'https://www.apple.com/br/iphone-17e/',
  },
  {
    id: 'iphone-seminovo',
    name: 'iPhone seminovo revisado',
    brand: 'Handy',
    category: 'iphone',
    description: 'Modelos anteriores, como o iPhone 16 Pro, testados pela nossa assistência. Pergunte pelos disponíveis.',
    price: 'Consulte',
    image: img('iphone-seminovo'),
    source: 'Foto do próprio estoque da Handy',
  },

  // Apple
  {
    id: 'apple-watch-series-11',
    name: 'Apple Watch Series 11',
    brand: 'Apple',
    category: 'apple',
    description: 'Saúde, treinos e notificações no pulso, integrado ao seu iPhone.',
    price: 'Consulte',
    image: img('apple-watch-series-11'),
    source: 'https://www.apple.com/br/apple-watch-series-11/',
    featured: true,
  },
  {
    id: 'apple-watch-se-3',
    name: 'Apple Watch SE 3',
    brand: 'Apple',
    category: 'apple',
    description: 'Os recursos essenciais do Apple Watch por um preço mais acessível.',
    price: 'Consulte',
    image: img('apple-watch-se-3'),
    source: 'https://www.apple.com/br/apple-watch-se-3/',
  },
  {
    id: 'ipad-pro',
    name: 'iPad Pro',
    brand: 'Apple',
    category: 'apple',
    description: 'Tela Ultra Retina XDR e chip da linha M para quem precisa de desempenho máximo.',
    price: 'Consulte',
    image: img('ipad-pro'),
    source: 'https://www.apple.com/br/ipad-pro/',
    featured: true,
  },
  {
    id: 'ipad-mini',
    name: 'iPad mini',
    brand: 'Apple',
    category: 'apple',
    description: 'Todo o poder do iPad em 8,3 polegadas, compatível com Apple Pencil Pro.',
    price: 'Consulte',
    image: img('ipad-mini'),
    source: 'https://www.apple.com/br/ipad-mini/',
  },
  {
    id: 'macbook-air',
    name: 'MacBook Air',
    brand: 'Apple',
    category: 'apple',
    description: 'Fino, silencioso e com bateria para o dia inteiro. Consulte configurações.',
    price: 'Consulte',
    image: img('macbook-air'),
    source: 'https://www.apple.com/br/macbook-air/',
    featured: true,
  },
  {
    id: 'macbook-pro',
    name: 'MacBook Pro',
    brand: 'Apple',
    category: 'apple',
    description: 'Desempenho profissional para criação, edição e desenvolvimento.',
    price: 'Consulte',
    image: img('macbook-pro'),
    source: 'https://www.apple.com/br/macbook-pro/',
  },
  {
    id: 'airtag',
    name: 'AirTag',
    brand: 'Apple',
    category: 'apple',
    description: 'Encontre chaves, mochilas e malas pelo app Buscar.',
    price: 'Consulte',
    image: img('airtag'),
    source: 'https://www.apple.com/br/airtag/',
  },

  // Áudio
  {
    id: 'airpods-pro-3',
    name: 'AirPods Pro 3',
    brand: 'Apple',
    category: 'audio',
    description: 'Cancelamento ativo de ruído e áudio espacial personalizado.',
    price: 'Consulte',
    image: img('airpods-pro-3'),
    source: 'https://www.apple.com/br/airpods-pro/',
    featured: true,
  },
  {
    id: 'airpods-4',
    name: 'AirPods 4',
    brand: 'Apple',
    category: 'audio',
    description: 'Design aberto e confortável, com versão com cancelamento de ruído.',
    price: 'Consulte',
    image: img('airpods-4'),
    source: 'https://www.apple.com/br/airpods-4/',
  },
  {
    id: 'airpods-max',
    name: 'AirPods Max',
    brand: 'Apple',
    category: 'audio',
    description: 'Fone over-ear com som de alta fidelidade e cancelamento de ruído.',
    price: 'Consulte',
    image: img('airpods-max'),
    source: 'https://www.apple.com/br/airpods-max/',
  },
  {
    id: 'jbl-tune-520bt',
    name: 'JBL Tune 520BT',
    brand: 'JBL',
    category: 'audio',
    description: 'Fone on-ear sem fio com som JBL Pure Bass e até 57 h de bateria.',
    price: 'Consulte',
    image: img('jbl-tune-520bt'),
    source: 'https://www.jbl.com.br',
  },
  {
    id: 'jbl-flip-6',
    name: 'JBL Flip 6',
    brand: 'JBL',
    category: 'caixas-de-som',
    description: 'Som potente, resistência à água e poeira (IP67) e até 12 h de reprodução.',
    price: 'Consulte',
    image: img('jbl-flip-6'),
    source: 'https://www.jbl.com.br',
  },
  {
    id: 'jbl-charge-5',
    name: 'JBL Charge 5',
    brand: 'JBL',
    category: 'caixas-de-som',
    description: 'Graves marcantes, IP67 e power bank para carregar o celular.',
    price: 'Consulte',
    image: img('jbl-charge-5'),
    source: 'https://www.jbl.com.br',
  },
  {
    id: 'jbl-go-4',
    name: 'JBL Go 4',
    brand: 'JBL',
    category: 'caixas-de-som',
    description: 'Compacta, leve e à prova d’água. Cabe no bolso e vai a qualquer lugar.',
    price: 'Consulte',
    image: img('jbl-go-4'),
    source: 'https://www.jbl.com.br',
  },
  {
    id: 'jbl-clip-5',
    name: 'JBL Clip 5',
    brand: 'JBL',
    category: 'caixas-de-som',
    description: 'Mosquetão integrado para prender na mochila, com som JBL Pro Sound.',
    price: 'Consulte',
    image: img('jbl-clip-5'),
    source: 'https://www.jbl.com.br',
  },
  {
    id: 'jbl-boombox-3',
    name: 'JBL Boombox 3',
    brand: 'JBL',
    category: 'caixas-de-som',
    description: 'Graves profundos e até 24 h de bateria para festas e viagens.',
    price: 'Consulte',
    image: img('jbl-boombox-3'),
    source: 'https://www.jbl.com.br',
  },

  // Acessórios
  {
    id: 'capa-silicone-magsafe',
    name: 'Capa de silicone com MagSafe',
    brand: 'Apple',
    category: 'acessorios',
    description: 'Toque macio, proteção e encaixe magnético para acessórios MagSafe.',
    price: 'Consulte',
    image: img('capa-silicone-magsafe'),
    source: 'https://www.apple.com/br/shop/accessories/all',
    featured: true,
  },
  {
    id: 'capa-techwoven-magsafe',
    name: 'Capa TechWoven com MagSafe',
    brand: 'Apple',
    category: 'acessorios',
    description: 'Tecido resistente com toque premium e encaixe magnético.',
    price: 'Consulte',
    image: img('capa-techwoven-magsafe'),
    source: 'https://www.apple.com/br/shop/accessories/all',
  },
  {
    id: 'carregador-magsafe',
    name: 'Carregador MagSafe',
    brand: 'Apple',
    category: 'acessorios',
    description: 'Carregamento sem fio que se alinha magneticamente ao iPhone.',
    price: 'Consulte',
    image: img('carregador-magsafe'),
    source: 'https://www.apple.com/br/shop/accessories/all',
  },
  {
    id: 'adaptador-usb-c-35w',
    name: 'Adaptador USB-C duplo de 35 W',
    brand: 'Apple',
    category: 'acessorios',
    description: 'Carrega dois aparelhos ao mesmo tempo, como iPhone e AirPods.',
    price: 'Consulte',
    image: img('adaptador-usb-c-35w'),
    source: 'https://www.apple.com/br/shop/accessories/all',
  },
  {
    id: 'cabo-usb-c',
    name: 'Cabo de carregamento USB-C (1 m)',
    brand: 'Apple',
    category: 'acessorios',
    description: 'Cabo USB-C para USB-C, para iPhone 15 em diante, iPad e Mac.',
    price: 'Consulte',
    image: img('cabo-usb-c'),
    source: 'https://www.apple.com/br/shop/accessories/all',
  },
  {
    id: 'cabo-usb-c-lightning',
    name: 'Cabo USB-C para Lightning',
    brand: 'Apple',
    category: 'acessorios',
    description: 'Para iPhones com conector Lightning, com carregamento rápido.',
    price: 'Consulte',
    image: img('cabo-usb-c-lightning'),
    source: 'https://www.apple.com/br/shop/accessories/all',
  },
  {
    id: 'pelicula-vidro',
    name: 'Película de vidro',
    brand: 'Handy',
    category: 'acessorios',
    description: 'Proteção para a tela, com aplicação feita na loja.',
    price: 'Consulte',
    image: img('pelicula-vidro'),
    source: 'Foto do próprio estoque da Handy',
  },

  // Informática
  {
    id: 'magic-keyboard',
    name: 'Magic Keyboard',
    brand: 'Apple',
    category: 'informatica',
    description: 'Teclado sem fio da Apple, com bateria recarregável via USB-C.',
    price: 'Consulte',
    image: img('magic-keyboard'),
    source: 'https://www.apple.com/br/shop/accessories/all',
  },
  {
    id: 'magic-mouse',
    name: 'Magic Mouse',
    brand: 'Apple',
    category: 'informatica',
    description: 'Superfície Multi-Touch para gestos no Mac.',
    price: 'Consulte',
    image: img('magic-mouse'),
    source: 'https://www.apple.com/br/shop/accessories/all',
  },
  {
    id: 'logitech-mx-keys-s',
    name: 'Logitech MX Keys S',
    brand: 'Logitech',
    category: 'informatica',
    description: 'Teclado sem fio com iluminação inteligente e conexão com até 3 dispositivos.',
    price: 'Consulte',
    image: img('logitech-mx-keys-s'),
    source: 'https://www.logitech.com/pt-br',
  },
  {
    id: 'logitech-mx-master-3s',
    name: 'Logitech MX Master 3S',
    brand: 'Logitech',
    category: 'informatica',
    description: 'Mouse ergonômico com cliques silenciosos e sensor de 8.000 DPI.',
    price: 'Consulte',
    image: img('logitech-mx-master-3s'),
    source: 'https://www.logitech.com/pt-br',
  },
  {
    id: 'logitech-pebble-keys-2',
    name: 'Logitech Pebble Keys 2 K380s',
    brand: 'Logitech',
    category: 'informatica',
    description: 'Teclado compacto Bluetooth para Mac, iPad e iPhone.',
    price: 'Consulte',
    image: img('logitech-pebble-keys-2'),
    source: 'https://www.logitech.com/pt-br',
  },
  {
    id: 'logitech-pebble-mouse-2',
    name: 'Logitech Pebble Mouse 2 M350s',
    brand: 'Logitech',
    category: 'informatica',
    description: 'Mouse fino e silencioso, ideal para levar junto com o notebook.',
    price: 'Consulte',
    image: img('logitech-pebble-mouse-2'),
    source: 'https://www.logitech.com/pt-br',
  },
];

export const FEATURED = PRODUCTS.filter((p) => p.featured);
export const SPEAKERS = PRODUCTS.filter((p) => p.category === 'caixas-de-som');
export const BRANDS = [...new Set(PRODUCTS.map((p) => p.brand))];

export const interestMessage = (p: Product) => `Olá, Handy! Tenho interesse no ${p.name}. Está disponível?`;

/**
 * Fotos da loja física. Coloque os arquivos em `public/images/loja/` e liste aqui.
 * Enquanto a lista estiver vazia, a seção "Nossa loja" mostra endereço e atendimento.
 */
export interface StorePhoto {
  src: string;
  alt: string;
}

export const STORE_PHOTOS: StorePhoto[] = [
  // { src: '/images/loja/fachada.webp', alt: 'Fachada da Handy na Rua Capitão Lisboa' },
  // { src: '/images/loja/vitrine.webp', alt: 'Vitrine com iPhones e acessórios' },
  // { src: '/images/loja/balcao.webp', alt: 'Balcão de atendimento' },
  // { src: '/images/loja/bancada.webp', alt: 'Bancada da assistência técnica' },
];
