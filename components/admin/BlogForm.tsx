'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function BlogForm({ onPostAdded }: { onPostAdded: () => void }) {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const form = e.currentTarget
    const formData = new FormData(form)

    const lang = formData.get('language') as string
    const title = formData.get('title') as string
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') + '-' + Date.now().toString().slice(-4)

    const insertData: Record<string, unknown> = {
      slug,
      published: formData.get('published') === 'on',
      featured_image: formData.get('featured_image') || null,
      [`title_${lang}`]: title,
      [`excerpt_${lang}`]: formData.get('excerpt') || null,
      [`content_${lang}`]: formData.get('content') || null,
    }

    const { error } = await supabase.from('lux_blog_posts').insert(insertData)

    if (error) {
      console.error('Error:', error)
      alert(`Error: ${error.message}`)
    } else {
      onPostAdded()
      form.reset()
    }
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 p-4 border rounded">
      <select name="language" className="border p-2 rounded" required>
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>

      <input name="title" placeholder="Título" className="border p-2 rounded" required />
      <textarea name="excerpt" placeholder="Extracto" className="border p-2 rounded h-20" />
      <textarea name="content" placeholder="Contenido" className="border p-2 rounded h-40" />
      <input name="featured_image" placeholder="URL imagen destacada (opcional)" className="border p-2 rounded" />

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="published" />
        Publicar inmediatamente
      </label>

      <button type="submit" disabled={loading} className="bg-blue-600 text-white p-2 rounded disabled:opacity-50">
        {loading ? 'Guardando...' : 'Crear Post'}
      </button>
    </form>
  )
}