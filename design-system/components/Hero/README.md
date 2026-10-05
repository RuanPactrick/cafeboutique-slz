# Hero da home

A peça principal do site. Um palco de vídeo ocupando a altura da tela, com o texto surgindo sobre ele.

## Estrutura

```
section.home-hero
└── div.home-hero__stage          palco: raio 26px, altura min(880px, max(620px, 100svh - 24px))
    ├── video.home-hero__video    object-fit: cover, object-position: center 50%
    ├── div.home-hero__scrim      véu em degradê, decorativo
    └── div.home-hero__copy       eyebrow + h1 (duas linhas em span) + um botão
```

A cápsula do cabeçalho flutua por cima do palco — o hero começa no topo absoluto da página e o cabeçalho tem `margin-bottom` negativa.

## O vídeo

- Nativo 1920 × 1080. No palco ele é cortado pelo `cover`; nada é esticado, nunca.
- `muted`, `loop`, `playsInline`, sem controles, `aria-hidden` — é ambiente, não conteúdo. Nada que o usuário precise entender pode estar só no vídeo.
- O autoplay é disparado por JavaScript em `src/components/hero-video.tsx`, não pelo atributo. O `muted` vindo do SSR nem sempre vira propriedade do DOM, e sem ela o navegador recusa o autoplay.
- Com `prefers-reduced-motion: reduce` o vídeo não toca: fica num quadro parado.
- Abaixo de 760px o palco encolhe para `min(640px, max(500px, 100svh - 18px))` e o raio cai para 20px.

## O véu

`linear-gradient(180deg, …)` em `coffee`: 46% no topo (dá contorno à cápsula), 10% em 22% da altura (deixa a comida aparecer), subindo para 86% na base (onde mora o texto). Sem ele o título em creme não tem contraste garantido sobre imagem em movimento.

O véu é obrigatório. Vídeo muda de luz quadro a quadro — não existe "esse vídeo é escuro o bastante".

## A entrada

Quatro elementos, um keyframe só (`heroRise`: opacidade 0→1 e `translateY(24px)→0`), 1500ms cada, curva `cubic-bezier(.16,.84,.34,1)`.

| Elemento | Atraso |
| --- | --- |
| Eyebrow | 400ms |
| `h1 span:first-child` | 850ms |
| `h1 span:last-child` | 1250ms |
| Botão | 1900ms |

O `h1` em si não anima — quem anima são os dois `span`, para as linhas entrarem separadas. O `animation-fill-mode: both` segura o estado inicial durante o atraso.

## Regras

- **Um botão só.** A ação de encomenda vive na cápsula do cabeçalho, que acompanha a rolagem. Repetir as duas no hero foi o erro que esta versão corrigiu.
- **Sem parágrafo de apoio.** Eyebrow e título bastam; o resto da página explica.
- O botão usa `button--light`, a variante para fundo escuro.
- As quebras do título são escritas à mão, em `span`. Não deixe o navegador decidir: a frase é a ideia da marca e tem ritmo próprio.

## O que o consumidor fornece

O caminho do vídeo. Tudo o mais é fixo — este componente existe uma vez só, na home.
