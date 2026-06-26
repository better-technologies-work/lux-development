import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  const { data: projects } = await supabase
    .from('lux_projects')
    .select('*')
    .order('order_index');

  const { data: posts } = await supabase
    .from('lux_blog_posts')
    .select('title_es, title_en, excerpt_es, excerpt_en, created_at')
    .order('created_at', { ascending: false })
    .limit(10);

  const body = {
    name: 'Lux Development',
    description: 'Empresa inmobiliaria de lujo en Paraguay. Propiedades residenciales, inversión y financiamiento personalizado.',
    url: 'https://luxdevelopmentpy.com',
    contact: {
      email: 'luxdevelopmentpy@gmail.com',
      whatsapp: '+595981506175',
    },
    services: [
      { name: 'Venta de propiedades', description: 'Propiedades residenciales de lujo en Paraguay' },
      { name: 'Simulador de adquisición', description: 'Calculadora hipotecaria con financiamiento en USD y Guaraníes' },
      { name: 'Programa Sooner', description: 'Renta con opción a compra — terminá el ciclo de alquiler' },
      { name: 'Asesoramiento en inversión', description: 'Acompañamiento integral para inversores locales e internacionales' },
    ],
    projects: projects ?? [],
    articles: posts ?? [],
    faqs: [
      { question: '¿En qué zonas de Paraguay operan?', answer: 'Principalmente en Asunción y Gran Asunción, incluyendo Villa Elisa y zonas premium de la capital.' },
      { question: '¿Ofrecen financiamiento?', answer: 'Sí, facilitamos financiamiento bancario incluyendo el programa AFD Mi Primera Vivienda y planes propios de renta con opción a compra.' },
      { question: '¿Trabajan con clientes internacionales?', answer: 'Sí, acompañamos a paraguayos en el exterior e inversores extranjeros en todo el proceso de compra remota.' },
      { question: '¿Cuál es el tipo de cambio que usan?', answer: 'Trabajamos con USD y Guaraníes. El tipo de cambio de referencia es Gs. 7.600 por dólar.' },
    ],
    team: [
      { name: 'Patricia Natalia Narvaez', role: 'Fundadora', experience: 'Más de 100 proyectos exitosos en Nueva York y Paraguay' },
    ],
  };

  return NextResponse.json(body, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}