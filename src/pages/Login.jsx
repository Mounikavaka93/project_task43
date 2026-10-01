import { Eye, EyeOff, Sparkles } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Logo } from '../components/ui/Logo'
import { useAuth } from '../context/AuthContext'
import { DEMO_ACCOUNT } from '../data/demo'
import {
  passwordChecks,
  passwordStrength,
  validateConfirm,
  validateEmail,
  validateName,
  validatePassword,
} from '../lib/validation'

function PasswordToggle({ show, onToggle, hideLabel, showLabel }) {
  return (
    <button
      type="button"
      className="grid size-9 place-items-center rounded-full text-muted transition hover:bg-brand-soft hover:text-ink"
      aria-label={show ? hideLabel : showLabel}
      onClick={onToggle}
    >
      {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
    </button>
  )
}

function StrengthMeter({ password }) {
  const score = passwordStrength(password)
  const checks = passwordChecks(password)
  const label = ['Too weak', 'Weak', 'Fair', 'Good', 'Strong'][Math.max(0, score - 1)] || 'Too weak'

  return (
    <div className="space-y-2">
      <div className="flex gap-1.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((step) => (
          <span
            key={step}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              score >= step ? (score < 3 ? 'bg-gold' : 'bg-brand') : 'bg-line'
            }`}
          />
        ))}
      </div>
      {password && (
        <p className="text-xs font-medium text-muted">
          Strength: <span className="text-ink">{label}</span>
        </p>
      )}
      <ul className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] text-muted">
        {[
          ['length', '8+ characters'],
          ['upper', 'Uppercase'],
          ['lower', 'Lowercase'],
          ['number', 'Number'],
          ['special', 'Symbol'],
        ].map(([key, text]) => (
          <li key={key} className={checks[key] ? 'text-brand' : ''}>
            {checks[key] ? '✓' : '○'} {text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Login() {
  const { user, login, register, loginDemo } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [params, setParams] = useSearchParams()
  const mode = params.get('mode') === 'signup' ? 'signup' : 'login'
  const [loginForm, setLoginForm] = useState({ email: '', password: '', remember: true })
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    terms: false,
    remember: true,
  })
  const [touched, setTouched] = useState({})
  const [formError, setFormError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [forgotOpen, setForgotOpen] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetMessage, setResetMessage] = useState('')
  const [resetError, setResetError] = useState('')
  const [pending, setPending] = useState(false)

  useEffect(() => {
    if (!forgotOpen) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setForgotOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [forgotOpen])

  const goToApp = () => navigate(location.state?.from || '/dashboard', { replace: true })

  const loginErrors = useMemo(
    () => ({
      email: validateEmail(loginForm.email),
      password: !loginForm.password ? 'Password is required' : '',
    }),
    [loginForm],
  )

  const signupErrors = useMemo(
    () => ({
      name: validateName(signupForm.name),
      email: validateEmail(signupForm.email),
      password: validatePassword(signupForm.password),
      confirm: validateConfirm(signupForm.password, signupForm.confirm),
      terms: signupForm.terms ? '' : 'Please accept the terms to continue',
    }),
    [signupForm],
  )

  const show = (field, bag) => (touched[field] ? bag[field] : '')

  const switchMode = (next) => {
    setTouched({})
    setFormError('')
    setParams(next === 'signup' ? { mode: 'signup' } : {}, { replace: true })
  }

  const onLogin = (event) => {
    event.preventDefault()
    setTouched({ email: true, password: true })
    if (loginErrors.email || loginErrors.password) return
    setPending(true)
    const result = login(loginForm)
    setPending(false)
    if (!result.ok) {
      setFormError(result.error)
      return
    }
    goToApp()
  }

  const onSignup = (event) => {
    event.preventDefault()
    setTouched({ name: true, email: true, password: true, confirm: true, terms: true })
    if (Object.values(signupErrors).some(Boolean)) return
    setPending(true)
    const result = register(signupForm)
    setPending(false)
    if (!result.ok) {
      setFormError(result.error)
      return
    }
    goToApp()
  }

  const onDemo = () => {
    setPending(true)
    loginDemo(true)
    setPending(false)
    goToApp()
  }

  const sendReset = (event) => {
    event.preventDefault()
    const emailError = validateEmail(resetEmail)
    if (emailError) {
      setResetError(emailError)
      setResetMessage('')
      return
    }
    setResetError('')
    setResetMessage(`If ${resetEmail} exists, a reset link would be sent. This demo has no backend.`)
  }

  if (user) return <Navigate to="/dashboard" replace />

  const isSignup = mode === 'signup'

  return (
    <div className="relative mx-auto grid min-h-[calc(100svh-72px)] max-w-6xl items-center gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="relative hidden overflow-hidden rounded-ledger border border-line bg-surface p-10 lg:block animate-fade-up">
        <div className="pointer-events-none absolute inset-0 bg-ledger opacity-70" />
        <div className="orb -left-10 top-10" />
        <div className="orb-gold right-6 bottom-8" />
        <p className="relative text-xs font-semibold uppercase tracking-[0.22em] text-gold">Member studio</p>
        <h1 key={mode} className="relative mt-4 max-w-md font-display text-5xl leading-[1.08] tracking-tight animate-form-in">
          {isSignup ? 'Open a quieter ledger in a minute.' : 'Welcome back to a quieter ledger.'}
        </h1>
        <p className="relative mt-4 max-w-sm text-muted">
          {isSignup
            ? 'Create an account stored only on this device, or skip ahead with the demo workspace.'
            : 'Log in with your Quorvia account, or enter the demo desk without filling a form.'}
        </p>
        <dl className="relative mt-10 grid grid-cols-2 gap-4 text-sm">
          <div className="rounded-ticket bg-page/80 p-4">
            <dt className="text-faint">Demo email</dt>
            <dd className="mt-1 font-semibold break-all">{DEMO_ACCOUNT.email}</dd>
          </div>
          <div className="rounded-ticket bg-page/80 p-4">
            <dt className="text-faint">Demo password</dt>
            <dd className="mt-1 font-semibold">{DEMO_ACCOUNT.password}</dd>
          </div>
        </dl>
      </div>

      <Card className="relative mx-auto w-full max-w-md p-6 sm:p-8 animate-fade-up delay-100">
        <div className="mb-5 lg:hidden">
          <Logo />
        </div>
        <div className="relative grid grid-cols-2 rounded-full bg-page p-1" role="tablist" aria-label="Account actions">
          <span className={`tab-pill ${isSignup ? 'is-signup' : ''}`} aria-hidden="true" />
          {[
            ['login', 'Log in'],
            ['signup', 'Create account'],
          ].map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={mode === id}
              className={`relative z-10 h-10 rounded-full text-sm font-semibold transition ${
                mode === id ? 'text-ink' : 'text-muted hover:text-ink'
              }`}
              onClick={() => switchMode(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <div key={mode} className="animate-form-in">
        <h2 className="mt-6 font-display text-3xl tracking-tight">{isSignup ? 'Create account' : 'Log in'}</h2>
        <p className="mt-1 text-sm text-muted">
          {isSignup ? 'Name, email, and a strong password. No server involved.' : 'Use your account, or the demo desk below.'}
        </p>

        {isSignup ? (
          <form className="mt-6 space-y-4" onSubmit={onSignup} noValidate>
            <Input
              id="signup-name"
              label="Full name"
              autoComplete="name"
              placeholder="Mounika Vaka"
              value={signupForm.name}
              error={show('name', signupErrors)}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              onChange={(e) => setSignupForm((v) => ({ ...v, name: e.target.value }))}
            />
            <Input
              id="signup-email"
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="you@studio.com"
              value={signupForm.email}
              error={show('email', signupErrors)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              onChange={(e) => setSignupForm((v) => ({ ...v, email: e.target.value }))}
            />
            <Input
              id="signup-password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="8+ chars, mixed case, number, symbol"
              value={signupForm.password}
              error={show('password', signupErrors)}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              onChange={(e) => setSignupForm((v) => ({ ...v, password: e.target.value }))}
              rightSlot={
                <PasswordToggle
                  show={showPassword}
                  onToggle={() => setShowPassword((v) => !v)}
                  hideLabel="Hide password"
                  showLabel="Show password"
                />
              }
            />
            <StrengthMeter password={signupForm.password} />
            <Input
              id="signup-confirm"
              label="Confirm password"
              type={showConfirm ? 'text' : 'password'}
              autoComplete="new-password"
              placeholder="Repeat password"
              value={signupForm.confirm}
              error={show('confirm', signupErrors)}
              onBlur={() => setTouched((t) => ({ ...t, confirm: true }))}
              onChange={(e) => setSignupForm((v) => ({ ...v, confirm: e.target.value }))}
              rightSlot={
                <PasswordToggle
                  show={showConfirm}
                  onToggle={() => setShowConfirm((v) => !v)}
                  hideLabel="Hide confirmation"
                  showLabel="Show confirmation"
                />
              }
            />
            <label className="flex items-start gap-2.5 text-sm text-muted">
              <input
                type="checkbox"
                className="mt-0.5 size-4 accent-[var(--brand)]"
                checked={signupForm.terms}
                onChange={(e) => setSignupForm((v) => ({ ...v, terms: e.target.checked }))}
              />
              <span>
                I agree this is a local demo, not a real bank, and I accept the sample terms.
                {show('terms', signupErrors) && (
                  <span className="mt-1 block text-xs font-medium text-danger">{signupErrors.terms}</span>
                )}
              </span>
            </label>
            <label className="inline-flex items-center gap-2 text-sm text-muted">
              <input
                type="checkbox"
                className="size-4 accent-[var(--brand)]"
                checked={signupForm.remember}
                onChange={(e) => setSignupForm((v) => ({ ...v, remember: e.target.checked }))}
              />
              Remember me on this device
            </label>
            {formError && (
              <p className="rounded-ticket bg-gold-soft px-3 py-2 text-sm text-copper" role="alert">
                {formError}
              </p>
            )}
            <Button type="submit" className="w-full" size="lg" disabled={pending}>
              Create account
            </Button>
          </form>
        ) : (
          <form className="mt-6 space-y-4" onSubmit={onLogin} noValidate>
            <Input
              id="email"
              label="Email"
              type="email"
              autoComplete="email"
              placeholder="you@studio.com"
              value={loginForm.email}
              error={show('email', loginErrors)}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              onChange={(e) => setLoginForm((v) => ({ ...v, email: e.target.value }))}
            />
            <Input
              id="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Your password"
              value={loginForm.password}
              error={show('password', loginErrors)}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              onChange={(e) => setLoginForm((v) => ({ ...v, password: e.target.value }))}
              rightSlot={
                <PasswordToggle
                  show={showPassword}
                  onToggle={() => setShowPassword((v) => !v)}
                  hideLabel="Hide password"
                  showLabel="Show password"
                />
              }
            />
            <div className="flex items-center justify-between gap-3 text-sm">
              <label className="inline-flex items-center gap-2 text-muted">
                <input
                  type="checkbox"
                  className="size-4 accent-[var(--brand)]"
                  checked={loginForm.remember}
                  onChange={(e) => setLoginForm((v) => ({ ...v, remember: e.target.checked }))}
                />
                Remember me
              </label>
              <button type="button" className="font-semibold text-brand hover:underline" onClick={() => setForgotOpen(true)}>
                Forgot password
              </button>
            </div>
            {formError && (
              <p className="rounded-ticket bg-gold-soft px-3 py-2 text-sm text-copper" role="alert">
                {formError}
              </p>
            )}
            <Button type="submit" className="w-full" size="lg" disabled={pending}>
              Continue
            </Button>
          </form>
        )}
        </div>

        <div className="relative my-5 text-center text-xs font-semibold uppercase tracking-[0.18em] text-faint">
          <span className="relative z-10 bg-surface px-3">or</span>
          <span className="absolute inset-x-0 top-1/2 h-px bg-line" />
        </div>
        <Button type="button" variant="secondary" className="w-full" size="lg" onClick={onDemo} disabled={pending}>
          <Sparkles className="size-4 text-gold animate-pulse" />
          Demo login
        </Button>
        <p className="mt-3 text-center text-xs text-muted lg:hidden">
          {DEMO_ACCOUNT.email} · {DEMO_ACCOUNT.password}
        </p>
      </Card>

      {forgotOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/45 p-4 animate-fade-in">
          <Card role="dialog" aria-modal="true" aria-labelledby="reset-title" className="w-full max-w-md scale-in p-6">
            <h2 id="reset-title" className="font-display text-2xl">
              Reset password
            </h2>
            <p className="mt-2 text-sm text-muted">Enter the email on the account. We will pretend to send a link.</p>
            <form className="mt-5 space-y-4" onSubmit={sendReset}>
              <Input
                id="reset-email"
                label="Email"
                type="email"
                value={resetEmail}
                error={resetError}
                onChange={(e) => setResetEmail(e.target.value)}
              />
              {resetMessage && (
                <p className="rounded-ticket bg-brand-soft px-3 py-2 text-sm text-brand" role="status">
                  {resetMessage}
                </p>
              )}
              <div className="flex gap-2">
                <Button type="submit" className="flex-1">
                  Send reset link
                </Button>
                <Button type="button" variant="secondary" onClick={() => setForgotOpen(false)}>
                  Close
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}
