import { FolderSearch } from 'lucide-react'
export default function EmptyState({ title, hint, action }) {
  return <div className="card col-span-full flex flex-col items-center px-6 py-16 text-center">
    <FolderSearch className="mb-4 h-10 w-10 text-zinc-600" aria-hidden /><p className="text-lg font-semibold text-white">{title}</p>
    {hint && <p className="mt-1 text-sm text-zinc-500">{hint}</p>}{action && <div className="mt-6">{action}</div>}</div>
}
