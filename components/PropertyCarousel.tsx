'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import DuplexSlider from '@/app/DuplexSlider';

interface Props {
  locale: string;
  cardDetails: string;
}

export default function PropertyCarousel({ locale, cardDetails }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const total = 3;

  const scrollTo = (index: number) => {
    if (!scrollRef.current) return;
    const width = scrollRef.current.offsetWidth;
    scrollRef.current.scrollTo({ left: width * index, behavior: 'smooth' });
    setCurrent(index);
  };

  return (
    <div className="relative">
      {/* Cards */}
      <div
  ref={scrollRef}
  className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4"
>
        {/* Card 1: Duplex */}
        <div className="snap-center shrink-0 w-[85vw] mr-4 bg-white border border-slate-200 rounded-lg overflow-hidden">
    <DuplexSlider locale={locale} />
  </div>

        {/* Card 2: Aura Penthouse */}
        <Link
    href={`/${locale}/properties/aura-penthouse`}
    className="snap-center shrink-0 w-[85vw] mr-4 bg-white border border-slate-200 rounded-lg overflow-hidden"
  >
          <div className="h-48 bg-slate-200 relative flex items-center justify-center">
            <div className="text-center text-slate-400">
              <div className="text-4xl mb-2">🏢</div>
              <p className="text-xs">Aura Penthouse</p>
            </div>
            <div className="absolute top-3 left-3 bg-green-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
              <i className="ti ti-circle-check text-sm" aria-hidden="true" />
              {locale === 'es' ? 'Disponible para invertir' : 'Available to invest'}
            </div>
          </div>
          <div className="p-4">
            <p className="text-xs text-slate-500 mb-1">Monaco</p>
            <h3 className="text-base font-bold text-slate-950 mb-4">Aura Penthouse</h3>
            <div className="border-t border-slate-100">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-xs text-slate-500">{locale === 'es' ? 'Tipo de proyecto' : 'Project type'}</span>
                <span className="text-xs font-semibold text-slate-800">{locale === 'es' ? 'Lujo' : 'Luxury'}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-xs text-slate-500">{locale === 'es' ? 'Precio' : 'Price'}</span>
                <span className="text-xs font-semibold text-slate-800">$22,000,000</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-xs text-slate-500">{locale === 'es' ? 'Ubicación' : 'Location'}</span>
                <span className="text-xs font-semibold text-slate-800">Monaco</span>
              </div>
            </div>
            <button className="mt-4 w-full bg-sky-900 hover:bg-sky-800 text-white text-sm font-semibold py-2.5 rounded-lg transition">
              {cardDetails}
            </button>
          </div>
        </Link>

        {/* Card 3: The Zen Pavilions */}
        <Link
    href={`/${locale}/properties/the-zen-pavilions`}
    className="snap-center shrink-0 w-[85vw] mr-4 bg-white border border-slate-200 rounded-lg overflow-hidden"
  >
          <div className="h-48 bg-slate-200 relative flex items-center justify-center">
            <div className="text-center text-slate-400">
              <div className="text-4xl mb-2">🏯</div>
              <p className="text-xs">The Zen Pavilions</p>
            </div>
            <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
              <i className="ti ti-clock text-sm" aria-hidden="true" />
              {locale === 'es' ? 'Próximamente' : 'Coming soon'}
            </div>
          </div>
          <div className="p-4">
            <p className="text-xs text-slate-500 mb-1">Kyoto, Japan</p>
            <h3 className="text-base font-bold text-slate-950 mb-4">The Zen Pavilions</h3>
            <div className="border-t border-slate-100">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-xs text-slate-500">{locale === 'es' ? 'Tipo de proyecto' : 'Project type'}</span>
                <span className="text-xs font-semibold text-slate-800">{locale === 'es' ? 'Desarrollo' : 'Development'}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-xs text-slate-500">{locale === 'es' ? 'Precio' : 'Price'}</span>
                <span className="text-xs font-semibold text-slate-800">$9,200,000</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-xs text-slate-500">{locale === 'es' ? 'Ubicación' : 'Location'}</span>
                <span className="text-xs font-semibold text-slate-800">Kyoto, Japan</span>
              </div>
            </div>
            <button className="mt-4 w-full bg-sky-900 hover:bg-sky-800 text-white text-sm font-semibold py-2.5 rounded-lg transition">
              {cardDetails}
            </button>
          </div>
        </Link>
      </div>

      {/* Flechas + dots */}
      <div className="flex items-center justify-center gap-6 mt-6">
        <button
          onClick={() => scrollTo(Math.max(0, current - 1))}
          disabled={current === 0}
          className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 disabled:opacity-30 transition hover:border-slate-500"
        >
          <i className="ti ti-arrow-left text-lg" aria-hidden="true" />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className={`w-2 h-2 rounded-full transition ${
                i === current ? 'bg-slate-900' : 'bg-slate-300'
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => scrollTo(Math.min(total - 1, current + 1))}
          disabled={current === total - 1}
          className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 disabled:opacity-30 transition hover:border-slate-500"
        >
          <i className="ti ti-arrow-right text-lg" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}