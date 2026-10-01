import { activity, stats } from '../data/mock'
import { CashflowChart, SpendingChart } from '../components/dashboard/Charts'
import { Card } from '../components/ui/Card'
import { Reveal } from '../components/ui/Reveal'
import { StatCard } from '../components/ui/StatCard'

function formatAmount(amount) {
  const absolute = Math.abs(amount).toLocaleString(undefined, { style: 'currency', currency: 'USD' })
  return amount > 0 ? `+${absolute}` : `−${absolute}`
}

export function Dashboard() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, index) => (
          <Reveal key={item.label} delay={index * 80} variant="scale">
            <StatCard {...item} />
          </Reveal>
        ))}
      </div>

      <div className="grid items-stretch gap-5 lg:grid-cols-3">
        <Reveal className="lg:col-span-2" variant="left">
          <CashflowChart />
        </Reveal>
        <Reveal variant="right" delay={120}>
          <SpendingChart />
        </Reveal>
      </div>

      <Reveal>
        <Card className="overflow-hidden">
          <div className="flex items-center justify-between border-b border-line px-5 py-4">
            <div>
              <h2 className="font-display text-xl tracking-tight">Recent activity</h2>
              <p className="text-sm text-muted">Latest movement across connected accounts</p>
            </div>
          </div>
          <ul className="divide-y divide-line">
            {activity.map((item, index) => (
              <li
                key={item.id}
                className="stagger-item flex items-center justify-between gap-4 px-5 py-4 transition hover:translate-x-1 hover:bg-brand-soft/50"
                style={{ animationDelay: `${index * 70}ms` }}
              >
                <div className="min-w-0">
                  <p className="truncate font-semibold">{item.merchant}</p>
                  <p className="text-xs text-muted">
                    {item.category} · {item.date}
                  </p>
                </div>
                <p className={`shrink-0 font-semibold ${item.amount > 0 ? 'text-brand' : 'text-ink'}`}>
                  {formatAmount(item.amount)}
                </p>
              </li>
            ))}
          </ul>
        </Card>
      </Reveal>
    </div>
  )
}
