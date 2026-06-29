'use client';
import { useEffect, useState } from 'react';
import { getProjects } from '@/lib/projectService';

const TC = 7600;

export default function CalcRenta({
  locale,
  onClose,
}: {
  locale: string;
  onClose: () => void;
}) {
  const [projects, setProjects] = useState<any[]>([]);
  const [proyectoId, setProyectoId] = useState<string>('');
  const [precio, setPrecio] = useState<number>(0);
  const [precioOriginalPYG, setPrecioOriginalPYG] = useState<number | null>(null);
  const [currency, setCurrencyState] = useState<'USD' | 'GS'>('USD');
  const [tasa, setTasa] = useState(8.5);
  const [plazo, setPlazo] = useState(30);
  const [mesesContrato, setMesesContrato] = useState(6);
  const [anticipoPct, setAnticipoPct] = useState(10);

  useEffect(() => {
    async function load() {
      const data = await getProjects(locale);
      setProjects(data);
      if (data?.length > 0) {
        const first = data[0];
        setProyectoId(first.id);
        const rawPrice = Number(first.price ?? 0);
        if (first.currency === 'PYG') {
          setPrecioOriginalPYG(rawPrice);
          setPrecio(Math.round(rawPrice / TC));
        } else {
          setPrecioOriginalPYG(null);
          setPrecio(rawPrice);
        }
      }
    }
    load();
  }, [locale]);

  const proyecto = projects.find((p) => p.id === proyectoId);

  const handleProyecto = (id: string) => {
    const p = projects.find((x) => x.id === id);
    if (!p) return;
    setProyectoId(id);
    const rawPrice = Number(p.price ?? 0);
    if (p.currency === 'PYG') {
      setPrecioOriginalPYG(rawPrice);
      setPrecio(currency === 'GS' ? rawPrice : Math.round(rawPrice / TC));
    } else {
      setPrecioOriginalPYG(null);
      setPrecio(currency === 'GS' ? Math.round(rawPrice * TC) : rawPrice);
    }
  };

  const handleCurrency = (c: 'USD' | 'GS') => {
    if (c === currency) return;
    if (c === 'GS') {
      setPrecio(precioOriginalPYG ?? Math.round(precio * TC));
    } else {
      setPrecio(precioOriginalPYG ? Math.round(precioOriginalPYG / TC) : Math.round(precio / TC));
    }
    setCurrencyState(c);
  };

  const fmt = (val: number) =>
    currency === 'GS'
      ? 'Gs. ' + Math.round(val).toLocaleString('es-PY')
      : 'US$ ' + Math.round(val).toLocaleString('en-US');

  const fmtInput = (val: number) =>
    currency === 'GS'
      ? Math.round(val).toLocaleString('es-PY')
      : Math.round(val).toLocaleString('en-US');

  const handlePrecioChange = (raw: string) => {
    const clean = raw.replace(/\./g, '').replace(/,/g, '');
    setPrecio(isNaN(parseFloat(clean)) ? 0 : parseFloat(clean));
  };

  const montoAnticipo = precio * (anticipoPct / 100);
  const montoFinanciado = precio - montoAnticipo;
  const n = Number(plazo) * 12;
  const intereses = montoFinanciado * (tasa / 100);
  const totalFinanciado = montoFinanciado + intereses;
  const rentingFee = totalFinanciado / n;
  const totalRentLiquidity = rentingFee * mesesContrato;
  const precioFinal = precio - totalRentLiquidity;

  const waMsg = encodeURIComponent(
    `Consulta Sooner Program: Proyecto ${proyecto?.title ?? ''}, Propiedad ${fmt(precio)}, Anticipo ${anticipoPct}%, Financiación ${fmt(montoFinanciado)}, Renting Fee ${fmt(rentingFee)}/mes por ${mesesContrato} meses. Precio final: ${fmt(Math.max(precioFinal, 0))}.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="w-full max-w-md bg-white rounded-3xl overflow-y-auto max-h-[90vh] shadow-2xl relative p-6" onClick={(e) => e.stopPropagation()}>

        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-900 text-xl"
        >
          ✕
        </button>
        <h3 className="text-xl font-bold mb-2">
          {locale === 'es' ? 'Simulador de renta' : 'Rental simulator'}
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          {locale === 'es' ? 'Gestión de activos y soporte de inversión' : 'Asset Management & Investment Support'}
        </p>
        <p className="text-xs text-slate-400 mb-6 border-l-2 border-slate-900 pl-3">
          {locale === 'es'
            ? 'Rompé el ciclo del alquiler y accedé a la propiedad de tu vivienda más rápidamente mediante soluciones de financiamiento personalizadas y el acompañamiento integral de Lux.'
            : 'End the rental cycle and achieve homeownership faster through personalized financing solutions and end-to-end guidance from Lux.'}
        </p>

        <label className="block text-xs uppercase font-bold mb-1">
          {locale === 'es' ? 'PROYECTO' : 'PROJECT'}
        </label>
        <select value={proyectoId} onChange={(e) => handleProyecto(e.target.value)} className="w-full bg-slate-100 border rounded-xl px-4 py-2 mb-4">
          {projects.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
        </select>
        <p className="text-xs text-slate-400 mb-4">{proyecto?.location}</p>

        <div className="flex gap-2 mb-4">
          {(['USD', 'GS'] as const).map((c) => (
            <button key={c} onClick={() => handleCurrency(c)} className={`px-6 py-1 rounded-full text-xs font-bold ${currency === c ? 'bg-slate-900 text-white' : 'bg-slate-200'}`}>
              {c === 'GS' ? 'Guaraníes' : 'USD'}
            </button>
          ))}
        </div>

        <label className="block text-xs uppercase font-bold mb-1">
          {locale === 'es' ? 'VALOR PROPIEDAD' : 'PROPERTY VALUE'}
        </label>
        <input type="text" value={fmtInput(precio)} onChange={(e) => handlePrecioChange(e.target.value)} className="w-full bg-slate-100 border rounded-xl px-4 py-3 text-lg font-bold mb-4" />

        <label className="block text-xs uppercase font-bold mb-1">
          {locale === 'es' ? `ANTICIPO: ${anticipoPct}%` : `DOWN PAYMENT: ${anticipoPct}%`}
        </label>
        <input type="range" min={0} max={30} step={5} value={anticipoPct} onChange={(e) => setAnticipoPct(Number(e.target.value))} className="w-full mb-4" />

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs uppercase font-bold mb-1">
              {locale === 'es' ? 'PLAZO' : 'TERM'}
            </label>
            <select value={plazo} onChange={(e) => setPlazo(Number(e.target.value))} className="w-full bg-slate-100 border rounded-xl px-3 py-2">
              <option value={15}>{locale === 'es' ? '15 años' : '15 years'}</option>
              <option value={30}>{locale === 'es' ? '30 años' : '30 years'}</option>
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase font-bold mb-1">
              {locale === 'es' ? `TASA ANUAL: ${tasa.toFixed(1)}%` : `ANNUAL RATE: ${tasa.toFixed(1)}%`}
            </label>
            <input type="range" min={5} max={14} step={0.5} value={tasa} onChange={(e) => setTasa(Number(e.target.value))} className="w-full" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-slate-50 p-4 rounded-2xl border">
            <div className="flex justify-between items-center">
              <p className="text-xs font-bold uppercase">
                {locale === 'es' ? 'CUOTA DE RENTA' : 'RENTING FEE'}
              </p>
              <span className="text-xs text-slate-400">{locale === 'es' ? '/mes' : '/month'}</span>            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              {locale === 'es'
                ? 'Cuota mensual equivalente al pago del préstamo sin anticipo.'
                : 'Monthly fee equivalent to the loan payment with no down payment.'}
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border">
            <div className="flex justify-between items-center">
              <p className="text-xs font-bold uppercase">
                {locale === 'es' ? 'LIQUIDEZ TOTAL DE RENTA' : 'TOTAL RENT LIQUIDITY'}
              </p>
              <p className="text-lg font-bold">{fmt(totalRentLiquidity)}</p>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              {locale === 'es'
                ? `Cuota de renta x ${mesesContrato} meses. Este monto se descontará del precio final.`
                : `Renting Fee x ${mesesContrato} months. This amount will be deducted from the final purchase price.`}
            </p>
          </div>

          <div className="bg-slate-900 p-4 rounded-2xl text-white">
            <div className="flex justify-between items-center">
              <p className="text-xs font-bold uppercase">
                {locale === 'es' ? 'PRECIO FINAL DE COMPRA' : 'FINAL PURCHASE PRICE'}
              </p>
              <p className="text-lg font-bold">{fmt(Math.max(precioFinal, 0))}</p>
            </div>
            <p className="text-[10px] text-white/50 mt-1">
              {locale === 'es'
                ? 'El total acumulado durante el período de renta se descontará de la obligación de pago final del cliente. A través del financiamiento bancario facilitado por Lux, esta estructura permite al cliente mantener mayor liquidez mientras completa la compra.'
                : "The total rental income accumulated during the period will be deducted from the client's final payment obligation. Through bank financing facilitated by Lux, this structure allows the client to retain greater liquidity while completing the purchase."}
            </p>
          </div>

          <a href={`https://wa.me/595981506175?text=${waMsg}`} target="_blank" rel="noreferrer" className="w-full bg-slate-900 text-white font-bold py-4 rounded-full flex items-center justify-center gap-2">
            {locale === 'es' ? 'Contactar por WhatsApp' : 'Contact via WhatsApp'}
          </a>
        </div>
      </div>
    </div>
  );
}