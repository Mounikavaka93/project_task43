import { Link } from 'react-router-dom'

export function Logo({ to = '/', compact = false, className = '' }) {
  return (
    <Link to={to} className={`inline-flex items-center gap-2.5 text-ink no-underline ${className}`}>
      <span
        className="grid size-9 place-items-center rounded-ticket bg-brand text-brand-ink shadow-sm transition duration-300 hover:rotate-6"
        aria-hidden="true"
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none">
          <path d="M5.5 18 12 6.5 18.5 18H5.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
          <path d="M8.4 13.6h7.2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg tracking-tight">Quorvia</span>
          <span className="mt-1 font-label text-[10px] font-semibold uppercase tracking-[0.2em] text-faint">
            Private ledger
          </span>
        </span>
      )}
    </Link>
  )
}
