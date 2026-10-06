import { useMemo, useState, useDeferredValue } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ProjectFilters from '../components/ProjectFilters'
import ProjectGrid from '../components/ProjectGrid'
import { useProjects } from '../hooks/useProjects'
import { useLang } from '../context/LanguageContext'
export default function ProjectsPage() {
  const { t } = useLang()
  const data = useProjects()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')
  const q = useDeferredValue(query).trim().toLowerCase()
  const filtered = useMemo(() => data.projects.filter(p =>
    (category === 'all' || p.category === category) &&
    (!q || [p.title_uz, p.title_en, p.description_uz, p.description_en, p.category, ...(p.technologies || [])].some(v => v?.toLowerCase().includes(q)))), [data.projects, q, category])
  return (<><Navbar />
    <main className="container-x py-14 sm:py-20">
      <h1 className="mb-8 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{t('allProjects')}</h1>
      <div className="mb-10"><ProjectFilters {...{ query, setQuery, category, setCategory }} /></div>
      <ProjectGrid {...data} projects={filtered} />
    </main><Footer /></>)
}
