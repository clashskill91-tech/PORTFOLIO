import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import ProjectGrid from '../components/ProjectGrid'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { useProjects } from '../hooks/useProjects'
import { useLang } from '../context/LanguageContext'
export default function Home() {
  const { t } = useLang()
  const featured = useProjects({ featured: true })
  return (<>
    <Navbar />
    <main>
      <Hero /><About /><Skills />
      <section className="container-x pb-20 sm:pb-28">
        <div className="mb-8 flex items-end justify-between gap-4"><h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t('featured')}</h2>
          <Link to="/projects" className="inline-flex shrink-0 items-center gap-1 text-sm text-zinc-400 transition duration-300 hover:text-white">{t('seeAll')}<ArrowUpRight size={16} /></Link></div>
        <ProjectGrid {...featured} />
      </section>
    </main>
    <Contact />
    <Footer /></>)
}
