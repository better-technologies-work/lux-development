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
              {locale === 'es' ? 'The Problem' : 'El Problema'}
            </h2>
          
            <h3 className="text-2xl md:text-4xl font-bold text-black mb-6">
              Patricia Natalia Narvaez
            </h3>
            <p className="text-slate-700 text-sm md:text-lg leading-relaxed mb-6 font-light">
              {locale === 'es'
                ? 'Con más de 20 años de experiencia en desarrollo inmobiliario de lujo, Patricia ha redefinido el estándar de excelencia en la industria. Su visión única y atención meticulosa a los detalles han generado algunos de los activos inmobiliarios más codiciados del mundo.'
                : 'With over 20 years of experience in luxury real estate development, Patricia has redefined the standard of excellence in the industry. Her unique vision and meticulous attention to detail have created some of the most coveted real estate assets in the world.'}
            </p>
            <div className="space-y-3 text-sm md:text-base">
              <p className="text-slate-600 font-light">
                <span className="text-slate-950 font-semibold">{locale === 'es' ? 'Especialización:' : 'Specialization:'}</span> {locale === 'es' ? 'Desarrollo inmobiliario de lujo, Arquitectura contemporánea' : 'Luxury real estate development, Contemporary architecture'}
              </p>
              <p className="text-slate-600 font-light">
                <span className="text-slate-950 font-semibold">{locale === 'es' ? 'Ubicación:' : 'Location:'}</span> {locale === 'es' ? 'Miami, Nueva York, Londres' : 'Miami, New York, London'}
              </p>
              <p className="text-slate-600 font-light">
                <span className="text-slate-950 font-semibold">{locale === 'es' ? 'Portafolio:' : 'Portfolio:'}</span> {locale === 'es' ? '+$450M en transacciones completadas' : '+$450M in completed transactions'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}