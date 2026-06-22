'use client';

import Image from 'next/image';

interface Props {
  locale: string;
}

const stories = [
  {
    id: 1,
    location: 'Villa Elisa, Paraguay',
    name: { en: 'Residential Development', es: 'Desarrollo Residencial' },
    type: { en: 'Development', es: 'Desarrollo' },
    stat1: { value: { en: '4 months', es: '4 meses' }, label: { en: 'est. term', es: 'plazo estimado' } },
    stat2: { value: '45%', label: { en: 'ROI achieved', es: 'ROI logrado' } },
    stat3: { value: { en: 'Completed on time', es: 'Completado a tiempo' }, label: { en: 'full project delivery', es: 'entrega total del proyecto' } },
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    location: 'Long Island, New York',
    name: { en: 'Condominium Value-Add Investment', es: 'Inversión de Valor Agregado en Condominio' },
    type: { en: 'Residential Real Estate', es: 'Inmobiliario Residencial' },
    stat1: { value: { en: '10 weeks', es: '10 semanas' }, label: { en: 'total project duration', es: 'duración total del proyecto' } },
    stat2: { value: '30%', label: { en: 'return on investment', es: 'retorno de inversión' } },
    stat3: { value: { en: 'Executed during a market downturn', es: 'Ejecutado durante una caída del mercado' }, label: { en: 'while comparable properties were declining in value', es: 'mientras propiedades comparables perdían valor' } },
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=300&fit=crop',
  },
  {
    id: 3,
    location: 'New York, USA',
    name: { en: '2008 Housing Crisis – Short Sale Negotiations', es: 'Crisis Inmobiliaria 2008 – Negociaciones de Venta Corta' },
    type: { en: 'Mortgage Resolution', es: 'Resolución Hipotecaria' },
    stat1: { value: { en: 'Dozens of families assisted', es: 'Docenas de familias asistidas' }, label: { en: 'successful debt negotiations', es: 'negociaciones de deuda exitosas' } },
    stat2: { value: { en: 'Foreclosures avoided', es: 'Ejecuciones evitadas' }, label: { en: 'through bank-approved short sales', es: 'mediante ventas cortas aprobadas por bancos' } },
    stat3: null,
    description: {
      en: 'During the 2008 financial crisis when declining home values left many homeowners owing more than their properties were worth, Patricia negotiated directly with lenders to help families settle mortgage debt and avoid bankruptcy.',
      es: 'Durante la crisis financiera de 2008, cuando la caída del valor de las propiedades dejó a muchos propietarios debiendo más de lo que valían sus casas, Patricia negoció directamente con los prestamistas para ayudar a las familias a saldar su deuda hipotecaria y evitar la quiebra.',
    },
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
  },
];

export default function SuccessStories({ locale }: Props) {
  const l = locale as 'en' | 'es';

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20 border-t border-slate-200">
      <h2 className="text-2xl md:text-4xl font-extrabold text-slate-950 tracking-tight mb-10">
        {locale === 'es' ? 'Casos de éxito:' : 'Success Stories:'}
      </h2>

      <div className="flex flex-col gap-4">
        {stories.map((story) => (
          <div
            key={story.id}
            className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-slate-400 transition cursor-pointer"
          >
            {/* Mobile layout */}
            <div className="flex md:hidden items-start gap-4 p-4">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
                <Image
                  src={story.image}
                  alt={typeof story.name === 'string' ? story.name : story.name[l]}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded w-fit">
                  {story.type[l]}
                </span>
                <p className="text-xs text-slate-500">{story.location}</p>
                <p className="text-sm font-bold text-slate-950">
                  {typeof story.name === 'string' ? story.name : story.name[l]}
                </p>
                <p className="text-xs font-semibold text-sky-900">
                  {story.stat2.value && typeof story.stat2.value === 'string'
                    ? story.stat2.value
                    : (story.stat2.value as Record<string, string>)[l]}{' '}
                  {story.stat2.label[l]}
                </p>
                {story.description && (
                  <p className="text-xs text-slate-500 mt-1">{story.description[l]}</p>
                )}
              </div>
            </div>

            {/* Desktop layout */}
            <div className="hidden md:flex items-center gap-6 p-4">
              <div className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0">
                <Image
                  src={story.image}
                  alt={typeof story.name === 'string' ? story.name : story.name[l]}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col min-w-[220px]">
                <p className="text-xs text-slate-500">{story.location}</p>
                <p className="text-sm font-bold text-slate-950">
                  {typeof story.name === 'string' ? story.name : story.name[l]}
                </p>
                {story.description && (
                  <p className="text-xs text-slate-400 mt-1 max-w-xs leading-relaxed">
                    {story.description[l]}
                  </p>
                )}
              </div>

              <span className="text-xs bg-slate-100 text-slate-700 font-semibold px-3 py-1 rounded shrink-0">
                {story.type[l]}
              </span>

              <div className="flex items-center gap-8 ml-auto">
                {/* Stat 1 */}
                <div className="text-center">
                  <p className="text-base font-bold text-slate-950">
                    {typeof story.stat1.value === 'string'
                      ? story.stat1.value
                      : story.stat1.value[l]}
                  </p>
                  <p className="text-xs text-slate-500">{story.stat1.label[l]}</p>
                </div>

                {/* Stat 2 */}
                <div className="text-center">
                  <p className="text-base font-bold text-slate-950">
                    {typeof story.stat2.value === 'string'
                      ? story.stat2.value
                      : (story.stat2.value as Record<string, string>)[l]}
                  </p>
                  <p className="text-xs text-slate-500">{story.stat2.label[l]}</p>
                </div>

                {/* Stat 3 (opcional) */}
                {story.stat3 && (
                  <div className="text-center max-w-[160px]">
                    <p className="text-base font-bold text-slate-950">
                      {typeof story.stat3.value === 'string'
                        ? story.stat3.value
                        : story.stat3.value[l]}
                    </p>
                    <p className="text-xs text-slate-500">{story.stat3.label[l]}</p>
                  </div>
                )}

                <i className="ti ti-chevron-right text-slate-400 text-xl" aria-hidden="true" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}