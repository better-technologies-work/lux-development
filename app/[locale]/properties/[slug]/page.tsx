import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

// Datos de propiedades (en producción esto vendría de una BD)
const properties: Record<string, any> = {
  'the-obsidian-residence': {
    en: {
      title: 'The Obsidian Residence - Luxury Villa in Malibu',
      description: 'Discover The Obsidian Residence, a stunning luxury villa in Malibu, USA. Premium property with exclusive features and investment potential.',
      price: 14500000,
      location: 'Malibu, USA',
      beds: 5,
      baths: 6,
      sqft: 8500,
      details: 'A masterpiece of modern architecture overlooking the Pacific Ocean. This exclusive villa features panoramic ocean views, smart home technology, infinity pool, and a private wine cellar.'
    },
    es: {
      title: 'The Obsidian Residence - Villa de Lujo en Malibu',
      description: 'Descubre The Obsidian Residence, una impresionante villa de lujo en Malibu, USA. Propiedad premium con características exclusivas y potencial de inversión.',
      price: 14500000,
      location: 'Malibu, USA',
      beds: 5,
      baths: 6,
      sqft: 8500,
      details: 'Una obra maestra de la arquitectura moderna con vistas panorámicas del Océano Pacífico. Esta villa exclusiva cuenta con tecnología inteligente, piscina infinita y bodega privada.'
    }
  },
  'aura-penthouse': {
    en: {
      title: 'Aura Penthouse - Luxury Living in Monaco',
      description: 'Experience luxury at the Aura Penthouse in Monaco. Premium penthouse with world-class amenities and stunning Mediterranean views.',
      price: 22000000,
      location: 'Monaco',
      beds: 4,
      baths: 5,
      sqft: 6200,
      details: 'A contemporary penthouse offering unparalleled elegance and sophisticated design. Featuring floor-to-ceiling windows, private terrace with panoramic views, and premium finishes throughout.'
    },
    es: {
      title: 'Aura Penthouse - Vida de Lujo en Mónaco',
      description: 'Experimenta el lujo en el Aura Penthouse en Mónaco. Penthouse premium con comodidades de clase mundial y vistas al Mediterráneo.',
      price: 22000000,
      location: 'Monaco',
      beds: 4,
      baths: 5,
      sqft: 6200,
      details: 'Un penthouse contemporáneo que ofrece elegancia sin igual y diseño sofisticado. Ventanales del piso al techo, terraza privada con vistas panorámicas y acabados premium.'
    }
  },
  'the-zen-pavilions': {
    en: {
      title: 'The Zen Pavilions - Luxury Estate in Kyoto',
      description: 'The Zen Pavilions in Kyoto, Japan. A harmonious blend of traditional Japanese design and modern luxury amenities.',
      price: 9200000,
      location: 'Kyoto, Japan',
      beds: 6,
      baths: 7,
      sqft: 12000,
      details: 'A serene retreat combining traditional Japanese aesthetics with contemporary luxury. Multiple pavilions, meditation gardens, natural spring water features, and bespoke art collection.'
    },
    es: {
      title: 'The Zen Pavilions - Finca de Lujo en Kioto',
      description: 'The Zen Pavilions en Kioto, Japón. Una mezcla armoniosa del diseño japonés tradicional con comodidades de lujo moderno.',
      price: 9200000,
      location: 'Kyoto, Japan',
      beds: 6,
      baths: 7,
      sqft: 12000,
      details: 'Un retiro sereno que combina la estética japonesa tradicional con el lujo contemporáneo. Múltiples pabellones, jardines de meditación, fuentes de agua natural y colección de arte personalizada.'
    }
  }
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const property = properties[slug]?.[locale as keyof typeof properties[string]];

  if (!property) {
    return {
      title: 'Property Not Found',
    };
  }

  const baseUrl = 'https://luxdevelopmentpy.com';
  const propertyUrl = `${baseUrl}${locale === 'en' ? '' : `/${locale}`}/properties/${slug}`;

  return {
    title: property.title,
    description: property.description,
    alternates: {
      canonical: propertyUrl,
    },
    openGraph: {
      title: property.title,
      description: property.description,
      url: propertyUrl,
      type: 'website',
      images: [
        {
          url: `${baseUrl}/images/${slug}.jpg`,
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: property.title,
      description: property.description,
    },
  };
}

export async function generateStaticParams() {
  const locales = ['en', 'es'];
  const slugs = Object.keys(properties);

  return locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export default async function PropertyPage({ params }: Props) {
  const { locale, slug } = await params;
  const t = await getTranslations();
  const property = properties[slug]?.[locale as keyof typeof properties[string]];

  if (!property) {
    return (
      <div className="min-h-screen bg-[#0A1128] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            {locale === 'es' ? 'Propiedad no encontrada' : 'Property Not Found'}
          </h1>
          <Link 
            href={`/${locale}`}
            className="text-blue-400 hover:text-blue-300"
          >
            {locale === 'es' ? '← Volver al inicio' : '← Back to Home'}
          </Link>
        </div>
      </div>
    );
  }

  const baseUrl = 'https://luxdevelopmentpy.com';
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateProperty',
    name: property.title,
    description: property.details,
    image: `${baseUrl}/images/${slug}.jpg`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: property.location.split(',')[0],
      addressCountry: property.location.split(',')[1]?.trim() || 'US',
    },
    price: {
      '@type': 'PriceSpecification',
      priceCurrency: 'USD',
      price: property.price.toString(),
    },
    numberOfRooms: property.beds,
    numberOfBathroomsTotal: property.baths,
    floorSize: {
      '@type': 'QuantitativeValue',
      unitCode: 'FT2',
      value: property.sqft.toString(),
    },
    url: `${baseUrl}${locale === 'en' ? '' : `/${locale}`}/properties/${slug}`,
  };

  return (
    <div className="min-h-screen bg-[#0A1128] text-white">
      <Script id="property-schema" type="application/ld+json">
        {JSON.stringify(schemaData)}
      </Script>

      {/* Header */}
      <header className="border-b border-zinc-500/10 bg-[#0A1128]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href={`/${locale}`} className="text-xl font-bold tracking-widest text-white">
            LUX <span className="text-slate-400 font-light">DEVELOPMENT</span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link href={`/${locale}`} className="text-sm text-slate-300 hover:text-white transition">
              {locale === 'es' ? 'Inicio' : 'Home'}
            </Link>
            <Link
              href={locale === 'en' ? '/es/properties/' + slug : '/en/properties/' + slug}
              className="text-xs uppercase tracking-wider bg-zinc-800 hover:bg-zinc-700 text-slate-300 px-3 py-1.5 rounded border border-zinc-500/20 transition"
            >
              {locale === 'en' ? 'ES' : 'EN'}
            </Link>
          </nav>
        </div>
      </header>

      {/* Property Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-8">
          <Link 
            href={`/${locale}`}
            className="text-slate-400 hover:text-white text-sm mb-4 inline-block"
          >
            ← {locale === 'es' ? 'Volver' : 'Back'}
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Image */}
          <div className="lg:col-span-2">
            <div className="bg-zinc-800 rounded-lg overflow-hidden h-96 lg:h-full flex items-center justify-center text-zinc-500">
              [ {property.location} Property Image ]
            </div>
          </div>

          {/* Property Details */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{property.title.split(' - ')[0]}</h1>
              <p className="text-slate-400 text-lg">{property.location}</p>
            </div>

            <div className="bg-[#0B132B] border border-zinc-500/10 rounded-lg p-6 space-y-4">
              <div>
                <span className="text-xs uppercase tracking-widest text-slate-400">Price</span>
                <p className="text-3xl font-bold text-white mt-1">${property.price.toLocaleString()}</p>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-500/10">
                <div>
                  <span className="text-xs uppercase tracking-widest text-slate-400">{locale === 'es' ? 'Habitaciones' : 'Beds'}</span>
                  <p className="text-2xl font-bold text-white mt-1">{property.beds}</p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-slate-400">{locale === 'es' ? 'Baños' : 'Baths'}</span>
                  <p className="text-2xl font-bold text-white mt-1">{property.baths}</p>
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-slate-400">Sq Ft</span>
                  <p className="text-2xl font-bold text-white mt-1">{property.sqft.toLocaleString()}</p>
                </div>
              </div>

              <button className="w-full bg-white text-[#0A1128] hover:bg-slate-200 px-8 py-3 rounded font-medium transition mt-6">
                {locale === 'es' ? 'Solicitar Información' : 'Request Information'}
              </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-20 max-w-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">
            {locale === 'es' ? 'Descripción' : 'Overview'}
          </h2>
          <p className="text-slate-300 text-lg leading-relaxed">{property.details}</p>
        </div>
      </section>
    </div>
  );
}