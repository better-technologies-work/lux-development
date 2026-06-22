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

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <>
      <style>{`
        @keyframes slideInBounce {
          0% {
            opacity: 0;
            transform: translateX(-80px);
          }
          60% {
            opacity: 1;
            transform: translateX(15px);
          }
          80% {
            transform: translateX(-5px);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-slide-bounce {
          animation: slideInBounce 0.9s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
      `}</style>

      <section id="team" className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20 border-t border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Photo - Animación slide con bounce desde izquierda */}
          <div className="order-2 md:order-1">
            <div
              ref={imgRef}
              className={`relative overflow-hidden rounded-3xl h-64 md:h-96 bg-slate-100 border border-slate-200 ${
                isVisible ? 'animate-slide-bounce' : 'opacity-0'
              }`}
            >
              <Image
                src="/Patricia-Fretes.jpg"
                alt="Patricia Fretes"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="order-1 md:order-2">
            <h2 className="text-xs font-bold tracking-widest text-sky-700 uppercase mb-4">
              {locale === 'es' ? 'La fundadora' : 'The Founder'}
            </h2>
          
            <h3 className="text-2xl md:text-4xl font-bold text-black mb-6">
              Patricia Natalia Narvaez
            </h3>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4 font-light">
              {locale === 'es'
                ? 'With extensive experience in residential real estate across New York and Paraguay, Patricia has built a reputation for guiding families and investors through every stage of the homeownership journey. Her client-first approach, deep market knowledge, and commitment to results have led to the successful delivery of more than 100 projects with a 100% satisfaction rate.'
                : 'Con una amplia experiencia en el sector inmobiliario residencial en Nueva York y Paraguay, Patricia se ha ganado una reputación por guiar a familias e inversores en cada etapa del proceso de adquisición de una propiedad. Su enfoque centrado en el cliente, su profundo conocimiento del mercado y su compromiso con los resultados le han permitido completar con éxito más de 100 proyectos con una tasa de satisfacción del 100%.'}
            </p>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4 font-light">
  {locale === 'es'
    ? 'Un capítulo destacado de su carrera llegó durante la crisis financiera de 2008, cuando la ola de ejecuciones hipotecarias puso en riesgo a millones de propietarios. Patricia trabajó directamente con bancos para negociar acuerdos de deuda y soluciones hipotecarias, ayudando a familias a evitar la quiebra durante uno de los períodos más desafiantes de la historia inmobiliaria moderna.'
    : 'A notable chapter of her career came during the 2008 financial crisis, when widespread mortgage defaults put millions of homeowners at risk. Patricia worked directly with banks to negotiate debt settlements and mortgage solutions, helping families avoid bankruptcy during one of the most challenging periods in modern real estate history.'}
</p>
            <div className="space-y-2 text-sm md:text-sm">
              <p className="text-slate-600 font-light">
                <span className="text-slate-950 font-semibold">{locale === 'es' ? 'Especialización:' : 'Specialization:'}</span> {locale === 'es' ? 'Propiedades residenciales, Hipotecas para viviendas, Negociacion de deudas.' : 'Residential real estate, Home mortgages, Debt negotiation'}
              </p>
              <p className="text-slate-600 font-light">
                <span className="text-slate-950 font-semibold">{locale === 'es' ? 'Ubicación:' : 'Location:'}</span> {locale === 'es' ? ' Nueva York, Paraguay' : ' New York, Paraguay'}
              </p>
              <p className="text-slate-600 font-light">
                <span className="text-slate-950 font-semibold">{locale === 'es' ? 'Historial comprobado:' : 'Track Record:'}</span> {locale === 'es' ? 'Más de 100 proyectos exitosos entregados | 100% de satisfacción de los clientes' : '100+ successful projects delivered | 100% client satisfaction'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}