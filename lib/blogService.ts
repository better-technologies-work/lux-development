import { supabase } from '@/lib/supabase';

export async function getBlogPosts(locale: string) {
  const lang = locale === 'es' ? 'es' : 'en';

  const { data, error } = await supabase
    .from('lux_blog_posts')
    .select('id, slug, external_url, featured_image, title_es, title_en, excerpt_es, excerpt_en')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error al obtener posts:', error.message);
    return [];
  }

  return (data ?? []).map((post) => ({
    id: post.id,
    slug: post.slug,
    external_url: post.external_url,
    featured_image: post.featured_image,
    title: lang === 'es'
      ? (post.title_es || post.title_en || '')
      : (post.title_en || post.title_es || ''),
    excerpt: lang === 'es'
      ? (post.excerpt_es || post.excerpt_en || '')
      : (post.excerpt_en || post.excerpt_es || ''),
  }));
}