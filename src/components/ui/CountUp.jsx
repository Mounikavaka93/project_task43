import { useEffect, useRef, useState } from 'react'

export function CountUp({ value, className = '' }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    const match = String(value).match(/([\d,.]+)/)
    if (!match) {
      setDisplay(value)
      return undefined
    }

    const raw = match[1].replace(/,/g, '')
    const target = Number(raw)
    const prefix = String(value).slice(0, match.index)
    const suffix = String(value).slice(match.index + match[1].length)
    const decimals = raw.includes('.') ? raw.split('.')[1].length : 0

    let frame = 0
    const run = () => {
      const start = performance.now()
      const tick = (now) => {
        const progress = Math.min((now - start) / 1100, 1)
        const eased = 1 - (1 - progress) ** 3
        const current = target * eased
        const formatted = decimals
          ? current.toFixed(decimals)
          : Math.round(current).toLocaleString()
        setDisplay(`${prefix}${formatted}${suffix}`)
        if (progress < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run()
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(node)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
