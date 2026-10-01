import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Button } from '../ui/Button'
import { Logo } from '../ui/Logo'
import { ThemeToggle } from '../ui/ThemeToggle'

const links = [
  { href: '/#features', label: 'Features' },
  { href: '/#stories', label: 'Stories' },
  { href: '/#cta', label: 'Get started' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header
      className={`sticky top-0 z-40 border-b transition duration-300 ${
        scrolled ? 'border-line bg-page/85 backdrop-blur-xl' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="nav-link text-sm font-medium text-muted transition hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <Button as={Link} to="/login" variant="ghost">
            Log in
          </Button>
          <Button as={Link} to="/login?mode=signup">
            Create account
          </Button>
        </div>
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full border border-line bg-surface"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="animate-fade-in border-t border-line bg-page px-4 py-5 md:hidden">
          <nav className="flex flex-col gap-2" aria-label="Mobile">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-ticket px-3 py-3 text-base font-medium text-ink hover:bg-brand-soft"
              >
                {link.label}
              </a>
            ))}
            <NavLink
              to="/login"
              onClick={() => setOpen(false)}
              className="rounded-ticket px-3 py-3 text-base font-medium text-ink hover:bg-brand-soft"
            >
              Log in
            </NavLink>
            <Button as={Link} to="/login?mode=signup" className="mt-2 w-full" onClick={() => setOpen(false)}>
              Create account
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}
