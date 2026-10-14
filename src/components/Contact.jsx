import { Mail, Github, ArrowUpRight } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { GITHUB, EMAIL } from '../data/translations'
export default function Contact() {
  const { t } = useLang()
  const rows = [
    EMAIL && { icon: Mail, label: 'Email', value: EMAIL, href: `mailto:${EMAIL}` },
    { icon: Github, label: 'GitHub', value: GITHUB.replace('https://', ''), href: GITHUB },
  ].filter(Boolean)
  return (
    <section id="contact" className="scroll-mt-20 border-t border-white/10 bg-white/[0.02]">
      <div className="container-x grid gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:gap-20">
        <div>
          <p className="font-mono text-sm text-accent">/ {t('contactLabel')}</p>
          <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl">{t('contactTitle')}</h2>
          <p className="mt-5 max-w-md text-zinc-400">{t('contactText')}</p>
          <p className="mt-8 inline-flex items-center gap-2 text-sm text-zinc-300">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" /></span>{t('available')}</p>
        </div>
        <ul className="divide-y divide-white/10 self-center border-y border-white/10">
          {rows.map(({ icon: Icon, label, value, href }) => (
            <li key={label}><a href={href} target={label === 'Email' ? undefined : '_blank'} rel="noreferrer" className="group flex items-center gap-4 py-6 transition duration-300 hover:pl-2">
              <Icon className="h-5 w-5 shrink-0 text-zinc-500 transition duration-300 group-hover:text-accent" aria-hidden />
              <span className="min-w-0 flex-1"><span className="block text-xs uppercase tracking-widest text-zinc-500">{label}</span><span className="block truncate text-lg font-medium text-white">{value}</span></span>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-zinc-600 transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" aria-hidden /></a></li>))}
        </ul>
      </div>
    </section>)
}
