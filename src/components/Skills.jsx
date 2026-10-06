import { skills } from '../data/skills'
import { useLang } from '../context/LanguageContext'
export default function Skills() {
  const { t } = useLang()
  return (
    <section className="container-x pb-20 sm:pb-28"><h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('skills')}</h2>
      <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">{skills.map(({ name, icon: Icon }) => (
        <li key={name} className="card group flex items-center gap-3 px-4 py-4 transition duration-300 hover:-translate-y-0.5 hover:border-accent/40">
          <Icon className="h-5 w-5 shrink-0 text-zinc-500 transition duration-300 group-hover:text-accent" aria-hidden /><span className="text-sm font-medium text-zinc-200">{name}</span></li>))}</ul></section>)
}
