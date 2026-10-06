import { Search } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
import { CATEGORIES } from '../data/translations'
export default function ProjectFilters({ query, setQuery, category, setCategory }) {
  const { t } = useLang()
  return (
    <div className="space-y-4">
      <div className="relative"><Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" aria-hidden />
        <input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder={t('search')} aria-label={t('search')} className="input !pl-11" /></div>
      <div className="flex flex-wrap gap-2" role="group" aria-label={t('category')}>
        {['all', ...CATEGORIES].map(c => <button key={c} onClick={() => setCategory(c)} aria-pressed={category === c}
          className={`rounded-full border px-4 py-1.5 text-sm transition duration-300 ${category === c ? 'border-white bg-white text-black' : 'border-white/10 text-zinc-400 hover:border-white/30 hover:text-white'}`}>{c === 'all' ? t('all') : c}</button>)}
      </div></div>)
}
