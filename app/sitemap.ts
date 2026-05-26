import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://lux-development.com'
  const locales = ['en', 'es']

  // URLs estáticas
  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/en/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/es/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ]

  // Propiedades
  const properties = [
    {
      slug: 'the-obsidian-residence',
      lastModified: new Date('2026-05-26'),
    },
    {
      slug: 'aura-penthouse',
      lastModified: new Date('2026-05-26'),
    },
    {
      slug: 'the-zen-pavilions',
      lastModified: new Date('2026-05-26'),
    },
  ]

  // Generar URLs de propiedades en ambos idiomas
  const propertyUrls: MetadataRoute.Sitemap = properties.flatMap((property) =>
    locales.map((locale) => ({
      url: `${baseUrl}${locale === 'en' ? '' : `/${locale}`}/properties/${property.slug}`,
      lastModified: property.lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  )

  return [...staticUrls, ...propertyUrls]
}