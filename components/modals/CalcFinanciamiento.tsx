'use client';
import { useState, useEffect } from 'react';
import { getProjects } from '@/lib/projectService';

const TC = 7600;

export default function CalcFinanciamiento({
  locale,
  onClose,
}: {
  locale: string;
  onClose: () => void;
}) {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [proyectoId, setProyectoId] = useState<string>('');
  const [nombre, setNombre] = useState('');
  const [monto, setMonto] = useState(0);
  const [precioOriginalPYG, setPrecioOriginalPYG] = useState<number | null>(null);
  const [currency, setCurrencyState] = useState<'USD' | 'GS'>('USD');
  const [ingresos, setIngresos] = useState('');
  const [plazo, setPlazo] = useState('15');

  useEffect(() => {
    async function load() {
      const data = await getProjects(locale);
      const formatted = (data ?? []).map((p: any) => ({
        id: p.id,
        name: p.title,
        location: p.location,
        price: Number(p.price) || 0,
        currency: p.currency ?? 'USD',
      }));
      setProjects(formatted);
      if (formatted.length > 0) {
        const first = formatted[0];
        setProyectoId(first.id);
        const rawPrice = Number(first.price);
        if (first.currency === 'PYG') {
          setPrecioOriginalPYG(rawPrice);
          setMonto(Math.round(rawPrice / TC));
        } else {
          setPrecioOriginalPYG(null);
          setMonto(rawPrice);
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
      setMonto(currency === 'GS' ? rawPrice : Math.round(rawPrice / TC));
    } else {
      setPrecioOriginalPYG(null);
      setMonto(currency === 'GS' ? Math.round(rawPrice * TC) : rawPrice);
    }
  };

  const handleCurrency = (c: 'USD' | 'GS') => {
    if (c === currency) return;
    if (c === 'GS') {
      setMonto(precioOriginalPYG ?? Math.round(monto * TC));
    } else {
      setMonto(precioOriginalPYG ? Math.round(precioOriginalPYG / TC) : Math.round(monto / TC));
    }
    setCurrencyState(c);
  };

  const fmtInput = (val: number) =>
    currency === 'GS'
      ? Math.round(val).toLocaleString('es-PY')
      : Math.round(val).toLocaleString('en-US');

  const handleMontoChange = (raw: string) => {
    const clean = raw.replace(/\./g, '').replace(/,/g, '');
    setMonto(isNaN(parseFloat(clean)) ? 0 : parseFloat(clean));
  };

  const waMsg = encodeURIComponent(
    `Consulta financiamiento:\nProyecto: ${proyecto?.name ?? ''}\nNombre: ${nombre}\nMonto solicitado: ${currency === 'GS' ? 'Gs.' : 'USD'} ${fmtInput(monto)}\nIngresos mensuales: USD ${ingresos}\nPlazo deseado: ${plazo} años`
  );

  const requisitos = [
    { icon: 'ti-file-dollar', label: locale === 'es' ? 'Comprobante de ingresos: 2 años' : 'Proof of income: 2 years' },
    { icon: 'ti-user', label: locale === 'es' ? 'Edad: 25+ años' : 'Age: 25+ years' },
    { icon: 'ti-circle-check', label: locale === 'es' ? 'Sin deudas' : 'No debt' },
  ];

  if (loading || !proyecto) return null;

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
          {locale === 'es' ? 'Financiamiento & Estructuración' : 'Financing & Structuring'}
        </h3>
        <p className="text-sm text-slate-500 mb-5">
          {locale === 'es' ? 'Requisitos y consulta personalizada' : 'Requirements and personalized consultation'}
        </p>

        {/* Proyecto */}
        <div className="mb-5">
          <label className="text-xs text-slate-500 uppercase font-medium">
            {locale === 'es' ? 'Proyecto' : 'Project'}
          </label>
          <select
            value={proyectoId}
            onChange={(e) => handleProyecto(e.target.value)}
            className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm mt-1"
          >
            {projects.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
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
            <label className="text-xs text-slate-500 uppercase font-medium">
              {locale === 'es' ? 'Nombre completo' : 'Full name'}
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-500 uppercase font-medium">
                {locale === 'es' ? `Monto (${currency === 'GS' ? 'Gs.' : 'USD'})` : `Amount (${currency === 'GS' ? 'Gs.' : 'USD'})`}
              </label>
              <input
                type="text"
                value={fmtInput(monto)}
                onChange={(e) => handleMontoChange(e.target.value)}
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-slate-500 uppercase font-medium">
                {locale === 'es' ? 'Ingresos/mes (USD)' : 'Income/month (USD)'}
              </label>
              <input
                type="text"
                value={ingresos}
                onChange={(e) => setIngresos(e.target.value)}
                className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-slate-500 uppercase font-medium">
              {locale === 'es' ? 'Plazo deseado' : 'Desired term'}
            </label>
            <select
              value={plazo}
              onChange={(e) => setPlazo(e.target.value)}
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm"
            >
              <option value="5">5 {locale === 'es' ? 'años' : 'years'}</option>
              <option value="10">10 {locale === 'es' ? 'años' : 'years'}</option>
              <option value="15">15 {locale === 'es' ? 'años' : 'years'}</option>
              <option value="20">20 {locale === 'es' ? 'años' : 'years'}</option>
              <option value="30">30 {locale === 'es' ? 'años' : 'years'}</option>
            </select>
          </div>
        </div>

        {/* WhatsApp */}
        
          <a href={`https://wa.me/595981506175?text=${waMsg}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold py-3 rounded-xl transition"
        >
          <i className="ti ti-brand-whatsapp text-lg" />
          {locale === 'es' ? 'Enviar consulta por WhatsApp' : 'Send inquiry via WhatsApp'}
        </a>
      </div>
    </div>
  );
}