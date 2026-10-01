import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { ProtectedRoute } from './components/layout/ProtectedRoute'
import { PublicLayout } from './components/layout/PublicLayout'
import { Landing } from './pages/Landing'
import { Login } from './pages/Login'

const Dashboard = lazy(() => import('./pages/Dashboard').then((module) => ({ default: module.Dashboard })))
const Profile = lazy(() => import('./pages/Profile').then((module) => ({ default: module.Profile })))
const Settings = lazy(() => import('./pages/Settings').then((module) => ({ default: module.Settings })))

function PageFallback() {
  return (
    <div className="grid min-h-[40vh] place-items-center text-sm text-muted" role="status">
      Loading workspace…
    </div>
  )
}

export default function App() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const node = document.querySelector(hash)
      if (node) {
        node.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<PageFallback />}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path="/profile"
          element={
            <Suspense fallback={<PageFallback />}>
              <Profile />
            </Suspense>
          }
        />
        <Route
          path="/settings"
          element={
            <Suspense fallback={<PageFallback />}>
              <Settings />
            </Suspense>
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
