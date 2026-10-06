import { Link } from 'react-router-dom'
import { Github } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { GITHUB } from '../data/translations'
export default function Hero() {
  const { t } = useLang()
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="drift absolute -left-24 top-10 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" />
      </div>
      <div className="container-x relative py-24 sm:py-36">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 font-mono text-xs text-zinc-300">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />{t('badge')}</span>
        <h1 className="mt-6 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">{t('heroTitle')}</h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">{t('heroText')}</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/projects" className="btn-primary">{t('viewProjects')}</Link>
          <a href={GITHUB} target="_blank" rel="noreferrer" className="btn-ghost"><Github size={16} />{t('github')}</a>
        </div>
      </div>
    </section>)
}
