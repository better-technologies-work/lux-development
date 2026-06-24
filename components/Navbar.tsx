'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar({ locale, alternateLocale }: { locale: string, alternateLocale: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: locale === 'es' ? 'Portafolio' : 'Portfolio', href: '#portfolio' },
    { name: locale === 'es' ? 'Equipo' : 'Team', href: '#team' },
    { name: locale === 'es' ? 'Valores' : 'Values', href: '#values' },
    { name: 'Blog', href: `/${locale}/blog` },
  ];

  return (
    <header className="border-b border-slate-200 bg-slate-50/95 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2 text-lg font-bold tracking-widest text-slate-950">
          <Image src="/logo.png" alt="Lux Development" width={42} height={42} className="object-contain" />
          LUX <span className="text-slate-400 font-light">DEV</span>
        </div>

        {/* CONTENEDOR DERECHA: Botones (Móvil y Desktop) */}
        <div className="flex items-center gap-4">
            
          {/* Selector de idioma - SIEMPRE VISIBLE */}
          <Link 
            href={`/${alternateLocale}`} 
            className="text-xs uppercase bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded border border-slate-300 transition"
          >
            {alternateLocale === 'es' ? 'ES' : 'EN'}
          </Link>

          {/* Botón Hamburguesa - SOLO MÓVIL */}
          <button className="md:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
            <i className={`ti ${isOpen ? 'ti-x' : 'ti-menu-2'} text-2xl`}></i>
          </button>

          {/* Navegación Desktop - SOLO ESCRITORIO */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-slate-600 hover:text-sky-900 transition">
                {link.name}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Menú Desplegable Móvil */}
      {isOpen && (
        <div className="md:hidden bg-slate-50 border-b border-slate-200 p-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="text-lg text-slate-700">
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}