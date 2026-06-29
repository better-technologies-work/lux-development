'use client'
import { useState, useRef } from 'react'
import { supabase } from '@/lib/supabase'

export default function ProjectForm({ onProjectAdded }: { onProjectAdded: () => void }) {

  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    currency: 'USD',
    status: 'available',
    category: 'residential',
    external_link: '',
    featured: false,
    estimated_time: '', 
    expected_return: '',// <-- Agregado aquí
  })
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (selected: FileList | null) => {
    if (!selected) return
    const arr = Array.from(selected)
    setFiles((prev) => [...prev, ...arr])
    setPreviews((prev) => [...prev, ...arr.map((f) => URL.createObjectURL(f))])
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
    setPreviews((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) return alert('El título es obligatorio')
    if (files.length === 0) return alert('Agregá al menos una imagen')

    setUploading(true)

    try {
      // 1. Subir todas las imágenes al bucket
      const uploadedUrls: string[] = []

      for (const file of files) {
        const ext = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`

        const { error: uploadError } = await supabase.storage
          .from('lux-projects')
          .upload(fileName, file, { cacheControl: '3600', upsert: false })

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('lux-projects')
          .getPublicUrl(fileName)

        uploadedUrls.push(publicUrl)
      }

      // 2. Insertar el proyecto con todas las imágenes
      const { error: dbError } = await supabase
        .from('lux_projects')
        .insert([{
          title_es: form.title,
          title_en: form.title,              
          description_es: form.description,
          description_en: form.description,  

          location: form.location,
          price: form.price ? parseFloat(form.price) : null,
          currency: form.currency,
          status: form.status,
          category: form.category,
          external_link: form.external_link,
          images: uploadedUrls,
          featured: form.featured,
          estimated_time: form.estimated_time || null,
          expected_return: form.expected_return || null,
        }])

      if (dbError) {
        console.error('Supabase error:', dbError)
        console.log('message:', dbError.message)
        console.log('details:', dbError.details)
        console.log('hint:', dbError.hint)
        console.log('code:', dbError.code)

        alert(
          `Message: ${dbError.message}\n\n` +
          `Details: ${dbError.details}\n\n` +
          `Hint: ${dbError.hint}\n\n` +
          `Code: ${dbError.code}`
        )

        return
      }

      alert('Proyecto creado exitosamente')

      // Limpiar formulario
      setForm({
        title: '',
        description: '',
        location: '',
        price: '',
        currency: 'USD',
        status: 'available',
        category: 'residential',
        external_link: '',
        featured: false,
        estimated_time: '',
        expected_return: '',
      })
      setFiles([])
      setPreviews([])
      onProjectAdded()

    } catch (error: any) {
      alert('Error: ' + error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-5 bg-white p-4 sm:p-6 rounded-xl border border-gray-200 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900 border-b pb-2">Nuevo Proyecto</h2>

      {/* Título */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Título *</label>
        <input
          type="text"
          value={form.title}

          onChange={(e) =>
            setForm((f) => ({ ...f, title: e.target.value }))
          }
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
        />
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
        <textarea
          value={form.description}

          onChange={(e) =>
            setForm((f) => ({ ...f, description: e.target.value }))
          }
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm resize-none"
        />
      </div>

      {/* Ubicación + Estado */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
          <input
            type="text"
            value={form.location}
            onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
            placeholder="Ej: Asunción, PY"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Estado</label>
          <select
            value={form.status}
            onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          >
            <option value="available">Disponible</option>
            <option value="sold">Vendido</option>
            <option value="coming_soon">Próximamente</option>
            <option value="reserved">Reservado</option>
          </select>
        </div>
      </div>

      {/* Precio + Moneda + Categoría */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
          <input
            type="number"
            value={form.price}
            onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
            placeholder="0"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Moneda</label>
          <select
            value={form.currency}
            onChange={(e) => setForm((f) => ({ ...f, currency: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          >
            <option value="residential">Residencial</option>
            <option value="commercial">Comercial</option>
            <option value="land">Terreno</option>
            <option value="luxury">Lujo</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tiempo estimado</label>
        <input
          type="text"
          placeholder="Ej: 3 meses"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          value={form.estimated_time} // Usamos 'form'
          onChange={(e) => setForm((f) => ({ ...f, estimated_time: e.target.value }))} // Usamos 'setForm'
        />
      </div>
          <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">Retorno esperado</label>
  <input
    type="text"
    placeholder="Ej: 12% anual"
    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
    value={form.expected_return}
    onChange={(e) => setForm((f) => ({ ...f, expected_return: e.target.value }))}
  />
</div>
      

      {/* Link externo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Link externo</label>
        <input
          type="url"
          value={form.external_link}
          onChange={(e) => setForm((f) => ({ ...f, external_link: e.target.value }))}
          placeholder="https://..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
        />
      </div>

      {/* Imágenes */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Imágenes * <span className="text-gray-400 font-normal">(podés subir varias)</span>
        </label>

        {/* Zona de clic */}
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-xl p-6 text-center cursor-pointer transition mb-3"
        >
          <p className="text-sm text-gray-500">Hacé clic para agregar imágenes</p>
          <p className="text-xs text-gray-400 mt-1">JPG, PNG, WEBP</p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFileChange(e.target.files)}
        />

        {/* Previews */}
        {previews.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {previews.map((src, i) => (
              <div key={i} className="relative group aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img src={src} alt="" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeFile(i)}
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

      <button
        type="submit"
        disabled={uploading}
        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50 shadow-md text-sm"
      >
        {uploading ? 'Subiendo...' : 'Publicar Proyecto'}
      </button>
    </form>
  )
}