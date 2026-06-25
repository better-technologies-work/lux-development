"use client";

import { useEffect, useRef } from "react";

const TRANSLATIONS = {
  en: {
    eyebrow: "Why Lux Development",
    headline1: "We don't just help you buy property.",
    headline2: "We help you make the right investment decision.",
    subtitle:
      "One partner who knows the market, speaks your language, and is with you from the first step to the last.",
    cards: [
      {
        title: "Transparency",
        body: "Clear information, realistic expectations, and honest communication throughout the process.",
      },
      {
        title: "Local Expertise",
        body: "Deep knowledge of Paraguay's real estate market to help you identify opportunities and avoid unnecessary risks.",
      },
      {
        title: "End-to-End Support",
        body: "One trusted partner guiding you from acquisition to ownership and beyond.",
      },
      {
        title: "Bilingual Communication",
        body: "Bridging language and cultural barriers between local stakeholders and international investors.",
      },
    ],
    wideTitle: "Long-Term Relationships",
    wideSub: "Our goal is not a transaction.",
    wideBadge: "Our goal is to become your trusted real estate partner for years to come.",
  },
  es: {
    eyebrow: "Por qué Lux Development",
    headline1: "No solo te ayudamos a comprar.",
    headline2: "Te ayudamos a decidir la correcta inversion.",
    subtitle:
      "Un socio que conoce el mercado, habla tu idioma y está contigo desde el primer paso hasta el último.",
    cards: [
      {
        title: "Transparencia",
        body: "Información clara, expectativas realistas y comunicación honesta en cada etapa del proceso.",
      },
      {
        title: "Expertise local",
        body: "Conocimiento profundo del mercado inmobiliario de Paraguay para identificar oportunidades y evitar riesgos innecesarios.",
      },
      {
        title: "Acompañamiento integral",
        body: "Un solo socio de confianza que te guía desde la adquisición hasta la titularidad y más allá.",
      },
      {
        title: "Comunicación bilingüe",
        body: "Tendemos puentes entre barreras idiomáticas y culturales entre actores locales e inversores internacionales.",
      },
    ],
    wideTitle: "Relaciones a Largo Plazo",
    wideSub: "Nuestro objetivo no es una transacción.",
    wideBadge: "Nuestro objetivo es convertirnos en su socio inmobiliario de confianza durante muchos años.",
  },
};

const icons = [
  <svg key="eye" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>,
  <svg key="pin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>,
  <svg key="route" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>,
  <svg key="chat" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>,
];

interface Props {
  locale: string;
}

export default function WhyLuxDevelopment({ locale }: Props) {
  const t = TRANSLATIONS[locale as "en" | "es"] ?? TRANSLATIONS.es;
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>("[data-animate]");
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.delay ?? "0";
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, Number(delay));
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.08 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .wld-section {
  padding: 4rem 1.25rem;
  max-width: 1280px;  /* ← era 960px */
  margin: 0 auto;
  box-sizing: border-box;
  width: 100%;
}
        .wld-eyebrow {
          font-size: 18px !important;
          font-weight: 600 !important;
          letter-spacing: 0.14em !important;
          text-transform: uppercase !important;
          color: #050897 !important;
          margin: 0 0 0.75rem !important;
          text-decoration: none !important;
        }
        .wld-headline {
          font-size: clamp(24px, 4vw, 36px) !important;
          font-weight: 500 !important;
          line-height: 1.2 !important;
          color: #1a1714 !important;
          max-width: 520px;
          margin: 0 0 0.75rem !important;
          text-decoration: none !important;
        }
        .wld-headline span {
          color: #0b27a3 !important;
        }
        .wld-subtitle {
          font-size: 15px !important;
          color: #666 !important;
          max-width: 460px;
          line-height: 1.65 !important;
          margin: 0 0 2.5rem !important;
          text-decoration: none !important;
        }
        .wld-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1px;
  background: #e8e0d4;
  border: 0.5px solid #e8e0d4;
  border-radius: 16px;
  overflow: hidden;
  width: 100%;  

        }
        .wld-card {
          background: #fff;
          padding: 1.75rem 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: background 0.2s ease, transform 0.25s ease, box-shadow 0.25s ease;
        }
        .wld-card:hover {
          background: #faf7f3 !important;
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.06);
        }
        .wld-icon {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          background: rgb(245, 242, 234);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #061ea7;
          margin-bottom: 4px;
          flex-shrink: 0;
        }
        .wld-card-title {
          font-size: 15px !important;
          font-weight: 500 !important;
          color: #1a1714 !important;
          margin: 0 !important;
          text-decoration: none !important;
        }
        .wld-card-body {
          font-size: 13px !important;
          color: #1063a7 !important;
          line-height: 1.6 !important;
          margin: 0 !important;
          text-decoration: none !important;
        }
        .wld-wide {
          grid-column: span 2;
          background: #fff;
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
          transition: background 0.2s ease;
        }
        .wld-wide:hover {
          background: #faf7f3 !important;
        }
        .wld-wide-title {
          font-size: clamp(20px, 3vw, 26px) !important;
          font-weight: 500 !important;
          color: #1a1714 !important;
          line-height: 1.3 !important;
          margin: 8px 0 0 !important;
          max-width: 560px;
          text-decoration: none !important;
        }
        .wld-wide-sub {
          font-size: 14px !important;
          color: #1f099b666 !important;
          line-height: 1.6 !important;
          margin: 0 !important;
          max-width: 480px;
          text-decoration: none !important;
        }
        .wld-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #e8ebf3;
          border-radius: 99px;
          padding: 5px 14px;
          font-size: 12px !important;
          font-weight: 500 !important;
          color: #2f6dca !important;
          text-decoration: none !important;
          margin-top: 4px;
        }
        [data-animate] {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        @media (prefers-reduced-motion: reduce) {
          [data-animate] {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }
        }
        @media (max-width: 640px) {
          .wld-section {
            padding: 3rem 1rem;
          }
          .wld-grid {
            grid-template-columns: 1fr;
          }
          .wld-wide {
            grid-column: span 1;
            padding: 1.75rem 1.25rem;
          }
          .wld-card {
            padding: 1.25rem 1rem;
          }
        }
      `}</style>

      <section ref={sectionRef} className="wld-section">
        {/* Header */}
<div data-animate data-delay="0">
  {/* El eyebrow suele ser pequeño, lo dejamos como p o span con su clase */}
  <p className="wld-eyebrow">{t.eyebrow}</p>
  
  {/* Cambiamos h3 a h2 y aseguramos que tenga la clase de headline para el tamaño grande */}
  <h2 className="wld-headline">
    {t.headline1} <span>{t.headline2}</span>
  </h2>
  
  <p className="wld-subtitle">{t.subtitle}</p>
</div>

        {/* Grid */}
        <div className="wld-grid">
          {t.cards.map((card, i) => (
            <div
              key={card.title}
              className="wld-card"
              data-animate
              data-delay={String(100 + i * 80)}
            >
              <div className="wld-icon">{icons[i]}</div>
              <p className="wld-card-title">{card.title}</p>
              <p className="wld-card-body">{card.body}</p>
            </div>
          ))}

          {/* Wide card */}
          <div className="wld-wide" data-animate data-delay="440">
            <div className="wld-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <p className="wld-wide-title">{t.wideTitle}</p>
            <p className="wld-wide-sub">{t.wideSub}</p>
            <span className="wld-badge">{t.wideBadge}</span>
          </div>
        </div>
      </section>
    </>
  );
}