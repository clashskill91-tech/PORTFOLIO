import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
export default function Footer() {
  const { t } = useLang()
  return <footer className="border-t border-white/10 py-8"><div className="container-x flex flex-col items-center justify-between gap-3 text-sm text-zinc-500 sm:flex-row">
    <p>© {new Date().getFullYear()} Shamsiddin Bikbov. {t('rights')}</p><Link to="/admin/login" className="hover:text-zinc-300">Admin</Link></div></footer>
}
