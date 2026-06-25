import { getTranslations } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import Image from 'next/image';
import Link from 'next/link';

import TeamSectionWithAnimation from '@/components/TeamSectionWithAnimation';
import { useTranslations } from 'next-intl';

import SuccessStories from '@/components/SuccessStories';
import OurServices from '@/components/OurServices';
import WhyLuxDevelopment from "@/components/WhyLuxDevelopment";
import FAQSection from "@/components/FAQSection";
import WhoWeHelpSection from "@/components/WhoWeHelpSection";
import OurMissionSection from "@/components/OurMissionSection";
import FinalCTA from '@/components/FinalCTA'
import ProjectsSection from '@/components/ProjectsSection';
import Navbar from '@/components/Navbar';
import { supabase } from '@/lib/supabase'
import SocialBar from '@/components/SocialBar';

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
      <Navbar locale={locale} alternateLocale={alternateLocale} />

<section className="relative flex flex-col md:flex-row overflow-hidden min-h-[80vh]">

{/* IZQUIERDA - Letras SVG */}
<div className="w-full md:w-1/2 flex items-center justify-center bg-slate-50 min-h-[50vh] md:min-h-[80vh]">
  
  {/* Ajustamos el gap para que el espacio entre letras sea proporcional al tamaño */}
  <div className="flex items-end gap-1 md:gap-2 scale-75 md:scale-90">

    {/* L - Reducido a 80x128 (antes 100x160) */}
    <svg width="80" height="128" viewBox="0 0 100 160">
      <defs>
        <clipPath id="hero-clip-L">
          <path d="M15,5 Q15,0 20,0 L40,0 Q45,0 45,5 L45,115 L80,115 Q85,115 85,120 L85,155 Q85,160 80,160 L20,160 Q15,160 15,155 Z" />
        </clipPath>
      </defs>
      <image href="/casa.avif" width="100" height="160" preserveAspectRatio="xMidYMid slice" clipPath="url(#hero-clip-L)" />
    </svg>

    {/* U - Reducido a 80x128 */}
    <svg width="80" height="128" viewBox="0 0 100 160">
      <defs>
        <clipPath id="hero-clip-U">
          <path d="M10,0 L10,0 Q10,0 15,0 L35,0 Q40,0 40,5 L40,110 Q40,130 50,130 Q60,130 60,110 L60,5 Q60,0 65,0 L85,0 Q90,0 90,5 L90,115 Q90,160 50,160 Q10,160 10,115 Z" />
        </clipPath>
      </defs>
      <image href="/casa.avif" width="100" height="160" preserveAspectRatio="xMidYMid slice" clipPath="url(#hero-clip-U)" />
    </svg>

    {/* X - Reducido a 80x128 */}
    <svg width="80" height="128" viewBox="0 0 100 160">
      <defs>
        <clipPath id="hero-clip-X">
          <path d="M5,0 L38,0 L50,22 L62,0 L95,0 L95,5 L68,50 L95,95 L95,100 L62,100 L50,78 L38,100 L5,100 L5,95 L32,50 L5,5 Z M5,115 L38,115 L50,137 L62,115 L95,115 L95,120 L68,160 L32,160 L5,120 Z" />
        </clipPath>
      </defs>
      <image href="/casa.avif" width="100" height="160" preserveAspectRatio="xMidYMid slice" clipPath="url(#hero-clip-X)" />
    </svg>

  </div>
</div>

  {/* DERECHA - SIN IMAGEN */}
  <div className="w-full md:w-1/2 flex items-center justify-center bg-white min-h-[60vh] md:min-h-[80vh]">

    <div className="text-center px-6 md:px-10">
      <h2 className="text-2xl md:text-5xl font-normal text-black tracking-tight max-w-xl mx-auto leading-tight">
  {hero('title_part1')}
  <span className="text-sky-700">{hero('title_part2')}</span>
  {hero('title_part3')}
</h2>
      <p className="mt-4 text-sm md:text-lg text-slate-600 max-w-md mx-auto font-light">
  {hero('subtitle')}
</p>

      <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
        <a
  href="https://calendly.com" 
  target="_blank" 
  rel="noopener noreferrer"
  className="bg-sky-700 text-white hover:bg-sky-600 px-6 py-3 rounded font-medium text-sm"
>
  {hero('cta')}
</a>

        <a
  href="#portfolio"
  className="border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white px-6 py-3 rounded font-medium text-sm transition-colors duration-200"
>
  {sections('contactButton')}
