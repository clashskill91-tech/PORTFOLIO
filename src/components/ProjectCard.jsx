import { memo } from 'react'
import { Github, ExternalLink, ImageOff } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
function ProjectCard({ project: p }) {
  const { t, pick } = useLang()
  const title = pick(p, 'title')
  return (
    <article className="card group flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:border-white/20">
      <div className="aspect-video overflow-hidden bg-white/[0.04]">
        {p.image_url ? <img src={p.image_url} alt={title} loading="lazy" decoding="async" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
          : <div className="flex h-full flex-col items-center justify-center gap-2 text-zinc-600"><ImageOff size={24} aria-hidden /><span className="text-xs">{t('noImage')}</span></div>}
      </div>
      <div className="flex flex-1 flex-col p-5">
        {p.category && <p className="font-mono text-xs text-accent">{p.category}</p>}
        <h3 className="mt-1 text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-400">{pick(p, 'description')}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5">{(p.technologies || []).map(x => <li key={x} className="rounded-md border border-white/10 px-2 py-0.5 text-xs text-zinc-400">{x}</li>)}</ul>
        <div className="mt-auto flex gap-2 pt-5">
          {p.github_url && <a href={p.github_url} target="_blank" rel="noreferrer" aria-label={`${title} — GitHub`} className="btn-ghost !px-4 !py-2"><Github size={15} />{t('code')}</a>}
          {p.demo_url && <a href={p.demo_url} target="_blank" rel="noreferrer" aria-label={`${title} — Live demo`} className="btn-primary !px-4 !py-2"><ExternalLink size={15} />{t('demo')}</a>}
        </div>
      </div>
    </article>)
}
export default memo(ProjectCard)
