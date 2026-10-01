/** Principais recursos exibidos na janela de detalhes de cada produto. */
export const FEATURES: Record<string, string[]> = {
  'iphone-17-pro-max': ['Tela Super Retina XDR de 6,9 polegadas', 'Chip A19 Pro', 'Três câmeras traseiras de 48 MP', 'Conector USB-C'],
  'iphone-17-pro': ['Tela Super Retina XDR de 6,3 polegadas', 'Chip A19 Pro', 'Três câmeras traseiras de 48 MP', 'Conector USB-C'],
  'iphone-air': ['Tela Super Retina XDR de 6,5 polegadas', 'Chip A19 Pro', 'Design ultrafino', 'Câmera Fusion de 48 MP'],
  'iphone-17': ['Tela Super Retina XDR de 6,3 polegadas com ProMotion', 'Chip A19', 'Câmera dupla de 48 MP', 'Conector USB-C'],
  'iphone-17e': ['Tela Super Retina XDR', 'Chip A19', 'Câmera de 48 MP', 'Conector USB-C'],
  'iphone-seminovo': ['Exemplo da foto: iPhone 16 Pro', 'Aparelho testado pela assistência Handy', 'Procedência verificada', 'Consulte modelos, cores e estado de bateria'],
  'apple-watch-series-11': ['Caixa de 42 mm ou 46 mm', 'Monitoramento de saúde, sono e treinos', 'Resistente à água', 'Integração completa com o iPhone'],
  'apple-watch-se-3': ['Caixa de 40 mm ou 44 mm', 'Detecção de queda e recursos de segurança', 'Resistente à água', 'Integração completa com o iPhone'],
  'ipad-pro': ['Tela Ultra Retina XDR', 'Chip da linha M', 'Compatível com Apple Pencil Pro e Magic Keyboard', 'Tamanhos de 11 e 13 polegadas'],
  'ipad-mini': ['Tela Liquid Retina de 8,3 polegadas', 'Chip A17 Pro', 'Compatível com Apple Pencil Pro', 'Leve e fácil de levar'],
  'macbook-air': ['Design fino e sem ventoinha', 'Chip Apple da linha M', 'Bateria para o dia inteiro', 'Modelos de 13 e 15 polegadas'],
  'macbook-pro': ['Tela Liquid Retina XDR', 'Chips Pro e Max para trabalho pesado', 'Portas HDMI, Thunderbolt e SDXC', 'Modelos de 14 e 16 polegadas'],
  airtag: ['Localização pelo app Buscar', 'Bateria substituível', 'Resistente à água e poeira', 'Configuração com um toque no iPhone'],
  'airpods-pro-3': ['Cancelamento ativo de ruído', 'Modo Ambiente', 'Áudio espacial personalizado', 'Sensor de frequência cardíaca'],
  'airpods-4': ['Versão com cancelamento ativo de ruído', 'Chip H2', 'Estojo de recarga USB-C', 'Áudio espacial personalizado'],
  'airpods-max': ['Fone over-ear', 'Cancelamento ativo de ruído', 'Áudio espacial', 'Conector USB-C'],
  'capa-silicone-magsafe': ['Silicone com toque macio', 'Ímãs MagSafe integrados', 'Forro interno em microfibra', 'Diversas cores'],
  'capa-techwoven-magsafe': ['Tecido resistente com toque premium', 'Ímãs MagSafe integrados', 'Protege laterais e câmeras', 'Diversas cores'],
  'carregador-magsafe': ['Carregamento sem fio magnético', 'Alinhamento automático com o iPhone', 'Também carrega AirPods compatíveis', 'Conector USB-C'],
  'adaptador-usb-c-35w': ['Duas portas USB-C', 'Carrega dois aparelhos ao mesmo tempo', 'Formato compacto', 'Compatível com iPhone, iPad e AirPods'],
  'cabo-usb-c': ['USB-C nas duas pontas', 'Comprimento de 1 m', 'Para iPhone 15 em diante, iPad e Mac', 'Carregamento e transferência de dados'],
  'cabo-usb-c-lightning': ['USB-C para Lightning', 'Versões de 1 m e 2 m', 'Carregamento rápido com adaptador USB-C', 'Para iPhones com conector Lightning'],
  'magic-keyboard': ['Sem fio, via Bluetooth', 'Bateria recarregável via USB-C', 'Teclas silenciosas e estáveis', 'Compatível com Mac, iPad e iPhone'],
  'magic-mouse': ['Superfície Multi-Touch com gestos', 'Bateria recarregável via USB-C', 'Branco ou preto', 'Compatível com Mac'],
  'jbl-flip-6': ['Resistente à água e poeira (IP67)', 'Até 12 h de reprodução', 'Som JBL Pro Sound', 'PartyBoost para conectar outra caixa'],
  'jbl-charge-5': ['Resistente à água e poeira (IP67)', 'Até 20 h de reprodução', 'Função power bank', 'PartyBoost'],
  'jbl-go-4': ['Ultracompacta', 'Resistente à água e poeira (IP67)', 'Até 7 h de reprodução', 'Bluetooth 5.3'],
  'jbl-clip-5': ['Mosquetão integrado', 'Resistente à água e poeira (IP67)', 'Até 12 h de reprodução', 'Som JBL Pro Sound'],
  'jbl-boombox-3': ['Graves profundos', 'Resistente à água e poeira (IP67)', 'Até 24 h de reprodução', 'Alça para transporte'],
  'jbl-tune-520bt': ['Fone on-ear sem fio', 'Som JBL Pure Bass', 'Até 57 h de bateria', 'Chamadas em viva-voz'],
  'logitech-mx-keys-s': ['Teclas retroiluminadas inteligentes', 'Conecta até 3 dispositivos', 'Recarregável via USB-C', 'Compatível com Mac e Windows'],
  'logitech-mx-master-3s': ['Cliques silenciosos', 'Sensor de 8.000 DPI', 'Rolagem MagSpeed', 'Conecta até 3 dispositivos'],
  'logitech-pebble-keys-2': ['Compacto e fino', 'Conecta até 3 dispositivos', 'Bluetooth', 'Compatível com Mac, iPad e iPhone'],
  'logitech-pebble-mouse-2': ['Fino e silencioso', 'Bluetooth', 'Ideal para levar com o notebook', 'Compatível com Mac e iPad'],
  'pelicula-vidro': ['Proteção contra riscos e impactos', 'Aplicação feita na loja', 'Modelos para diversos iPhones', 'Consulte disponibilidade'],
};

