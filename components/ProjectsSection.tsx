'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Props {
  locale: string;
  cardDetails: string;
}

type Project = {
  id: string;
  status: 'available' | 'coming-soon';
  images: string[];
  location: { en: string; es: string };
  title: { en: string; es: string };
  price: string;
  bedrooms?: string;
  bathrooms?: string;
  area?: string;
  type: { en: string; es: string };
  description?: { en: string; es: string };
  highlights?: { en: string[]; es: string[] };
  amenities?: { en: string[]; es: string[] };
  finance?: { en: string; es: string };
  monthlyPayment?: string;
  externalUrl?: string;
};

const PROJECTS: Project[] = [
  {
    id: 'duplex-villa-elisa',
    status: 'available',
    images: ['/casa1.png', '/casa2.png', '/casa3.png', '/casa4.png', '/casa5.png', '/casa6.png', '/casa9.png'],
    location: { en: 'Villa Elisa, Central', es: 'Villa Elisa, Central' },
    title: {
      en: 'Duplex Moderno (American Details) In Villa Elisa',
      es: 'Duplex Moderno (Detalles Estadounidense) En Villa Elisa',
    },
    price: 'Gs. 600,000,000',
    bedrooms: '3',
    bathrooms: '3',
    area: '130 m²',
    type: { en: 'Residential', es: 'Residencial' },
    description: {
      en: 'Luxury Duplex for Sale – Villa Elisa (bordering Asunción). Located in one of the most strategic and growing areas of Villa Elisa, 5 minutes from Avda. Von Poleski and Americo Pico, 5 minutes from the municipality, 4 minutes from Luisito Supermarket. Ideal for living with comfort, style and security.',
      es: 'Lujoso Dúplex en Venta – Villa Elisa (límite con Asunción). Ubicado en una de las zonas más estratégicas y en crecimiento de Villa Elisa, a 5 minutos de Avda. Von Poleski y Americo Pico, a 5 minutos de la municipalidad, a 4 minutos del Supermercado Luisito. Ideal para vivir con comodidad, estilo y seguridad.',
    },
    highlights: {
      en: [
        'Land of 180 m² | Built area: 130 m²',
        'Garage for 3 large vehicles',
        'Spacious living room with social bathroom',
        'Designs with American details - unique to this duplex',
        'Electric gate for convenience',
        'Dining room integrated with modern kitchen with AC included',
        'Ground floor: Garage for 3 vehicles • Spacious living room • Dining and integrated kitchen with AC and excellent natural lighting',
        'Upper floor: 3 bedrooms (1 en suite with private bathroom), all with terraces • Family bathroom',
      ],
      es: [
        'Terreno de 180 m² | Superficie construida: 130 m²',
        'Cochera para 3 vehículos grandes',
        'Amplia sala con baño social',
        'Diseños con detalles estadounidenses - único en este duplex',
        'Portón eléctrico para su conveniencia',
        'Comedor integrado a cocina moderna con aire acondicionado incluido',
        'Planta baja: Cochera para 3 vehículos • Amplia sala • Comedor y cocina integrados con AC e iluminación natural',
        'Planta alta: 3 dormitorios (1 en suite con baño privado), todos con terraza • Baño familiar',
      ],
    },
    amenities: {
      en: ['Box / Storage', 'BBQ / Grill', 'Balcony / Terrace', 'Central Hot Water', 'Air Conditioning', 'Garden / Patio'],
      es: ['Box / Depósito', 'Parrillero / Barbacoa', 'Balcón / Terraza', 'Agua Caliente Central', 'Aire Acondicionado', 'Jardín / Patio'],
    },
    finance: { en: 'AFD - My First Home - 27 years', es: 'AFD - Mi Primera Vivienda - 27 años' },
    monthlyPayment: 'Gs. 5,625,168',
    externalUrl: 'https://www.infocasas.com.py/duplex-moderno-detalles-estadounidense-en-villa-elisa/193595624',
  },
  {
    id: 'aura-penthouse',
    status: 'available',
    images: [],
    location: { en: 'Monaco', es: 'Monaco' },
    title: { en: 'Aura Penthouse', es: 'Aura Penthouse' },
    price: '$22,000,000',
    bedrooms: '4',
    bathrooms: '5',
    area: '6,200 sq ft',
    type: { en: 'Luxury', es: 'Lujo' },
    description: {
      en: 'A contemporary penthouse offering unparalleled elegance and sophisticated design. Featuring floor-to-ceiling windows, private terrace with panoramic views, and premium finishes throughout.',
      es: 'Un penthouse contemporáneo que ofrece elegancia sin igual y diseño sofisticado. Con ventanas de piso a techo, terraza privada con vistas panorámicas y acabados premium en todo el espacio.',
    },
  },
  {
    id: 'the-zen-pavilions',
    status: 'coming-soon',
    images: [],
    location: { en: 'Kyoto, Japan', es: 'Kyoto, Japón' },
    title: { en: 'The Zen Pavilions', es: 'The Zen Pavilions' },
    price: '$9,200,000',
    bedrooms: '6',
    bathrooms: '7',
    area: '12,000 sq ft',
    type: { en: 'Development', es: 'Desarrollo' },
    description: {
      en: 'A serene retreat combining traditional Japanese aesthetics with contemporary luxury. Multiple pavilions, meditation gardens, natural spring water features, and bespoke art collections.',
      es: 'Un retiro sereno que combina la estética japonesa tradicional con el lujo contemporáneo. Múltiples pabellones, jardines de meditación, fuentes de agua natural y colecciones de arte a medida.',
    },
  },
];

