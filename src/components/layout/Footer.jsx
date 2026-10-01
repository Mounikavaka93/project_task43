import { Logo } from '../ui/Logo'

const columns = [
  {
    title: 'Product',
    links: ['Overview', 'Pricing', 'Security', 'Changelog'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Press', 'Contact'],
  },
  {
    title: 'Resources',
    links: ['Guides', 'Help center', 'Community', 'Status'],
  },
]

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 md:items-start">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            A calm workspace for balances, bills, and the next thing you are saving toward.
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <p className="text-sm font-semibold text-ink">{column.title}</p>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link}>
                  <a href="#features" className="text-sm text-muted transition hover:text-brand">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-faint sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© 2026 Quorvia Labs. Frontend demo — no real accounts.</p>
          <p>Privacy · Terms · Accessibility</p>
        </div>
      </div>
    </footer>
  )
}
