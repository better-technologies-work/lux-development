import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Image from 'next/image';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export default async function BlogPost({ params }: Props) {
  const { locale, slug } = await params;
  const lang = locale === 'es' ? 'es' : 'en';

  const { data: post } = await supabase
    .from('lux_blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (!post) notFound();

  const title = post[`title_${lang}`] || post.title_es || post.title_en || '';
  const content = post[`content_${lang}`] || post.content_es || post.content_en || '';
  const excerpt = post[`excerpt_${lang}`] || post.excerpt_es || post.excerpt_en || '';

  return (
    <article className="max-w-4xl mx-auto px-6 py-20">
      {post.featured_image && (
        <div className="relative h-80 w-full mb-8 rounded-xl overflow-hidden">
          <Image
            src={post.featured_image}
            alt={title}
            fill
            className="object-cover"
            loading="eager"
          />
        </div>
      )}

      <h1 className="text-5xl font-bold mb-4">{title}</h1>

      {excerpt && (
        <p className="text-xl text-gray-500 mb-6 italic">{excerpt}</p>
      )}

      <p className="text-gray-400 text-sm mb-10">
        {new Date(post.created_at).toLocaleDateString(locale, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </p>

      <div className="prose prose-lg max-w-none">
        {content.split('\n').map((paragraph: string, i: number) =>
          paragraph.trim() ? (
            <p key={i} className="mb-4 text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ) : null
        )}
      </div>
    </article>
  );
}