// lib/projects.ts
export const PROJECTS = [
  {
    id: 'villa-elisa',
    name: 'Villa Elisa – Desarrollo Residencial',
    nameEn: 'Villa Elisa – Residential Development',
    location: 'Villa Elisa, Paraguay',
    priceUSD: 200000,
  },
  {
    id: 'long-island',
    name: 'Long Island – Inversión en Condominio',
    nameEn: 'Long Island – Condominium Investment',
    location: 'Long Island, New York',
    priceUSD: 350000,
  },
  {
    id: 'new-york-2008',
    name: 'Nueva York – Resolución Hipotecaria 2008',
    nameEn: 'New York – 2008 Mortgage Resolution',
    location: 'New York, USA',
    priceUSD: 450000,
  },
] as const;

export type Project = typeof PROJECTS[number];