'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

interface TeamSectionProps {
  locale: string
}

export default function TeamSectionWithAnimation({ locale }: TeamSectionProps) {
  const imgRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 }
    )
    if (imgRef.current) observer.observe(imgRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        .team-section {
          max-width: 1100px;
          margin: 0 auto;
          padding: 5rem 1.5rem;
          box-sizing: border-box;
          border-top: 1px solid #e2e8f0;
        }
        .team-inner {
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 4rem;
          align-items: start;
        }
        .team-image-wrap {
          position: sticky;
          top: 6rem;
          border-radius: 24px;
          overflow: hidden;
          aspect-ratio: 3/4;
          width: 100%;
          background: #f1f5f9;
          border: 1px solid #e2e8f0;
        }
        .team-right {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        .team-eyebrow {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #0369a1;
          margin: 0;
        }
        .team-name {
          font-size: clamp(26px, 4vw, 38px);
          font-weight: 700;
          color: #0f172a;
          margin: 0;
          line-height: 1.15;
        }
        .team-p {
          font-size: 15px;
          color: #475569;
          font-weight: 300;
          line-height: 1.8;
          margin: 0;
        }
        .team-card {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          padding: 1.25rem 1.5rem;
          background: #fff;
          border-left: 4px solid #0369a1;
          border-radius: 0 12px 12px 0;
          box-shadow: 0 1px 4px rgba(0,0,0,0.06);
        }
        .team-card p {
          font-size: 13px;
          color: #475569;
          font-weight: 300;
          margin: 0;
          line-height: 1.6;
        }
        .team-card span {
          font-weight: 600;
          color: #0f172a;
        }
        .team-today {
          font-size: 15px;
          color: #475569;
          font-weight: 300;
          line-height: 1.8;
          margin: 0;
          padding-top: 0.5rem;
          border-top: 1px solid #e2e8f0;
        }
        @media (max-width: 768px) {
          .team-section { padding: 3rem 1rem; }
          .team-inner {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .team-image-wrap {
            position: static;
            aspect-ratio: 4/3;
          }
        }
      `}</style>

      <section id="team" className="team-section">
        <div className="team-inner">

          {/* Imagen izquierda — sticky en desktop */}
          <div
            ref={imgRef}
            className={`team-image-wrap ${isVisible ? 'animate-slide-bounce' : 'opacity-0'}`}
          >
            <Image
              src="/Patricia-Fretes.jpg"
              alt="Patricia Fretes"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </div>

          {/* Todo el texto a la derecha */}
          <div className="team-right">
            <p className="team-eyebrow">
              {locale === 'es' ? 'La fundadora' : 'The Founder'}
            </p>
            <h2 className="team-name">Patricia Natalia Narvaez</h2>

            <p className="team-p">
              {locale === 'es'
                ? 'Con una amplia experiencia en el sector inmobiliario residencial tanto en Nueva York como en Paraguay, Patricia Natalia Narvaez ha construido una sólida reputación ayudando a familias, propietarios e inversores a navegar cada etapa del proceso de adquisición de inmuebles. Su enfoque centrado en el cliente, su profundo conocimiento del mercado y su compromiso con la obtención de resultados han contribuido a más de 100 proyectos exitosos y a relaciones a largo plazo basadas en la confianza.'
                : 'With extensive experience in residential real estate in both New York and Paraguay, Patricia Natalia Narvaez has built a reputation for helping families, homeowners, and investors navigate every stage of the property acquisition process. Her client-focused approach, deep understanding of the market, and commitment to delivering results have contributed to more than 100 successful projects and long-term relationships built on trust.'}
            </p>

            <p className="team-p">
              {locale === 'es'
                ? 'Un capítulo definitorio de su carrera tuvo lugar durante la crisis financiera de 2008, cuando la caída en el valor de las viviendas puso en riesgo a millones de propietarios. Trabajando directamente con bancos y entidades crediticias, Patricia negoció acuerdos hipotecarios y resoluciones de deuda que ayudaron a muchas familias a evitar la bancarrota durante uno de los períodos más desafiantes en la historia moderna del sector inmobiliario.'
                : 'A defining chapter of her career came during the 2008 financial crisis, when declining home values placed millions of homeowners at risk. Working directly with banks and lenders, Patricia negotiated mortgage settlements and debt resolutions that helped families avoid bankruptcy during one of the most challenging periods in modern real estate history.'}
            </p>

            <div className="team-card">
              <p>
                <span>{locale === 'es' ? 'Especialización: ' : 'Specialization: '}</span>
                {locale === 'es'
                  ? 'Propiedades residenciales, hipotecas para viviendas, negociación de deudas.'
                  : 'Residential real estate, home mortgages, debt negotiation.'}
              </p>
              <p>
                <span>{locale === 'es' ? 'Ubicación: ' : 'Location: '}</span>
                {locale === 'es' ? 'Nueva York, Paraguay' : 'New York, Paraguay'}
              </p>
              <p>
                <span>{locale === 'es' ? 'Historial comprobado: ' : 'Track Record: '}</span>
                {locale === 'es'
                  ? 'Más de 100 proyectos exitosos entregados | 100% de satisfacción de los clientes'
                  : '100+ successful projects delivered | 100% client satisfaction'}
              </p>
            </div>

            <p className="team-today">
              {locale === 'es'
                ? 'Hoy, Patricia aporta esa misma experiencia y compromiso a Lux Development, ayudando a compradores locales e internacionales a invertir, comprar y desarrollar bienes raíces en Paraguay con confianza. A través de una orientación transparente, experiencia local y soporte personalizado, ayuda a sus clientes a tomar decisiones informadas e identificar oportunidades con valor a largo plazo y potencial de revalorización del capital.'
                : 'Today, Patricia brings that same experience and commitment to Lux Development, helping local buyers and international clients invest, buy, and develop real estate in Paraguay with confidence. Through transparent guidance, local expertise, and personalized support, she helps clients make informed decisions and identify opportunities with long-term value and capital appreciation potential.'}
            </p>
          </div>

        </div>
      </section>
    </>
  )
}