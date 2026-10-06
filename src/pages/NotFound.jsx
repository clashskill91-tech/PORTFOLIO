import { Link } from 'react-router-dom'
import { useLang } from '../context/LanguageContext'
export default function NotFound() {
  const { t } = useLang()
  return <main className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
    <p className="font-mono text-7xl font-bold text-white/10">404</p><h1 className="mt-4 text-2xl font-bold text-white">{t('notFound')}</h1>
    <Link to="/" className="btn-primary mt-8">{t('backHome')}</Link></main>
}
