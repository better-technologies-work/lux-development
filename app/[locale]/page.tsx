import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Image from 'next/image';
import Link from 'next/link';
import DuplexSlider from '@/app/DuplexSlider';
import TeamSectionWithAnimation from '@/components/TeamSectionWithAnimation';
import { useTranslations } from 'next-intl';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const hero = await getTranslations({ locale, namespace: 'Hero' });
const sections = await getTranslations({ locale, namespace: 'Sections' });
const rootT = await getTranslations({ locale });
  const alternateLocale = routing.locales.find((item) => item !== locale) ?? routing.defaultLocale;

  // References data
  const references = [
    {
      en: { name: 'Sophia Chen', title: 'CEO, Azure Capital', text: 'Impeccable taste, flawless execution. Lux Development transformed our vision into reality.' },
      es: { name: 'Sophia Chen', title: 'CEO, Azure Capital', text: 'Gusto impecable, ejecución impecable. Lux Development transformó nuestra visión en realidad.' }
    },
    {
      en: { name: 'Marcus Rothschild', title: 'Managing Partner, Heritage Investments', text: 'The finest luxury properties I\'ve encountered. Professional, discreet, results-driven.' },
      es: { name: 'Marcus Rothschild', title: 'Socio Gerente, Heritage Investments', text: 'Las mejores propiedades de lujo que he conocido. Profesional, discreto, orientado a resultados.' }
    },
    {
      en: { name: 'Isabella Moretti', title: 'Art Collector, Milan', text: 'Every detail matters. Lux Development understands luxury at the deepest level.' },
      es: { name: 'Isabella Moretti', title: 'Coleccionista de Arte, Milán', text: 'Cada detalle importa. Lux Development entiende el lujo a nivel profundo.' }
    },
    {
      en: { name: 'James Richardson', title: 'Founder, Pinnacle Wealth', text: 'Transparent, strategic, and deeply committed to maximizing investment returns.' },
      es: { name: 'James Richardson', title: 'Fundador, Pinnacle Wealth', text: 'Transparente, estratégico y profundamente comprometido con maximizar retornos.' }
    }
  ];

  const currentLang = locale as 'en' | 'es';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-slate-200 selection:text-slate-950">
      {/* Header / Navbar */}
      <header className="border-b border-slate-200 bg-slate-50/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
          <div className="text-lg md:text-xl font-bold tracking-widest text-slate-950">
            LUX <span className="text-slate-400 font-light">DEV</span>
          </div>
          <nav className="flex items-center gap-2 md:gap-8">
            <a href="#portfolio" className="hidden md:inline text-sm text-slate-600 hover:text-sky-900 transition">
              {locale === 'es' ? 'Portafolio' : 'Portfolio'}
            </a>
            <a href="#team" className="hidden md:inline text-sm text-slate-600 hover:text-sky-900 transition">
              {locale === 'es' ? 'Equipo' : 'Team'}
            </a>
            <a href="#values" className="hidden md:inline text-sm text-slate-600 hover:text-sky-900 transition">
              {locale === 'es' ? 'Valores' : 'Values'}
            </a>
            <Link
              href={`/${alternateLocale}`}
              className="text-xs md:text-xs uppercase tracking-wider bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 md:px-3 py-1.5 rounded border border-slate-300 transition whitespace-nowrap"
            >
              {alternateLocale === 'es' ? 'ES' : 'EN'}
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 pt-16 md:pt-24 pb-16 md:pb-20 text-center">
        <h1 className="text-3xl md:text-7xl font-extrabold text-slate-900 tracking-tight max-w-4xl mx-auto leading-tight">
          {hero('title')}
        </h1>
        <p className="mt-4 md:mt-6 text-base md:text-xl text-slate-600 max-w-2xl mx-auto font-light">
          {hero('subtitle')}
        </p>
        <div className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
          <a
            href="#portfolio"
            className="bg-sky-900 text-white hover:bg-sky-800 px-6 md:px-8 py-3 md:py-3.5 rounded font-medium shadow-lg transition text-sm md:text-base"
          >
            {hero('cta')}
          </a>
          <a
            href="#team"
            className="border border-slate-400 text-slate-700 hover:text-sky-900 hover:bg-slate-100 px-6 md:px-8 py-3 md:py-3.5 rounded font-medium transition text-sm md:text-base"
          >
            {sections('contactButton')}
          </a>
        </div>
      </section>

      {/* seccion 2 - the problem */}

