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

export default function CalcDesarrollo({
  locale,
  onClose,
}: {
  locale: string;
  onClose: () => void;
}) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [proyectoId, setProyectoId] = useState('');
  const [inversion, setInversion] = useState(0);
  const [precioOriginalPYG, setPrecioOriginalPYG] = useState<number | null>(null);
  const [currency, setCurrencyState] = useState<'USD' | 'GS'>('USD');
  const [retorno, setRetorno] = useState(32);
  const [meses, setMeses] = useState(24);
  const [condicion, setCondicion] = useState<'contado' | 'cuotas'>('contado');
  const [cuotas, setCuotas] = useState(12);

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
          setInversion(Math.round(rawPrice / TC));
        } else {
          setPrecioOriginalPYG(null);
          setInversion(rawPrice);
        }
        setCurrencyState('USD');
      }
      setLoading(false);
    }
    load();
  }, [locale]);

  const proyecto = projects.find((p) => p.id === proyectoId);

  const handleProyecto = (id: string) => {
    const p = projects.find((x) => x.id === id);
    if (!p) return;
    setProyectoId(id);
    const rawPrice = Number(p.price);
    if (p.currency === 'PYG') {
      setPrecioOriginalPYG(rawPrice);
      setInversion(currency === 'GS' ? rawPrice : Math.round(rawPrice / TC));
    } else {
      setPrecioOriginalPYG(null);
      setInversion(currency === 'GS' ? Math.round(rawPrice * TC) : rawPrice);
    }
  };

  const handleCurrency = (c: 'USD' | 'GS') => {
    if (c === currency) return;
    if (c === 'GS') {
      setInversion(precioOriginalPYG ?? Math.round(inversion * TC));
    } else {
      setInversion(precioOriginalPYG ? Math.round(precioOriginalPYG / TC) : Math.round(inversion / TC));
    }
    setCurrencyState(c);
  };

  const ganancia = inversion * (retorno / 100);
  const total = inversion + ganancia;
  const cuotaMensual = condicion === 'cuotas' ? inversion / cuotas : 0;

  const fmt = (val: number) =>
    currency === 'GS'
      ? 'Gs. ' + Math.round(val).toLocaleString('es-PY')
      : 'USD ' + Math.round(val).toLocaleString('en-US');

  const fmtInput = (val: number) =>
    currency === 'GS'
      ? Math.round(val).toLocaleString('es-PY')
      : Math.round(val).toLocaleString('en-US');

  const handleInversionChange = (raw: string) => {
    const clean = raw.replace(/\./g, '').replace(/,/g, '');
    setInversion(isNaN(parseFloat(clean)) ? 0 : parseFloat(clean));
  };

  const waMsg = encodeURIComponent(
    `Consulta desarrollo: Proyecto ${proyecto?.title ?? ''}, Inversión ${fmt(inversion)}, retorno estimado ${retorno}% en ${meses} meses. Total: ${fmt(total)}.`
  );

  if (loading || !proyecto) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
          <i className="ti ti-x text-xl" />
        </button>

        <h3 className="text-lg font-bold text-slate-950 mb-1">
          {locale === 'es' ? 'Simulador de desarrollo' : 'Development simulator'}
        </h3>
        <p className="text-sm text-slate-500 mb-5">
          {locale === 'es' ? 'Calculá el retorno de tu inversión' : 'Calculate your investment return'}
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
          <p className="text-xs text-slate-400 mt-1">{proyecto.location}</p>
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

        {/* Inversión */}
        <div className="mb-4">
          <label className="text-xs text-slate-500 uppercase font-medium">
            {locale === 'es'
              ? `Monto a invertir (${currency === 'GS' ? 'Gs.' : 'USD'})`
              : `Investment amount (${currency === 'GS' ? 'Gs.' : 'USD'})`}
          </label>
          <input
            type="text"
            value={fmtInput(inversion)}
            onChange={(e) => handleInversionChange(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm mt-1"
          />
        </div>

        {/* Retorno y Duración */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-500 uppercase font-medium">
              {locale === 'es' ? 'Retorno estimado' : 'Est. return'}: {retorno}%
            </label>
            <input
              type="range" min={10} max={100} value={retorno}
              onChange={(e) => setRetorno(Number(e.target.value))}
              className="mt-2"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-500 uppercase font-medium">
              {locale === 'es' ? 'Duración' : 'Duration'}: {meses} {locale === 'es' ? 'meses' : 'months'}
            </label>
            <input
              type="range" min={6} max={60} step={6} value={meses}
              onChange={(e) => setMeses(Number(e.target.value))}
              className="mt-2"
            />
          </div>
        </div>

        {/* Condición de pago */}
        <div className="mb-4">
          <label className="text-xs text-slate-500 uppercase font-medium">
            {locale === 'es' ? 'Condición de pago' : 'Payment condition'}
          </label>
          <select
            value={condicion}
            onChange={(e) => setCondicion(e.target.value as 'contado' | 'cuotas')}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm mt-1"
          >
            <option value="contado">{locale === 'es' ? 'Contado' : 'Upfront'}</option>
            <option value="cuotas">{locale === 'es' ? 'En cuotas' : 'Installments'}</option>
          </select>
        </div>

        {condicion === 'cuotas' && (
          <div className="mb-4">
            <label className="text-xs text-slate-500 uppercase font-medium">
              {locale === 'es' ? 'Cantidad de cuotas' : 'Number of installments'}: {cuotas}
            </label>
            <input
              type="range" min={3} max={36} step={3} value={cuotas}
              onChange={(e) => setCuotas(Number(e.target.value))}
              className="w-full mt-2"
            />
          </div>
        )}

        {/* Resultados */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { label: locale === 'es' ? 'Inversión' : 'Investment', value: fmt(inversion) },
            { label: locale === 'es' ? 'Ganancia' : 'Gain', value: fmt(ganancia) },
            { label: 'Total', value: fmt(total) },
          ].map((m) => (
            <div key={m.label} className="bg-slate-50 rounded-xl p-3 text-center">
              <p className="text-xs text-slate-500 uppercase mb-1">{m.label}</p>
              <p className="text-sm font-bold text-slate-950 break-all">{m.value}</p>
            </div>
          ))}
        </div>

        {condicion === 'cuotas' && (
          <div className="bg-slate-50 rounded-xl p-4 mb-4 text-center">
            <p className="text-xs text-slate-500 uppercase mb-1">
              {locale === 'es' ? 'Cuota mensual' : 'Monthly installment'}
            </p>
            <p className="text-xl font-bold text-slate-950">{fmt(cuotaMensual)}</p>
            <p className="text-xs text-slate-400 mt-1">
              {cuotas} {locale === 'es' ? 'cuotas' : 'installments'}
            </p>
          </div>
        )}

        {/* Barra de duración */}
        <div className="bg-slate-50 rounded-xl p-4 mb-5">
          <p className="text-xs text-slate-500 uppercase mb-2">
            {locale === 'es' ? 'Duración estimada' : 'Estimated duration'}
          </p>
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="bg-slate-900 h-full rounded-full"
                style={{ width: `${Math.min((meses / 60) * 100, 100)}%` }}
              />
            </div>
            <span className="text-sm font-bold text-slate-950">
              {meses} {locale === 'es' ? 'meses' : 'months'}
            </span>
          </div>
        </div>

        <div className="h-2 bg-slate-900 rounded-full mb-5" />

        
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