import { faqItems } from "@/data/faq";
import { siteConfig } from "@/data/site";
import { ChevronRightIcon, WhatsAppIcon } from "./icons";
import { Line } from "./motion";

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: [...item.answer, ...(item.list ?? [])].join(" ") },
  })),
};

export function Faq() {
  return (
    <section className="cb cb--latte faq" id="duvidas" aria-labelledby="faq-title">
      <div className="cb-inner faq-layout">
        <div className="faq-head">
          <p className="cb-eyebrow">Dúvidas frequentes</p>
          <h2 id="faq-title" data-reveal="lines"><Line>Antes do seu</Line><Line><em>pedido.</em></Line></h2>
          <p className="cb-lede">Retirada, encomendas de bolo e reservas: como cada uma funciona na Boutique.</p>
          <a className="cb-cta" href={siteConfig.whatsappUrl} target="_blank" rel="noreferrer">
            <WhatsAppIcon />
            <span>Outra dúvida? Fale conosco</span>
            <ChevronRightIcon />
          </a>
        </div>
        {/* Acordeão nativo: abre com toque, clique ou teclado e funciona sem JavaScript. */}
        <div className="faq-list" data-reveal="list">
          {faqItems.map((item) => (
            <details className="faq-item" name="faq" key={item.question}>
              <summary>
                <span>{item.question}</span>
                <span className="faq-item__icon" aria-hidden="true" />
              </summary>
              <div className="faq-item__answer">
                {item.answer.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {item.list && item.steps ? <ol>{item.list.map((entry) => <li key={entry}>{entry}</li>)}</ol> : null}
                {item.list && !item.steps ? <ul>{item.list.map((entry) => <li key={entry}>{entry}</li>)}</ul> : null}
              </div>
            </details>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </section>
  );
}
