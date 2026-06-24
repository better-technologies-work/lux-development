'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import ProjectForm from '@/components/admin/ProjectForm'
import ProjectEditModal from '@/components/admin/ProjectEditModal'
import BlogForm from '@/components/admin/BlogForm'
import BlogEditModal from '@/components/admin/BlogEditModal'

export default function AdminDashboard() {
  const [projects, setProjects] = useState<any[]>([])
  const [editingProject, setEditingProject] = useState<any | null>(null)
  const [posts, setPosts] = useState<any[]>([])
  const [editingPost, setEditingPost] = useState<any | null>(null)
  const [activeTab, setActiveTab] = useState<'projects' | 'blog'>('projects')

  const fetchProjects = async () => {
    const { data } = await supabase
      .from('lux_projects')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setProjects(data)
  }

  const fetchPosts = async () => {
    const { data } = await supabase
      .from('lux_blog_posts')
      .select('*')
      .order('created_at', { ascending: false })
    if (data) setPosts(data)
  }

  useEffect(() => {
    fetchProjects()
    fetchPosts()
  }, [])

  const handleDeleteProject = async (id: string) => {
    if (!confirm('¿Seguro que querés borrar este proyecto?')) return
    await supabase.from('lux_projects').delete().eq('id', id)
    fetchProjects()
  }

  const handleDeletePost = async (id: string) => {
    if (!confirm('¿Seguro que querés borrar este post del blog?')) return
    await supabase.from('lux_blog_posts').delete().eq('id', id)
    fetchPosts()
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b px-4 sm:px-8 py-4 sticky top-0 z-10">
        <h1 className="text-xl sm:text-3xl font-bold text-gray-900">Panel de Administración</h1>
      </div>

      {/* Tabs mobile */}
      <div className="flex border-b bg-white sticky top-[60px] z-10">
        <button
          onClick={() => setActiveTab('projects')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === 'projects'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500'
          }`}
        >
          Proyectos ({projects.length})
        </button>
        <button
          onClick={() => setActiveTab('blog')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            activeTab === 'blog'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500'
          }`}
        >
          Blog ({posts.length})
        </button>
      </div>

      <div className="px-4 sm:px-8 py-6 max-w-4xl mx-auto">

        {/* --- PROYECTOS --- */}
        {activeTab === 'projects' && (
          <div>
            <ProjectForm onProjectAdded={fetchProjects} />

            <div className="grid gap-3 mt-6">
              {projects.map((p) => (
                <div
                  key={p.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border rounded-xl shadow-sm gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{p.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{p.location || '—'}</p>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => setEditingProject(p)}
                      className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white text-sm rounded-lg"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteProject(p.id)}
                      className="flex-1 sm:flex-none px-4 py-2 bg-red-500 text-white text-sm rounded-lg"
                    >
                      Borrar
                    </button>
                  </div>
                </div>
              ))}

              {projects.length === 0 && (
                <p className="text-center text-gray-400 py-10 text-sm">No hay proyectos aún.</p>
              )}
            </div>
          </div>
        )}

        {/* --- BLOG --- */}
        {activeTab === 'blog' && (
          <div>
            <BlogForm onPostAdded={fetchPosts} />

            <div className="grid gap-3 mt-6">
              {posts.map((p) => (
                <div
                  key={p.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border rounded-xl shadow-sm gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">
                      {p.title_es || p.title_en || '(sin título)'}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        p.published
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {p.published ? 'Publicado' : 'Borrador'}
                      </span>
                      {p.external_url && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                          Externo
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => setEditingPost(p)}
                      className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white text-sm rounded-lg"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeletePost(p.id)}
                      className="flex-1 sm:flex-none px-4 py-2 bg-red-500 text-white text-sm rounded-lg"
                    >
                      Borrar
                    </button>
                  </div>
                </div>
              ))}

              {posts.length === 0 && (
                <p className="text-center text-gray-400 py-10 text-sm">No hay posts aún.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modales */}
      {editingProject && (
        <ProjectEditModal
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onSaved={() => { setEditingProject(null); fetchProjects() }}
        />
      )}
      {editingPost && (
        <BlogEditModal
          post={editingPost}
          onClose={() => setEditingPost(null)}
          onSaved={() => { setEditingPost(null); fetchPosts() }}
        />
      )}
    </div>
  )
}