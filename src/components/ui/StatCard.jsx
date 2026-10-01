import { TrendingDown, TrendingUp } from 'lucide-react'
import { Card } from './Card'
import { CountUp } from './CountUp'

export function StatCard({ label, value, change, up, hint }) {
  return (
    <Card hover className="h-full p-5">
      <p className="text-sm font-medium text-muted">{label}</p>
      <p className="mt-2 font-display text-3xl tracking-tight text-ink">
        <CountUp value={value} />
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 font-semibold ${
            up ? 'bg-brand-soft text-brand' : 'bg-gold-soft text-gold'
          }`}
        >
          {up ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
          {change}
        </span>
        <span className="text-faint">{hint}</span>
      </div>
    </Card>
  )
}
