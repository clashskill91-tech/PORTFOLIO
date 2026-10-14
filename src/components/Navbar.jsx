import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useLang } from '../context/LanguageContext'

export default function Navbar() {
  const { t, lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const { pathname, hash } = useLocation()

  const links = [['/', 'home'], ['/#about', 'about'], ['/projects', 'projects'], ['/#contact', 'contact']]

  const handleLinkClick = (event, to, key) => {
    setOpen(false)

    if (to === '/' && pathname === '/') {
      event.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    if (key === 'about' || key === 'contact') {
      if (pathname === '/') {
        event.preventDefault()
        const id = key === 'about' ? 'about' : 'contact'
        const section = document.getElementById(id)

        if (section) {
          const offset = 84
          const top = section.getBoundingClientRect().top + window.scrollY - offset
          window.scrollTo({ top, behavior: 'smooth' })
        }
      }
    }
  }

  useEffect(() => {
    if (!hash) return

    const id = hash.replace('#', '')
    const section = document.getElementById(id)

    if (section) {
      const offset = 84
      const top = section.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }, [pathname, hash])

  const isActiveLink = (key) => {
    if (key === 'home') return pathname === '/' && !hash
    if (key === 'about') return pathname === '/' && hash === '#about'
    if (key === 'contact') return pathname === '/' && hash === '#contact'
    return pathname === '/projects' && key === 'projects'
  }

  const Lang = (
    <div className="flex rounded-full border border-white/10 p-0.5 text-xs font-medium" role="group" aria-label="Language">
      {['uz', 'en'].map(l => <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l}
        className={`rounded-full px-3 py-1 uppercase transition duration-300 ${lang === l ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}>{l}</button>)}
    </div>)

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/80 backdrop-blur-xl">
      <nav className="container-x flex h-16 items-center justify-between" aria-label="Main">
        <Link to="/" onClick={(event) => handleLinkClick(event, '/', 'home')} className="text-lg font-bold tracking-tight text-white">Shamsiddin<span className="text-accent">.</span></Link>
        <div className="hidden items-center gap-8 md:flex">
          {links.map(([to, k]) => <Link key={k} to={to} onClick={(event) => handleLinkClick(event, to, k)} className={`text-sm transition duration-300 hover:text-white ${isActiveLink(k) ? 'text-white' : 'text-zinc-400'}`}>{t(k)}</Link>)}
          {Lang}
        </div>
        <div className="flex items-center gap-3 md:hidden">{Lang}
          <button onClick={() => setOpen(o => !o)} aria-label="Menu" aria-expanded={open} className="rounded-lg p-2 text-zinc-300 hover:bg-white/10">{open ? <X size={20} /> : <Menu size={20} />}</button></div>
      </nav>
      {open && <div className="border-t border-white/10 md:hidden"><div className="container-x flex flex-col py-2">
        {links.map(([to, k]) => <Link key={k} to={to} onClick={(event) => handleLinkClick(event, to, k)} className="py-3 text-zinc-300 hover:text-white">{t(k)}</Link>)}</div></div>}
    </header>)
}
