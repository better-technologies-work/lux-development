'use client';
import { useState, useEffect } from 'react';
import { getProjects } from '@/lib/projectService';

const TC = 7600;

type Project = {
  id: string;
  title: string;
  location: string;
  price: number;
  currency: 'USD' | 'PYG';
};

export default function CalcAdquisicion({
  locale,
  onClose,
}: {
  locale: string;
  onClose: () => void;
}) {
  const [currency, setCurrencyState] = useState<'USD' | 'GS'>('USD');
  const [projects, setProjects] = useState<Project[]>([]);
  const [proyectoId, setProyectoId] = useState<string>('');
  const [precio, setPrecio] = useState<number>(0);
  const [precioOriginalPYG, setPrecioOriginalPYG] = useState<number | null>(null);
  const [anticipo, setAnticipo] = useState(10);
  const [plazo, setPlazo] = useState(15);
  const [tasa, setTasa] = useState(8.5);
  const [loading, setLoading] = useState(true);

  const proyecto = projects.find((p) => p.id === proyectoId);
  const montoAnticipo = precio * (anticipo / 100);
  const monto = precio - montoAnticipo;
  const n = plazo * 12;
  const r = tasa / 100 / 12;
  const cuota = r === 0 ? monto / n : (monto * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

  const fmt = (val: number) =>
    currency === 'GS'
      ? 'Gs. ' + Math.round(val).toLocaleString('es-PY')
      : 'USD ' + Math.round(val).toLocaleString('en-US');

  const fmtInput = (val: number) =>
    currency === 'GS'
      ? Math.round(val).toLocaleString('es-PY')
      : Math.round(val).toLocaleString('en-US');

  const handlePrecioChange = (raw: string) => {
    const clean = raw.replace(/\./g, '').replace(/,/g, '');
    setPrecio(isNaN(parseFloat(clean)) ? 0 : parseFloat(clean));
  };

  useEffect(() => {
    async function load() {
      const data = await getProjects(locale);
      const mapped = (data ?? []).map((p: any) => ({
        id: p.id,
        title: p.title,
        location: p.location,
        price: Number(p.price) || 0,
        currency: p.currency ?? 'USD',
      }));
      setProjects(mapped);
      if (mapped.length > 0) {
        const first = mapped[0];
        setProyectoId(first.id);
        const rawPrice = Number(first.price);
        if (first.currency === 'PYG') {
          setPrecioOriginalPYG(rawPrice);
          setPrecio(Math.round(rawPrice / TC));
        } else {
          setPrecioOriginalPYG(null);
          setPrecio(rawPrice);
        }
        setCurrencyState('USD');
      }
      setLoading(false);
    }
    load();
  }, [locale]);

  const handleCurrency = (c: 'USD' | 'GS') => {
    if (c === currency) return;
    if (c === 'GS') {
      setPrecio(precioOriginalPYG ?? Math.round(precio * TC));
    } else {
      setPrecio(precioOriginalPYG ? Math.round(precioOriginalPYG / TC) : Math.round(precio / TC));
    }
    setCurrencyState(c);
  };

  const handleProyecto = (id: string) => {
    const p = projects.find((x) => x.id === id);
    if (!p) return;
    setProyectoId(id);
    const rawPrice = Number(p.price);
    if (p.currency === 'PYG') {
      setPrecioOriginalPYG(rawPrice);
      setPrecio(currency === 'GS' ? rawPrice : Math.round(rawPrice / TC));
    } else {
      setPrecioOriginalPYG(null);
      setPrecio(currency === 'GS' ? Math.round(rawPrice * TC) : rawPrice);
    }
  };

  const waMsg = encodeURIComponent(
    `Consulta adquisición: Proyecto ${proyecto?.title ?? ''}, Precio ${fmt(precio)}, Anticipo ${anticipo}%, Financiación ${fmt(monto)}, Cuota mensual ${fmt(cuota)}.`
  );

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50">
        <div className="text-white text-sm">{locale === 'es' ? 'Cargando...' : 'Loading...'}</div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
          <i className="ti ti-x text-xl" />
        </button>

        <h3 className="text-lg font-bold text-slate-950 mb-1">
          {locale === 'es' ? 'Simulador de adquisición' : 'Acquisition simulator'}
        </h3>
        <p className="text-sm text-slate-500 mb-5">
          {locale === 'es' ? 'Estimá tu cuota mensual' : 'Estimate your monthly payment'}
        </p>

        {/* Proyecto */}
        <div className="mb-4">
          <label className="text-xs text-slate-500 uppercase font-medium">
            {locale === 'es' ? 'Proyecto' : 'Project'}
          </label>
          <select
            value={proyectoId}
            onChange={(e) => handleProyecto(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm mt-1"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
          <p className="text-xs text-slate-400 mt-1">{proyecto?.location}</p>
        </div>

        {/* Moneda */}
        <div className="flex gap-2 mb-5">
          {(['USD', 'GS'] as const).map((c) => (
            <button
              key={c}
              onClick={() => handleCurrency(c)}
              className={`px-5 py-1.5 rounded-full text-sm border transition ${
                currency === c
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-white text-slate-600 border-slate-300'
              }`}
            >
              {c === 'GS' ? 'Guaraníes' : 'USD'}
            </button>
          ))}
        </div>

        {/* Precio */}
        <div className="mb-4">
          <label className="text-xs text-slate-500 uppercase font-medium">
            {locale === 'es' ? 'Valor propiedad' : 'Property value'}
          </label>
          <input
            type="text"
            value={fmtInput(precio)}
            onChange={(e) => handlePrecioChange(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm mt-1"
          />
        </div>

        {/* Down Payment */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <label className="text-xs text-slate-500 uppercase font-medium">
              {locale === 'es' ? 'Anticipo (Down Payment)' : 'Down Payment'}
            </label>
            <span className="text-sm font-bold text-slate-950">
              {anticipo}% — {fmt(montoAnticipo)}
            </span>
          </div>
          <input
            type="range" min={0} max={30} step={5} value={anticipo}
            onChange={(e) => setAnticipo(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Plazo y Tasa */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-xs text-slate-500 uppercase">
              {locale === 'es' ? 'Plazo' : 'Term'}
            </label>
            <select
              value={plazo}
              onChange={(e) => setPlazo(Number(e.target.value))}
              className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value={15}>15 {locale === 'es' ? 'años' : 'years'}</option>
              <option value={30}>30 {locale === 'es' ? 'años' : 'years'}</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-slate-500 uppercase">
              {locale === 'es' ? 'Tasa anual' : 'Annual rate'}: {tasa.toFixed(1)}%
            </label>
            <input
              type="range" min={5} max={14} step={0.5} value={tasa}
              onChange={(e) => setTasa(Number(e.target.value))}
              className="w-full mt-2"
            />
          </div>
        </div>

        {/* Resultados */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-slate-50 rounded-xl p-3 text-center">
            <p className="text-xs text-slate-500 uppercase">
              {locale === 'es' ? 'Financiación total' : 'Total Financing'}
            </p>
            <p className="text-sm font-bold">{fmt(monto)}</p>
          </div>
          <div className="bg-slate-50 rounded-xl p-3 text-center">
            <p className="text-xs text-slate-500 uppercase">
              {locale === 'es' ? 'Cuota mensual' : 'Monthly Payment'}
            </p>
            <p className="text-sm font-bold">{fmt(cuota)}</p>
          </div>
        </div>

        {/* WhatsApp */}
        
          <a href={`https://wa.me/595981506175?text=${waMsg}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold py-3 rounded-xl transition"
        >
          <i className="ti ti-brand-whatsapp text-lg" />
          {locale === 'es' ? 'Consultar por WhatsApp' : 'Contact via WhatsApp'}
        </a>
      </div>
    </div>
  );
}