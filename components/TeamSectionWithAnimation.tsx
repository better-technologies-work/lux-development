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
    <section id="team" className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20 border-t border-slate-200">
      
      {/* Contenedor principal */}
      <div className="flex flex-col gap-8 md:gap-12">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
          
          {/* Columna Izquierda: Imagen (order-2 en mobile para que quede abajo, order-1 en desktop) */}
          <div className="order-2 md:order-1">
            <div
              ref={imgRef}
              className={`relative overflow-hidden rounded-3xl h-64 md:h-[500px] bg-slate-100 border border-slate-200 ${isVisible ? 'animate-slide-bounce' : 'opacity-0'}`}
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

          {/* Columna Derecha: Bio y Bloque Azul (order-1 en mobile para que quede arriba, order-2 en desktop) */}
          <div className="order-1 md:order-2 flex flex-col gap-6">
            <h2 className="text-xs font-bold tracking-widest text-sky-700 uppercase">
              {locale === 'es' ? 'La fundadora' : 'The Founder'}
            </h2>
            <h3 className="text-2xl md:text-4xl font-bold text-black">
              Patricia Natalia Narvaez
            </h3>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed font-light">
              {locale === 'es'
                ? 'Con una amplia experiencia en el sector inmobiliario residencial tanto en Nueva York como en Paraguay, Patricia Natalia Narvaez ha construido una sólida reputación ayudando a familias, propietarios e inversores a navegar cada etapa del proceso de adquisición de inmuebles. Su enfoque centrado en el cliente, su profundo conocimiento del mercado y su compromiso con la obtención de resultados han contribuido a más de 100 proyectos exitosos y a relaciones a largo plazo basadas en la confianza.'
                : 'With extensive experience in residential real estate in both New York and Paraguay, Patricia Natalia Narvaez has built a reputation for helping families, homeowners, and investors navigate every stage of the property acquisition process. Her client-focused approach, deep understanding of the market, and commitment to delivering results have contributed to more than 100 successful projects and long-term relationships built on trust.'}
            </p>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed font-light">
              {locale === 'es'
                ? 'Un capítulo definitorio de su carrera tuvo lugar durante la crisis financiera de 2008, cuando la caída en el valor de las viviendas puso en riesgo a millones de propietarios. Trabajando directamente con bancos y entidades crediticias, Patricia negoció acuerdos hipotecarios y resoluciones de deuda que ayudaron a muchas familias a evitar la bancarrota durante uno de los períodos más desafiantes en la historia moderna del sector inmobiliario.'
                : 'A defining chapter of her career came during the 2008 financial crisis, when declining home values placed millions of homeowners at risk. Working directly with banks and lenders, Patricia negotiated mortgage settlements and debt resolutions that helped families avoid bankruptcy during one of the most challenging periods in modern real estate history.'}
            </p>

            <div className="space-y-4 text-sm md:text-sm p-6 bg-white border-l-4 border-sky-700 shadow-sm rounded-r-xl">
              <p className="text-slate-600 font-light">
                <span className="text-slate-950 font-semibold">{locale === 'es' ? 'Especialización:' : 'Specialization:'}</span> 
                {locale === 'es' ? ' Propiedades residenciales, hipotecas para viviendas, negociación de deudas.' : ' Residential real estate, home mortgages, debt negotiation.'}
              </p>
              <p className="text-slate-600 font-light">
                <span className="text-slate-950 font-semibold">{locale === 'es' ? 'Ubicación:' : 'Location:'}</span> 
                {locale === 'es' ? ' Nueva York, Paraguay' : ' New York, Paraguay'}
              </p>
              <p className="text-slate-600 font-light">
                <span className="text-slate-950 font-semibold">{locale === 'es' ? 'Historial comprobado:' : 'Track Record:'}</span> 
                {locale === 'es' ? ' Más de 100 proyectos exitosos entregados | 100% de satisfacción de los clientes' : ' 100+ successful projects delivered | 100% client satisfaction'}
              </p>
            </div>
          </div>
        </div>

        {/* Bloque "Today"  */}
        <div className="w-full">
          <p className="text-slate-700 text-sm md:text-base leading-relaxed font-light">
            {locale === 'es'
              ? 'Hoy, Patricia aporta esa misma experiencia y compromiso a Lux Development, ayudando a compradores locales e internacionales a invertir, comprar y desarrollar bienes raíces en Paraguay con confianza. A través de una orientación transparente, experiencia local y soporte personalizado, ayuda a sus clientes a tomar decisiones informadas e identificar oportunidades con valor a largo plazo y potencial de revalorización del capital.'
              : 'Today, Patricia brings that same experience and commitment to Lux Development, helping local buyers and international clients invest, buy, and develop real estate in Paraguay with confidence. Through transparent guidance, local expertise, and personalized support, she helps clients make informed decisions and identify opportunities with long-term value and capital appreciation potential.'}
          </p>
        </div>

      </div>
    </section>
  )
}