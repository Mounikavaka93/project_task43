import { LayoutDashboard, LogOut, Settings, UserRound, X } from 'lucide-react'
import { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Logo } from '../ui/Logo'

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/profile', label: 'Profile', icon: UserRound },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth()

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const nav = (
    <>
      <div className="flex items-center justify-between px-5 pt-5">
        <Logo to="/dashboard" />
        <button
          type="button"
          onClick={onClose}
          className="grid size-9 place-items-center rounded-full border border-line lg:hidden"
          aria-label="Close sidebar"
        >
          <X className="size-4" />
        </button>
      </div>
      <nav className="mt-8 flex flex-1 flex-col gap-1 px-3" aria-label="Workspace">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-ticket px-3 py-2.5 text-sm font-semibold transition duration-300 ${
                isActive ? 'bg-brand text-brand-ink shadow-sm' : 'text-muted hover:translate-x-1 hover:bg-brand-soft hover:text-ink'
              }`
            }
          >
            <Icon className="size-4" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="m-3 rounded-ticket border border-line bg-elevated p-3">
        <p className="truncate text-sm font-semibold text-ink">{user?.name}</p>
        <p className="truncate text-xs text-muted">{user?.email}</p>
        <button
          type="button"
          onClick={logout}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl py-2 text-sm font-semibold text-muted transition hover:bg-gold-soft hover:text-ink"
        >
          <LogOut className="size-4" />
          Sign out
        </button>
      </div>
    </>
  )

  return (
    <>
      <aside className="sticky top-0 hidden h-svh w-72 shrink-0 flex-col border-r border-line bg-surface lg:flex">
        {nav}
      </aside>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-ink/40 animate-fade-in"
            aria-label="Close sidebar overlay"
            onClick={onClose}
          />
          <aside className="relative flex h-full w-[min(20rem,86vw)] flex-col bg-surface shadow-2xl animate-slide-in-left">
            {nav}
          </aside>
        </div>
      )}
    </>
  )
}
