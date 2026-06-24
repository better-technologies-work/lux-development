import { getBlogPosts } from '@/lib/blogService';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const posts = await getBlogPosts(locale);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
      <h1 className="text-3xl sm:text-4xl font-bold mb-10">Blog</h1>

      {posts.length === 0 && (
        <p className="text-gray-500 text-center py-20">
          {locale === 'es' ? 'No hay artículos publicados aún.' : 'No posts published yet.'}
        </p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => {
          const title = (post.title as string) || '';
          const excerpt = (post.excerpt as string) || '';
          const isExternal = !!post.external_url;
          const href = isExternal
            ? (post.external_url as string)
            : `/${locale}/blog/${post.slug}`;

          return (
            <div
              key={post.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              {/* Imagen */}
              {post.featured_image ? (
  <div className="relative w-full aspect-[16/9] flex-shrink-0">
    <Image
      src={post.featured_image as string}
      alt={title || 'Post'}
      fill
      className="object-cover object-top"
      loading="eager"
    />
  </div>
) : (
  <div className="w-full aspect-[16/9] bg-slate-100 flex items-center justify-center flex-shrink-0">
    <span className="text-slate-400 text-sm">Sin imagen</span>
  </div>
)}

              {/* Contenido */}
              <div className="p-5 flex flex-col flex-1">
                {title ? (
                  <h2 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900 line-clamp-2">
                    {title}
                  </h2>
                ) : (
                  <p className="text-sm text-red-400 mb-2 italic">
                    (Sin título — verificar DB)
                  </p>
                )}

                {excerpt && (
                  <p className="text-gray-500 text-sm sm:text-base mb-4 line-clamp-3 flex-1">
                    {excerpt}
                  </p>
                )}

                <div className="mt-auto pt-3 border-t border-slate-100">
                  <Link
                    href={href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="text-blue-600 text-sm font-medium hover:underline"
                  >
                    {locale === 'es' ? 'Leer más →' : 'Read more →'}
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}