'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function ProjectForm({ onProjectAdded }: { onProjectAdded: () => void }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [externalLink, setExternalLink] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return alert('Selecciona una imagen')

    setUploading(true)

    try {
      // 1. Subir la imagen a Supabase Storage
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('lux-projects')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      // 2. Obtener la URL pública de la imagen
      const { data: { publicUrl } } = supabase.storage
        .from('lux-projects')
        .getPublicUrl(filePath)

      // 3. Guardar el proyecto en la base de datos lux_projects
      const { error: dbError } = await supabase
        .from('lux_projects')
        .insert([
          {
            title,
            description,
            price: price ? parseFloat(price) : null,
            external_link: externalLink,
            images: [publicUrl],
            status: 'available',
            category: 'residential'
          }
        ])

      if (dbError) throw dbError

      alert('Proyecto creado exitosamente')
      // Limpiar formulario
      setTitle('')
      setDescription('')
      setPrice('')
      setExternalLink('')
      setFile(null)
      onProjectAdded() // Actualiza la lista en el dashboard
    } catch (error: any) {
      alert('Error al crear el proyecto: ' + error.message)
    } finally {
      setUploading(false)
    }
  }

 return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-5 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Subir Nuevo Proyecto</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Título</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required 
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
          className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Precio (USD)</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} 
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Link externo</label>
          <input type="url" value={externalLink} onChange={(e) => setExternalLink(e.target.value)} 
            className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Imagen del proyecto</label>
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} required 
          className="mt-1 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
      </div>

      <button type="submit" disabled={uploading} 
        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50 shadow-md">
        {uploading ? 'Subiendo datos e imagen...' : 'Publicar Proyecto'}
      </button>
    </form>
  )
}