import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export function ThemeToggle({ className = '' }) {
  const { resolved, toggleTheme } = useTheme()
  const isDark = resolved === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative grid size-10 place-items-center overflow-hidden rounded-full border border-line bg-surface text-ink transition duration-500 hover:rotate-12 hover:border-brand/40 hover:bg-brand-soft ${className}`}
    >
      <Sun
        className={`size-[18px] transition duration-500 ${isDark ? 'scale-0 rotate-180 opacity-0' : 'scale-100 rotate-0 opacity-100'}`}
      />
      <Moon
        className={`absolute size-[18px] transition duration-500 ${isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-180 opacity-0'}`}
      />
    </button>
  )
}
