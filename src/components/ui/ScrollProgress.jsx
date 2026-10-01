import { useEffect, useState } from 'react'

export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[3px] overflow-hidden" aria-hidden="true">
      <div className="scroll-progress-bar h-full origin-left" style={{ transform: `scaleX(${progress})`, background: 'linear-gradient(90deg, var(--brand), var(--gold), var(--copper))' }} />
    </div>
  )
}
