'use client';
import { useState } from 'react';
import CalcAdquisicion from './modals/CalcAdquisicion';
import CalcDesarrollo from './modals/CalcDesarrollo';
import CalcFinanciamiento from './modals/CalcFinanciamiento';
import CalcRenta from './modals/CalcRenta';

interface Props { locale: string; }

type ModalType = 'adquisicion' | 'desarrollo' | 'financiamiento' | 'renta' | null;

export default function OurServices({ locale }: Props) {
  const [modal, setModal] = useState<ModalType>(null);

  const services = [
    {
      icon: 'ti-home',
      title: locale === 'es' ? 'Adquisición de propiedades' : 'Property Acquisition',
      subtitle: locale === 'es' ? 'Compradores locales' : 'Local buyers',
      description: locale === 'es' ? 'Encontrá las oportunidades correctas con confianza.' : 'Find the right opportunities with confidence.',
      benefit: locale === 'es' ? 'Navegue el proceso de adquisición de propiedades en Paraguay con experiencia local de confianza. Reduzca la incertidumbre, evite errores costosos y tome decisiones informadas.' : 'Navigate the property acquisition process in Paraguay with trusted local expertise. Reduce uncertainty, avoid costly mistakes, and make informed decisions.',
      cta: locale === 'es' ? 'Ver calculadora' : 'View calculator',
      modal: 'adquisicion' as ModalType,
    },
    {
      icon: 'ti-building-skyscraper',
      title: locale === 'es' ? 'Desarrollo inmobiliario' : 'Property Development',
      subtitle: locale === 'es' ? 'Inversores y desarrolladores' : 'Investors & developers',
      description: locale === 'es' ? 'Convertí oportunidades en proyectos exitosos.' : 'Turn opportunities into successful projects.',
      benefit: locale === 'es' ? 'Desde la planificación hasta la ejecución, ayudamos a nuestros clientes a desarrollar proyectos residenciales y de inversión con mayor transparencia, control y creación de valor a largo plazo.' : 'From planning to execution, we help clients develop residential and investment projects with greater transparency, control, and long-term value creation.',
      cta: locale === 'es' ? 'Ver simulador' : 'View simulator',
      modal: 'desarrollo' as ModalType,
    },
    {
      icon: 'ti-currency-dollar',
      title: locale === 'es' ? 'Financiamiento & Estructuración' : 'Financing & Structuring',
      subtitle: locale === 'es' ? 'Crédito hipotecario' : 'Mortgage credit',
      description: locale === 'es' ? 'Navegá el financiamiento con claridad.' : 'Navigate financing with clarity.',
      benefit: locale === 'es' ? 'Explore soluciones de financiación y estructuras de inversión alineadas con sus objetivos financieros y su estrategia a largo plazo.' : 'Explore financing solutions and investment structures aligned with your financial goals and long-term strategy.',
      cta: locale === 'es' ? 'Ver requisitos' : 'View requirements',
      modal: 'financiamiento' as ModalType,
    },
    {
      icon: 'ti-chart-line',
      title: locale === 'es' ? 'Renta para comprar' : 'Rent-to-own',
      subtitle: locale === 'es' ? 'Propietarios locales' : 'Local Owners',
      description: locale === 'es' ? 'Protegé y hacé crecer tu inversión.' : 'Protect and grow your investment.',
      benefit: locale === 'es' ? 'Rompe el ciclo del alquiler y accede a la propiedad de tu vivienda más rápidamente mediante soluciones de financiamiento personalizadas y el acompañamiento integral de Lux en todo el proceso, de principio a fin.' : 'End the rental cycle and achieve homeownership faster through personalized financing solutions and end-to-end guidance from Lux.',
      cta: locale === 'es' ? 'Ver simulador de renta' : 'View rental simulator',
      modal: 'renta' as ModalType,
    },
  ];

  return (
    <>
      <section className="relative px-4 md:px-6 py-16 md:py-20 border-t border-slate-200 overflow-hidden">

        {/* Fondo imagen edificios */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/fondo.2.jpeg')", opacity: 0.6 }}
        />
        {/* Capa blanca para suavizar */}
        <div className="absolute inset-0 bg-white/60" />

        {/* Contenido */}
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <h2 className="text-2xl md:text-4xl font-extrabold text-slate-950 tracking-tight mb-3">
                {locale === 'es' ? 'NUESTROS SERVICIOS' : 'OUR SERVICES'}
              </h2>
              <p className="text-slate-600 text-base md:text-lg font-light">
                {locale === 'es' ? 'Todo lo que necesitás para invertir con confianza en Paraguay.' : 'Everything you need to invest with confidence in Paraguay.'}
              </p>
            </div>
            <a href="https://wa.me/595981506175" target="_blank" rel="noreferrer"
              className="shrink-0 inline-flex items-center gap-2 bg-sky-900 hover:bg-sky-800 text-white text-sm font-semibold px-6 py-3 rounded-lg transition">
              <i className="ti ti-brand-whatsapp text-lg" />
              {locale === 'es' ? 'Hablá con un representante' : 'Talk to a representative'}
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <div key={i} className="bg-white border border-slate-200 rounded-xl p-6 flex flex-col gap-4 hover:border-slate-400 transition">
                <div className="w-12 h-12 border border-slate-900 rounded-lg flex items-center justify-center">
                  <i className={`ti ${s.icon} text-2xl text-slate-900`} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-widest mb-1">{s.subtitle}</p>
                  <h3 className="text-lg font-bold text-slate-950">{s.title}</h3>
                </div>
                <p className="text-slate-600 text-sm font-light leading-relaxed">{s.description}</p>
                <div className="flex items-start gap-2 bg-slate-50 rounded-lg p-3">
                  <i className="ti ti-circle-check text-sky-900 text-base mt-0.5 shrink-0" />
                  <p className="text-xs text-slate-700 leading-relaxed">{s.benefit}</p>
                </div>
                <button onClick={() => setModal(s.modal)}
                  className="mt-auto w-full border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white text-sm font-semibold py-2.5 rounded-lg transition">
                  {s.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {modal === 'adquisicion' && <CalcAdquisicion locale={locale} onClose={() => setModal(null)} />}
      {modal === 'desarrollo' && <CalcDesarrollo locale={locale} onClose={() => setModal(null)} />}
      {modal === 'financiamiento' && <CalcFinanciamiento locale={locale} onClose={() => setModal(null)} />}
      {modal === 'renta' && <CalcRenta locale={locale} onClose={() => setModal(null)} />}
    </>
  );
}