'use client';
import { useState } from 'react';
import { PROJECTS } from '@/lib/projects';

const TC = 7600;

export default function CalcRenta({ locale, onClose }: { locale: string; onClose: () => void }) {
  const [currency, setCurrencyState] = useState<'USD' | 'GS'>('USD');
  const [precio, setPrecio] = useState<number>(PROJECTS[0].priceUSD);
 const [proyectoId, setProyectoId] = useState<string>(PROJECTS[0].id);
  const [tasa, setTasa] = useState(8.5);
  const [mesesContrato, setMesesContrato] = useState(6);

  const proyecto = PROJECTS.find((p) => p.id === proyectoId)!;

  const n = 30 * 12;
  const r = tasa / 100 / 12;
  const rentingFee = r === 0 ? precio / n : (precio * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalRentLiquidity = rentingFee * mesesContrato;
  const precioFinal = precio - totalRentLiquidity;

  const fmt = (val: number) =>
    currency === 'GS'
      ? 'Gs. ' + Math.round(val).toLocaleString('es-PY')
      : 'US$ ' + Math.round(val).toLocaleString('en-US');

  const handleProyecto = (id: string) => {
    const p = PROJECTS.find((x) => x.id === id);
    if (!p) return;
    setProyectoId(id);
    setCurrencyState((curr) => {
      setPrecio(curr === 'GS' ? Math.round(p.priceUSD * TC) : p.priceUSD);
      return curr;
    });
  };

  const waMsg = encodeURIComponent(
    `Consulta Sooner Program: Proyecto ${locale === 'es' ? proyecto.name : proyecto.nameEn}, Propiedad ${fmt(precio)}, Renting Fee ${fmt(rentingFee)}/mes por ${mesesContrato} meses. Precio final: ${fmt(Math.max(precioFinal, 0))}.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
<div
  className="w-full max-w-md bg-white rounded-3xl overflow-y-auto max-h-[90vh] shadow-2xl relative"
  onClick={(e) => e.stopPropagation()}
>
        {/* Header */}
          <div className="bg-[#C0C0C0] p-6 text-slate-900 rounded-b-[2rem] shrink-0">

          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-0.5">
                  {locale === 'es' ? 'Programa Lux' : "Lux's Own Sooner Program"}
                </p>
                <h3 className="text-xl font-bold">
                  {locale === 'es' ? 'Simulador de renta' : 'Rental simulator'}
                </h3>
                <p className="text-xs opacity-70 mt-1">
                  Asset Management & Investment Support
                </p>
              </div>
              <img src="/calculadora.png" alt="Logo" className="w-12 h-12 object-contain" />
            </div>
            <button onClick={onClose} className="text-3xl font-light hover:text-white transition">×</button>
          </div>

          <p className="text-xs opacity-60 leading-relaxed mb-5 border-l-2 border-slate-900/30 pl-3">
            {locale === 'es'
              ? 'Terminá con el ciclo de alquiler y alcanzá la propiedad más rápido con soluciones de financiamiento personalizadas y acompañamiento integral de Lux.'
              : 'End the rental cycle and achieve homeownership faster through personalized financing solutions and end-to-end guidance from Lux.'}
          </p>

          {/* Selector de proyecto */}
          <div className="mb-4">
            <label className="block text-xs uppercase opacity-70 mb-1 font-bold">
              {locale === 'es' ? 'Proyecto' : 'Project'}
            </label>
            <select
              value={proyectoId}
              onChange={(e) => handleProyecto(e.target.value)}
              className="w-full bg-white/30 border border-black/10 rounded-xl px-4 py-2 text-sm font-semibold focus:outline-none"
            >
              {PROJECTS.map((p) => (
                <option key={p.id} value={p.id}>
                  {locale === 'es' ? p.name : p.nameEn}
                </option>
              ))}
            </select>
            <p className="text-xs opacity-60 mt-1">{proyecto.location}</p>
          </div>

          {/* Moneda */}
          <div className="flex gap-2 mb-4">
            {(['USD', 'GS'] as const).map((c) => (
              <button
                key={c}
                onClick={() => {
                  if (c === currency) return;
                  setPrecio((prev) => c === 'GS' ? Math.round(prev * TC) : Math.round(prev / TC));
                  setCurrencyState(c);
                }}
                className={`px-4 py-1 rounded-full text-xs font-bold transition ${currency === c ? 'bg-slate-900 text-white' : 'bg-white/50 text-slate-900'}`}
              >
                {c === 'GS' ? 'Guaraníes' : 'USD'}
              </button>
            ))}
          </div>

          {/* Valor propiedad */}
          <label className="block text-xs uppercase opacity-70 mb-2 font-bold">
            {locale === 'es' ? 'Valor propiedad' : 'Property value'}
          </label>
          <input
            type="number"
            value={precio}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              setPrecio(isNaN(val) ? 0 : val);
            }}
            className="w-full bg-white/30 border border-black/10 rounded-xl px-4 py-3 text-lg font-bold focus:outline-none"
          />

          {/* Tasa */}
          <div className="mt-4">
            <label className="block text-xs uppercase opacity-70 mb-1 font-bold">
              {locale === 'es' ? 'Tasa anual' : 'Annual rate'}: {tasa.toFixed(1)}%
            </label>
            <input
              type="range" min={5} max={14} step={0.5} value={tasa}
              onChange={(e) => setTasa(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Duración contrato */}
          <div className="mt-4">
            <label className="block text-xs uppercase opacity-70 mb-2 font-bold">
              {locale === 'es' ? 'Duración del contrato' : 'Rental contract duration'}
            </label>
            <div className="flex gap-2">
              {[6, 12].map((m) => (
                <button
                  key={m}
                  onClick={() => setMesesContrato(m)}
                  className={`flex-1 py-2 rounded-xl text-sm font-bold transition ${mesesContrato === m ? 'bg-slate-900 text-white' : 'bg-white/50 text-slate-900'}`}
                >
                  {m} {locale === 'es' ? 'meses' : 'months'}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className="p-6 space-y-3">

          {/* Renting Fee */}
          <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-bold text-slate-500 uppercase">Renting Fee</p>
              <p className="text-lg font-bold text-slate-950">
                {fmt(rentingFee)}<span className="text-xs font-normal text-slate-400">/mes</span>
              </p>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              {locale === 'es'
                ? 'Cuota mensual equivalente al préstamo sin anticipo.'
                : 'Monthly fee equivalent to the loan payment with no down payment.'}
            </p>
          </div>

          {/* Total Rent Liquidity */}
          <div className="bg-slate-50 rounded-2xl border border-slate-100 p-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-bold text-slate-500 uppercase">Total Rent Liquidity</p>
              <p className="text-lg font-bold text-slate-950">{fmt(totalRentLiquidity)}</p>
            </div>
            <p className="text-[10px] text-slate-400 leading-relaxed">
              {locale === 'es'
                ? `Renting Fee x ${mesesContrato} meses. Este monto se descontará del precio final de compra.`
                : `Renting Fee x ${mesesContrato} months. This amount will be deducted from the final purchase price.`}
            </p>
          </div>

          {/* Precio final */}
          <div className="bg-slate-900 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs font-bold text-white/60 uppercase">
                {locale === 'es' ? 'Precio final de compra' : 'Final purchase price'}
              </p>
              <p className="text-lg font-bold text-white">{fmt(Math.max(precioFinal, 0))}</p>
            </div>
            <p className="text-[10px] text-white/40 leading-relaxed">
              {locale === 'es'
                ? 'Valor de la propiedad menos la liquidez acumulada durante el período de renta.'
                : 'Property value minus the liquidity accumulated during the rental period.'}
            </p>
          </div>

          {/* Nota legal */}
          <p className="text-[10px] text-slate-400 leading-relaxed px-1">
            {locale === 'es'
              ? 'El ingreso total de alquiler acumulado durante el período se descontará de la obligación de pago final del cliente. A través del financiamiento bancario facilitado por Lux, esta estructura permite al cliente mantener mayor liquidez mientras completa la compra.'
              : "The total rental income accumulated during the period will be deducted from the client's final payment obligation. Through bank financing facilitated by Lux, this structure allows the client to retain greater liquidity while completing the purchase."}
          </p>

          <a
            href={`https://wa.me/595981506175?text=${waMsg}`}
            target="_blank"
            rel="noreferrer"
            className="w-full bg-slate-900 text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 hover:bg-slate-800 transition"
          >
            <i className="ti ti-brand-whatsapp text-lg" />
            {locale === 'es' ? 'Contactar por WhatsApp' : 'Contact via WhatsApp'}
          </a>
        </div>
      </div>
    </div>
  );
}