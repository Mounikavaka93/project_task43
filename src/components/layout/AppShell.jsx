import { Bell, Menu, Search } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { CursorGlow } from '../ui/CursorGlow'
import { PageEnter } from '../ui/PageEnter'
import { ThemeToggle } from '../ui/ThemeToggle'
import { Sidebar } from './Sidebar'

const titles = {
  '/dashboard': ['Overview', 'A calm look at this month.'],
  '/profile': ['Profile', 'How you appear across Quorvia.'],
  '/settings': ['Settings', 'Preferences, theme, and account.'],
}

export function AppShell() {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()
  const { pathname } = useLocation()
  const [title, subtitle] = titles[pathname] || ['Workspace', '']

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <div className="min-h-svh bg-page text-ink lg:flex">
      <CursorGlow />
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-line bg-page/85 backdrop-blur-xl">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6">
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full border border-line bg-surface lg:hidden"
              aria-label="Open sidebar"
              onClick={() => setOpen(true)}
            >
              <Menu className="size-5" />
            </button>
            <div className="min-w-0 flex-1">
              <h1 className="truncate font-display text-xl tracking-tight">{title}</h1>
              <p className="hidden truncate text-xs text-muted sm:block">{subtitle}</p>
            </div>
            <label className="relative hidden max-w-xs flex-1 md:block">
              <span className="sr-only">Search workspace</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-faint" />
              <input
                type="search"
                placeholder="Search activity"
                className="h-10 w-full rounded-full border border-line bg-surface pl-10 pr-4 text-sm outline-none focus:border-brand"
              />
            </label>
            <button
              type="button"
              className="relative grid size-10 place-items-center rounded-full border border-line bg-surface transition hover:scale-105"
              aria-label="Notifications"
            >
              <Bell className="size-4" />
              <span className="notif-dot absolute right-2 top-2 size-2 rounded-full bg-gold" />
            </button>
            <ThemeToggle />
            <div className="grid size-10 place-items-center rounded-full bg-brand text-sm font-bold text-brand-ink">
              {user?.name
                ?.split(' ')
                .map((part) => part[0])
                .slice(0, 2)
                .join('')}
            </div>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
          <PageEnter>
            <Outlet />
          </PageEnter>
        </main>
      </div>
    </div>
  )
}
