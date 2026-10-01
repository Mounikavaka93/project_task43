import { ArrowRight, Bell, FileText, PieChart, ShieldCheck, Target, Users, Wallet } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Magnetic } from '../components/ui/Magnetic'
import { Reveal } from '../components/ui/Reveal'
import { SplitHeadline } from '../components/ui/SplitHeadline'
import { features, testimonials } from '../data/mock'

const icons = {
  wallet: Wallet,
  pie: PieChart,
  target: Target,
  bell: Bell,
  users: Users,
  file: FileText,
}

const partners = ['Northwind Bank', 'Harbor Credit', 'Lumen Trust', 'Atlas Pay', 'Cedar Union', 'Fieldnote']

export function Landing() {
  return (
    <div className="overflow-x-hidden">
      <section className="relative overflow-hidden">
        <div className="bg-grid pointer-events-none absolute inset-0" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="animate-fade-up">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1 font-label text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
              <span className="size-1.5 rounded-full bg-brand animate-pulse" />
              Ledger 04 · Autumn desk
            </p>
            <SplitHeadline
              className="mt-5 max-w-xl font-display text-5xl leading-[1.04] tracking-tight text-ink sm:text-6xl"
              words={[
                { text: 'Money,' },
                { text: 'finally' },
                { text: 'in', className: 'italic text-gold' },
                { text: 'focus.', className: 'italic text-gold' },
              ]}
            />
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
              Quorvia is a private finance studio — balances, bills, and goals on one calm desk, without the noise of a
              typical banking app.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button as={Link} to="/login?mode=signup" size="lg">
                Create account <ArrowRight className="size-4" />
              </Button>
              <Button as={Link} to="/login" variant="secondary" size="lg">
                Demo login
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="size-4 text-brand" /> Local-only demo vault
              </span>
              <span>No ads. No credit-score theater.</span>
            </div>
          </div>
          <HeroPreview />
        </div>
      </section>

      <section className="border-y border-line bg-surface/80 py-5" aria-label="Partner institutions">
        <div className="overflow-hidden">
          <div className="marquee-track gap-12 px-6">
            {[...partners, ...partners].map((name, index) => (
              <p key={`${name}-${index}`} className="font-label text-sm font-semibold tracking-[0.18em] text-faint uppercase">
                {name}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal className="max-w-2xl">
          <p className="font-label text-xs font-semibold uppercase tracking-[0.2em] text-gold">Features</p>
          <h2 className="mt-2 font-display text-4xl tracking-tight">Built for the Sunday money review.</h2>
          <p className="mt-3 text-muted">Everything you need to stay current — and nothing that shouts.</p>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = icons[feature.icon]
            return (
              <Reveal
                key={feature.title}
                delay={index * 80}
                variant={index % 2 ? 'right' : 'up'}
                className={index === 0 ? 'sm:col-span-2 lg:col-span-1' : ''}
              >
                <Card hover className="feature-card h-full p-6">
                  <span className="feature-icon icon-ring grid size-11 place-items-center rounded-ticket bg-brand-soft text-brand">
                    <Icon className="size-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{feature.description}</p>
                </Card>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="bg-surface/70">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2">
          <Reveal variant="left">
            <p className="font-label text-xs font-semibold uppercase tracking-[0.2em] text-gold">How it works</p>
            <h2 className="mt-2 font-display text-4xl tracking-tight">Three steps. Then it stays out of the way.</h2>
            <ol className="mt-8 space-y-6">
              {[
                ['Connect accounts', 'Link checking, savings, and cards. Read-only. You stay in control.'],
                ['Set a pace', 'Pick a goal or a monthly ceiling. Quorvia suggests a contribution that fits.'],
                ['Check in weekly', 'A short briefing: what moved, what is due, what you can ignore.'],
              ].map(([title, copy], i) => (
                <li key={title} className="flex gap-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-ticket bg-brand font-display text-lg text-brand-ink">
                    {i + 1}
                  </span>
                  <div className="pt-1">
                    <p className="font-semibold">{title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
          <Reveal delay={120} variant="right">
            <Card className="p-6">
              <p className="text-sm font-semibold text-muted">This week</p>
              <p className="mt-2 font-display text-3xl">You are $214 under dining.</p>
              <p className="mt-2 text-sm text-muted">Emergency fund is 68% of the way. Next auto-transfer is Friday.</p>
              <div className="mt-6 h-2 overflow-hidden rounded-full bg-brand-soft">
                <div className="progress-run h-full w-[68%] rounded-full bg-brand" />
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-ticket bg-page p-4">
                  <p className="text-faint">Due in 4 days</p>
                  <p className="mt-1 font-semibold">Rent · $1,650</p>
                </div>
                <div className="rounded-ticket bg-page p-4">
                  <p className="text-faint">Idle cash</p>
                  <p className="mt-1 font-semibold">$2,140</p>
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>

      <section id="stories" className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <h2 className="font-display text-4xl tracking-tight">What members say</h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal key={item.name} delay={index * 90} variant="scale">
              <Card hover className="flex h-full flex-col p-6">
                <span className="font-display text-5xl leading-none text-gold/50">“</span>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink">{item.quote}</p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-gold-soft text-sm font-bold text-gold">
                    {item.initials}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-xs text-muted">{item.role}</p>
                  </div>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="cta" className="px-4 pb-20 sm:px-6">
        <Reveal>
          <div className="cta-sheen relative mx-auto max-w-6xl overflow-hidden rounded-ledger bg-brand px-6 py-14 text-brand-ink sm:px-12">
            <div className="pointer-events-none absolute -right-10 -top-10 size-48 animate-blob rounded-full bg-gold/25 blur-2xl" />
            <div className="relative max-w-xl">
              <h2 className="font-display text-4xl tracking-tight">Open a workspace this afternoon.</h2>
              <p className="mt-3 text-brand-ink/80">
                Create an account, or skip the form with demo login — demo@quorvia.app / Quorvia!demo
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button as={Link} to="/login?mode=signup" variant="secondary" size="lg">
                  Create account
                </Button>
                <Button as={Link} to="/login" size="lg" className="bg-brand-ink text-brand hover:bg-white">
                  Demo login
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  )
}

function HeroPreview() {
  const [value, setValue] = useState(42180)

  useEffect(() => {
    const target = 48260
    const start = performance.now()
    let frame = 0
    const tick = (now) => {
      const progress = Math.min((now - start) / 1400, 1)
      const eased = 1 - (1 - progress) ** 3
      setValue(Math.round(42180 + (target - 42180) * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div className="relative animate-fade-up delay-200">
      <div className="orb -left-8 -top-8" />
      <div className="orb-gold -right-4 bottom-0" />
      <Magnetic>
        <Card className="relative p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold">September snapshot</p>
          <span className="rounded-full bg-brand-soft px-2.5 py-1 text-xs font-semibold text-brand">On pace</span>
        </div>
        <p className="mt-4 font-display text-4xl tracking-tight tabular-nums">${value.toLocaleString()}</p>
        <p className="mt-1 text-sm text-muted">Across 4 accounts · +$1,240 this month</p>
        <div className="mt-6 grid grid-cols-3 gap-2 text-center text-xs">
          {['Checking', 'Savings', 'Brokerage'].map((label, i) => (
            <div key={label} className="rounded-ticket bg-page px-2 py-3">
              <p className="text-faint">{label}</p>
              <p className="mt-1 font-semibold">{['$6.2k', '$18.1k', '$23.9k'][i]}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex h-24 items-end gap-2">
          {[40, 55, 48, 70, 62, 84].map((h, i) => (
            <div key={i} className="flex h-full flex-1 items-end overflow-hidden rounded-t-lg bg-brand/15">
              <div
                className="chart-bar w-full rounded-t-lg bg-brand"
                style={{ height: `${h}%`, animationDelay: `${i * 90}ms` }}
              />
            </div>
          ))}
        </div>
      </Card>
      </Magnetic>
    </div>
  )
}
