import { supabase } from '@/lib/supabase';

export async function getBlogPosts() {
  const { data, error } = await supabase
    .from('lux_blog_posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}