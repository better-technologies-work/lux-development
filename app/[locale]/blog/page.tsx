import { getBlogPosts } from '@/lib/blogService';

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-8">
        Blog
      </h1>

      <div className="grid gap-6">
        {posts.map((post: any) => (
          <div
            key={post.id}
            className="bg-white border border-slate-200 rounded-xl p-6"
          >
            <h2 className="text-2xl font-semibold">
              {post.title_en}
            </h2>
          </div>
        ))}
      </div>
    </main>
  );
}