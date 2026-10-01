# Handy — site institucional e catálogo

Site da **Handy**, loja de celulares em Tatuí/SP (Rua Capitão Lisboa, 1055) especializada em toda a linha Apple
e assistência técnica, com mais de 14 anos no mercado.

Stack: **React + TypeScript + Vite + Tailwind CSS**, animações com **Framer Motion** (carregamento sob demanda)
e ícones **Lucide**.

## Rodando

```bash
cd handy-site
npm install
npm run dev      # desenvolvimento em http://localhost:5173
npm run build    # verifica tipos e gera a versão de produção em dist/
npm run preview  # serve o build localmente
npm run images   # otimiza fotos novas (AVIF/WebP + versões para celular)
```

A pasta `dist/` pode ser publicada em qualquer hospedagem estática (Vercel, Netlify, Hostinger etc.).

### GitHub Pages

O workflow `.github/workflows/deploy.yml` gera o site e publica na branch `gh-pages` a cada push na `main`.
Na primeira vez, em **Settings → Pages**, escolha **Deploy from a branch** → `gh-pages` / `(root)`.
O site fica em `https://<usuario>.github.io/<repositorio>/`.

### Variáveis de ambiente (`.env`)

| Variável | Uso |
| --- | --- |
| `VITE_SITE_URL` | Endereço público do site (ex.: `https://www.seudominio.com.br`). Usado em canonical, Open Graph e dados estruturados. **Preencha antes de publicar.** |
| `VITE_STATIC_MAP` | `1` mostra só o mapa ilustrado (ambientes que bloqueiam iframes). |
| `VITE_SIMPLE_IMAGES` | `1` usa apenas os `.webp` principais (prévias). |

## Estrutura

```
src/
  App.tsx                      # Composição da página, loader curto e barra de progresso
  data/
    catalog.ts                 # Produtos, categorias e marcas (edite aqui)
    details.ts                 # Recursos, variações (memória, tamanho…) e condição
    content.ts                 # Menu, destaques de iPhone, serviços
    gallery.json               # Galeria por cor (gerado a partir das imagens oficiais)
    images.json                # Manifesto de imagens (gerado por `npm run images`)
  lib/                         # contato/WhatsApp, rolagem, imagens responsivas
  hooks/useCatalogFilter.ts    # Busca + filtro por categoria e marca
  components/
    ui/                        # Button, Picture, Reveal, TextReveal, Counter, SectionHeading…
    layout/                    # Header, Footer, Loader, botão do WhatsApp
    product/                   # Página do produto (carregada só ao abrir um produto)
    ShopCard.tsx, ProductImage.tsx
  sections/                    # Hero, Destaques, iPhones, Catálogo, Caixas de som, Assistência,
                               # Sobre, Nossa loja, Localização, CTA final
scripts/images.mjs             # Pipeline de otimização de imagens (sharp)
```

## Fotos

Todas as fotos são **reais e oficiais** — nada gerado por IA.

- **Adicionar/trocar uma foto de produto:** salve a imagem (JPG, PNG ou WebP, fundo claro ou transparente) como
  `public/images/produtos/<id>.jpg` e rode `npm run images`. O script converte para WebP, gera AVIF e versões de
  480 px para celular, e atualiza o manifesto. O card passa a exibir a foto automaticamente.
- **Galeria (mais fotos/cores):** coloque as imagens em `public/images/produtos/<id>/` e rode `npm run images`.
  Para aparecerem com nome de cor, adicione-as em `src/data/gallery.json`.
- **Fotos da loja:** coloque em `public/images/loja/`, rode `npm run images` e liste-as em `STORE_PHOTOS`
  (fim de `src/data/catalog.ts`). A galeria "Nossa loja" aparece automaticamente.
- **Caixas de som:** a vitrine dedicada aparece sozinha quando pelo menos 3 caixas JBL tiverem foto.

