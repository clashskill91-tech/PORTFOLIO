import { GraduationCap, Code2, Target } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
export default function About() {
  const { t } = useLang()
  const items = [[GraduationCap, 'aboutEdu', 'aboutEduText'], [Code2, 'aboutFocus', 'aboutFocusText'], [Target, 'aboutGoal', 'aboutGoalText']]
  return (
    <section id="about" className="container-x scroll-mt-20 py-20 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-3"><h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('aboutTitle')}</h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">{t('aboutText')}</p></div>
        <ul className="space-y-3 lg:col-span-2">{items.map(([Icon, h, p]) => (
          <li key={h} className="card flex gap-4 p-5 transition duration-300 hover:border-white/20">
            <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden /><div><p className="font-semibold text-white">{t(h)}</p><p className="mt-1 text-sm text-zinc-400">{t(p)}</p></div></li>))}</ul>
      </div></section>)
}
