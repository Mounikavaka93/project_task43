import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import { useTheme } from '../../context/ThemeContext'
import { cashflow, spending } from '../../data/mock'
import { Card } from '../ui/Card'

function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-line bg-elevated px-3 py-2 text-xs shadow-lg">
      {label && <p className="mb-1 font-semibold text-ink">{label}</p>}
      {payload.map((item) => (
        <p key={item.name} className="text-muted">
          {item.name}: <span className="font-semibold text-ink">${item.value.toLocaleString()}</span>
        </p>
      ))}
    </div>
  )
}

export function CashflowChart() {
  const { resolved } = useTheme()
  const isDark = resolved === 'dark'
  const axis = isDark ? '#b3ada1' : '#5e574c'
  const grid = isDark ? '#2c3833' : '#e4d8c4'

  return (
    <Card className="flex h-full flex-col p-5">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-xl tracking-tight">Cash flow</h2>
          <p className="text-sm text-muted">Income versus spend, last six months</p>
        </div>
        <div className="hidden items-center gap-4 text-xs font-medium sm:flex">
          <span className="inline-flex items-center gap-1.5">
            <i className="size-2 rounded-full bg-brand" /> Income
          </span>
          <span className="inline-flex items-center gap-1.5">
            <i className="size-2 rounded-full bg-gold" /> Spend
          </span>
        </div>
      </div>
      <div className="h-64 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={cashflow} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="incomeFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isDark ? '#7dcea0' : '#124f45'} stopOpacity={0.35} />
                <stop offset="95%" stopColor={isDark ? '#7dcea0' : '#124f45'} stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="spendFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={isDark ? '#e4b15a' : '#c47a2c'} stopOpacity={0.3} />
                <stop offset="95%" stopColor={isDark ? '#e4b15a' : '#c47a2c'} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke={grid} vertical={false} />
            <XAxis dataKey="month" tick={{ fill: axis, fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: axis, fontSize: 12 }} axisLine={false} tickLine={false} width={40} />
            <Tooltip content={<ChartTooltip />} />
            <Area type="monotone" dataKey="income" name="Income" stroke={isDark ? '#7dcea0' : '#124f45'} fill="url(#incomeFill)" strokeWidth={2.2} />
            <Area type="monotone" dataKey="spend" name="Spend" stroke={isDark ? '#e4b15a' : '#c47a2c'} fill="url(#spendFill)" strokeWidth={2.2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

export function SpendingChart() {
  const total = spending.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card className="flex h-full flex-col p-5">
      <h2 className="font-display text-xl tracking-tight">Spending mix</h2>
      <p className="text-sm text-muted">Where September went</p>
      <div className="mt-2 h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={spending} dataKey="value" nameKey="name" innerRadius={52} outerRadius={80} paddingAngle={3}>
              {spending.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="space-y-2 text-sm">
        {spending.map((item) => (
          <li key={item.name} className="flex items-center justify-between">
            <span className="inline-flex items-center gap-2 text-muted">
              <i className="size-2.5 rounded-full" style={{ background: item.color }} />
              {item.name}
            </span>
            <span className="font-semibold text-ink">{Math.round((item.value / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </Card>
  )
}
