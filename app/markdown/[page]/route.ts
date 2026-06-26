import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const pages: Record<string, () => Promise<string>> = {
  'index': async () => `# Lux Development

> Empresa inmobiliaria de lujo en Paraguay especializada en propiedades residenciales, inversión y financiamiento.

## Qué hacemos
Conectamos a compradores locales e internacionales con propiedades exclusivas en Paraguay. Ofrecemos acompañamiento integral en todo el proceso de adquisición, desde la búsqueda hasta el financiamiento.

## Servicios
- Venta de propiedades residenciales de lujo
- Simulador de adquisición hipotecaria
- Programa Sooner (renta con opción a compra)
- Asesoramiento en inversión inmobiliaria
- Financiamiento bancario facilitado

## Contacto
- Email: luxdevelopmentpy@gmail.com
- WhatsApp: +595981506175
- Web: https://luxdevelopmentpy.com
`,

  'proyectos': async () => {
    const { data: projects } = await supabase
      .from('lux_projects')
      .select('title_es, title_en, description_es, description_en, location, status, price, currency')
      .order('order_index');

    if (!projects?.length) return '# Proyectos\n\nNo hay proyectos disponibles.';

    const lines = projects.map((p) => {
      const price = p.currency === 'PYG'
        ? `Gs. ${Number(p.price).toLocaleString('es-PY')}`
        : `USD ${Number(p.price).toLocaleString('en-US')}`;
      return `## ${p.title_es ?? p.title_en ?? 'Sin título'}
- **Ubicación:** ${p.location}
- **Estado:** ${p.status}
- **Precio:** ${price}

${p.description_es ?? ''}
`;
    });

    return `# Proyectos Lux Development\n\n${lines.join('\n---\n\n')}`;
  },

  'equipo': async () => `# El Equipo

## Patricia Natalia Narvaez — Fundadora

Con amplia experiencia en el sector inmobiliario residencial tanto en Nueva York como en Paraguay, Patricia ha construido una sólida reputación ayudando a familias, propietarios e inversores a navegar cada etapa del proceso de adquisición de inmuebles.

- **Especialización:** Propiedades residenciales, hipotecas para viviendas, negociación de deudas
- **Ubicación:** Nueva York, Paraguay
- **Historial:** Más de 100 proyectos exitosos | 100% de satisfacción de los clientes
`,

  'servicios': async () => `# Servicios Lux Development

## Simulador de Adquisición
Calculadora hipotecaria con financiamiento en USD y Guaraníes. Sistema de amortización francés con plazos de hasta 30 años.

## Programa Sooner (Renta con opción a compra)
Terminá el ciclo de alquiler. Las cuotas de renta se descuentan del precio final de compra.

## Asesoramiento en Inversión
Acompañamiento integral para inversores locales e internacionales en todo el proceso de compra en Paraguay.

## Financiamiento Bancario
Facilitamos acceso al programa AFD Mi Primera Vivienda y otros planes de financiamiento.
`,

  'blog': async () => {
    const { data: posts } = await supabase
      .from('lux_blog_posts')
      .select('title_es, title_en, excerpt_es, excerpt_en, created_at')
      .order('created_at', { ascending: false })
      .limit(20);

    if (!posts?.length) return '# Blog\n\nNo hay artículos disponibles.';

    const lines = posts.map((p) => `## ${p.title_es ?? p.title_en ?? 'Sin título'}
*${new Date(p.created_at).toLocaleDateString('es-PY')}*

${p.excerpt_es ?? p.excerpt_en ?? ''}
`);

    return `# Blog Lux Development\n\n${lines.join('\n---\n\n')}`;
  },
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ page: string }> }
) {
  const { page } = await params;
  const key = page.replace('.md', '');
  const generator = pages[key];

  if (!generator) {
    return new NextResponse('Not found', { status: 404 });
  }

  const content = await generator();

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}