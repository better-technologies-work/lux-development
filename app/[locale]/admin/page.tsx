'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import ProjectForm from '@/components/admin/ProjectForm'
import ProjectEditModal from '@/components/admin/ProjectEditModal'
import BlogForm from '@/components/admin/BlogForm'
import BlogEditModal from '@/components/admin/BlogEditModal'

const ADMIN_PASSWORD = 'lux2024' // ← cambiá esto

// ─── LOGIN ───────────────────────────────────────────────
function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem('lux_admin_auth', 'true')
      onLogin()
    } else {
      setError('Contraseña incorrecta')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Lux Development</h1>
          <p className="text-sm text-gray-500 mt-1">Panel de Administración</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm transition"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── CAMBIAR CONTRASEÑA ──────────────────────────────────
function ChangePasswordModal({ onClose }: { onClose: () => void }) {
  const [current, setCurrent] = useState('')
  const [newPass, setNewPass] = useState('')
  const [confirm, setConfirm] = useState('')
  const [msg, setMsg] = useState('')

  const handleChange = (e: React.FormEvent) => {
    e.preventDefault()
    if (current !== ADMIN_PASSWORD) return setMsg('Contraseña actual incorrecta')
    if (newPass.length < 6) return setMsg('Mínimo 6 caracteres')
    if (newPass !== confirm) return setMsg('Las contraseñas no coinciden')

    // Guardamos en localStorage como nueva clave temporal de sesión
    localStorage.setItem('lux_admin_password', newPass)
    setMsg('✓ Contraseña actualizada para esta sesión')
    setTimeout(onClose, 1500)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm space-y-4">
        <h2 className="text-lg font-bold">Cambiar contraseña</h2>

        <form onSubmit={handleChange} className="space-y-3">
          <input
            type="password"
            placeholder="Contraseña actual"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            required
            className="w-full px-3 py-2.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Nueva contraseña"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            required
            className="w-full px-3 py-2.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Confirmar nueva contraseña"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
            className="w-full px-3 py-2.5 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />

          {msg && (
            <p className={`text-sm text-center ${msg.startsWith('✓') ? 'text-green-600' : 'text-red-500'}`}>
              {msg}
            </p>
          )}

          <div className="flex gap-2 pt-1">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 bg-gray-100 rounded-lg text-sm font-medium">
              Cancelar
            </button>
            <button type="submit" className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── DASHBOARD ───────────────────────────────────────────
export default function AdminDashboard() {
  const [authed, setAuthed] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [projects, setProjects] = useState<any[]>([])
  const [editingProject, setEditingProject] = useState<any | null>(null)
  const [posts, setPosts] = useState<any[]>([])
  const [editingPost, setEditingPost] = useState<any | null>(null)
  const [activeTab, setActiveTab] = useState<'projects' | 'blog'>('projects')
  const [showChangePassword, setShowChangePassword] = useState(false)

  useEffect(() => {
    const auth = sessionStorage.getItem('lux_admin_auth')
    setAuthed(auth === 'true')
    setCheckingAuth(false)
  }, [])

  const fetchProjects = async () => {
    const { data } = await supabase.from('lux_projects').select('*').order('created_at', { ascending: false })
    if (data) setProjects(data)
  }

  const fetchPosts = async () => {
    const { data } = await supabase.from('lux_blog_posts').select('*').order('created_at', { ascending: false })
    if (data) setPosts(data)
  }

  useEffect(() => {
    if (authed) {
      fetchProjects()
      fetchPosts()
    }
  }, [authed])

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

  const handleLogout = () => {
   sessionStorage.removeItem('lux_admin_auth')
    setAuthed(false)
  }

  if (checkingAuth) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <p className="text-gray-400 text-sm">Cargando...</p>
    </div>
  )

  if (!authed) return <LoginScreen onLogin={() => setAuthed(true)} />

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b px-4 sm:px-8 py-3 sticky top-0 z-10 flex items-center justify-between gap-2">
        <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">Panel Admin</h1>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setShowChangePassword(true)}
            className="text-xs sm:text-sm px-3 py-1.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition"
          >
            🔑 Clave
          </button>
          <button
            onClick={handleLogout}
            className="text-xs sm:text-sm px-3 py-1.5 bg-red-50 border border-red-200 rounded-lg text-red-600 hover:bg-red-100 transition"
          >
            Salir
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b bg-white sticky top-[57px] z-10">
        <button
          onClick={() => setActiveTab('projects')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'projects' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
        >
          Proyectos ({projects.length})
        </button>
        <button
          onClick={() => setActiveTab('blog')}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${activeTab === 'blog' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
        >
          Blog ({posts.length})
        </button>
      </div>

      <div className="px-4 sm:px-8 py-6 max-w-4xl mx-auto">
        {activeTab === 'projects' && (
          <div>
            <ProjectForm onProjectAdded={fetchProjects} />
            <div className="grid gap-3 mt-6">
              {projects.map((p) => (
                <div key={p.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border rounded-xl shadow-sm gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{p.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{p.location || '—'}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingProject(p)} className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white text-sm rounded-lg">Editar</button>
                    <button onClick={() => handleDeleteProject(p.id)} className="flex-1 sm:flex-none px-4 py-2 bg-red-500 text-white text-sm rounded-lg">Borrar</button>
                  </div>
                </div>
              ))}
              {projects.length === 0 && <p className="text-center text-gray-400 py-10 text-sm">No hay proyectos aún.</p>}
            </div>
          </div>
        )}

        {activeTab === 'blog' && (
          <div>
            <BlogForm onPostAdded={fetchPosts} />
            <div className="grid gap-3 mt-6">
              {posts.map((p) => (
                <div key={p.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white border rounded-xl shadow-sm gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 truncate">{p.title_es || p.title_en || '(sin título)'}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${p.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                        {p.published ? 'Publicado' : 'Borrador'}
                      </span>
                      {p.external_url && <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">Externo</span>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setEditingPost(p)} className="flex-1 sm:flex-none px-4 py-2 bg-blue-600 text-white text-sm rounded-lg">Editar</button>
                    <button onClick={() => handleDeletePost(p.id)} className="flex-1 sm:flex-none px-4 py-2 bg-red-500 text-white text-sm rounded-lg">Borrar</button>
                  </div>
                </div>
              ))}
              {posts.length === 0 && <p className="text-center text-gray-400 py-10 text-sm">No hay posts aún.</p>}
            </div>
          </div>
        )}
      </div>

      {editingProject && (
        <ProjectEditModal project={editingProject} onClose={() => setEditingProject(null)} onSaved={() => { setEditingProject(null); fetchProjects() }} />
      )}
      {editingPost && (
        <BlogEditModal post={editingPost} onClose={() => setEditingPost(null)} onSaved={() => { setEditingPost(null); fetchPosts() }} />
      )}
      {showChangePassword && (
        <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
      )}
    </div>
  )
}