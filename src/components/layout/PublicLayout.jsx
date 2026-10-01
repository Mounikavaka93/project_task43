import { Outlet, useLocation } from 'react-router-dom'
import { CursorGlow } from '../ui/CursorGlow'
import { PageEnter } from '../ui/PageEnter'
import { ScrollProgress } from '../ui/ScrollProgress'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

export function PublicLayout() {
  const { pathname } = useLocation()
  const isAuth = pathname === '/login'

  return (
    <div className="min-h-svh bg-page text-ink">
      <ScrollProgress />
      <CursorGlow />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-brand-ink"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <PageEnter>
          <Outlet />
        </PageEnter>
      </main>
      {!isAuth && <Footer />}
    </div>
  )
}
