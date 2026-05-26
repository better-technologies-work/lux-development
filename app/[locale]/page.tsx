import { getTranslations } from 'next-intl/server';
import { routing } from '../../src/i18n/routing';
import Link from 'next/link';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const hero = await getTranslations('Hero');
  const sections = await getTranslations('Sections');
  const alternateLocale = routing.locales.find((item) => item !== locale) ?? routing.defaultLocale;

  return (
    <div className="min-h-screen bg-[#0A1128] text-[#E2E8F0] font-sans selection:bg-slate-700 selection:text-white">
      {/* Header / Navbar */}
      <header className="border-b border-zinc-500/10 bg-[#0A1128]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-xl font-bold tracking-widest text-white">
            LUX <span className="text-slate-400 font-light">DEVELOPMENT</span>
          </div>
          <nav className="flex items-center gap-8">
            <Link href={`/${locale}`} className="text-sm text-slate-300 hover:text-white transition">
              {locale === 'es' ? 'Inicio' : 'Home'}
            </Link>
            <Link
              href={`/${alternateLocale}`}
              className="text-xs uppercase tracking-wider bg-zinc-800 hover:bg-zinc-700 text-slate-300 px-3 py-1.5 rounded border border-zinc-500/20 transition"
            >
              {alternateLocale}
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-20 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none" />
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-tight">
            {hero('title')}
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-light">
            {hero('subtitle')}
          </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-[#0A1128] hover:bg-slate-200 px-8 py-3.5 rounded font-medium shadow-lg transition">
            {hero('cta')}
          </button>
          <button className="border border-zinc-500/40 text-slate-300 hover:text-white hover:bg-white/5 px-8 py-3.5 rounded font-medium transition">
            Contact an Agent
          </button>
        </div>
      </section>

      {/* Catalog / Properties Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-zinc-500/10">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-wider mb-2">
          {sections('cardsTag').toUpperCase()}
        </h2>
        <div className="w-12 h-0.5 bg-slate-400 mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="group bg-[#0B132B] border border-zinc-500/10 rounded-lg overflow-hidden hover:border-zinc-500/30 transition-all duration-300">
            <div className="h-64 bg-zinc-800 relative overflow-hidden flex items-center justify-center text-zinc-500 text-sm">
              [ Elegant Villa Image Placeholder ]
            </div>
            <div className="p-6">
              <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Malibu, USA</span>
              <h3 className="text-xl font-bold text-white mt-1 group-hover:text-slate-300 transition">The Obsidian Residence</h3>
              <p className="text-xl text-slate-300 font-light mt-4">$14,500,000</p>
            </div>
          </div>

          <div className="group bg-[#0B132B] border border-zinc-500/10 rounded-lg overflow-hidden hover:border-zinc-500/30 transition-all duration-300">
            <div className="h-64 bg-zinc-800 relative overflow-hidden flex items-center justify-center text-zinc-500 text-sm">
              [ Modern Penthouse Image Placeholder ]
            </div>
            <div className="p-6">
              <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Monaco</span>
              <h3 className="text-xl font-bold text-white mt-1 group-hover:text-slate-300 transition">Aura Penthouse</h3>
              <p className="text-xl text-slate-300 font-light mt-4">$22,000,000</p>
            </div>
          </div>

          <div className="group bg-[#0B132B] border border-zinc-500/10 rounded-lg overflow-hidden hover:border-zinc-500/30 transition-all duration-300">
            <div className="h-64 bg-zinc-800 relative overflow-hidden flex items-center justify-center text-zinc-500 text-sm">
              [ Estate Image Placeholder ]
            </div>
            <div className="p-6">
              <span className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Kyoto, Japan</span>
              <h3 className="text-xl font-bold text-white mt-1 group-hover:text-slate-300 transition">The Zen Pavilions</h3>
              <p className="text-xl text-slate-300 font-light mt-4">$9,200,000</p>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="bg-[#0B132B] border-y border-zinc-500/10 py-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-4">Our Philosophy</h2>
          <blockquote className="text-2xl md:text-3xl font-light text-white italic leading-relaxed">
            "We do not merely build structures; we curate tailored sanctuaries for those who appreciate the poetry of space and material excellence."
          </blockquote>
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-3xl mx-auto px-6 py-20 text-center">
        <h2 className="text-2xl font-bold text-white tracking-wider mb-2">
          {locale === 'es' ? 'INICIAR UNA CONVERSACIÓN' : 'INITIATE A CONVERSATION'}
        </h2>
        <p className="text-slate-400 font-light text-sm mb-10">
          Our global advisors are ready to orchestrate your next acquisition.
        </p>
        <form className="space-y-6 text-left">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">Full Name</label>
              <input
                type="text"
                className="w-full bg-[#0B132B] border border-zinc-500/20 rounded h-12 px-4 text-white focus:outline-none focus:border-slate-400 transition"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">Email Address</label>
              <input
                type="email"
                className="w-full bg-[#0B132B] border border-zinc-500/20 rounded h-12 px-4 text-white focus:outline-none focus:border-slate-400 transition"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-400 mb-2">Message</label>
            <textarea
              rows={4}
              className="w-full bg-[#0B132B] border border-zinc-500/20 rounded p-4 text-white focus:outline-none focus:border-slate-400 transition resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-slate-200 hover:bg-white text-[#0A1128] font-medium h-12 rounded transition tracking-wider uppercase text-xs"
          >
            Submit Inquiry
          </button>
        </form>
      </section>
    </div>
  );
}
