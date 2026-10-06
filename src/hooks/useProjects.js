import { useCallback, useEffect, useState } from 'react'
import { getProjects } from '../services/projectService'
import { isConfigured } from '../lib/supabase'
export function useProjects(opts) {
  const featured = opts?.featured
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const load = useCallback(async () => {
    if (!isConfigured) { setError('SETUP'); setLoading(false); return }
    setLoading(true); setError(null)
    try { setProjects(await getProjects({ featured })) } catch (e) { setError(e.message) } finally { setLoading(false) }
  }, [featured])
  useEffect(() => { load() }, [load])
  return { projects, loading, error, reload: load }
}