<section className="w-full flex justify-center py-10 px-4">
 
  <div className="max-w-3xl w-full text-center space-y-6"> 
    
    <h2 className="text-blue-600 text-3xl md:text-4xl font-black uppercase tracking-tighter">
      {locale === 'es' ? 'El problema' : 'The problem'}
    </h2>

    <span className="block text-slate-950 font-semibold text-lg">
      {locale === 'es' 
        ? "El mercado inmobiliario de Paraguay está lleno de oportunidades. Navegarlo de forma segura es el desafío." 
        : "Paraguay's real estate market is full of opportunity. Navigating it safely is the challenge."}
    </span>

    <p className="text-slate-700 text-sm md:text-lg leading-relaxed font-light">
      {locale === 'es'
        ? `Comprar una propiedad debería ser emocionante, pero para muchos inversores, expatriados, jubilados y compradores primerizos, el proceso suele ser confuso, fragmentado y difícil de verificar.
Desde requisitos legales y opciones de financiamiento hasta decisiones de desarrollo y trámites administrativos, un movimiento en falso puede convertirse en un error costoso.`
        : `Buying property should be exciting, but for many investors, expats, retirees, and first-time buyers, the process is often confusing, fragmented, and difficult to verify.
From legal requirements and financing options to development decisions and administrative procedures, one wrong move can become an expensive mistake.`}
    </p>

  </div>
