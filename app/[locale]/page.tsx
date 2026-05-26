import { getTranslations } from 'next-intl/server';
import { routing } from '@/src/i18n/routing';
import Link from 'next/link';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const hero = await getTranslations('Hero');
  const sections = await getTranslations('Sections');
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
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-gray-200 selection:text-black">
      {/* Header / Navbar */}
      <header className="border-b border-gray-200 bg-white/95 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-xl font-bold tracking-widest text-black">
            LUX <span className="text-gray-400 font-light">DEVELOPMENT</span>
          </div>
          <nav className="flex items-center gap-8">
            <a href="#portfolio" className="text-sm text-gray-600 hover:text-black transition">
              {locale === 'es' ? 'Portafolio' : 'Portfolio'}
            </a>
            <a href="#team" className="text-sm text-gray-600 hover:text-black transition">
              {locale === 'es' ? 'Equipo' : 'Team'}
            </a>
            <a href="#values" className="text-sm text-gray-600 hover:text-black transition">
              {locale === 'es' ? 'Valores' : 'Values'}
            </a>
            <Link
              href={`/${alternateLocale}`}
              className="text-xs uppercase tracking-wider bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1.5 rounded border border-gray-300 transition"
            >
              {alternateLocale}
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-20 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold text-black tracking-tight max-w-4xl mx-auto leading-tight">
          {hero('title')}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto font-light">
          {hero('subtitle')}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#portfolio"
            className="bg-black text-white hover:bg-gray-800 px-8 py-3.5 rounded font-medium shadow-lg transition"
          >
            {hero('cta')}
          </a>
          <a
            href="#team"
            className="border border-gray-400 text-gray-700 hover:text-black hover:bg-gray-50 px-8 py-3.5 rounded font-medium transition"
          >
            {sections('contactButton')}
          </a>
        </div>
      </section>

      {/* Featured Section */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center bg-gray-50">
        <h2 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">
          {sections('featureTag')}
        </h2>
        <h3 className="text-2xl md:text-3xl font-bold text-black mb-4">
          {sections('featureHeading')}
        </h3>
        <p className="text-gray-600 font-light text-lg">
          {sections('featureDescription')}
        </p>
      </section>

      {/* Value Propositions */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((num) => {
            const key = `value${num}` as any;
            return (
              <div key={num} className="p-6 rounded-lg border border-gray-200 hover:border-gray-400 transition">
                <h4 className="text-lg font-bold text-black mb-2">
                  {sections(`${key}.title`)}
                </h4>
                <p className="text-gray-600 text-sm font-light">
                  {sections(`${key}.description`)}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Catalog / Properties Section */}
      <section id="portfolio" className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-200">
        <h2 className="text-2xl md:text-3xl font-bold text-black tracking-wider mb-2">
          {sections('cardsTag').toUpperCase()}
        </h2>
        <div className="w-12 h-0.5 bg-gray-400 mb-4" />
        <h3 className="text-lg md:text-xl font-light text-gray-700 mb-2">
          {sections('cardsTitle')}
        </h3>
        <p className="text-gray-600 font-light mb-12">
          {sections('cardsSubtitle')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Property 1: The Obsidian Residence */}
          <Link
            href={`/${locale}/properties/the-obsidian-residence`}
            className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-400 transition-all duration-300"
          >
            <div className="h-64 bg-gray-100 relative overflow-hidden flex items-center justify-center text-gray-400 text-sm">
              <div className="text-center">
                <div className="text-4xl mb-2">🏠</div>
                <p>The Obsidian Residence</p>
              </div>
            </div>
            <div className="p-6">
              <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase">Malibu, USA</span>
              <h3 className="text-xl font-bold text-black mt-1 group-hover:text-gray-700 transition">
                The Obsidian Residence
              </h3>
              <p className="text-xl text-gray-700 font-light mt-4">$14,500,000</p>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <span className="text-xs font-bold text-gray-600 uppercase">
                  {sections('cardDetails')} →
                </span>
              </div>
            </div>
          </Link>

          {/* Property 2: Aura Penthouse */}
          <Link
            href={`/${locale}/properties/aura-penthouse`}
            className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-400 transition-all duration-300"
          >
            <div className="h-64 bg-gray-100 relative overflow-hidden flex items-center justify-center text-gray-400 text-sm">
              <div className="text-center">
                <div className="text-4xl mb-2">🏢</div>
                <p>Aura Penthouse</p>
              </div>
            </div>
            <div className="p-6">
              <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase">Monaco</span>
              <h3 className="text-xl font-bold text-black mt-1 group-hover:text-gray-700 transition">
                Aura Penthouse
              </h3>
              <p className="text-xl text-gray-700 font-light mt-4">$22,000,000</p>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <span className="text-xs font-bold text-gray-600 uppercase">
                  {sections('cardDetails')} →
                </span>
              </div>
            </div>
          </Link>

          {/* Property 3: The Zen Pavilions */}
          <Link
            href={`/${locale}/properties/the-zen-pavilions`}
            className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-gray-400 transition-all duration-300"
          >
            <div className="h-64 bg-gray-100 relative overflow-hidden flex items-center justify-center text-gray-400 text-sm">
              <div className="text-center">
                <div className="text-4xl mb-2">🏯</div>
                <p>The Zen Pavilions</p>
              </div>
            </div>
            <div className="p-6">
              <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase">Kyoto, Japan</span>
              <h3 className="text-xl font-bold text-black mt-1 group-hover:text-gray-700 transition">
                The Zen Pavilions
              </h3>
              <p className="text-xl text-gray-700 font-light mt-4">$9,200,000</p>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <span className="text-xs font-bold text-gray-600 uppercase">
                  {sections('cardDetails')} →
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* Team Section - Founder Photo & Bio */}
      <section id="team" className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Photo */}
          <div className="order-2 md:order-1">
            <div className="bg-gray-100 rounded-lg overflow-hidden h-96 md:h-full flex items-center justify-center text-gray-400 min-h-[500px]">
              <div className="text-center">
                <div className="text-6xl mb-4">👩‍💼</div>
                <p className="text-lg text-gray-600">Founder & CEO</p>
                <p className="text-sm text-gray-500 mt-2">Alexandra Sterling</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="order-1 md:order-2">
            <h2 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">
              {locale === 'es' ? 'Nuestro Equipo' : 'Our Team'}
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-black mb-6">
              Alexandra Sterling
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-6 font-light">
              {locale === 'es'
                ? 'Con más de 20 años de experiencia en desarrollo inmobiliario de lujo, Alexandra ha redefinido el estándar de excelencia en la industria. Su visión única y atención meticulosa a los detalles han generado algunos de los activos inmobiliarios más codiciados del mundo.'
                : 'With over 20 years of experience in luxury real estate development, Alexandra has redefined the standard of excellence in the industry. Her unique vision and meticulous attention to detail have created some of the most coveted real estate assets in the world.'}
            </p>
            <div className="space-y-3">
              <p className="text-gray-600 font-light">
                <span className="text-black font-semibold">Especialización:</span> {locale === 'es' ? 'Desarrollo inmobiliario de lujo, Arquitectura contemporánea' : 'Luxury real estate development, Contemporary architecture'}
              </p>
              <p className="text-gray-600 font-light">
                <span className="text-black font-semibold">Ubicación:</span> {locale === 'es' ? 'Miami, Nueva York, Londres' : 'Miami, New York, London'}
              </p>
              <p className="text-gray-600 font-light">
                <span className="text-black font-semibold">Portafolio:</span> {locale === 'es' ? '+$450M en transacciones completadas' : '+$450M in completed transactions'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* References / Testimonials */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-200 bg-gray-50">
        <h2 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-4">
          {locale === 'es' ? 'Referencias' : 'References'}
        </h2>
        <h3 className="text-2xl md:text-3xl font-bold text-black mb-12">
          {locale === 'es' ? 'Lo que dicen nuestros clientes' : 'What Our Clients Say'}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {references.map((ref, idx) => {
            const refData = ref[currentLang];
            return (
              <div key={idx} className="p-8 border border-gray-200 rounded-lg bg-white hover:border-gray-400 transition">
                <div className="flex items-start mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-700 font-light mb-6 italic">"{refData.text}"</p>
                <div>
                  <p className="text-black font-semibold">{refData.name}</p>
                  <p className="text-gray-600 text-sm">{refData.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section id="values" className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Mission */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-black mb-6">
              {locale === 'es' ? 'Misión' : 'Mission'}
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed font-light">
              {locale === 'es'
                ? 'Crear espacios excepcionales que trasciendan la funcionalidad para convertirse en santuarios personales. Nos comprometemos a entregar propiedades que no solo cumplen con las expectativas más altas de diseño y construcción, sino que también generan valor duradero para nuestros clientes.'
                : 'Create exceptional spaces that transcend functionality to become personal sanctuaries. We are committed to delivering properties that not only meet the highest expectations of design and construction, but also generate lasting value for our clients.'}
            </p>
          </div>

          {/* Vision */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-black mb-6">
              {locale === 'es' ? 'Visión' : 'Vision'}
            </h3>
            <p className="text-gray-700 text-lg leading-relaxed font-light">
              {locale === 'es'
                ? 'Ser el desarrollador inmobiliario de lujo más respetado a nivel mundial, reconocido por nuestra integridad, innovación y resultados excepcionales. Aspiramos a redefinir continuamente lo que significa vivir en lujo, combinando tecnología de punta con craftsmanship atemporal.'
                : 'To be the most respected luxury real estate developer globally, recognized for our integrity, innovation, and exceptional results. We aspire to continuously redefine what it means to live in luxury, combining cutting-edge technology with timeless craftsmanship.'}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-600 text-sm">
          <p>© 2026 Lux Development. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}