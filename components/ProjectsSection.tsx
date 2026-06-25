'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getProjects } from '@/lib/projectService';

interface Props {
  locale: string;
  cardDetails: string;
}

type Project = {
  id: string;
  title: string;
  description: string;
  location: string;
  status: 'available' | 'sold' | 'coming_soon' | 'reserved';
  price: number | null;
  currency: 'USD' | 'PYG';
  category: string;
  external_link: string;
  images: string[];
  featured: boolean;
  order_index: number;
  bedrooms?: string;
  bathrooms?: string;
  area?: string;
  highlights?: string[];
  amenities?: string[];
  finance?: string | null;
  monthlyPayment?: string;
};

const STATUS_LABELS = {
  available:   { es: 'Disponible',   en: 'Available',    color: 'bg-green-500' },
  sold:        { es: 'Vendido',      en: 'Sold',         color: 'bg-red-500' },
  coming_soon: { es: 'Próximamente', en: 'Coming soon',  color: 'bg-amber-500' },
  reserved:    { es: 'Reservado',    en: 'Reserved',     color: 'bg-blue-500' },
};

function formatPrice(price: number | null, currency: 'USD' | 'PYG'): string {
  if (!price) return '—';
  if (currency === 'USD') {
    return `$${Number(price).toLocaleString('en-US')}`;
  }
  return `Gs. ${Number(price).toLocaleString('es-PY')}`;
}

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
  const hasImages = project.images && project.images.length > 0;

  useEffect(() => { setCurrentImage(0); }, [project.id]);

  const statusInfo = STATUS_LABELS[project.status] ?? STATUS_LABELS.available;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] flex overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sidebar */}
        <div className="hidden md:flex flex-col w-48 shrink-0 border-r border-slate-100 bg-slate-50 p-3 gap-2 overflow-y-auto">
          <p className="text-[10px] text-slate-400 uppercase font-semibold tracking-wider mb-1 px-1">
            {l === 'es' ? 'Proyectos' : 'Projects'}
          </p>
          {allProjects.map((p) => (
            <button
              key={p.id}
              onClick={() => onNavigate(p.id)}
              className={`flex items-center gap-2 rounded-xl p-2 text-left transition w-full ${
                p.id === project.id ? 'bg-sky-900 text-white' : 'hover:bg-slate-200 text-slate-700'
              }`}
            >
              <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 relative bg-slate-200">
                {p.images?.[0] ? (
                  <Image src={p.images[0]} alt={p.title} fill className="object-cover" sizes="36px" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-base">🏢</div>
                )}
              </div>
              <div className="min-w-0">
                <p className={`text-xs font-semibold truncate leading-tight ${p.id === project.id ? 'text-white' : 'text-slate-950'}`}>
                  {p.title}
                </p>
                <p className={`text-[10px] truncate ${p.id === project.id ? 'text-sky-200' : 'text-slate-400'}`}>
                  {p.location}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Contenido principal */}
        <div className="flex flex-col flex-1 min-w-0 overflow-y-auto">
          <div className="sticky top-0 bg-sky-900 text-white p-5 flex justify-between items-center z-10 shrink-0">
            <div>
              <h2 className="text-lg font-bold">{project.title}</h2>
              <p className="text-sky-100 mt-0.5 text-sm">{project.location}</p>
            </div>
            <button onClick={onClose} className="text-2xl font-light hover:text-sky-100 transition">✕</button>
          </div>

          <div className="p-5 space-y-5">
            {hasImages ? (
              <div className="relative h-56 rounded-xl overflow-hidden bg-slate-100">
                <Image
                  src={project.images[currentImage]}
                  alt={`${project.title} - ${currentImage + 1}`}
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
                        <button key={i} onClick={() => setCurrentImage(i)}
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
                <div className="text-center"><div className="text-5xl mb-2">🏢</div></div>
              </div>
            )}

            <span className={`inline-flex items-center gap-1 text-white text-xs font-semibold px-3 py-1 rounded-full ${statusInfo.color}`}>
              {statusInfo[l]}
            </span>

            <div className="border-b border-slate-200 pb-4">
              <p className="text-3xl font-bold text-slate-950">{formatPrice(project.price, project.currency)}</p>
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

            {project.description && (
              <div>
                <h3 className="text-base font-bold text-slate-950 mb-2">{l === 'es' ? 'Descripción' : 'Description'}</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-light">{project.description}</p>
              </div>
            )}

            {project.highlights && project.highlights.length > 0 && (
              <div>
                <h3 className="text-base font-bold text-slate-950 mb-3">{l === 'es' ? 'Características' : 'Features'}</h3>
                <ul className="space-y-2 text-sm text-slate-600 font-light">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-sky-900 font-bold mt-0.5">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.amenities && project.amenities.length > 0 && (
              <div>
                <h3 className="text-base font-bold text-slate-950 mb-3">{l === 'es' ? 'Comodidades' : 'Amenities'}</h3>
                <div className="grid grid-cols-2 gap-3 text-sm text-slate-600 font-light">
                  {project.amenities.map((a, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-sky-900">✓</span><span>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.finance && (
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
                <h3 className="text-xs font-bold text-sky-900 uppercase">{l === 'es' ? 'Financiación' : 'Financing'}</h3>
                <p className="text-slate-700 text-sm mt-2">{project.finance}</p>
                {project.monthlyPayment && (
                  <p className="text-slate-600 text-xs mt-1 font-light">
                    {l === 'es' ? 'Cuota mensual' : 'Monthly Payment'}:{' '}
                    <span className="font-bold text-slate-950">{project.monthlyPayment}</span>
                  </p>
                )}
              </div>
            )}

            {project.external_link && (
              
               <a href={project.external_link}
                target="_blank"
                rel="noreferrer"
                className="block w-full bg-sky-900 text-white hover:bg-sky-800 px-6 py-3 rounded-lg font-medium transition text-center text-sm"
              >
                {l === 'es' ? 'Ver publicación' : 'View listing'}
              </a>
            )}

            <div className="md:hidden border-t border-slate-100 pt-4">
              <p className="text-xs text-slate-400 uppercase font-medium mb-3">
                {l === 'es' ? 'Otros proyectos' : 'Other projects'}
              </p>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {allProjects.filter((p) => p.id !== project.id).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onNavigate(p.id)}
                    className="flex items-center gap-2 shrink-0 border border-slate-200 hover:border-sky-900 rounded-xl p-2 text-left transition"
                  >
                    <div className="w-8 h-8 rounded-full bg-slate-100 overflow-hidden shrink-0 relative">
                      {p.images?.[0] ? (
                        <Image src={p.images[0]} alt={p.title} fill className="object-cover" sizes="32px" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm">🏢</div>
                      )}
                    </div>
                    <p className="text-xs font-semibold text-slate-950 truncate max-w-[80px]">{p.title}</p>
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
  const hasImages = project.images && project.images.length > 0;
  const statusInfo = STATUS_LABELS[project.status] ?? STATUS_LABELS.available;

  return (
    <div className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-slate-400 transition-all duration-300">
      <div className="relative h-48 md:h-56 bg-slate-200 overflow-hidden">
        {hasImages ? (
          <>
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className="object-cover transition-opacity duration-300"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            {project.images.length > 1 && (
              <div className="absolute bottom-2 right-2 bg-slate-950/80 text-white px-3 py-1 rounded text-xs font-semibold">
                1 / {project.images.length}
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400">
            <div className="text-center"><div className="text-4xl mb-2">🏢</div></div>
          </div>
        )}
        <div className={`absolute top-3 left-3 text-white text-xs font-semibold px-3 py-1 rounded-full ${statusInfo.color}`}>
          {statusInfo[l]}
        </div>
      </div>

      <div className="p-4 md:p-5">
        <p className="text-xs text-slate-500 mb-1">{project.location}</p>
        <h3 className="text-base font-bold text-slate-950 mb-4 line-clamp-2">{project.title}</h3>
        <div className="border-t border-slate-100">
          <div className="flex justify-between items-center py-2 border-b border-slate-100">
            <span className="text-xs text-slate-500">{l === 'es' ? 'Precio' : 'Price'}</span>
            <span className="text-xs font-semibold text-slate-800">{formatPrice(project.price, project.currency)}</span>
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
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await getProjects(locale);
      setProjects(data);
      setLoading(false);
    }
    load();
  }, [locale]);

  const activeProject = projects.find((p) => p.id === activeProjectId) ?? null;

  if (loading) {
    return (
      <div className="text-center py-10 text-slate-400 text-sm">
        {locale === 'es' ? 'Cargando proyectos...' : 'Loading projects...'}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto px-6">
        {projects.map((project) => (
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
          allProjects={projects}
        />
      )}
    </>
  );
}