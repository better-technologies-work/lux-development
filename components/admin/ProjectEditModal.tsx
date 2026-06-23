'use client'
import { useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'

interface Props {
  project: any
  onClose: () => void
  onSaved: () => void
}

export default function ProjectEditModal({ project, onClose, onSaved }: Props) {
  const [form, setForm] = useState({
    title: project.title ?? '',
    description: project.description ?? '',
    location: project.location ?? '',
    status: project.status ?? 'available',
    price: project.price ?? '',
    currency: project.currency ?? 'USD',
    category: project.category ?? 'residential',
    external_link: project.external_link ?? '',
    featured: project.featured ?? false,
    images: (project.images ?? []) as string[],
  })
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = async (files: FileList) => {
    setUploading(true)
    const uploaded: string[] = []

    for (const file of Array.from(files)) {
      const ext = file.name.split('.').pop()
      const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error } = await supabase.storage
        .from('lux-projects')
        .upload(filename, file, { cacheControl: '3600', upsert: false })

      if (!error) {
        const { data } = supabase.storage.from('lux-projects').getPublicUrl(filename)
        uploaded.push(data.publicUrl)
      }
    }

    setForm((f) => ({ ...f, images: [...f.images, ...uploaded] }))
    setUploading(false)
  }

  const removeImage = async (url: string) => {
    const filename = url.split('/lux-projects/')[1]
    if (filename) await supabase.storage.from('lux-projects').remove([filename])
    setForm((f) => ({ ...f, images: f.images.filter((i) => i !== url) }))
  }

  const handleSave = async () => {
    if (!form.title.trim()) return alert('El título es obligatorio')
    setSaving(true)

    const { error } = await supabase
      .from('lux_projects')
      .update({
        ...form,
        price: form.price ? Number(form.price) : null,
      })
      .eq('id', project.id)

    setSaving(false)
    if (error) return alert('Error al guardar: ' + error.message)
    onSaved()
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl my-8 shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Editar proyecto</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition text-xl leading-none">✕</button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
            <input
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              rows={3}
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
              <input
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
              <select
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="available">Disponible</option>
                <option value="sold">Vendido</option>
                <option value="coming_soon">Próximamente</option>
                <option value="reserved">Reservado</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Moneda</label>
              <select
                value={form.currency}
                onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="USD">USD ($)</option>
                <option value="PYG">PYG (₲)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
              <select
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="residential">Residencial</option>
                <option value="commercial">Comercial</option>
                <option value="land">Terreno</option>
                <option value="luxury">Lujo</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Link externo</label>
            <input
              value={form.external_link}
              onChange={(e) => setForm((f) => ({ ...f, external_link: e.target.value }))}
              placeholder="https://..."
              className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Imágenes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Imágenes</label>

            {/* Zona de subida */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-xl p-5 text-center cursor-pointer transition mb-3"
            >
              {uploading ? (
                <p className="text-sm text-gray-400">Subiendo imágenes...</p>
              ) : (
                <>
                  <p className="text-sm text-gray-500">Hacé clic para subir imágenes</p>
                  <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP</p>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
            />

            {/* Preview */}
            {form.images.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {form.images.map((url, i) => (
                  <div key={url} className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100">
                    <img src={url} alt="" className="w-full h-full object-cover" />
                    <button
                      onClick={() => removeImage(url)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 text-xs opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
                    >
                      ✕
                    </button>
                    {i === 0 && (
                      <span className="absolute bottom-1 left-1 bg-yellow-400 text-black text-[9px] font-bold px-1 rounded">
                        PORTADA
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Destacado */}
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
              className="w-4 h-4 rounded"
            />
            <span className="text-sm text-gray-700">Destacar en la home</span>
          </label>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition disabled:opacity-50"
          >
            {saving ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </div>
      </div>
    </div>
  )
}