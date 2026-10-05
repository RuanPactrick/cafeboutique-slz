# Café Boutique — sistema de design

Mais que um bolo, uma memória afetiva.

Este sistema descreve a linguagem visual do site oficial do Café Boutique, em São Luís — MA. Ele não foi inventado: cada cor, tipo, raio e sombra foi lido de `src/app/globals.css` e `src/app/layout.tsx` do próprio site. Onde o site ainda não decidiu alguma coisa, está escrito que não decidiu.

## Como esta pasta funciona

| Arquivo | O que é |
| --- | --- |
| `README.md` | este manual — comece por aqui |
| `tokens.json` | cores, tipos, espaços, raios, sombras e medidas de layout, cada um com nota de uso |
| `components/<Nome>/README.md` | regras de cada componente |
| `components/<Nome>/preview.html` | exemplo isolado, abre direto no navegador |
| `assets/Logo` · `assets/Fotografia` | os arquivos de marca e as fotos reais, com procedência |
| `design-system.json` | índice usado quando este sistema é publicado como artefato; não afeta o site |

Nada aqui é importado pelo site em tempo de build. Os tokens vivem de verdade em `src/app/globals.css`; este sistema é a referência escrita que diz **por que** eles são o que são. Ao mudar um valor lá, atualize a nota aqui.

## O que a marca é

Um café de bairro que vende bolo, café da tarde e sabor regional. A promessa não é novidade nem velocidade: é lembrança. Isso tem consequência visual direta.

