import { useEffect, useState } from 'react'

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 })

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return undefined
    const onMove = (event) => setPos({ x: event.clientX, y: event.clientY })
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <div
      className="pointer-events-none fixed z-20 hidden h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full md:block cursor-glow"
      style={{ left: pos.x, top: pos.y }}
      aria-hidden="true"
    />
  )
}
