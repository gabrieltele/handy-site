import type { LucideIcon } from 'lucide-react';
import { BatteryCharging, Cpu, ScanSearch, Smartphone, Wrench, Settings2 } from 'lucide-react';

export const NAV_LINKS = [
  { id: 'inicio', label: 'Início' },
  { id: 'iphones', label: 'iPhones' },
  { id: 'produtos', label: 'Produtos' },
  { id: 'assistencia', label: 'Assistência' },
  { id: 'sobre', label: 'Sobre nós' },
  { id: 'contato', label: 'Contato' },
] as const;

export interface ShowcaseModel {
  id: string;
  kicker: string;
  name: string;
  description: string;
  /** Produto do catálogo cuja foto aparece no destaque. */
  productId: string;
  highlights: string[];
  message: string;
}

export const SHOWCASE: ShowcaseModel[] = [
  {
    id: 'pro-max',
    productId: 'iphone-17-pro-max',
    kicker: 'iPhone 17 Pro Max',
    name: 'A tela maior. A bateria que vai mais longe.',
    description: 'Para quem quer o máximo em câmera, desempenho e autonomia. Acabamentos premium e o melhor da Apple na palma da mão.',
    highlights: ['Sistema de câmera Pro', 'Tela Super Retina XDR', 'Bateria para o dia todo'],
    message: 'Olá, Handy! Tenho interesse em um iPhone Pro Max.',
  },
  {
    id: 'pro',
    productId: 'iphone-17-pro',
    kicker: 'iPhone 17 Pro',
    name: 'Potência Pro em um tamanho que cabe na mão.',
    description: 'O equilíbrio ideal entre desempenho de ponta e ergonomia. Fotografia profissional sem abrir mão do conforto.',
    highlights: ['Chip de alto desempenho', 'Zoom óptico', 'Gravação em alta qualidade'],
    message: 'Olá, Handy! Tenho interesse em um iPhone Pro.',
  },
  {
    id: 'air',
    productId: 'iphone-air',
    kicker: 'iPhone Air',
    name: 'O iPhone mais fino já feito.',
    description: 'Leveza impressionante com tela grande de 6,5 polegadas. Para quem quer um iPhone elegante e confortável no bolso.',
    highlights: ['Design ultrafino', 'Tela de 6,5 polegadas', 'Leve para o dia a dia'],
    message: 'Olá, Handy! Tenho interesse no iPhone Air.',
  },
  {
    id: 'iphone',
    productId: 'iphone-17',
    kicker: 'iPhone 17',
    name: 'Tudo o que você ama no iPhone. Em cores incríveis.',
    description: 'Câmera dupla, ótimo desempenho e a experiência iOS completa — a escolha certa para o dia a dia.',
    highlights: ['Câmera dupla avançada', 'Dynamic Island', 'Recursos de segurança'],
    message: 'Olá, Handy! Tenho interesse em um iPhone da linha regular.',
  },
  {
    id: 'seminovos',
    productId: 'iphone-seminovo',
    kicker: 'Seminovos Handy',
    name: 'iPhone com procedência, revisado por especialistas.',
    description: 'Aparelhos selecionados e testados pela nossa assistência. E se quiser, avaliamos o seu usado na troca.',
    highlights: ['Revisão técnica completa', 'Avaliação do seu usado', 'Atendimento pós-venda'],
    message: 'Olá, Handy! Gostaria de ver os iPhones seminovos e avaliar meu aparelho na troca.',
  },
];

export interface Service {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const SERVICES: Service[] = [
  { icon: ScanSearch, title: 'Diagnóstico', description: 'Análise técnica precisa para identificar a causa real do problema antes de qualquer reparo.' },
  { icon: Smartphone, title: 'Troca de tela', description: 'Tela trincada ou com falhas? Substituição com acabamento e sensibilidade como deve ser.' },
  { icon: BatteryCharging, title: 'Bateria', description: 'Seu iPhone descarregando rápido? Troca de bateria para recuperar a autonomia.' },
  { icon: Wrench, title: 'Manutenção', description: 'Limpeza, conectores, alto-falantes, câmeras e botões. Cuidado preventivo e corretivo.' },
  { icon: Cpu, title: 'Problemas de software', description: 'Atualizações, travamentos, restauração e configuração, com segurança para seus dados.' },
  { icon: Settings2, title: 'Outros reparos', description: 'Face ID, carregamento, rede e muito mais. Conte o que está acontecendo e a gente resolve.' },
];

export const REPAIR_STEPS = [
  { n: '01', title: 'Conte o problema', text: 'Fale com a Handy e descreva o que está acontecendo.' },
  { n: '02', title: 'Diagnóstico', text: 'Avaliamos o aparelho e explicamos o que precisa ser feito.' },
  { n: '03', title: 'Reparo', text: 'Com sua aprovação, o serviço é executado por especialistas.' },
  { n: '04', title: 'Retirada', text: 'Seu iPhone testado e pronto para voltar à rotina.' },
];
