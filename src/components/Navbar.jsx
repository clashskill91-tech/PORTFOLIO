import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useLang } from '../context/LanguageContext'
export default function Navbar() {
  const { t, lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const links = [['/', 'home'], ['/projects', 'projects'], ['/#contact', 'contact']]
  const Lang = (
    <div className="flex rounded-full border border-white/10 p-0.5 text-xs font-medium" role="group" aria-label="Language">
      {['uz', 'en'].map(l => <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l}
        className={`rounded-full px-3 py-1 uppercase transition duration-300 ${lang === l ? 'bg-white text-black' : 'text-zinc-400 hover:text-white'}`}>{l}</button>)}
    </div>)
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/80 backdrop-blur-xl">
      <nav className="container-x flex h-16 items-center justify-between" aria-label="Main">
        <Link to="/" className="text-lg font-bold tracking-tight text-white">Shamsiddin<span className="text-accent">.</span></Link>
        <div className="hidden items-center gap-8 md:flex">
          {links.map(([to, k]) => <Link key={k} to={to} className={`text-sm transition duration-300 hover:text-white ${pathname === to ? 'text-white' : 'text-zinc-400'}`}>{t(k)}</Link>)}
          {Lang}
        </div>
        <div className="flex items-center gap-3 md:hidden">{Lang}
          <button onClick={() => setOpen(o => !o)} aria-label="Menu" aria-expanded={open} className="rounded-lg p-2 text-zinc-300 hover:bg-white/10">{open ? <X size={20} /> : <Menu size={20} />}</button></div>
      </nav>
      {open && <div className="border-t border-white/10 md:hidden"><div className="container-x flex flex-col py-2">
        {links.map(([to, k]) => <Link key={k} to={to} onClick={() => setOpen(false)} className="py-3 text-zinc-300 hover:text-white">{t(k)}</Link>)}</div></div>}
    </header>)
}
