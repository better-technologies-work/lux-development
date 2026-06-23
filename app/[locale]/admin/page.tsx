'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import ProjectForm from '@/components/admin/ProjectForm'
import ProjectEditModal from '@/components/admin/ProjectEditModal'


export default function AdminDashboard() {
  const [projects, setProjects] = useState<any[]>([])
  const [editingProject, setEditingProject] = useState<any | null>(null)

  const fetchProjects = async () => {
    const { data } = await supabase
      .from('lux_projects')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setProjects(data)
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('¿Seguro que querés borrar este proyecto?')) return
    await supabase.from('lux_projects').delete().eq('id', id)
    fetchProjects()
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>

      {/* Formulario para CREAR un proyecto nuevo */}
      <ProjectForm onProjectAdded={fetchProjects} />

      <h2 className="text-2xl font-bold mt-12 mb-6">Proyectos Actuales</h2>

      <div className="grid gap-4">
        {projects.map((p) => (
          <div key={p.id} className="flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm">
            <div className="flex items-center gap-4">
              {p.images?.[0] && (
                <img src={p.images[0]} alt="Proyecto" className="w-16 h-16 object-cover rounded" />
              )}
              <span className="font-semibold">{p.title}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setEditingProject(p)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(p.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de EDICIÓN — solo se monta cuando hay un proyecto seleccionado */}
      {editingProject && (
        <ProjectEditModal
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onSaved={() => {
            setEditingProject(null)
            fetchProjects()
          }}
        />
      )}
    </div>
  )
}