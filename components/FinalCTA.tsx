'use client';
import { useState } from 'react';

const WHATSAPP = '595981506175';
const CALENDLY_URL = 'https://calendly.com/'; // reemplazár con el link de Paty

interface Props {
  locale: string;
}

export default function FinalCTA({ locale }: Props) {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = () => {
  if (!nombre || !telefono) return;
  const subject = encodeURIComponent(
    locale === 'es' ? 'Consulta desde el sitio web' : 'Inquiry from website'
  );
  const body = encodeURIComponent(
    `Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}${mensaje ? `\nMensaje: ${mensaje}` : ''}`
  );
  window.open(`mailto:luxdevelopmentpy@gmail.com?subject=${subject}&body=${body}`, '_blank');
  setEnviado(true);
};

  return (
    <section className="border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-28">

        {/* Encabezado */}
        <div className="max-w-2xl mb-16">
          <p className="text-xs font-bold tracking-widest text-sky-700 uppercase mb-4">
            {locale === 'es' ? 'Hablemos' : 'Let\'s talk'}
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-950 leading-tight mb-6">
            {locale === 'es'
              ? <>Tu próxima decisión inmobiliaria merece <span className="text-sky-700">claridad y confianza.</span></>
              : <>Your next real estate decision deserves <span className="text-sky-700">clarity and confidence.</span></>}
          </h2>
          <p className="text-slate-500 text-base md:text-lg font-light leading-relaxed">
            {locale === 'es'
              ? 'Ya sea que estés comprando tu primera propiedad, desarrollando un proyecto, reubicándote en Paraguay o explorando oportunidades de inversión, estamos aquí para ayudarte.'
              : "Whether you're buying your first property, developing a project, relocating to Paraguay, or exploring investment opportunities, we're here to help."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

          {/* Columna izquierda — Calendly + info */}
          <div className="flex flex-col gap-6">

            {/* Card Calendly */}
            <div className="bg-slate-950 rounded-2xl p-8 flex flex-col gap-4">
              <div className="flex items-center gap-3 mb-2">
                <i className="ti ti-calendar text-sky-400 text-2xl" aria-hidden="true" />
                <p className="text-white font-semibold text-lg">
                  {locale === 'es' ? 'Reserve una consulta con Patricia y descubra cómo la experiencia local de confianza puede ayudarle a invertir, comprar y desarrollar proyectos inmobiliarios en Paraguay con total seguridad' : 'Book a consultation with Patricia and discover how trusted local expertise can help you invest, buy, and develop real estate in Paraguay with confidence.'}
                </p>
              </div>
              <p className="text-slate-400 text-sm font-light leading-relaxed">
                {locale === 'es'
                  ? 'Elegí el horario que mejor te convenga y conversá directamente con Patricia.'
                  : 'Pick the time that works best for you and speak directly with Patricia.'}
              </p>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-2 flex items-center justify-center gap-2 w-full bg-sky-600 hover:bg-sky-500 text-white text-sm font-semibold py-3.5 rounded-xl transition"
              >
                <i className="ti ti-calendar-event text-base" aria-hidden="true" />
                {locale === 'es' ? 'Ver disponibilidad' : 'View availability'}
              </a>
              <p className="text-xs text-slate-500 text-center">
                {locale === 'es' ? 'Próximamente disponible' : 'Coming soon'} — Calendly
              </p>
            </div>

            {/* Info de contacto directo */}
            <div className="flex flex-col gap-3">
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 bg-white border border-slate-200 hover:border-slate-400 rounded-xl px-5 py-4 transition group"
              >
                <i className="ti ti-brand-whatsapp text-2xl text-green-600" aria-hidden="true" />
                <div>
                  <p className="text-xs text-slate-500 uppercase font-medium tracking-wider">WhatsApp</p>
                  <p className="text-sm font-semibold text-slate-950">+595981506175</p>
                </div>
                <i className="ti ti-arrow-right text-slate-300 group-hover:text-slate-600 ml-auto transition" aria-hidden="true" />
              </a>

              <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl px-5 py-4">
                <i className="ti ti-map-pin text-2xl text-sky-600" aria-hidden="true" />
                <div>
                  <p className="text-xs text-slate-500 uppercase font-medium tracking-wider">
                    {locale === 'es' ? 'Ubicación' : 'Location'}
                  </p>
                  <p className="text-sm font-semibold text-slate-950">Asunción, Paraguay · New York, USA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha — Formulario */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8">
            {!enviado ? (
              <>
                <p className="text-slate-950 font-semibold text-base mb-1">
                  {locale === 'es' ? 'Envianos un mensaje' : 'Send us a message'}
                </p>
                <p className="text-slate-400 text-sm font-light mb-6">
                  {locale === 'es'
                    ? 'Te respondemos a la brevedad por WhatsApp.'
                    : "We'll get back to you shortly via WhatsApp."}
                </p>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-500 uppercase font-medium">
                      {locale === 'es' ? 'Nombre completo' : 'Full name'} *
                    </label>
                    <input
                      type="text"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder={locale === 'es' ? 'Tu nombre' : 'Your name'}
                      className="border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-slate-400 transition"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-slate-500 uppercase font-medium">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu@email.com"
                        className="border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-slate-400 transition"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs text-slate-500 uppercase font-medium">
                        {locale === 'es' ? 'Teléfono' : 'Phone'} *
                      </label>
                      <input
                        type="tel"
                        value={telefono}
                        onChange={(e) => setTelefono(e.target.value)}
                        placeholder="+595 ..."
                        className="border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-slate-400 transition"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-slate-500 uppercase font-medium">
                      {locale === 'es' ? 'Mensaje (opcional)' : 'Message (optional)'}
                    </label>
                    <textarea
                      value={mensaje}
                      onChange={(e) => setMensaje(e.target.value)}
                      rows={3}
                      placeholder={locale === 'es' ? '¿En qué podemos ayudarte?' : 'How can we help you?'}
                      className="border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-slate-400 transition resize-none"
                    />
                  </div>

                  <button
  onClick={handleSubmit}
  disabled={!nombre || !telefono}
  className="flex items-center justify-center gap-2 w-full bg-slate-950 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-semibold py-3.5 rounded-xl transition mt-2"
>
  <i className="ti ti-mail text-base" aria-hidden="true" />
  {locale === 'es' ? 'Enviar mensaje' : 'Send message'}
</button>

                  <p className="text-xs text-slate-400 text-center">
                    * {locale === 'es' ? 'Campos requeridos' : 'Required fields'}
                  </p>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-12 gap-4 text-center">
                <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
                  <i className="ti ti-check text-green-600 text-2xl" aria-hidden="true" />
                </div>
                <p className="text-slate-950 font-semibold text-lg">
                  {locale === 'es' ? '¡Mensaje enviado!' : 'Message sent!'}
                </p>
                <p className="text-slate-400 text-sm font-light">
                  {locale === 'es'
                    ? 'Patricia se pondrá en contacto contigo a la brevedad.'
                    : 'Patricia will be in touch with you shortly.'}
                </p>
                <button
                  onClick={() => { setEnviado(false); setNombre(''); setEmail(''); setTelefono(''); setMensaje(''); }}
                  className="text-xs text-slate-400 hover:text-slate-600 underline transition mt-2"
                >
                  {locale === 'es' ? 'Enviar otro mensaje' : 'Send another message'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}