// Dúvidas frequentes publicadas pela Café Boutique nos destaques do Instagram (enviadas pelo cliente em 7 out. 2026).
// O texto segue as regras originais; só "link na bio" virou o WhatsApp, que é o canal citado nelas.
export type FaqItem = {
  question: string;
  /** Parágrafos da resposta. */
  answer: string[];
  /** Passos ou regras curtas, quando a resposta é uma lista. */
  list?: string[];
  /** A lista é uma sequência de passos (numerada). */
  steps?: boolean;
};

export const faqItems: FaqItem[] = [
  {
    question: "Vocês fazem delivery?",
    answer: ["Ainda não trabalhamos com delivery. Você pode retirar seu pedido na loja ou aproveitar nossas mesas para consumir no local."],
  },
  {
    question: "Como faço um pedido para retirada?",
    answer: [
      "Todos os pedidos são feitos pelo nosso WhatsApp. Aqui no site, você pode montar o pedido no cardápio e enviá-lo já organizado, com o dia e o horário da retirada.",
    ],
  },
  {
    question: "Vocês atendem pelo direct do Instagram?",
    answer: ["Não. Nosso único canal para encomendas e pedidos é o WhatsApp."],
  },
  {
    question: "Com quanto tempo de antecedência devo fazer minha encomenda?",
    answer: ["Os prazos dependem do bolo. Todos os prazos estão sujeitos à disponibilidade de vagas."],
    list: [
      "Bolo amanteigado tradicional, com ou sem cobertura: 24h de antecedência.",
      "Demais bolos: 72h de antecedência.",
      "Bolos naked e tortas: somente por encomenda, com 72h de antecedência.",
    ],
  },
  {
    question: "Como faço a encomenda de um bolo?",
    answer: ["Pelo WhatsApp, nesta ordem:"],
    steps: true,
    list: [
      "Informe qual será o bolo, o tamanho, a massa e os recheios ou coberturas.",
      "Informe a data e o horário da retirada e quem vai retirar o pedido.",
      "Aguarde o seu orçamento.",
      "A encomenda é finalizada após o pagamento antecipado de 50% do valor, via Pix ou presencialmente na loja.",
    ],
  },
  {
    question: "Como funcionam as reservas de bolo amanteigado?",
    answer: [
      "Informe qual será o bolo, o tamanho, a massa e as coberturas, além do horário da retirada e de quem vai retirar. O bolo é coberto assim que você chega à loja.",
      "As reservas são feitas de segunda a sexta, para retirada das 15h às 17h. A tolerância de espera é de 30 minutos: depois desse prazo, a reserva é cancelada. Reservas para retirada a partir das 17h são feitas somente com pagamento antecipado via Pix.",
    ],
  },
  {
    question: "As reservas de bolo funcionam no sábado?",
    answer: [
      "Não. As reservas de bolo funcionam de segunda a sexta. Se você quer um bolo para o sábado, faça a encomenda durante a semana, com pagamento antecipado.",
    ],
  },
  {
    question: "Como funcionam as reservas de mesa?",
    answer: [
      "Reservamos mesas para até 15 pessoas. Informe seu nome, a quantidade de pessoas e o horário. A tolerância de espera é de 15 minutos: depois desse prazo, a reserva é cancelada.",
    ],
  },
];
