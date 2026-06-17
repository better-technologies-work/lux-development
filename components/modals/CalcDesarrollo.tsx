'use client';
import { useState } from 'react';

export default function CalcDesarrollo({ locale, onClose }: { locale: string; onClose: () => void }) {
  const [inversion, setInversion] = useState(200000);
  const [retorno, setRetorno] = useState(32);
  const [meses, setMeses] = useState(24);
  const [condicion, setCondicion] = useState<'contado' | 'cuotas'>('contado');
  const [cuotas, setCuotas] = useState(12);

  const ganancia = inversion * (retorno / 100);
  const total = inversion + ganancia;
  const cuotaMensual = condicion === 'cuotas' ? inversion / cuotas : 0;

  const fmt = (val: number) => 'USD ' + Math.round(val).toLocaleString('en-US');

  const waMsg = encodeURIComponent(
    `Consulta desarrollo: Inversión ${fmt(inversion)}, retorno estimado ${retorno}% en ${meses} meses. Total: ${fmt(total)}.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={onClose}>
      <div className="bg-sky-950 text-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white">
          <i className="ti ti-x text-xl" />
        </button>

        <h3 className="text-lg font-bold mb-1">
          {locale === 'es' ? 'Simulador de desarrollo' : 'Development simulator'}
        </h3>
        <p className="text-sm text-white/60 mb-5">
          {locale === 'es' ? 'Calculá el retorno de tu inversión' : 'Calculate your investment return'}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-white/60 uppercase font-medium">{locale === 'es' ? 'Monto a invertir (USD)' : 'Investment amount (USD)'}</label>
            <input type="number" value={inversion} onChange={(e) => setInversion(parseFloat(e.target.value) || 0)}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-white/60 uppercase font-medium">{locale === 'es' ? 'Retorno estimado' : 'Est. return'}: {retorno}%</label>
            <input type="range" min={10} max={100} value={retorno} onChange={(e) => setRetorno(Number(e.target.value))} className="mt-2" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-white/60 uppercase font-medium">{locale === 'es' ? 'Duración (meses)' : 'Duration (months)'}: {meses}</label>
            <input type="range" min={6} max={60} step={6} value={meses} onChange={(e) => setMeses(Number(e.target.value))} className="mt-2" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-white/60 uppercase font-medium">{locale === 'es' ? 'Condición de pago' : 'Payment condition'}</label>
            <select value={condicion} onChange={(e) => setCondicion(e.target.value as 'contado' | 'cuotas')}
              className="bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white">
              <option value="contado">{locale === 'es' ? 'Contado' : 'Upfront'}</option>
              <option value="cuotas">{locale === 'es' ? 'En cuotas' : 'Installments'}</option>
            </select>
          </div>
        </div>

        {condicion === 'cuotas' && (
          <div className="flex flex-col gap-1 mb-4">
            <label className="text-xs text-white/60 uppercase font-medium">{locale === 'es' ? 'Cantidad de cuotas' : 'Number of installments'}: {cuotas}</label>
            <input type="range" min={3} max={36} step={3} value={cuotas} onChange={(e) => setCuotas(Number(e.target.value))} />
          </div>
        )}

        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            { label: locale === 'es' ? 'Inversión' : 'Investment', value: fmt(inversion) },
            { label: locale === 'es' ? 'Ganancia' : 'Gain', value: fmt(ganancia) },
            { label: 'Total', value: fmt(total) },
          ].map((m) => (
            <div key={m.label} className="bg-white/10 rounded-xl p-3 text-center">
              <p className="text-xs text-white/50 uppercase mb-1">{m.label}</p>
              <p className="text-sm font-bold text-white break-all">{m.value}</p>
            </div>
          ))}
        </div>

        {condicion === 'cuotas' && (
          <div className="bg-white/10 rounded-xl p-4 mb-5 text-center">
            <p className="text-xs text-white/50 uppercase mb-1">{locale === 'es' ? 'Cuota mensual' : 'Monthly installment'}</p>
            <p className="text-xl font-bold text-white">{fmt(cuotaMensual)}</p>
            <p className="text-xs text-white/40 mt-1">{cuotas} {locale === 'es' ? 'cuotas' : 'installments'}</p>
          </div>
        )}

        <div className="bg-white/10 rounded-xl p-4 mb-5">
          <p className="text-xs text-white/50 uppercase mb-2">{locale === 'es' ? 'Duración estimada' : 'Estimated duration'}</p>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-white/20 rounded-full overflow-hidden">
              <div className="bg-white h-full rounded-full" style={{ width: `${Math.min((meses / 60) * 100, 100)}%` }} />
            </div>
            <span className="text-sm font-bold text-white">{meses} {locale === 'es' ? 'meses' : 'months'}</span>
          </div>
        </div>

        <a href={`https://wa.me/595991358652?text=${waMsg}`} target="_blank" rel="noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-white text-sky-950 hover:bg-white/90 text-sm font-semibold py-3 rounded-xl transition">
          <i className="ti ti-brand-whatsapp text-lg" />
          {locale === 'es' ? 'Consultar por WhatsApp' : 'Contact via WhatsApp'}
        </a>
      </div>
    </div>
  );
}