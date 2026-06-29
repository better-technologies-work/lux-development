'use client';
import { useEffect, useState } from 'react';
import { getProjects } from '@/lib/projectService';

const TC = 7600;

export default function CalcAdquisicion({
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

  // ✅ FÓRMULA DEL EXCEL INTEGRADA
  const montoAnticipo = precio * (anticipoPct / 100);
  const montoFinanciado = precio - montoAnticipo;
  const n = Number(plazo) * 12;
  const r = tasa / 100 / 12;
  const cuotaMensual = r === 0 ? montoFinanciado / n : (montoFinanciado * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  const waMsg = encodeURIComponent(
    `Consulta Adquisición: Proyecto ${proyecto?.title ?? ''}, Propiedad ${fmt(precio)}, Anticipo ${anticipoPct}%, Financiación ${fmt(montoFinanciado)}, Cuota mensual ${fmt(cuotaMensual)}.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="w-full max-w-md bg-white rounded-3xl overflow-y-auto max-h-[90vh] shadow-2xl relative p-6" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl">×</button>
        
        <h3 className="text-xl font-bold">
  {locale === 'es' ? 'Simulador de renta' : 'Rental simulator'}
</h3>
        
        <label className="block text-xs uppercase font-bold mb-1">
  {locale === 'es' ? 'PROYECTO' : 'PROJECT'}
</label>
        <select value={proyectoId} onChange={(e) => handleProyecto(e.target.value)} className="w-full bg-slate-100 border rounded-xl px-4 py-2 mb-4">
          {projects.map((p) => <option key={p.id} value={p.id}>{p.title}</option>)}
        </select>

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
        <input type="text" value={fmtInput(precio)} onChange={(e) => setPrecio(Number(e.target.value.replace(/[^0-9]/g, '')))} className="w-full bg-slate-100 border rounded-xl px-4 py-3 mb-4 font-bold" />

        <label className="block text-xs uppercase font-bold mb-1">ANTICIPO: {anticipoPct}%</label>
        <input type="range" min={0} max={50} step={5} value={anticipoPct} onChange={(e) => setAnticipoPct(Number(e.target.value))} className="w-full mb-4" />

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs uppercase font-bold mb-1">
              {locale === 'es' ? 'Plazo' : 'Term'}
            </label>
            <select value={plazo} onChange={(e) => setPlazo(Number(e.target.value))} className="w-full bg-slate-100 border rounded-xl px-3 py-2">
              <option value={15}>15 years</option>
              <option value={30}>30 years</option>
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase font-bold mb-1">RATE: {tasa.toFixed(1)}%</label>
            <input type="range" min={5} max={14} step={0.5} value={tasa} onChange={(e) => setTasa(Number(e.target.value))} className="w-full" />
          </div>
        </div>

        {/* ✅ AÑADIDO: Total Financing */}
        <div className="bg-slate-50 p-4 rounded-2xl border mb-3">
          <p className="text-xs font-bold uppercase opacity-60">
            {locale === 'es' ? 'Financiación total' : 'Total financing'}
          </p>
          <p className="text-lg font-bold">{fmt(montoFinanciado)}</p>
        </div>

        <div className="bg-slate-900 text-white p-4 rounded-2xl mb-4">
          <p className="text-xs font-bold uppercase opacity-60">
    {locale === 'es' ? 'CUOTA MENSUAL ESTIMADA' : 'ESTIMATED MONTHLY FEE'}
  </p>
          <p className="text-2xl font-bold">{fmt(cuotaMensual)}</p>
        </div>

        <a href={`https://wa.me/595981506175?text=${waMsg}`} target="_blank" rel="noreferrer" className="w-full bg-slate-900 text-white font-bold py-4 rounded-full flex items-center justify-center">
          {locale === 'es' ? 'Contactar por WhatsApp' : 'Contact via WhatsApp'}
        </a>
      </div>
    </div>
  );
}