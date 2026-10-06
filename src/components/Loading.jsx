import { Loader2 } from 'lucide-react'
export function Spinner({ full }) {
  return <div role="status" aria-label="Loading" className={`flex items-center justify-center ${full ? 'min-h-screen' : 'py-16'}`}><Loader2 className="h-6 w-6 animate-spin text-accent" /></div>
}
export function ProjectSkeletons({ count = 3 }) {
  return <>{Array.from({ length: count }).map((_, i) => (
    <div key={i} className="card animate-pulse overflow-hidden"><div className="aspect-video bg-white/5" /><div className="space-y-3 p-5"><div className="h-4 w-2/3 rounded bg-white/10" /><div className="h-3 w-full rounded bg-white/5" /><div className="h-3 w-1/2 rounded bg-white/5" /></div></div>))}</>
}
