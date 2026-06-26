import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import { Metadata } from 'next';
import Script from 'next/script';
import "../globals.css";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: 'Lux Development - Exclusive Properties & Investment Opportunities',
    es: 'Lux Development - Propiedades Exclusivas y Oportunidades de Inversión',
  };

  const descriptions: Record<string, string> = {
    en: 'Discover exclusive luxury properties and real estate investment opportunities in Paraguay. Personalized financing and expert guidance for local and international buyers.',
    es: 'Descubrí propiedades exclusivas de lujo y oportunidades de inversión inmobiliaria en Paraguay. Financiamiento personalizado y acompañamiento integral para compradores locales e internacionales.',
  };

  const baseUrl = 'https://luxdevelopmentpy.com';

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    icons: {
      icon: '/logo.png',
      shortcut: '/logo.png',
      apple: '/logo.png',
    },
    keywords: locale === 'es' 
      ? 'casas de lujo Paraguay, propiedades exclusivas Asunción, inversión inmobiliaria Paraguay, Villa Elisa, duplex Paraguay, financiamiento hipotecario'
      : 'luxury homes Paraguay, exclusive properties Asuncion, real estate investment Paraguay, Villa Elisa, duplex Paraguay, mortgage financing',
    alternates: {
      canonical: `${baseUrl}${locale === 'en' ? '' : `/${locale}`}/`,
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: `${baseUrl}${locale === 'en' ? '' : `/${locale}`}/`,
      siteName: 'Lux Development',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/logo.png`,
          width: 1200,
          height: 630,
          alt: 'Lux Development - Exclusive Properties',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <head>
        <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE_HERE" />
        {/* Tabler Icons */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css"
        />
        {/* Organization Schema */}
        <Script id="organization-schema" type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "RealEstateAgent",
            "name": "Lux Development",
            "url": "https://luxdevelopmentpy.com",
            "logo": "https://luxdevelopmentpy.com/logo.png",
            "description": "${locale === 'es' ? 'Propiedades exclusivas de lujo y oportunidades de inversión inmobiliaria' : 'Exclusive luxury properties and real estate investment opportunities'}",
            "sameAs": [
              "https://www.instagram.com/luxdevelopment",
              "https://www.linkedin.com/company/luxdevelopment"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "Customer Service",
              "email": "luxdevelopmentpy@gmail.com"
            },
            "areaServed": ["PY"]
          }`}
        </Script>

        {/* Local Business Schema */}
        <Script id="local-business-schema" type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Lux Development",
            "image": "https://luxdevelopmentpy.com/logo.png",
            "description": "${locale === 'es' ? 'Desarrollo inmobiliario de lujo' : 'Luxury real estate development'}",
            "url": "https://luxdevelopmentpy.com"
          }`}
        </Script>
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <a
          href="https://wa.me/595981506175"
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 right-6 z-[9999] flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
        >
          <i className="ti ti-brand-whatsapp text-3xl" />
        </a>
      </body>
    </html>
  );
}