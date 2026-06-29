'use client'

const testimonials = [
  {
    quote_es: 'El proceso de venta de nuestra primera casa fue rápido y sin complicaciones, sin necesidad de agentes inmobiliarios. Todo fue transparente de principio a fin.',
    quote_en: 'Our first home sales process was quick and seamless without the need of any real estate agents. Everything was transparent from beginning to end.',
    name: 'Andrea Bohorquez Romero',
  },
  {
    quote_es: 'Fue una buena experiencia trabajar con Patricia en la construcción. Siempre era atenta a los detalles necesarios en la obra y siempre fue justa.',
    quote_en: 'It was a great experience working with Patricia on the construction. She was always attentive to the necessary details on site and was always fair.',
    name: 'Iván Duré',
  },
]

export default function Testimonials({ locale }: { locale: string }) {
  return (
    <section className="relative w-full py-16 px-4 overflow-hidden">

      {/* Fondo imagen ondas */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/fondo.1.jpeg')", opacity: 0.6 }}
      />
      {/* Capa blanca para suavizar */}
      <div className="absolute inset-0 bg-slate-50/60" />

      {/* Contenido */}
      <div className="relative max-w-4xl mx-auto">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2 text-center">
          {locale === 'es' ? 'Testimonios' : 'Testimonials'}
        </p>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 text-center mb-12">
          {locale === 'es' ? 'Lo que dicen nuestros clientes sobre nosotros' : 'What our clients say about us'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between gap-6"
            >
              <p className="text-slate-700 text-sm leading-relaxed">
                "{locale === 'es' ? t.quote_es : t.quote_en}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {t.name.charAt(0)}
                </div>
                <p className="text-sm font-semibold text-slate-900">{t.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}