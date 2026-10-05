# Título de seção

Abre toda seção da página. Duas formas, mesma matéria-prima: eyebrow em `olive` + h2 em `coffee`, separados por 0,35rem.

## Formas

**Ornamentado** (`.ornament-title`) — centralizado, com duas réguas em degradê saindo do centro. Usado quando a seção é uma vitrine e não tem ação ao lado. Abaixo de 760px as réguas somem e o bloco vira coluna única.

**Em linha** (`.section-heading-inline`) — alinhado à esquerda, com um `.text-link` empurrado para a direita na mesma linha de base. Usado quando a seção leva a outro lugar. Abaixo de 760px o link cai para baixo do título.

## Regras

- Um eyebrow por seção. É a única peça em caixa alta do site.
- O h2 usa `clamp()`: 2,4rem no mobile, até 4,7rem no desktop. `text-wrap: balance` está ligado — a quebra faz parte do desenho, então limite a largura em `ch` (16–18ch funciona bem) em vez de forçar `<br>`.
- As réguas são decorativas: nunca ponha texto nelas.

## Pendência conhecida

`olive` sobre `paper` dá 3,9:1, abaixo do mínimo de 4,5:1 para texto pequeno — e o eyebrow é texto pequeno. Está registrado no token; a correção (`#7a6c4f`) ainda não foi aplicada no site.