</section>

     {/* Team Section - Usar componente Client separado */}
      <TeamSectionWithAnimation locale={locale} />

      {/* Featured Section */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-20 text-center bg-slate-50">
        <h2 className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-4">
          {sections('featureTag')}
        </h2>
        <h3 className="text-2xl md:text-3xl font-bold text-slate-950 mb-4">
          {sections('featureHeading')}
        </h3>
        <p className="text-slate-600 font-light text-base md:text-lg">
          {sections('featureDescription')}
        </p>
      </section>

  {/* Value Propositions */}
  <section className="w-full bg-slate-100 py-16 md:py-20">
  <div className="max-w-7xl mx-auto px-4 md:px-6">

    <h3 className="text-xl font-bold text-slate-950 mb-10">
      {locale === 'es' ? 'Ayudamos a nuestros clientes:' : 'We help clients:'}
    </h3>

    <div className="flex flex-col md:grid md:grid-cols-4 gap-6">
      {[
        { key: 'buy',     icon: 'ti-building-estate' },
        { key: 'develop', icon: 'ti-crane'            },
        { key: 'finance', icon: 'ti-currency-dollar'  },
        { key: 'wealth',  icon: 'ti-chart-line'       },
      ].map(({ key, icon }) => (
        <div key={key} className="flex md:flex-col items-start gap-4 p-6 md:p-10 bg-white rounded-lg border border-slate-200">
          <div className="w-12 h-12 md:w-16 md:h-16 border border-slate-900 rounded-lg flex items-center justify-center shrink-0">
            <i className={`ti ${icon} text-2xl md:text-4xl text-slate-900`} aria-hidden="true" />
          </div>
          <p className="font-semibold text-slate-950 text-base md:text-xl leading-snug self-center md:self-auto md:mt-4">
            {sections(`ValuePropositions.${key}.title`)}
          </p>
        </div>
      ))}
    </div>

  </div>
</section>

 


      {/* Catalog / Properties Section */}
      <section id="portfolio" className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20 border-t border-slate-200">
        <h2 className="text-xl md:text-3xl font-bold text-slate-950 tracking-wider mb-2">
          {sections('cardsTag').toUpperCase()}
        </h2>
        <div className="w-12 h-0.5 bg-slate-400 mb-4" />
        <h3 className="text-base md:text-xl font-light text-slate-700 mb-2">
          {sections('cardsTitle')}
        </h3>
        <p className="text-sm md:text-base text-slate-600 font-light mb-12">
          {sections('cardsSubtitle')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Property 1: Duplex with Slider */}
          <DuplexSlider locale={locale} />

          {/* Property 2: Aura Penthouse */}
          <Link
            href={`/${locale}/properties/aura-penthouse`}
            className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-slate-400 transition-all duration-300"
          >
            <div className="h-40 md:h-64 bg-slate-100 relative overflow-hidden flex items-center justify-center text-slate-400 text-sm">
              <div className="text-center">
                <div className="text-3xl md:text-4xl mb-2">🏢</div>
                <p className="text-xs md:text-sm">Aura Penthouse</p>
              </div>
            </div>
            <div className="p-4 md:p-6">
              <span className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Monaco</span>
              <h3 className="text-lg md:text-xl font-bold text-slate-950 mt-1 group-hover:text-slate-700 transition">
                Aura Penthouse
              </h3>
              <p className="text-lg md:text-xl text-slate-700 font-light mt-4">$22,000,000</p>
              <div className="mt-4 md:mt-6 pt-4 border-t border-slate-200">
                <span className="text-xs font-bold text-slate-600 uppercase">
                  {sections('cardDetails')} →
                </span>
              </div>
            </div>
          </Link>

          {/* Property 3: The Zen Pavilions */}
          <Link
            href={`/${locale}/properties/the-zen-pavilions`}
            className="group bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-slate-400 transition-all duration-300"
          >
            <div className="h-40 md:h-64 bg-slate-100 relative overflow-hidden flex items-center justify-center text-slate-400 text-sm">
              <div className="text-center">
                <div className="text-3xl md:text-4xl mb-2">🏯</div>
                <p className="text-xs md:text-sm">The Zen Pavilions</p>
              </div>
            </div>
            <div className="p-4 md:p-6">
              <span className="text-xs font-semibold tracking-widest text-slate-500 uppercase">Kyoto, Japan</span>
              <h3 className="text-lg md:text-xl font-bold text-slate-950 mt-1 group-hover:text-slate-700 transition">
                The Zen Pavilions
              </h3>
              <p className="text-lg md:text-xl text-slate-700 font-light mt-4">$9,200,000</p>
              <div className="mt-4 md:mt-6 pt-4 border-t border-slate-200">
                <span className="text-xs font-bold text-slate-600 uppercase">
                  {sections('cardDetails')} →
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      

      {/* References / Testimonials */}
      <section className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20 border-t border-slate-200 bg-slate-50">
        <h2 className="text-xs font-bold tracking-widest text-slate-500 uppercase mb-4">
          {locale === 'es' ? 'Referencias' : 'References'}
        </h2>
        <h3 className="text-2xl md:text-3xl font-bold text-slate-950 mb-8 md:mb-12">
          {locale === 'es' ? 'Lo que dicen nuestros clientes' : 'What Our Clients Say'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {references.map((ref, idx) => {
            const refData = ref[currentLang];
            return (
              <div key={idx} className="p-6 md:p-8 border border-slate-200 rounded-lg bg-white hover:border-slate-400 transition">
                <div className="flex items-start mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500 text-lg">★</span>
                  ))}
                </div>
                <p className="text-slate-700 font-light mb-6 italic text-sm md:text-base">"{refData.text}"</p>
                <div>
                  <p className="text-slate-950 font-semibold text-sm md:text-base">{refData.name}</p>
                  <p className="text-slate-600 text-xs md:text-sm">{refData.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section id="values" className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-20 border-t border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Mission */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-950 mb-6">
              {locale === 'es' ? 'Misión' : 'Mission'}
            </h3>
            <p className="text-slate-700 text-sm md:text-lg leading-relaxed font-light">
              {locale === 'es'
                ? 'Crear espacios excepcionales que trasciendan la funcionalidad para convertirse en santuarios personales. Nos comprometemos a entregar propiedades que no solo cumplen con las expectativas más altas de diseño y construcción, sino que también generan valor duradero para nuestros clientes.'
                : 'Create exceptional spaces that transcend functionality to become personal sanctuaries. We are committed to delivering properties that not only meet the highest expectations of design and construction, but also generate lasting value for our clients.'}
            </p>
          </div>

          {/* Vision */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-slate-950 mb-6">
              {locale === 'es' ? 'Visión' : 'Vision'}
            </h3>
            <p className="text-slate-700 text-sm md:text-lg leading-relaxed font-light">
              {locale === 'es'
                ? 'Ser el desarrollador inmobiliario de lujo más respetado a nivel mundial, reconocido por nuestra integridad, innovación y resultados excepcionales. Aspiramos a redefinir continuamente lo que significa vivir en lujo, combinando tecnología de punta con craftsmanship atemporal.'
                : 'To be the most respected luxury real estate developer globally, recognized for our integrity, innovation, and exceptional results. We aspire to continuously redefine what it means to live in luxury, combining cutting-edge technology with timeless craftsmanship.'}
            </p>
          </div>
        </div>
      </section>

  {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center text-slate-600 text-xs md:text-sm">
          <p>© 2026 Lux Development. All rights reserved.</p>
          <p className="mt-2 text-slate-400 text-xs">
            Designed &amp; developed by{' '}
            <a href="https://better-technologies.com" target="_blank" rel="noreferrer" className="hover:text-slate-600 transition underline underline-offset-2">
              Better Technologies
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}