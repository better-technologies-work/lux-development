import { supabase } from '@/lib/supabase';

export async function getProjects() {
  const { data, error } = await supabase
    .from('lux_projects')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }

  return data ?? [];
}