import { supabase } from '@/lib/supabase';

export async function getProjects(locale: string = 'en') {
  const lang = locale === 'es' ? 'es' : 'en';
  const fallback = lang === 'es' ? 'en' : 'es';

  const { data, error } = await supabase
    .from('lux_projects')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) {
    console.error('Error getProjects:', error);
    return [];
  }

  return (data ?? []).map((p) => ({
    id: p.id,
    location: p.location,
    status: p.status,
    price: p.price,
    currency: p.currency,
    category: p.category,
    external_link: p.external_link,
    images: p.images ?? [],
    featured: p.featured,
    order_index: p.order_index,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    area: p.area,
    monthlyPayment: p.monthlyPayment,
    title:       p[`title_${lang}`]       || p[`title_${fallback}`]       || '',
    description: p[`description_${lang}`] || p[`description_${fallback}`] || '',
    highlights:  p[`highlights_${lang}`]  || p[`highlights_${fallback}`]  || [],
    amenities:   p[`amenities_${lang}`]   || p[`amenities_${fallback}`]   || [],
    finance:     p[`finance_${lang}`]     || p[`finance_${fallback}`]     || null,
  }));
}