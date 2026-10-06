import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ProtectedRoute from './components/ProtectedRoute'
import { Spinner } from './components/Loading'
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'))
const Login = lazy(() => import('./pages/Login'))
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'))
const ProjectForm = lazy(() => import('./pages/ProjectForm'))
const NotFound = lazy(() => import('./pages/NotFound'))
export default function App() {
  return (
    <Suspense fallback={<Spinner full />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/admin/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/projects/new" element={<ProjectForm />} />
          <Route path="/admin/projects/:id/edit" element={<ProjectForm />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>)
}