/** Variações selecionáveis na página do produto (capacidade, tamanho, versão…). */
export interface ProductOption {
  label: string;
  values: string[];
}

export const OPTIONS: Record<string, ProductOption> = {
  'iphone-17-pro-max': { label: 'Memória interna', values: ['256 GB', '512 GB', '1 TB', '2 TB'] },
  'iphone-17-pro': { label: 'Memória interna', values: ['256 GB', '512 GB', '1 TB'] },
  'iphone-air': { label: 'Memória interna', values: ['256 GB', '512 GB', '1 TB'] },
  'iphone-17': { label: 'Memória interna', values: ['256 GB', '512 GB'] },
  'ipad-mini': { label: 'Memória interna', values: ['128 GB', '256 GB', '512 GB'] },
  'ipad-pro': { label: 'Tamanho da tela', values: ['11 polegadas', '13 polegadas'] },
  'macbook-air': { label: 'Tamanho da tela', values: ['13 polegadas', '15 polegadas'] },
  'macbook-pro': { label: 'Tamanho da tela', values: ['14 polegadas', '16 polegadas'] },
  'apple-watch-series-11': { label: 'Tamanho da caixa', values: ['42 mm', '46 mm'] },
  'apple-watch-se-3': { label: 'Tamanho da caixa', values: ['40 mm', '44 mm'] },
  'airpods-4': { label: 'Versão', values: ['Padrão', 'Com cancelamento ativo de ruído'] },
  'cabo-usb-c-lightning': { label: 'Comprimento', values: ['1 m', '2 m'] },
  'iphone-seminovo': { label: 'Condição', values: ['Seminovo revisado'] },
};

/** Condição exibida no título (padrão: Novo). */
export const CONDITION: Record<string, string> = {
  'iphone-seminovo': 'Seminovo',
};
