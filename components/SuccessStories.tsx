'use client';

import Image from 'next/image';

interface Props {
  locale: string;
}

const stories = [
  {
    id: 1,
    location: 'Pompano Beach',
    name: 'The Ritz Carlton Residences',
    type: { en: 'Development', es: 'Desarrollo' },
    years: 2,
    annualReturn: '13%',
    totalReturn: '32%',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop',
  },
  {
    id: 2,
    location: 'North Miami Beach',
    name: 'Nexo Residences',
    type: { en: 'Development', es: 'Desarrollo' },
    years: 3,
    annualReturn: '16%',
    totalReturn: '64%',
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&h=300&fit=crop',
  },
  {
    id: 3,
    location: 'Asunción, Paraguay',
    name: 'Torre Landmark',
    type: { en: 'Development', es: 'Desarrollo' },
    years: 4,
    annualReturn: '18%',
    totalReturn: '72%',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
  },
];

export default function SuccessStories({ locale }: Props) {
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
                  alt={story.name}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-xs bg-slate-100 text-slate-700 font-semibold px-2 py-0.5 rounded w-fit">
                  {story.type[locale as 'en' | 'es']}
                </span>
                <p className="text-xs text-slate-500">{story.location}</p>
                <p className="text-sm font-bold text-slate-950">{story.name}</p>
                <p className="text-xs font-semibold text-sky-900">
                  {locale === 'es' ? 'Rentabilidad total est.:' : 'Est. total return:'} {story.totalReturn}
                </p>
              </div>
            </div>

            {/* Desktop layout */}
            <div className="hidden md:flex items-center gap-6 p-4">
              <div className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0">
                <Image
                  src={story.image}
                  alt={story.name}
                  fill
                  sizes="80px" 
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col min-w-[200px]">
                <p className="text-xs text-slate-500">{story.location}</p>
                <p className="text-sm font-bold text-slate-950">{story.name}</p>
              </div>

              <span className="text-xs bg-slate-100 text-slate-700 font-semibold px-3 py-1 rounded shrink-0">
                {story.type[locale as 'en' | 'es']}
              </span>

              <div className="flex items-center gap-8 ml-auto">
                <div className="text-center">
                  <p className="text-lg font-bold text-slate-950">{story.years} {locale === 'es' ? 'años' : 'years'}</p>
                  <p className="text-xs text-slate-500">{locale === 'es' ? 'plazo estimado' : 'est. term'}</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-slate-950">{story.annualReturn}</p>
                  <p className="text-xs text-slate-500">{locale === 'es' ? 'rentabilidad anual est.' : 'est. annual return'}</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-slate-950">{story.totalReturn}</p>
                  <p className="text-xs text-slate-500">{locale === 'es' ? 'rentabilidad total est.' : 'est. total return'}</p>
                </div>
                <i className="ti ti-chevron-right text-slate-400 text-xl" aria-hidden="true" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}