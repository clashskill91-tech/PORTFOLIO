import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
const Ctx = createContext(null)
export const useAuth = () => useContext(Ctx)
export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const loadProfile = useCallback(async (user) => {
    if (!user) return setProfile(null)
    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).maybeSingle()
    setProfile(data)
  }, [])
  useEffect(() => {
    let alive = true
    supabase.auth.getSession().then(async ({ data }) => {
      if (!alive) return
      setSession(data.session); await loadProfile(data.session?.user); setLoading(false)
    }).catch(() => setLoading(false))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s)
      setTimeout(() => loadProfile(s?.user), 0)
    })
    return () => { alive = false; sub.subscription.unsubscribe() }
  }, [loadProfile])
  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw new Error('LOGIN_FAILED')
    await loadProfile(data.user)
  }
  const logout = async () => { await supabase.auth.signOut(); setProfile(null) }
  const value = { session, user: session?.user ?? null, profile, isAdmin: profile?.role === 'admin', loading, login, logout }
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}
