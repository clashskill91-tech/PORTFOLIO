import { useState } from 'react'
import { Navigate, useNavigate, Link } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useLang } from '../context/LanguageContext'
import { isConfigured } from '../lib/supabase'
export default function Login() {
  const { login, isAdmin, user, logout } = useAuth()
  const { t } = useLang()
  const nav = useNavigate()
  const [email, setEmail] = useState(''); const [password, setPassword] = useState('')
  const [error, setError] = useState(''); const [busy, setBusy] = useState(false)
  if (user && isAdmin) return <Navigate to="/admin" replace />
  const submit = async (e) => {
    e.preventDefault(); setError(''); setBusy(true)
    try { await login(email.trim(), password); nav('/admin') } catch { setError(t('loginError')) } finally { setBusy(false) }
  }
  return (
    <main className="flex min-h-screen items-center justify-center px-5">
      <div className="card w-full max-w-sm p-8">
        <Link to="/" className="text-lg font-bold text-white">Shamsiddin<span className="text-accent">.</span></Link>
        <h1 className="mt-6 text-2xl font-bold text-white">{t('login')}</h1>
        {!isConfigured && <p className="mt-3 text-sm text-amber-400">{t('setup')}</p>}
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div><label htmlFor="email" className="mb-1.5 block text-sm text-zinc-400">{t('email')}</label>
            <input id="email" type="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} className="input" /></div>
          <div><label htmlFor="pw" className="mb-1.5 block text-sm text-zinc-400">{t('password')}</label>
            <input id="pw" type="password" required autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} className="input" /></div>
          {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
          {user && !isAdmin && <p role="alert" className="text-sm text-amber-400">{t('notAdmin')} <button type="button" onClick={logout} className="underline">{t('logout')}</button></p>}
          <button disabled={busy} className="btn-primary w-full">{busy && <Loader2 size={16} className="animate-spin" />}{t('login')}</button>
        </form></div></main>)
}
