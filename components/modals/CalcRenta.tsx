'use client';
import { useState } from 'react';

const TC = 7600;

export default function CalcRenta({ locale, onClose }: { locale: string; onClose: () => void }) {
  const [currency, setCurrencyState] = useState<'USD' | 'GS'>('USD');
  const [precio, setPrecio] = useState(200000);
  const [anticipo, setAnticipo] = useState(30);
  const [tasa, setTasa] = useState(8.5);
  const [mesesAlquiler, setMesesAlquiler] = useState(6);

  const monto = precio * (1 - anticipo / 100);
  const n = 20 * 12;
  const r = tasa / 100 / 12;
  const cuota = r === 0 ? monto / n : (monto * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const alquilerMensual = cuota;
  const totalAlquilerPagado = alquilerMensual * mesesAlquiler;
  const deudaFinal = monto - totalAlquilerPagado;

  const fmt = (val: number) =>
    currency === 'GS'
      ? 'Gs. ' + Math.round(val).toLocaleString('es-PY')
      : 'USD ' + Math.round(val).toLocaleString('en-US');

  const handleCurrency = (c: 'USD' | 'GS') => {
    setPrecio((prev) => c === 'GS' ? Math.round(prev * TC) : Math.round(prev / TC));
    setCurrencyState(c);
  };

  const waMsg = encodeURIComponent(
    `Consulta renta: Propiedad ${fmt(precio)}, alquiler ${fmt(alquilerMensual)}/mes por ${mesesAlquiler} meses. Deuda final: ${fmt(deudaFinal)}.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
          <i className="ti ti-x text-xl" />
        </button>

        <h3 className="text-lg font-bold text-slate-950 mb-1">
          {locale === 'es' ? 'Simulador de renta' : 'Rental simulator'}
        </h3>
        <p className="text-sm text-slate-500 mb-5">
          {locale === 'es'
            ? 'Alquilá mientras obtenés tu préstamo y descontá lo pagado de tu deuda'
            : 'Rent while securing your loan and deduct payments from your debt'}
        </p>

        <div className="flex gap-2 mb-5">
          {(['USD', 'GS'] as const).map((c) => (
            <button key={c} onClick={() => handleCurrency(c)}
              className={`px-5 py-1.5 rounded-full text-sm border transition ${currency === c ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-300'}`}>
              {c === 'GS' ? 'Guaraníes' : 'USD'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-500 uppercase font-medium">{locale === 'es' ? 'Valor propiedad' : 'Property value'}</label>
            <input type="number" value={precio} onChange={(e) => setPrecio(parseFloat(e.target.value) || 0)}
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-500 uppercase font-medium">{locale === 'es' ? 'Anticipo' : 'Down payment'}: {anticipo}%</label>
            <input type="range" min={10} max={50} value={anticipo} onChange={(e) => setAnticipo(Number(e.target.value))} className="mt-2" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-500 uppercase font-medium">{locale === 'es' ? 'Tasa anual' : 'Annual rate'}: {tasa.toFixed(1)}%</label>
            <input type="range" min={5} max={14} step={0.5} value={tasa} onChange={(e) => setTasa(Number(e.target.value))} className="mt-2" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-500 uppercase font-medium">{locale === 'es' ? 'Meses de alquiler' : 'Rental months'}: {mesesAlquiler}</label>
            <input type="range" min={6} max={12} step={6} value={mesesAlquiler} onChange={(e) => setMesesAlquiler(Number(e.target.value))} className="mt-2" />
          </div>
        </div>

        {/* Resultados */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-slate-50 rounded-xl p-3 text-center">
            <p className="text-xs text-slate-500 uppercase mb-1">{locale === 'es' ? 'Alquiler/mes' : 'Rent/month'}</p>
            <p className="text-sm font-bold text-slate-950 break-all">{fmt(alquilerMensual)}</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 text-center">
            <p className="text-xs text-slate-500 uppercase mb-1">{locale === 'es' ? 'Total alquilado' : 'Total rented'}</p>
            <p className="text-sm font-bold text-slate-950 break-all">{fmt(totalAlquilerPagado)}</p>
          </div>
        </div>

        {/* Deuda final destacada */}
        <div className="bg-sky-950 rounded-xl p-4 mb-5 text-center">
          <p className="text-xs text-white/60 uppercase mb-1">
            {locale === 'es' ? 'Deuda final (descontando alquiler)' : 'Final debt (after deducting rent)'}
          </p>
          <p className="text-2xl font-bold text-white">{fmt(Math.max(deudaFinal, 0))}</p>
          <p className="text-xs text-white/40 mt-1">
            {locale === 'es'
              ? `Préstamo de ${fmt(monto)} − ${mesesAlquiler} meses de alquiler`
              : `Loan of ${fmt(monto)} − ${mesesAlquiler} months of rent`}
          </p>
        </div>

        {/* Barra visual */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>{locale === 'es' ? 'Alquiler pagado' : 'Rent paid'}</span>
            <span>{locale === 'es' ? 'Deuda restante' : 'Remaining debt'}</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden flex">
            <div className="bg-sky-900 h-full transition-all" style={{ width: `${Math.min((totalAlquilerPagado / monto) * 100, 100)}%` }} />
            <div className="bg-slate-300 h-full flex-1" />
          </div>
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