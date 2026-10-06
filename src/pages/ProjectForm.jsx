import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Loader2, Upload } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { CATEGORIES } from '../data/translations'
import { getProject, createProject, updateProject } from '../services/projectService'
import { uploadImage, validateImage } from '../services/storageService'
import { Spinner } from '../components/Loading'
const empty = { title_uz: '', title_en: '', description_uz: '', description_en: '', image_url: '', category: CATEGORIES[0], technologies: '', github_url: '', demo_url: '', featured: false }
const validUrl = (v) => { if (!v) return true; try { return ['http:', 'https:'].includes(new URL(v).protocol) } catch { return false } }
// One component for both CREATE (/new) and EDIT (/:id/edit)
export default function ProjectForm() {
  const { id } = useParams(); const editing = Boolean(id)
  const { t } = useLang(); const nav = useNavigate()
  const [f, setF] = useState(empty)
  const [file, setFile] = useState(null); const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(editing); const [busy, setBusy] = useState(false); const [error, setError] = useState('')
  useEffect(() => {
    if (!editing) return
    getProject(id).then(p => { setF({ ...empty, ...p, image_url: p.image_url || '', github_url: p.github_url || '', demo_url: p.demo_url || '', description_uz: p.description_uz || '', description_en: p.description_en || '', technologies: (p.technologies || []).join(', ') }); setPreview(p.image_url || '') })
      .catch(e => setError(t(e.message))).finally(() => setLoading(false))
  }, [id, editing]) // eslint-disable-line
  const set = (k) => (e) => setF(s => ({ ...s, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))
  const pickFile = (e) => {
    const file = e.target.files?.[0]; if (!file) return
    const err = validateImage(file); if (err) { setError(t(err)); e.target.value = ''; return }
    setError(''); setFile(file); setPreview(URL.createObjectURL(file))
  }
  const submit = async (e) => {
    e.preventDefault(); setError('')
    if (!f.title_uz.trim() || !f.title_en.trim()) return setError(t('requiredTitle'))
    if (!validUrl(f.github_url) || !validUrl(f.demo_url)) return setError(t('invalidUrl'))
    setBusy(true)
    try {
      const image_url = file ? await uploadImage(file) : f.image_url || null
      const payload = { title_uz: f.title_uz.trim(), title_en: f.title_en.trim(), description_uz: f.description_uz.trim(), description_en: f.description_en.trim(),
        image_url, category: f.category, technologies: f.technologies.split(',').map(s => s.trim()).filter(Boolean),
        github_url: f.github_url.trim() || null, demo_url: f.demo_url.trim() || null, featured: f.featured }
      editing ? await updateProject(id, payload) : await createProject(payload)
      nav('/admin')
    } catch (err) { setError(t(err.message)) } finally { setBusy(false) }
  }
  if (loading) return <Spinner full />
  const field = (k, label, props = {}) => <div><label htmlFor={k} className="mb-1.5 block text-sm text-zinc-400">{label}</label>
    {props.area ? <textarea id={k} rows={4} value={f[k]} onChange={set(k)} className="input" /> : <input id={k} value={f[k]} onChange={set(k)} className="input" {...props} />}</div>
  return (
    <main className="container-x max-w-2xl py-10">
      <Link to="/admin" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-white"><ArrowLeft size={16} />{t('dashboard')}</Link>
      <h1 className="mt-4 text-3xl font-bold text-white">{editing ? t('editProject') : t('addProject')}</h1>
      <form onSubmit={submit} className="mt-8 space-y-5">
        <div className="grid gap-5 sm:grid-cols-2">{field('title_uz', t('titleUz'), { required: true })}{field('title_en', t('titleEn'), { required: true })}</div>
        {field('description_uz', t('descUz'), { area: true })}{field('description_en', t('descEn'), { area: true })}
        <div><span className="mb-1.5 block text-sm text-zinc-400">{t('image')}</span>
          <div className="card flex flex-wrap items-center gap-4 p-3">
            <div className="h-20 w-32 shrink-0 overflow-hidden rounded-lg bg-white/5">{preview && <img src={preview} alt="" className="h-full w-full object-cover" />}</div>
            <label className="btn-ghost cursor-pointer focus-within:outline focus-within:outline-2 focus-within:outline-accent"><Upload size={15} />{busy && file ? t('uploading') : t('image')}
              <input type="file" accept="image/jpeg,image/png,image/webp" onChange={pickFile} className="sr-only" /></label></div></div>
        <div><label htmlFor="category" className="mb-1.5 block text-sm text-zinc-400">{t('category')}</label>
          <select id="category" value={f.category} onChange={set('category')} className="input">{CATEGORIES.map(c => <option key={c} className="bg-zinc-900">{c}</option>)}</select></div>
        {field('technologies', t('technologies'), { placeholder: 'React, Tailwind CSS, Supabase' })}
        <div className="grid gap-5 sm:grid-cols-2">{field('github_url', t('githubUrl'), { type: 'url', placeholder: 'https://github.com/...' })}{field('demo_url', t('demoUrl'), { type: 'url', placeholder: 'https://...' })}</div>
        <label className="flex items-center gap-3 text-sm text-zinc-300"><input type="checkbox" checked={f.featured} onChange={set('featured')} className="h-4 w-4 accent-sky-300" />{t('featuredLabel')}</label>
        {error && <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>}
        <div className="flex gap-3"><button disabled={busy} className="btn-primary">{busy && <Loader2 size={16} className="animate-spin" />}{busy ? t('saving') : t('save')}</button>
          <Link to="/admin" className="btn-ghost">{t('cancel')}</Link></div>
      </form></main>)
}
