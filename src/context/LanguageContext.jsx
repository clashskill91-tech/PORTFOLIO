import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import { translations } from '../data/translations'
const Ctx = createContext(null)
export const useLang = () => useContext(Ctx)
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'uz')
  useEffect(() => { localStorage.setItem('lang', lang); document.documentElement.lang = lang }, [lang])
  const t = useCallback((k) => translations[lang][k] ?? k, [lang])
  const pick = useCallback((o, f) => o?.[`${f}_${lang}`] || o?.[`${f}_uz`] || o?.[`${f}_en`] || '', [lang])
  return <Ctx.Provider value={{ lang, setLang, t, pick }}>{children}</Ctx.Provider>
}
