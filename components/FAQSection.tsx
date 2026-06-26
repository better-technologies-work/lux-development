"use client";

import { useState } from "react";

const TRANSLATIONS = {
  en: {
    eyebrow: "Frequently asked questions",
    viewAll: "VIEW ALL QUESTIONS",
    faqs: [
      {
        question: "What is Lux Development?",
        answer:
          "Lux Development is a real estate and investment advisory company helping local buyers and international clients buy, develop, and invest in real estate in Paraguay. We provide trusted local expertise, transparent guidance, and end-to-end support throughout the entire property acquisition process.",
      },
      {
        question: "Who is Lux Development for?",
        answer:
          "We work with local buyers, expats, retirees, and international investors looking to buy, develop, or invest in property in Paraguay. Whether it's your first purchase or you're building a portfolio, we guide you through every step.",
      },
      {
        question: "What services does Lux Development offer?",
        answer:
          "We offer four core services: property acquisition, property development, financing and structuring, and asset management and investment support. Each service is designed to cover the full lifecycle of a real estate investment.",
      },
      {
        question: "How does the property acquisition process work in Paraguay?",
        answer:
          "Lux Development helps clients navigate every stage of the property acquisition process, including opportunity identification, due diligence, financing, legal coordination, and ownership transfer.",
      },
      {
        question: "Can foreigners buy property in Paraguay?",
        answer:
          "Yes. Foreign buyers can legally purchase property in Paraguay. Lux Development helps international clients understand local regulations, minimize risks, and make informed investment decisions with confidence.",
      },
    ],
  },
  es: {
    eyebrow: "Preguntas frecuentes",
    viewAll: "VER TODAS LAS PREGUNTAS",
    faqs: [
      {
        question: "¿Qué es Lux Development?",
        answer:
          "Lux Development es una empresa de asesoría inmobiliaria e inversiones que ayuda a compradores locales y clientes internacionales a comprar, desarrollar e invertir en bienes raíces en Paraguay. Ofrecemos experiencia local confiable, asesoramiento transparente y soporte integral durante todo el proceso de adquisición.",
      },
      {
        question: "¿Para quién es Lux Development?",
        answer:
          "Trabajamos con compradores locales, expatriados, jubilados e inversores internacionales que desean comprar, desarrollar o invertir en propiedades en Paraguay. Ya sea tu primera compra o estés construyendo un portafolio, te acompañamos en cada paso.",
      },
      {
        question: "¿Qué servicios ofrece Lux Development?",
        answer:
          "Ofrecemos cuatro servicios principales: adquisición de propiedades, desarrollo inmobiliario, financiamiento y estructuración, y gestión de activos y soporte de inversión. Cada servicio está diseñado para cubrir el ciclo completo de una inversión inmobiliaria.",
      },
      {
        question: "¿Cómo funciona el proceso de compra de una propiedad en Paraguay?",
        answer:
          "Lux Development acompaña a los clientes en cada etapa del proceso de adquisición, incluyendo la identificación de oportunidades, due diligence, financiamiento, coordinación legal y transferencia de titularidad.",
      },
      {
        question: "¿Pueden los extranjeros comprar propiedades en Paraguay?",
        answer:
          "Sí. Los compradores extranjeros pueden adquirir propiedades legalmente en Paraguay. Lux Development ayuda a los clientes internacionales a entender las regulaciones locales, minimizar riesgos y tomar decisiones de inversión informadas con confianza.",
      },
    ],
  },
};

interface Props {
  locale: string;
  imageSrc: string;
}

