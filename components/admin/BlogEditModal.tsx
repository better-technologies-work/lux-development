'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function BlogEditModal({ post, onClose, onSaved }: {
  post: { id: string },
  onClose: () => void,
  onSaved: () => void,
}) {
  const [lang, setLang] = useState<'es' | 'en'>('es')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [fields, setFields] = useState({
    title_es: '', title_en: '',
    excerpt_es: '', excerpt_en: '',
    content_es: '', content_en: '',
    published: false,
    featured_image: '',
  })

  // Fetch completo del post al abrir
  useEffect(() => {
    async function fetchPost() {
      const { data, error } = await supabase
        .from('lux_blog_posts')
        .select('title_es, title_en, excerpt_es, excerpt_en, content_es, content_en, published, featured_image')
        .eq('id', post.id)
        .single()

      if (error) {
        console.error('Error fetching post:', error.message)
      } else if (data) {
        setFields({
          title_es: data.title_es ?? '',
          title_en: data.title_en ?? '',
          excerpt_es: data.excerpt_es ?? '',
          excerpt_en: data.excerpt_en ?? '',
          content_es: data.content_es ?? '',
          content_en: data.content_en ?? '',
          published: data.published ?? false,
          featured_image: data.featured_image ?? '',
        })
        // Detectar idioma predominante
        if (data.title_es) setLang('es')
        else if (data.title_en) setLang('en')
      }
      setLoading(false)
    }
    fetchPost()
  }, [post.id])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)

    const { error } = await supabase
      .from('lux_blog_posts')
      .update({
        [`title_${lang}`]: fields[`title_${lang}`],
        [`excerpt_${lang}`]: fields[`excerpt_${lang}`],
        [`content_${lang}`]: fields[`content_${lang}`],
        published: fields.published,
        featured_image: fields.featured_image,
      })
      .eq('id', post.id)

    if (error) {
      alert(`Error al guardar: ${error.message}`)
    } else {
      onSaved()
    }
    setSaving(false)
  }

  if (loading) return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg text-gray-600">Cargando...</div>
    </div>
  )

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg w-full max-w-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold">Editar Post</h2>

        {/* Selector de idioma */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setLang('es')}
            className={`px-4 py-2 rounded text-sm font-medium ${lang === 'es' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
          >
            Español
          </button>
          <button
            type="button"
            onClick={() => setLang('en')}
            className={`px-4 py-2 rounded text-sm font-medium ${lang === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
          >
            English
          </button>
        </div>

        <div className="space-y-3">
          <input
            placeholder="Título"
            value={fields[`title_${lang}`]}
            onChange={e => setFields(f => ({ ...f, [`title_${lang}`]: e.target.value }))}
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Extracto"
            value={fields[`excerpt_${lang}`]}
            onChange={e => setFields(f => ({ ...f, [`excerpt_${lang}`]: e.target.value }))}
            className="w-full p-2 border rounded h-20"
          />
          <textarea
            placeholder="Contenido"
            value={fields[`content_${lang}`]}
            onChange={e => setFields(f => ({ ...f, [`content_${lang}`]: e.target.value }))}
            className="w-full p-2 border rounded h-48"
          />
          <input
            placeholder="URL imagen destacada"
            value={fields.featured_image}
            onChange={e => setFields(f => ({ ...f, featured_image: e.target.value }))}
            className="w-full p-2 border rounded"
          />
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={fields.published}
              onChange={e => setFields(f => ({ ...f, published: e.target.checked }))}
            />
            Publicado
          </label>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">
            Cancelar
          </button>
          <button type="submit" disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">
            {saving ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  )
}