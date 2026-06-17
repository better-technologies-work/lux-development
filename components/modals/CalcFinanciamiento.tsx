'use client';
import { useState } from 'react';

export default function CalcFinanciamiento({ locale, onClose }: { locale: string; onClose: () => void }) {
  const [nombre, setNombre] = useState('');
  const [monto, setMonto] = useState('');
  const [ingresos, setIngresos] = useState('');
  const [plazo, setPlazo] = useState('15');

  const waMsg = encodeURIComponent(
    `Consulta financiamiento:\nNombre: ${nombre}\nMonto solicitado: USD ${monto}\nIngresos mensuales: USD ${ingresos}\nPlazo deseado: ${plazo} años`
  );

  const requisitos = [
    { icon: 'ti-id', label: locale === 'es' ? 'Cédula de identidad vigente' : 'Valid national ID' },
    { icon: 'ti-file-dollar', label: locale === 'es' ? 'Comprobante de ingresos (últimos 3 meses)' : 'Proof of income (last 3 months)' },
    { icon: 'ti-building-bank', label: locale === 'es' ? 'Extractos bancarios (últimos 6 meses)' : 'Bank statements (last 6 months)' },
    { icon: 'ti-home-search', label: locale === 'es' ? 'Tasación del inmueble' : 'Property appraisal' },
    { icon: 'ti-file-certificate', label: locale === 'es' ? 'Escritura o promesa de compraventa' : 'Title deed or purchase agreement' },
    { icon: 'ti-user-check', label: locale === 'es' ? 'Referencias personales o comerciales' : 'Personal or commercial references' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
          <i className="ti ti-x text-xl" />
        </button>

        <h3 className="text-lg font-bold text-slate-950 mb-1">
          {locale === 'es' ? 'Financiamiento & Estructuración' : 'Financing & Structuring'}
        </h3>
        <p className="text-sm text-slate-500 mb-5">
          {locale === 'es' ? 'Requisitos y consulta personalizada' : 'Requirements and personalized consultation'}
        </p>

        {/* Requisitos */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
            {locale === 'es' ? 'Requisitos' : 'Requirements'}
          </p>
          <div className="flex flex-col gap-2">
            {requisitos.map((r) => (
              <div key={r.label} className="flex items-center gap-3 bg-slate-50 rounded-lg px-3 py-2.5">
                <i className={`ti ${r.icon} text-sky-900 text-base shrink-0`} />
                <span className="text-xs text-slate-700">{r.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Formulario */}
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-3">
          {locale === 'es' ? 'Tu consulta' : 'Your inquiry'}
        </p>

        <div className="flex flex-col gap-3 mb-6">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-500 uppercase font-medium">{locale === 'es' ? 'Nombre completo' : 'Full name'}</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder={locale === 'es' ? 'Tu nombre' : 'Your name'}
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-500 uppercase font-medium">{locale === 'es' ? 'Monto (USD)' : 'Amount (USD)'}</label>
              <input type="number" value={monto} onChange={(e) => setMonto(e.target.value)} placeholder="200,000"
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-500 uppercase font-medium">{locale === 'es' ? 'Ingresos/mes (USD)' : 'Income/month (USD)'}</label>
              <input type="number" value={ingresos} onChange={(e) => setIngresos(e.target.value)} placeholder="5,000"
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm" />
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-500 uppercase font-medium">{locale === 'es' ? 'Plazo deseado' : 'Desired term'}</label>
            <select value={plazo} onChange={(e) => setPlazo(e.target.value)} className="border border-slate-300 rounded-lg px-3 py-2 text-sm">
              <option value="5">5 {locale === 'es' ? 'años' : 'years'}</option>
              <option value="10">10 {locale === 'es' ? 'años' : 'years'}</option>
              <option value="15">15 {locale === 'es' ? 'años' : 'years'}</option>
              <option value="20">20 {locale === 'es' ? 'años' : 'years'}</option>
              <option value="30">30 {locale === 'es' ? 'años' : 'years'}</option>
            </select>
          </div>
        </div>

        <a href={`https://wa.me/595991358652?text=${waMsg}`} target="_blank" rel="noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold py-3 rounded-xl transition">
          <i className="ti ti-brand-whatsapp text-lg" />
          {locale === 'es' ? 'Enviar consulta por WhatsApp' : 'Send inquiry via WhatsApp'}
        </a>
      </div>
    </div>
  );
}