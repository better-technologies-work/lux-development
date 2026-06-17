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
    en: 'Discover premium luxury properties and real estate investment opportunities in Malibu, Monaco, Kyoto and more. Curated sanctuaries for modern living.',
    es: 'Descubre propiedades de lujo premium y oportunidades de inversión inmobiliaria en Malibu, Mónaco, Kioto y más. Espacios exclusivos para la vida moderna.',
  };

  const baseUrl = 'https://lux-development.com';

  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    keywords: locale === 'es' 
      ? 'casas de lujo, propiedades exclusivas, inversión inmobiliaria, vivienda de lujo, Malibu, Mónaco, Kioto'
      : 'luxury homes, exclusive properties, real estate investment, luxury living, Malibu, Monaco, Kyoto',
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
          url: `${baseUrl}/og-image.jpg`,
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
            "url": "https://lux-development.com",
            "logo": "https://lux-development.com/logo.png",
            "description": "${locale === 'es' ? 'Propiedades exclusivas de lujo y oportunidades de inversión inmobiliaria' : 'Exclusive luxury properties and real estate investment opportunities'}",
            "sameAs": [
              "https://www.instagram.com/luxdevelopment",
              "https://www.linkedin.com/company/luxdevelopment"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "Customer Service",
              "email": "contact@lux-development.com"
            },
            "areaServed": ["US", "MC", "JP"]
          }`}
        </Script>

        {/* Local Business Schema */}
        <Script id="local-business-schema" type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Lux Development",
            "image": "https://lux-development.com/logo.png",
            "description": "${locale === 'es' ? 'Desarrollo inmobiliario de lujo' : 'Luxury real estate development'}",
            "url": "https://lux-development.com"
          }`}
        </Script>
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}