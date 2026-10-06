import { Link } from 'react-router-dom'
import { Mail, ArrowUpRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import ProjectGrid from '../components/ProjectGrid'
import Footer from '../components/Footer'
import { useProjects } from '../hooks/useProjects'
import { useLang } from '../context/LanguageContext'
import { EMAIL } from '../data/translations'
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
      <section id="contact" className="container-x scroll-mt-20 pb-24">
        <div className="card flex flex-col items-start justify-between gap-6 p-8 sm:flex-row sm:items-center sm:p-12">
          <div><h2 className="text-2xl font-bold text-white sm:text-3xl">{t('contactTitle')}</h2><p className="mt-2 text-zinc-400">{t('contactText')}</p></div>
          <a href={EMAIL ? `mailto:${EMAIL}` : 'https://github.com/'} className="btn-primary shrink-0"><Mail size={16} />{t('writeMe')}</a></div>
      </section>
    </main>
    <Footer /></>)
}