- **Papel antes de tela.** O fundo é `paper` (#fbf7ee), não branco. A página parece uma folha de menu impressa, com dois halos radiais muito suaves atrás de tudo.
- **Serifa dos dois lados.** Antic Didone nos títulos, Lustria no texto. Não existe fonte sem serifa no site. Georgia é o fallback de ambas.
- **Marrom é a tinta, não o enfeite.** `coffee` (#2b160e) carrega título, botão primário e as duas faixas escuras (visitar, rodapé). O resto é papel e creme.
- **Pouca cor de acento.** Dourado só em foco e estrelas. Verde-oliva só em eyebrow e régua. Nada de gradiente colorido, nada de cartão com borda lateral colorida, nada de emoji.
- **Fotografia real.** Todas as imagens vêm de publicações abertas do `@cafeboutique.slz` ou foram fornecidas pela própria casa. Imagem que falta fica como lacuna identificada, nunca como foto genérica de banco.
- **Tudo arredondado.** Controle é pílula, superfície é raio aberto. Não há canto vivo na interface.
- **Um momento de movimento.** O hero é um palco de vídeo em tela cheia, com o texto surgindo devagar por cima. É a única animação longa do site — depois dele, a página volta a ser papel parado.

## Voz

Português do Brasil, natural e caloroso. Frases curtas. Primeira pessoa do plural quando a casa fala. Sem jargão de startup, sem "experiência única", sem superlativo vazio.

- Chamada de ação: **"Encomendar no WhatsApp"**, não "Fale conosco agora".
- Descrição de produto: diz o que tem dentro, em uma linha.
- Dado não confirmado: diz que não está confirmado, na cara. Exemplo em uso hoje: o horário de funcionamento, que o site não exibe porque ninguém confirmou.

## Fundamentos visuais

### Cor

Um único tema, claro. O site declara `color-scheme: light` — não há modo escuro, e as duas faixas escuras são decisão de composição, não de tema.

Pares de texto que o sistema garante:

| Texto | Sobre | Razão |
| --- | --- | --- |
| `ink` | `paper` | 13,9:1 |
| `coffee` | `cream` | 15,7:1 |
| `muted` | `cream` | 5,2:1 — mínimo 12px |
| `on-coffee` | `coffee` | 15,7:1 |
| `on-coffee-faint` | `footer-ink` | 5,5:1 |

Dois pares falham hoje e ficam registrados em vez de maquiados:

- `olive` sobre `paper` dá **3,9:1** e é exatamente onde mora o eyebrow (11px, caixa alta, negrito). Escurecer para `#7a6c4f` resolve sem mudar o tom.
- `gold` sobre `paper` dá **3,0:1**, no limite do aceitável para o anel de foco. Funciona, mas não sobra margem.

### Tipografia

Antic Didone tem contraste alto e desce bem em tamanho grande; é isso que o site explora. Títulos usam `clamp()`, então os valores no sistema são o **teto** de cada estilo:

| Estilo | No site | Onde |
| --- | --- | --- |
| `hero` 96px | `clamp(3.25rem, 6vw, 6rem)` | h1 |
| `secao` 75px | `clamp(2.4rem, 4.3vw, 4.7rem)` | h2 |
| `subsecao` 32px | `clamp(1.3rem, 2vw, 2rem)` | h3 |

`line-height: 1.02` nos títulos e `text-wrap: balance` — a quebra de linha é parte do desenho. Corpo em 16px/1.5, caindo para 15px abaixo de 760px.

O eyebrow é a única peça em caixa alta de todo o site. Use com parcimônia: um por seção, no máximo.

### Espaço e ritmo

Uma régua só: `min(100% - 2×gutter, 1240px)`, centralizada. O gutter é `clamp(1rem, 4vw, 3.75rem)`. Toda seção respeita isso — é o que faz a página parecer impressa.

Padding vertical de seção também é clamp, tipicamente `clamp(4.5rem, 7vw, 7rem)`. Seções cheias (galeria, visita) vão até 8rem.

### Raio e profundidade

O site é arredondado por decisão, não por acaso. **Tudo que é controle é pílula** — botão, chip, cápsula do cabeçalho, todos em 999px. Superfícies crescem em degraus: 12px no cartão, 14px no painel, 26px no palco do hero e no menu do mobile.

Sombra nunca desenha caixa: é sempre difusa, marrom e de baixa opacidade. Cartão em repouso não tem sombra — ela aparece no hover, junto com um `translateY(-5px)`. A cápsula do cabeçalho é a exceção: ela tem sombra desde o topo, porque flutua.

### Movimento

180ms para hover de controle, 220ms para elevação de cartão e para a cápsula do cabeçalho aprofundar a sombra, 450–500ms para o zoom de foto dentro de cartão. Tudo com `ease`.

A entrada do hero é a única animação longa do site: 1500ms por elemento, com a curva `cubic-bezier(.16,.84,.34,1)`, que desacelera no fim. Os quatro elementos entram em sequência — eyebrow em 400ms, primeira linha do título em 850ms, segunda em 1250ms, botão em 1900ms —, cada um subindo 24px enquanto aparece. É lento de propósito: o vídeo precisa ser visto antes do texto chegar.

O site respeita `prefers-reduced-motion: reduce`, que zera duração **e atraso** de toda animação e transição. Zerar só a duração não basta: com atrasos de quase 2 segundos, o hero ficaria sem texto por todo esse tempo antes de aparecer de uma vez.

### Acessibilidade

- Foco visível em tudo que recebe foco: `outline: 3px solid gold; outline-offset: 4px`. Não remova.
- Alvo de toque: 48px em botão e campo, 42px em chip, 44px no botão de menu mobile.
- Skip link fixo no topo, visível só no foco.
- Nenhuma informação depende só de cor. Preço pendente é cor `pending` **mais** texto.

## Iconografia

Seis ícones, todos SVG inline em `src/components/icons.tsx`, viewBox 24×24, traço de 1px na cor atual, cantos arredondados. São WhatsApp, Instagram, menu, seta à direita, seta para baixo e seta diagonal. Não existe biblioteca de ícones no projeto e não há motivo para adicionar uma: o conjunto é fechado de propósito.

Regra: ícone acompanha texto. O único ícone sem rótulo é o de menu mobile, e ele tem `aria-label`.

## Marca

A logo é arquivo fornecido pela casa: `assets/Logo/logo-cafe-boutique.webp`, **1522 × 1033** com transparência. Nunca recrie com texto, nunca troque por arte parecida, nunca aplique filtro.

A marca é deitada, proporção **1,47:1**. Toda aplicação respeita isso — não há letterbox nem distorção:

| Onde | Tamanho |
| --- | --- |
| Cápsula do cabeçalho na home | 106 × 72 |
| Cápsula nas páginas internas | 85 × 58 |
| Rodapé | 91 × 62 |
| Mobile (home / interna) | 79 × 54 / 68 × 46 |

Ela aparece sempre dentro da cápsula de papel, nunca direto sobre foto ou vídeo — é uma marca escura sobre fundo transparente e precisa de ground claro para existir.

## O que ainda não está decidido

Isto faz parte do sistema porque é o que impede a publicação:

- **Endereço.** O material oficial diz Av. dos Holandeses, Loja 8, Holandeses Center, Calhau — mas outra listagem pública diverge. Confirmar com a empresa.
- **Horário de funcionamento.** Não existe fonte confirmada; o site não exibe horário nenhum.
- **Fotos.** 14 das posições de imagem do site ainda estão como `pending` em `src/data/site.ts`. Fachada, salão, vitrine e equipe são as mais sentidas.
- **Peso do vídeo do hero.** `ingredientes-slow-motion.mp4` tem 6 MB para 8 segundos e é a primeira coisa que carrega, em tela cheia. Precisa ser comprimido e ganhar um quadro de pôster.
- **A foto da vitrine saiu do ar.** `cafe-equipe-vitrine.jpg` era a única imagem com gente na home e hoje não é usada em lugar nenhum. Decidir onde recolocar.
- **Favicon.** Não existe.
- **Preços.** Vieram do briefing inicial. Entradas incomuns estão marcadas com `pending` e precisam de confirmação antes de ir ao ar.

## Como consumir

O site é Next.js + TypeScript. Os tokens vivem hoje como variáveis CSS em `:root` dentro de `src/app/globals.css`, com os mesmos nomes usados aqui (`--paper`, `--coffee`, `--rule`…). Fatos de negócio — telefone, WhatsApp, endereço, avaliações — ficam centralizados em `src/data/site.ts`, e o cardápio em `src/data/menu.json`. Nenhum desses valores deve ser escrito direto no JSX.
