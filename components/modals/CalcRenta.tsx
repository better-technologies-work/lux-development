'use client';
import { useState } from 'react';

const TC = 7600;

export default function CalcRenta({ locale, onClose }: { locale: string; onClose: () => void }) {
  const [currency, setCurrencyState] = useState<'USD' | 'GS'>('USD');
  const [precio, setPrecio] = useState(200000);
  const [tasa, setTasa] = useState(8.5);
  const [mesesAlquiler, setMesesAlquiler] = useState(6);
  const [mostrarResultados, setMostrarResultados] = useState(false);

  const monto = precio;
  const n = 20 * 12;
  const r = tasa / 100 / 12;
  const cuota = r === 0 ? monto / n : (monto * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const alquilerMensual = cuota;
  const totalAlquilerPagado = alquilerMensual * mesesAlquiler;
  const deudaFinal = monto - totalAlquilerPagado;

  const fmt = (val: number) =>
    currency === 'GS'
      ? 'Gs. ' + Math.round(val).toLocaleString('es-PY')
      : 'US$ ' + Math.round(val).toLocaleString('en-US');

  const waMsg = encodeURIComponent(
    `Consulta renta: Propiedad ${fmt(precio)}, alquiler ${fmt(alquilerMensual)}/mes por ${mesesAlquiler} meses. Deuda final: ${fmt(deudaFinal)}.`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
        
       {/* Encabezado Silver */}
        <div className="bg-[#C0C0C0] p-6 text-slate-900 rounded-b-[2rem]">
          <div className="flex items-start justify-between mb-6">
            {/* Título, Imagen y Subtítulo */}
            <div className="flex items-center gap-4">
              <div>
                <h3 className="text-xl font-bold">{locale === 'es' ? 'Simulador de renta' : 'Rental simulator'}</h3>
                <p className="text-xs opacity-70 mt-1">{locale === 'es' ? 'Calculá en segundos' : 'Calculate in seconds'}</p>
              </div>
              <img 
                src="/calculadora.png" 
                alt="Logo" 
                className="w-12 h-12 object-contain" 
              />
            </div>
            
            {/* Cruz de Cierre */}
            <button 
              onClick={onClose} 
              className="text-3xl font-light hover:text-white transition"
            >
              ×
            </button>
          </div>
          
          <div className="flex gap-2 mb-6">
            {(['USD', 'GS'] as const).map((c) => (
              <button key={c} onClick={() => { setPrecio(c === 'GS' ? Math.round(precio * TC) : Math.round(precio / TC)); setCurrencyState(c); }}
                className={`px-4 py-1 rounded-full text-xs font-bold transition ${currency === c ? 'bg-slate-900 text-white' : 'bg-white/50 text-slate-900'}`}>
                {c === 'GS' ? 'Guaraníes' : 'USD'}
              </button>
            ))}
          </div>

          <label className="block text-xs uppercase opacity-70 mb-2 font-bold">{locale === 'es' ? 'Valor propiedad' : 'Property value'}</label>
          <input type="number" value={precio} onChange={(e) => setPrecio(parseFloat(e.target.value) || 0)}
            className="w-full bg-white/30 border border-black/10 rounded-xl px-4 py-3 text-lg font-bold focus:outline-none" />
          
          <button onClick={() => setMostrarResultados(true)}
            className="w-full mt-6 bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition">
            {locale === 'es' ? 'Calcular' : 'Calculate'} ⇅
          </button>
        </div>

        {/* Resultados Estilo Growie */}
        {mostrarResultados && (
          <div className="p-6 space-y-4">
            <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <span className="text-lg">⇅</span> {locale === 'es' ? 'Ganancias estimadas' : 'Estimated earnings'}
            </h4>
            
            <div className="space-y-3">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                <span className="text-xl text-slate-400">→</span>
                <div>
                  <p className="text-lg font-bold text-slate-900">{fmt(precio)}</p>
                  <p className="text-[10px] text-slate-500 uppercase">{locale === 'es' ? 'Inversión' : 'Investment'}</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                <span className="text-xl text-slate-400">+</span>
                <div>
                  <p className="text-lg font-bold text-slate-900">+{fmt(totalAlquilerPagado)}</p>
                  <p className="text-[10px] text-slate-500 uppercase">{locale === 'es' ? 'Rentabilidad total estimada' : 'Estimated total profitability'}</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                <span className="text-xl text-slate-900">→</span>
                <div>
                  <p className="text-lg font-bold text-slate-900">{fmt(Math.max(deudaFinal, 0))}</p>
                  <p className="text-[10px] text-slate-500 uppercase">{locale === 'es' ? 'Inversión + Rentabilidad' : 'Investment + Profitability'}</p>
                </div>
              </div>
            </div>

            <a href={`https://wa.me/595991358652?text=${waMsg}`} target="_blank" rel="noreferrer"
              className="w-full mt-4 bg-slate-900 text-white font-bold py-4 rounded-full flex items-center justify-center hover:bg-slate-800 transition">
              {locale === 'es' ? 'Contactar por WhatsApp' : 'Contact via WhatsApp'}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}