export default function FAQSection({ locale, imageSrc }: Props) {
  const t = TRANSLATIONS[locale as "en" | "es"] ?? TRANSLATIONS.es;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  return (
    <>
      <style>{`
        .faq-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 5rem 1.5rem;
          box-sizing: border-box;
        }
        .faq-inner {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 4rem;
          align-items: start;
        }
        .faq-letters {
          position: sticky;
          top: 6rem;
          display: flex;
          flex-direction: row;
          gap: 8px;
          align-items: flex-end;
          width: 100%;
        }
        .faq-letter {
          flex: 1;
        }
        .faq-letter svg {
          width: 100%;
          height: auto;
          display: block;
        }
        .faq-right {
          display: flex;
          flex-direction: column;
        }
        .faq-eyebrow {
          font-size: 22px !important;
          font-weight: 500 !important;
          color: #1a1714 !important;
          margin: 0 0 2rem !important;
          text-decoration: none !important;
          line-height: 1.2 !important;
        }
        .faq-item {
          border-top: 0.5px solid #e0d9cf;
          padding: 1.25rem 0;
          cursor: pointer;
        }
        .faq-item:last-child {
          border-bottom: 0.5px solid #e0d9cf;
        }
        .faq-question-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }
        .faq-question {
          font-size: 15px !important;
          font-weight: 400 !important;
          color: #1a1714 !important;
          margin: 0 !important;
          text-decoration: none !important;
          line-height: 1.4 !important;
        }
        .faq-chevron {
          flex-shrink: 0;
          width: 20px;
          height: 20px;
          color: #8B7A5E;
          transition: transform 0.3s ease;
        }
        .faq-chevron.open {
          transform: rotate(180deg);
        }
        .faq-answer {
          overflow: hidden;
          max-height: 0;
          transition: max-height 0.35s ease, opacity 0.3s ease;
          opacity: 0;
        }
        .faq-answer.open {
          max-height: 300px;
          opacity: 1;
        }
        .faq-answer-text {
          font-size: 14px !important;
          color: #666 !important;
          line-height: 1.7 !important;
          margin: 0.75rem 0 0 !important;
          text-decoration: none !important;
        }
        .faq-view-all {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 2rem;
          font-size: 12px !important;
          font-weight: 600 !important;
          letter-spacing: 0.1em !important;
          color: #8B7A5E !important;
          text-decoration: none !important;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
        }
        .faq-view-all:hover { opacity: 0.7; }
        @media (max-width: 768px) {
          .faq-section { padding: 3rem 1rem; }
          .faq-inner { grid-template-columns: 1fr; gap: 2rem; }
          .faq-letters { position: static; }
        }
      `}</style>

      <section className="faq-section">
        <div className="faq-inner">

          {/* Left — L U X letter shapes with image fill */}
          <div className="faq-letters" role="img" aria-label="Lux Development">

            {/* L */}
            <div className="faq-letter" style={{ marginTop: "2rem" }}>
              <svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <clipPath id="clip-L">
                    <path d="
                      M15,5
                      Q15,0 20,0
                      L40,0
                      Q45,0 45,5
                      L45,115
                      L80,115
                      Q85,115 85,120
                      L85,155
                      Q85,160 80,160
                      L20,160
                      Q15,160 15,155
                      Z
                    "/>
                  </clipPath>
                </defs>
                <image
                  href={imageSrc}
                  x="0" y="0"
                  width="100" height="160"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#clip-L)"
                />
              </svg>
            </div>

            {/* U */}
            <div className="faq-letter">
              <svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <clipPath id="clip-U">
                    <path d="
                      M10,0
                      L10,0
                      Q10,0 15,0
                      L35,0
                      Q40,0 40,5
                      L40,110
                      Q40,130 50,130
                      Q60,130 60,110
                      L60,5
                      Q60,0 65,0
                      L85,0
                      Q90,0 90,5
                      L90,115
                      Q90,160 50,160
                      Q10,160 10,115
                      Z
                    "/>
                  </clipPath>
                </defs>
                <image
                  href={imageSrc}
                  x="0" y="0"
                  width="100" height="160"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#clip-U)"
                />
              </svg>
            </div>

            {/* X */}
            <div className="faq-letter" style={{ marginTop: "1rem" }}>
              <svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <clipPath id="clip-X">
                    <path d="
                      M5,0 L38,0 L50,22 L62,0 L95,0
                      L95,5 L68,50 L95,95 L95,100
                      L62,100 L50,78 L38,100 L5,100
                      L5,95 L32,50 L5,5 Z
                      M5,115 L38,115 L50,137 L62,115 L95,115
                      L95,120 L68,160 L32,160 L5,120 Z
                    "/>
                  </clipPath>
                </defs>
                <image
                  href={imageSrc}
                  x="0" y="0"
                  width="100" height="160"
                  preserveAspectRatio="xMidYMid slice"
                  clipPath="url(#clip-X)"
                />
              </svg>
            </div>

          </div>

          {/* Right — FAQ accordion */}
          <div className="faq-right">
            <h2 className="faq-eyebrow">{t.eyebrow}</h2>

            {(showAll ? t.faqs : t.faqs.slice(0, 3)).map((faq, i) => {
  const isOpen = openIndex === i;
  return (
    <div
      key={i}
      className="faq-item"
      onClick={() => setOpenIndex(isOpen ? null : i)}
    >
      <div className="faq-question-row">
        <p className="faq-question">{faq.question}</p>
        <svg
          className={`faq-chevron${isOpen ? " open" : ""}`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
      <div className={`faq-answer${isOpen ? " open" : ""}`}>
        <p className="faq-answer-text">{faq.answer}</p>
      </div>
    </div>
  );
})}

            {!showAll && (
  <button className="faq-view-all" onClick={() => setShowAll(true)}>
    {t.viewAll} →
  </button>
)}
          </div>
        </div>
      </section>
    </>
  );
}