'use client';
import { useState } from 'react';

const TC = 7600;

export default function CalcAdquisicion({ locale, onClose }: { locale: string; onClose: () => void }) {
  const [currency, setCurrencyState] = useState<'USD' | 'GS'>('USD');
  const [precio, setPrecio] = useState(600000);
  const [plazo, setPlazo] = useState(15);
  const [tasa, setTasa] = useState(8.5);

  // Se eliminó el anticipo, ahora el monto a financiar es el precio total
  const monto = precio; 
  const n = plazo * 12;
  const r = tasa / 100 / 12;
  const cuota = r === 0 ? monto / n : (monto * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const total = cuota * n;

  const fmt = (val: number) =>
    currency === 'GS'
      ? 'Gs. ' + Math.round(val).toLocaleString('es-PY')
      : 'USD ' + Math.round(val).toLocaleString('en-US');

  const handleCurrency = (c: 'USD' | 'GS') => {
    setPrecio((prev) => c === 'GS' ? Math.round(prev * TC) : Math.round(prev / TC));
    setCurrencyState(c);
  };

  const waMsg = encodeURIComponent(`Consulta adquisición: Cuota ${fmt(cuota)} para propiedad de ${fmt(precio)}.`);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
          <i className="ti ti-x text-xl" />
        </button>

        <h3 className="text-lg font-bold text-slate-950 mb-1">
          {locale === 'es' ? 'Simulador de adquisición' : 'Acquisition simulator'}
        </h3>
        <p className="text-sm text-slate-500 mb-5">
          {locale === 'es' ? 'Estimá tu cuota mensual' : 'Estimate your monthly payment'}
        </p>

        <div className="flex gap-2 mb-5">
          {(['USD', 'GS'] as const).map((c) => (
            <button key={c} onClick={() => handleCurrency(c)}
              className={`px-5 py-1.5 rounded-full text-sm border transition ${currency === c ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-300'}`}>
              {c === 'GS' ? 'Guaraníes' : 'USD'}
            </button>
          ))}
        </div>

        {/* Solo dejamos el Valor Propiedad */}
        <div className="mb-4">
          <label className="text-xs text-slate-500 uppercase font-medium">{locale === 'es' ? 'Valor propiedad' : 'Property value'}</label>
          <input type="number" value={precio} onChange={(e) => setPrecio(parseFloat(e.target.value) || 0)} className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm mt-1" />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-500 uppercase font-medium">{locale === 'es' ? 'Plazo' : 'Term'}</label>
            <select value={plazo} onChange={(e) => setPlazo(Number(e.target.value))} className="border border-slate-300 rounded-lg px-3 py-2 text-sm">
              <option value={15}>15 {locale === 'es' ? 'años' : 'years'}</option>
              <option value={30}>30 {locale === 'es' ? 'años' : 'years'}</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-500 uppercase font-medium">{locale === 'es' ? 'Tasa anual' : 'Annual rate'}: {tasa.toFixed(1)}%</label>
            <input type="range" min={5} max={14} step={0.5} value={tasa} onChange={(e) => setTasa(Number(e.target.value))} className="mt-2" />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: locale === 'es' ? 'Cuota' : 'Payment', value: fmt(cuota) },
            { label: locale === 'es' ? 'Financiación' : 'Financing', value: fmt(monto) },
            { label: 'Total', value: fmt(total) },
          ].map((m) => (
            <div key={m.label} className="bg-slate-50 rounded-xl p-3 text-center">
              <p className="text-xs text-slate-500 uppercase mb-1">{m.label}</p>
              <p className="text-sm font-bold text-slate-950 break-all">{m.value}</p>
            </div>
          ))}
        </div>

        {/* Barra de progreso ajustada */}
        <div className="h-2 bg-slate-900 rounded-full mb-6" />

        <div className="grid grid-cols-2 gap-2 mb-6">
          {[
            locale === 'es' ? 'Cédula vigente' : 'Valid ID',
            locale === 'es' ? 'Comprobante ingresos' : 'Proof of income',
            locale === 'es' ? 'Extractos bancarios' : 'Bank statements',
            locale === 'es' ? 'Tasación inmueble' : 'Property appraisal',
          ].map((req) => (
            <div key={req} className="text-xs text-slate-600 bg-slate-50 rounded-lg px-3 py-2">{req}</div>
          ))}
        </div>

        <a href={`https://wa.me/595991358652?text=${waMsg}`} target="_blank" rel="noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold py-3 rounded-xl transition">
          <i className="ti ti-brand-whatsapp text-lg" />
          {locale === 'es' ? 'Consultar por WhatsApp' : 'Contact via WhatsApp'}
        </a>
      </div>
    </div>
  );
}