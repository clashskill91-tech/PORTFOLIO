import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Plus, Pencil, Trash2, LogOut, Star, FolderKanban, Home } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LanguageContext'
import { useProjects } from '../hooks/useProjects'
import { deleteProject } from '../services/projectService'
import { Spinner } from '../components/Loading'
import EmptyState from '../components/EmptyState'
export default function AdminDashboard() {
  const { t, pick, lang, setLang } = useLang()
  const { logout, user } = useAuth()
  const nav = useNavigate()
  const { projects, loading, error, reload } = useProjects()
  const [target, setTarget] = useState(null)
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')
  const confirmDelete = async () => {
    setBusy(true); setMsg('')
    try { await deleteProject(target.id); setTarget(null); await reload() } catch (e) { setMsg(t(e.message)); setTarget(null) } finally { setBusy(false) }
  }
  const out = async () => { await logout(); nav('/admin/login') }
  const stat = (Icon, label, v) => <div className="card flex items-center gap-4 p-5"><Icon className="h-5 w-5 text-accent" aria-hidden /><div><p className="text-2xl font-bold text-white">{v}</p><p className="text-sm text-zinc-500">{label}</p></div></div>
  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10"><div className="container-x flex min-h-16 flex-wrap items-center justify-between gap-3 py-3">
        <div className="flex items-center gap-4"><Link to="/" aria-label={t('home')} className="rounded-lg p-2 text-zinc-400 hover:bg-white/10 hover:text-white"><Home size={18} /></Link>
          <h1 className="font-semibold text-white">{t('dashboard')}</h1></div>
        <div className="flex items-center gap-2">
          <button onClick={() => setLang(lang === 'uz' ? 'en' : 'uz')} className="btn-ghost !px-3 !py-1.5 uppercase">{lang === 'uz' ? 'en' : 'uz'}</button>
          <span className="hidden max-w-[180px] truncate text-sm text-zinc-500 sm:block">{user?.email}</span>
          <button onClick={out} className="btn-ghost !px-4 !py-1.5"><LogOut size={15} />{t('logout')}</button></div></div></header>
      <main className="container-x py-10">
        <div className="grid gap-4 sm:grid-cols-3">
          {stat(FolderKanban, t('total'), projects.length)}{stat(Star, t('featuredCount'), projects.filter(p => p.featured).length)}
          <Link to="/admin/projects/new" className="btn-primary !rounded-2xl !py-5"><Plus size={18} />{t('addProject')}</Link></div>
        {msg && <p role="alert" className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{msg}</p>}
        <div className="mt-8 space-y-3">
          {loading ? <Spinner /> : error ? <EmptyState title={t('loadError')} action={<button onClick={reload} className="btn-ghost">{t('retry')}</button>} />
            : projects.length === 0 ? <EmptyState title={t('noProjects')} /> : projects.map(p => (
            <div key={p.id} className="card flex flex-wrap items-center gap-4 p-3 sm:flex-nowrap">
              <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-white/5">{p.image_url && <img src={p.image_url} alt="" loading="lazy" className="h-full w-full object-cover" />}</div>
              <div className="min-w-0 flex-1 basis-40"><p className="truncate font-medium text-white">{pick(p, 'title')}</p>
                <p className="mt-0.5 flex items-center gap-2 text-xs text-zinc-500"><span>{p.category}</span>{p.featured && <span className="inline-flex items-center gap-1 text-accent"><Star size={12} />{t('featuredCount')}</span>}</p></div>
              <div className="flex gap-2">
                <Link to={`/admin/projects/${p.id}/edit`} aria-label={`${t('edit')}: ${pick(p, 'title')}`} className="btn-ghost !p-2.5"><Pencil size={15} /></Link>
                <button onClick={() => setTarget(p)} aria-label={`${t('delete')}: ${pick(p, 'title')}`} className="btn-ghost !p-2.5 hover:!border-red-500/40 hover:!text-red-400"><Trash2 size={15} /></button></div>
            </div>))}
        </div></main>
      {target && <div role="dialog" aria-modal="true" aria-labelledby="dlg" className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5 backdrop-blur-sm">
        <div className="card w-full max-w-sm bg-zinc-950 p-6"><p id="dlg" className="font-semibold text-white">{t('confirmDelete')}</p><p className="mt-1 truncate text-sm text-zinc-500">{pick(target, 'title')}</p>
          <div className="mt-6 flex justify-end gap-2"><button autoFocus onClick={() => setTarget(null)} disabled={busy} className="btn-ghost">{t('cancel')}</button>
            <button onClick={confirmDelete} disabled={busy} className="btn-danger">{t('delete')}</button></div></div></div>}
    </div>)
}