As fotos Apple são imagens oficiais da Apple, obtidas do acervo público
[apple-device-images](https://github.com/littlebyteorg/apple-device-images); chip, ano e cores vêm do
[appledb](https://github.com/littlebyteorg/appledb).

| Arquivo | Produto | Marca | Foto |
| --- | --- | --- | --- |
| `public/images/produtos/iphone-17-pro-max.webp` | iPhone 17 Pro Max | Apple | ✅ oficial |
| `public/images/produtos/iphone-17-pro.webp` | iPhone 17 Pro | Apple | ✅ oficial |
| `public/images/produtos/iphone-air.webp` | iPhone Air | Apple | ✅ oficial |
| `public/images/produtos/iphone-17.webp` | iPhone 17 | Apple | ✅ oficial |
| `public/images/produtos/iphone-17e.webp` | iPhone 17e | Apple | ✅ oficial |
| `public/images/produtos/iphone-seminovo.webp` | iPhone seminovo revisado | Handy | ✅ oficial |
| `public/images/produtos/apple-watch-series-11.webp` | Apple Watch Series 11 | Apple | ✅ oficial |
| `public/images/produtos/apple-watch-se-3.webp` | Apple Watch SE 3 | Apple | ✅ oficial |
| `public/images/produtos/ipad-pro.webp` | iPad Pro | Apple | ✅ oficial |
| `public/images/produtos/ipad-mini.webp` | iPad mini | Apple | ✅ oficial |
| `public/images/produtos/macbook-air.webp` | MacBook Air | Apple | ✅ oficial |
| `public/images/produtos/macbook-pro.webp` | MacBook Pro | Apple | ✅ oficial |
| `public/images/produtos/airtag.webp` | AirTag | Apple | ✅ oficial |
| `public/images/produtos/airpods-pro-3.webp` | AirPods Pro 3 | Apple | ✅ oficial |
| `public/images/produtos/airpods-4.webp` | AirPods 4 | Apple | ✅ oficial |
| `public/images/produtos/airpods-max.webp` | AirPods Max | Apple | ✅ oficial |
| `public/images/produtos/jbl-tune-520bt.webp` | JBL Tune 520BT | JBL | ⏳ pendente — https://www.jbl.com.br |
| `public/images/produtos/jbl-flip-6.webp` | JBL Flip 6 | JBL | ⏳ pendente — https://www.jbl.com.br |
| `public/images/produtos/jbl-charge-5.webp` | JBL Charge 5 | JBL | ⏳ pendente — https://www.jbl.com.br |
| `public/images/produtos/jbl-go-4.webp` | JBL Go 4 | JBL | ⏳ pendente — https://www.jbl.com.br |
| `public/images/produtos/jbl-clip-5.webp` | JBL Clip 5 | JBL | ⏳ pendente — https://www.jbl.com.br |
| `public/images/produtos/jbl-boombox-3.webp` | JBL Boombox 3 | JBL | ⏳ pendente — https://www.jbl.com.br |
| `public/images/produtos/capa-silicone-magsafe.webp` | Capa de silicone com MagSafe | Apple | ✅ oficial |
| `public/images/produtos/capa-techwoven-magsafe.webp` | Capa TechWoven com MagSafe | Apple | ✅ oficial |
| `public/images/produtos/carregador-magsafe.webp` | Carregador MagSafe | Apple | ✅ oficial |
| `public/images/produtos/adaptador-usb-c-35w.webp` | Adaptador USB-C duplo de 35 W | Apple | ✅ oficial |
| `public/images/produtos/cabo-usb-c.webp` | Cabo de carregamento USB-C (1 m) | Apple | ✅ oficial |
| `public/images/produtos/cabo-usb-c-lightning.webp` | Cabo USB-C para Lightning | Apple | ✅ oficial |
| `public/images/produtos/pelicula-vidro.webp` | Película de vidro | Handy | ⏳ pendente — Foto do próprio estoque da Handy |
| `public/images/produtos/magic-keyboard.webp` | Magic Keyboard | Apple | ✅ oficial |
| `public/images/produtos/magic-mouse.webp` | Magic Mouse | Apple | ✅ oficial |
| `public/images/produtos/logitech-mx-keys-s.webp` | Logitech MX Keys S | Logitech | ⏳ pendente — https://www.logitech.com/pt-br |
| `public/images/produtos/logitech-mx-master-3s.webp` | Logitech MX Master 3S | Logitech | ⏳ pendente — https://www.logitech.com/pt-br |
| `public/images/produtos/logitech-pebble-keys-2.webp` | Logitech Pebble Keys 2 K380s | Logitech | ⏳ pendente — https://www.logitech.com/pt-br |
| `public/images/produtos/logitech-pebble-mouse-2.webp` | Logitech Pebble Mouse 2 M350s | Logitech | ⏳ pendente — https://www.logitech.com/pt-br |

## Desempenho

- Imagens em **AVIF** com fallback **WebP**, `srcset` com versão de 480 px para celular, `width`/`height`
  reservados (sem saltos de layout) e lazy loading fora da primeira tela.
- Imagem principal do hero pré-carregada com prioridade alta.
- Página do produto e recursos avançados de animação carregados **sob demanda** (divisão de código).
- Animações apenas com `transform` e `opacity`; sem `filter: blur` animado nem `backdrop-filter` em cards.
- Rolagem nativa (sem biblioteca de smooth scroll).
- `prefers-reduced-motion` respeitado: animações e o loading são desativados.

## SEO

- Title, meta description, Open Graph e Twitter Card com imagem própria (`public/og-handy.jpg`).
- Dados estruturados `Store` (schema.org) com endereço, telefone e Instagram.
- Um único `h1`, seções com `aria-labelledby`, textos alternativos em todas as imagens e endereço em `<address>`.
- Links compartilháveis para cada produto: `seudominio.com.br/#produto-iphone-17-pro`.

## Personalização

- **Preços:** troque `'Consulte'` em `src/data/catalog.ts` por um valor, ex.: `'R$ 7.999'`.
- **Atendimento:** todos os botões usam `openChat(mensagem)` de `src/lib/contact.ts`, que abre o WhatsApp com a
  mensagem pronta. O número fica só nesse arquivo — nenhuma URL aparece na interface.
- **Cores da marca:** `tailwind.config.js` → `colors.handy`.
