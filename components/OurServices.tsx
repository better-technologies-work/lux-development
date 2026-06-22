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
      benefit: locale === 'es' ? 'Reducí la incertidumbre y evitá errores costosos.' : 'Reduce uncertainty and avoid costly mistakes.',
      cta: locale === 'es' ? 'Ver calculadora' : 'View calculator',
      modal: 'adquisicion' as ModalType,
    },
    {
      icon: 'ti-building-skyscraper',
      title: locale === 'es' ? 'Desarrollo inmobiliario' : 'Property Development',
      subtitle: locale === 'es' ? 'Inversores y desarrolladores' : 'Investors & developers',
      description: locale === 'es' ? 'Convertí oportunidades en proyectos exitosos.' : 'Turn opportunities into successful projects.',
      benefit: locale === 'es' ? 'Construí con mayor transparencia, control y tranquilidad.' : 'Build with greater transparency, control, and peace of mind.',
      cta: locale === 'es' ? 'Ver simulador' : 'View simulator',
      modal: 'desarrollo' as ModalType,
    },
    {
      icon: 'ti-currency-dollar',
      title: locale === 'es' ? 'Financiamiento & Estructuración' : 'Financing & Structuring',
      subtitle: locale === 'es' ? 'Crédito hipotecario' : 'Mortgage credit',
      description: locale === 'es' ? 'Navegá el financiamiento con claridad.' : 'Navigate financing with clarity.',
      benefit: locale === 'es' ? 'Accedé a oportunidades que se alinean con tus metas.' : 'Access opportunities that align with your financial goals.',
      cta: locale === 'es' ? 'Ver requisitos' : 'View requirements',
      modal: 'financiamiento' as ModalType,
    },
    {
      icon: 'ti-chart-line',
      title: locale === 'es' ? 'Gestión de activos' : 'Asset Management & Investment Support',
      subtitle: locale === 'es' ? 'Inversores' : 'Investors',
      description: locale === 'es' ? 'Protegé y hacé crecer tu inversión.' : 'Protect and grow your investment.',
      benefit: locale === 'es' ? 'Maximizá el rendimiento de tu inversión a lo largo del tiempo.' : 'Maximize the performance of your investment over time.',
      cta: locale === 'es' ? 'Ver simulador de renta' : 'View rental simulator',
      modal: 'renta' as ModalType,
    },
  ];

  return (
    <>
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20 border-t border-slate-200">
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
      </section>

      {modal === 'adquisicion' && <CalcAdquisicion locale={locale} onClose={() => setModal(null)} />}
      {modal === 'desarrollo' && <CalcDesarrollo locale={locale} onClose={() => setModal(null)} />}
      {modal === 'financiamiento' && <CalcFinanciamiento locale={locale} onClose={() => setModal(null)} />}
      {modal === 'renta' && <CalcRenta locale={locale} onClose={() => setModal(null)} />}
    </>
  );
}