</a>
      </div>
    </div>

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
        ? "El mercado de bienes raíces en Paraguay ofrece oportunidades únicas. El reto es saber navegarlo con seguridad." 
        : "Paraguay's real estate market offers exceptional opportunities. Navigating it safely is the challenge."}
    </span>

    <p className="text-slate-700 text-sm md:text-lg leading-relaxed font-light">
      {locale === 'es'
        ? `Comprar una propiedad en Paraguay debería ser una experiencia emocionante. Sin embargo, para inversores, expatriados, jubilados y compradores primerizos, el proceso puede resultar complejo y difícil de navegar. Desde la adquisición de inmuebles y los requisitos legales hasta el financiamiento, las decisiones de desarrollo y los trámites administrativos, la falta de conocimiento local puede convertirse rápidamente en un error costoso.`
        : `Buying property in Paraguay should be exciting. Yet for investors, expats, retirees, and first-time buyers, the process can feel complex and difficult to navigate. From property acquisition and legal requirements to financing, development decisions, and administrative procedures, a lack of local knowledge can quickly become an expensive mistake.`}
    </p>
    <p className="text-slate-700 text-sm md:text-lg leading-relaxed font-light">
      {locale === 'es'
        ? `Lux Development ofrece experiencia local de confianza, ayudando a sus clientes a reducir la incertidumbre, evitar riesgos innecesarios y pasar de la oportunidad a la propiedad con total seguridad.`
        : `Lux Development provides trusted local expertise, helping clients reduce uncertainty, avoid unnecessary risks, and move from opportunity to ownership with confidence.`}
    </p>
  </div>
</section>

     {/* Team Section  */}
      <TeamSectionWithAnimation locale={locale} />

      {/* 3 - Featured Section */}
      <section className="max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-20 text-center bg-slate-50">
        <h2 className="text-lg font-bold tracking-widest text-[#0A4D8C] uppercase mb-4">
  {sections('featureTag')}
</h2>
        <h3 className="text-2xl md:text-3xl font-bold text-slate-950 mb-4">
          {sections('featureHeading')}
        </h3>
        <p className="whitespace-pre-line text-slate-600 font-light text-base md:text-lg">
          {sections('featureDescription')}
        </p>
      </section>

{/* Value Propositions */}
<section className="w-full bg-slate-100 py-16 md:py-20">
  <div className="max-w-7xl mx-auto px-4 md:px-6">

    <h3 className="text-xl font-bold text-slate-950 mb-10">
      {locale === 'es' ? 'Ayudamos a nuestros clientes:' : 'We help clients:'}
    </h3>

    <div className="flex flex-col md:grid md:grid-cols-5 gap-6">
      {[
        { key: 'buy',     icon: 'ti-building-estate' },
        { key: 'develop', icon: 'ti-crane'           },
        { key: 'finance', icon: 'ti-currency-dollar' },
        { key: 'wealth',  icon: 'ti-chart-line'      },
        { key: 'invest',  icon: 'ti-trending-up'     },
      ].map(({ key, icon }) => (
        <div key={key} className="flex md:flex-col items-start gap-4 p-6 md:p-10 bg-white rounded-lg border border-slate-200">
          <div className="w-12 h-12 md:w-16 md:h-16 border border-slate-900 rounded-lg flex items-center justify-center shrink-0">
            <i className={`ti ${icon} text-2xl md:text-4xl text-slate-900`} aria-hidden="true" />
          </div>
          {/* Aquí hice el ajuste del tamaño de letra */}
          <p className="font-semibold text-slate-950 text-sm md:text-base leading-snug self-center md:self-auto md:mt-4">
            {sections(`ValuePropositions.${key}.title`)}
          </p>
        </div>
      ))}
    </div>

  </div>
</section>

     {/* Catalog / Properties Section */}
<section id="portfolio" className="py-16 md:py-20 border-t border-slate-200">
  <div className="max-w-7xl mx-auto px-4 md:px-6">
    <h2 className="text-xl md:text-4xl font-extrabold text-slate-950 tracking-tight mb-3">
      {locale === 'es' ? 'NUESTROS PROYECTOS' : 'OUR PROJECTS'}
    </h2>
    <h3 className="text-base md:text-xl font-semibold text-slate-800 mb-12">
      {locale === 'es'
        ? 'Todo lo que necesitás para comprar, invertir o construir en Paraguay.'
        : 'Everything you need to buy, invest, or build in Paraguay.'}
    </h3>
  </div>

  {/* Mobile carousel */}

<ProjectsSection locale={locale} cardDetails={locale === 'es' ? 'Ver Detalles' : 'View Details'} />
</section>

<SuccessStories locale={locale} />
<OurServices locale={locale} />
<OurMissionSection />
<WhoWeHelpSection  />
<WhyLuxDevelopment locale={locale} />
<SocialBar locale={locale} />
<FAQSection locale={locale} imageSrc="/OIP.webp" />


<FinalCTA locale={locale} />

  {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-50 py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-6 text-center text-slate-600 text-xs md:text-sm">
          <p>© 2026 Lux Development. All rights reserved.</p>
          <p className="mt-2 text-slate-400 text-xs">
            Designed &amp; developed by{' '}
            <a href="https://www.better-technologies.com" target="_blank" rel="noreferrer" className="hover:text-slate-600 transition underline underline-offset-2">
              Better Technologies
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}