function ProjectModal({
  project,
  locale,
  onClose,
  onNavigate,
  allProjects,
}: {
  project: Project;
  locale: string;
  onClose: () => void;
  onNavigate: (id: string) => void;
  allProjects: Project[];
}) {
  const l = locale as 'en' | 'es';
  const [currentImage, setCurrentImage] = useState(0);
  const hasImages = project.images.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra lateral izquierda — otros proyectos */}
        <div className="hidden md:flex flex-col w-48 shrink-0 border-r border-slate-100 bg-slate-50 p-3 gap-2 overflow-y-auto">
          <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider mb-1 px-1">
            {l === 'es' ? 'Proyectos' : 'Projects'}
          </p>
          {allProjects.map((p) => (
            <button
              key={p.id}
              onClick={() => onNavigate(p.id)}
              className={`flex items-center gap-2 rounded-xl p-2 text-left transition w-full ${
                p.id === project.id
                  ? 'bg-sky-900 text-white'
                  : 'hover:bg-slate-200 text-slate-700'
              }`}
            >
              <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 relative bg-slate-200">
                {p.images[0] ? (
                  <Image src={p.images[0]} alt={p.title[l]} fill className="object-cover" sizes="36px" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-base">🏢</div>
                )}
              </div>
              <div className="min-w-0">
                <p className={`text-xs font-semibold truncate leading-tight ${p.id === project.id ? 'text-white' : 'text-slate-950'}`}>
                  {p.title[l]}
                </p>
                <p className={`text-[10px] truncate ${p.id === project.id ? 'text-sky-200' : 'text-slate-400'}`}>
                  {p.location[l]}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Contenido principal */}
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 bg-sky-900 text-white p-5 flex justify-between items-start z-10 shrink-0">
            <div>
              <h2 className="text-lg font-bold">{project.title[l]}</h2>
              <p className="text-sky-100 mt-0.5 text-sm">{project.location[l]}</p>
            </div>
            <button onClick={onClose} className="text-2xl font-light hover:text-sky-100 transition ml-4">✕</button>
          </div>

          {/* Scroll area */}
          <div className="overflow-y-auto flex-1 p-6 space-y-6">

            {/* Imagen */}
            {hasImages ? (
              <div className="relative h-56 rounded-xl overflow-hidden bg-slate-100">
                <Image
                  src={project.images[currentImage]}
                  alt={`${project.title[l]} - ${currentImage + 1}`}
                  fill
                  className="object-cover"
                  sizes="600px"
                />
                {project.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImage((p) => (p - 1 + project.images.length) % project.images.length)}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-sky-900/80 hover:bg-sky-900 text-white p-2 rounded-full transition"
                    >&#10094;</button>
                    <button
                      onClick={() => setCurrentImage((p) => (p + 1) % project.images.length)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-sky-900/80 hover:bg-sky-900 text-white p-2 rounded-full transition"
                    >&#10095;</button>
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {project.images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentImage(i)}
                          className={`w-2 h-2 rounded-full transition ${i === currentImage ? 'bg-white' : 'bg-white/40'}`}
                        />
                      ))}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-slate-950/70 text-white text-xs px-2 py-1 rounded font-semibold">
                      {currentImage + 1} / {project.images.length}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="h-40 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                <div className="text-center">
                  <div className="text-5xl mb-2">🏢</div>
                  <p className="text-sm">{project.title[l]}</p>
                </div>
              </div>
            )}

            {/* Precio */}
            <div className="border-b border-slate-200 pb-4">
              <p className="text-3xl font-bold text-slate-950">{project.price}</p>
              {(project.bedrooms || project.bathrooms || project.area) && (
                <div className="mt-3 grid grid-cols-3 gap-4 text-sm">
                  {project.bedrooms && (
                    <div>
                      <p className="text-slate-500 font-light">{l === 'es' ? 'Dormitorios' : 'Bedrooms'}</p>
                      <p className="text-lg font-bold text-sky-900">{project.bedrooms}</p>
                    </div>
                  )}
                  {project.bathrooms && (
                    <div>
                      <p className="text-slate-500 font-light">{l === 'es' ? 'Baños' : 'Bathrooms'}</p>
                      <p className="text-lg font-bold text-sky-900">{project.bathrooms}</p>
                    </div>
                  )}
                  {project.area && (
                    <div>
                      <p className="text-slate-500 font-light">{l === 'es' ? 'Área' : 'Area'}</p>
                      <p className="text-lg font-bold text-sky-900">{project.area}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Descripción */}
            {project.description && (
              <div>
                <h3 className="text-base font-bold text-slate-950 mb-2">{l === 'es' ? 'Descripción' : 'Description'}</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-light">{project.description[l]}</p>
              </div>
            )}

            {/* Highlights */}
            {project.highlights && (
              <div>
                <h3 className="text-base font-bold text-slate-950 mb-3">{l === 'es' ? 'Características' : 'Features'}</h3>
                <ul className="space-y-2 text-sm text-slate-600 font-light">
                  {project.highlights[l].map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-sky-900 font-bold mt-0.5">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Amenities */}
            {project.amenities && (
              <div>
                <h3 className="text-base font-bold text-slate-950 mb-3">{l === 'es' ? 'Comodidades' : 'Amenities'}</h3>
                <div className="grid grid-cols-2 gap-3 text-sm text-slate-600 font-light">
                  {project.amenities[l].map((a, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-sky-900">✓</span>
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Financiación */}
            {project.finance && (
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
                <h3 className="text-xs font-bold text-sky-900 uppercase">{l === 'es' ? 'Financiación' : 'Financing'}</h3>
                <p className="text-slate-700 text-sm mt-2">{project.finance[l]}</p>
                {project.monthlyPayment && (
                  <p className="text-slate-600 text-xs mt-1 font-light">
                    {l === 'es' ? 'Cuota mensual' : 'Monthly Payment'}:{' '}
                    <span className="font-bold text-slate-950">{project.monthlyPayment}</span>
                  </p>
                )}
              </div>
            )}

            {/* CTA */}
            {project.externalUrl && (
              
              <a  href={project.externalUrl}
                target="_blank"
                rel="noreferrer"
                className="block w-full bg-sky-900 text-white hover:bg-sky-800 px-6 py-3 rounded-lg font-medium transition text-center text-sm"
              >
                {l === 'es' ? 'Ver en InfoCasas' : 'View on InfoCasas'}
              </a>
            )}

            {/* Navegación mobile — solo en pantallas pequeñas */}
            <div className="md:hidden border-t border-slate-100 pt-4">
              <p className="text-xs text-slate-400 uppercase font-medium mb-3">
                {l === 'es' ? 'Otros proyectos' : 'Other projects'}
              </p>
              <div className="flex gap-2">
                {allProjects.filter((p) => p.id !== project.id).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onNavigate(p.id)}
                    className="flex items-center gap-2 flex-1 border border-slate-200 hover:border-sky-900 rounded-xl p-2 text-left transition"
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden shrink-0 relative">
                      {p.images[0] ? (
                        <Image src={p.images[0]} alt={p.title[l]} fill className="object-cover" sizes="32px" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm">🏢</div>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-slate-950 truncate">{p.title[l]}</p>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
function ProjectCard({
  project,
  locale,
  cardDetails,
  onOpen,
}: {
  project: Project;
  locale: string;
  cardDetails: string;
  onOpen: () => void;
}) {
  const l = locale as 'en' | 'es';
  const [currentImage, setCurrentImage] = useState(0);
  const hasImages = project.images.length > 0;

  return (
    <div className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-slate-400 transition-all duration-300">
      <div className="relative h-48 md:h-56 bg-slate-200 overflow-hidden">
        {hasImages ? (
          <>
            <Image
              src={project.images[currentImage]}
              alt={project.title[l]}
              fill
              className="object-cover transition-opacity duration-300"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            {project.images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); setCurrentImage((p) => (p - 1 + project.images.length) % project.images.length); }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-sky-900/80 hover:bg-sky-900 text-white p-2 rounded-full transition"
                >&#10094;</button>
                <button
                  onClick={(e) => { e.stopPropagation(); setCurrentImage((p) => (p + 1) % project.images.length); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-sky-900/80 hover:bg-sky-900 text-white p-2 rounded-full transition"
                >&#10095;</button>
                <div className="absolute bottom-2 right-2 bg-slate-950/80 text-white px-3 py-1 rounded text-xs font-semibold">
                  {currentImage + 1} / {project.images.length}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400">
            <div className="text-center">
              <div className="text-4xl mb-2">🏢</div>
              <p className="text-xs">{project.title[l]}</p>
            </div>
          </div>
        )}
        <div className={`absolute top-3 left-3 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 ${project.status === 'available' ? 'bg-green-500' : 'bg-amber-500'}`}>
          <i className={`ti ${project.status === 'available' ? 'ti-circle-check' : 'ti-clock'} text-sm`} aria-hidden="true" />
          {project.status === 'available'
            ? (l === 'es' ? 'Disponible para invertir' : 'Available to invest')
            : (l === 'es' ? 'Próximamente' : 'Coming soon')}
        </div>
      </div>

      <div className="p-4 md:p-5">
        <p className="text-xs text-slate-500 mb-1">{project.location[l]}</p>
        <h3 className="text-base font-bold text-slate-950 mb-4 group-hover:text-slate-700 transition line-clamp-2">
          {project.title[l]}
        </h3>
        <div className="border-t border-slate-100">
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-xs text-slate-500">{l === 'es' ? 'Tipo de proyecto' : 'Project type'}</span>
            <span className="text-xs font-semibold text-slate-800">{project.type[l]}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-xs text-slate-500">{l === 'es' ? 'Precio' : 'Price'}</span>
            <span className="text-xs font-semibold text-slate-800">{project.price}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-xs text-slate-500">{l === 'es' ? 'Ubicación' : 'Location'}</span>
            <span className="text-xs font-semibold text-slate-800">{project.location[l]}</span>
          </div>
        </div>
        <button
          onClick={onOpen}
          className="mt-4 w-full bg-sky-900 hover:bg-sky-800 text-white text-sm font-semibold py-2.5 rounded-lg transition"
        >
          {cardDetails}
        </button>
      </div>
    </div>
  );
}

export default function ProjectsSection({ locale, cardDetails }: Props) {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const activeProject = PROJECTS.find((p) => p.id === activeProjectId) ?? null;

  return (
    <>
      <div className="hidden md:grid md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto px-6">
        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            locale={locale}
            cardDetails={cardDetails}
            onOpen={() => setActiveProjectId(project.id)}
          />
        ))}
      </div>

      {activeProject && (
        <ProjectModal
          project={activeProject}
          locale={locale}
          onClose={() => setActiveProjectId(null)}
          onNavigate={(id) => setActiveProjectId(id)}
          allProjects={PROJECTS}
        />
      )}
    </>
  );
}