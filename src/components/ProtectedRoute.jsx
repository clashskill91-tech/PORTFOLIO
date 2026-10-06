import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Spinner } from './Loading'
// UX only. Real authorization is enforced by Supabase RLS.
export default function ProtectedRoute() {
  const { user, isAdmin, loading, profile } = useAuth()
  if (loading || (user && !profile)) return <Spinner full />
  if (!user) return <Navigate to="/admin/login" replace />
  if (!isAdmin) return <Navigate to="/" replace />
  return <Outlet />
}
