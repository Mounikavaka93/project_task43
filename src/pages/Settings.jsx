import { Monitor, Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { validateConfirm, validatePassword } from '../lib/validation'

const themeOptions = [
  { id: 'light', label: 'Light', copy: 'Warm paper and forest green', icon: Sun },
  { id: 'dark', label: 'Dark', copy: 'Ink canvas and gold highlights', icon: Moon },
  { id: 'system', label: 'System', copy: 'Follow the device setting', icon: Monitor },
]

export function Settings() {
  const { theme, setTheme } = useTheme()
  const { logout } = useAuth()
  const [prefs, setPrefs] = useState({
    weekly: true,
    bills: true,
    marketing: false,
    currency: 'USD',
    language: 'en',
  })
  const [passwords, setPasswords] = useState({ current: '', next: '', confirm: '' })
  const [passErrors, setPassErrors] = useState({})
  const [passSaved, setPassSaved] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const togglePref = (key) => setPrefs((p) => ({ ...p, [key]: !p[key] }))

  useEffect(() => {
    if (!confirmDelete) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') setConfirmDelete(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [confirmDelete])

  const savePassword = (event) => {
    event.preventDefault()
    const next = {}
    if (passwords.current.length < 8) next.current = 'Enter your current password'
    next.next = validatePassword(passwords.next, { requiredLabel: 'New password is required' })
    next.confirm = validateConfirm(passwords.next, passwords.confirm)
    Object.keys(next).forEach((key) => {
      if (!next[key]) delete next[key]
    })
    setPassErrors(next)
    if (Object.keys(next).length) return
    setPassSaved(true)
    setPasswords({ current: '', next: '', confirm: '' })
  }

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <Card className="p-6">
        <h2 className="font-display text-2xl tracking-tight">Appearance</h2>
        <p className="mt-1 text-sm text-muted">Theme applies across landing, login, and the workspace.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {themeOptions.map(({ id, label, copy, icon: Icon }) => {
            const active = theme === id
            return (
              <button
                key={id}
                type="button"
                onClick={() => setTheme(id)}
                className={`rounded-2xl border p-4 text-left transition ${
                  active ? 'border-brand bg-brand-soft' : 'border-line bg-elevated hover:border-brand/40'
                }`}
              >
                <Icon className="size-5 text-brand" />
                <p className="mt-3 font-semibold">{label}</p>
                <p className="mt-1 text-xs text-muted">{copy}</p>
              </button>
            )
          })}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="font-display text-2xl tracking-tight">Account preferences</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">Currency</span>
            <select
              className="h-12 w-full rounded-ticket border border-line bg-elevated px-4 text-[15px]"
              value={prefs.currency}
              onChange={(e) => setPrefs((p) => ({ ...p, currency: e.target.value }))}
            >
              <option value="USD">USD — US dollar</option>
              <option value="EUR">EUR — Euro</option>
              <option value="GBP">GBP — Pound</option>
              <option value="INR">INR — Rupee</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">Language</span>
            <select
              className="h-12 w-full rounded-ticket border border-line bg-elevated px-4 text-[15px]"
              value={prefs.language}
              onChange={(e) => setPrefs((p) => ({ ...p, language: e.target.value }))}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </label>
        </div>
        <ul className="mt-6 space-y-3">
          {[
            ['weekly', 'Weekly briefing', 'A Sunday summary of spend and goals'],
            ['bills', 'Bill reminders', 'Two days before a due date'],
            ['marketing', 'Product notes', 'Occasional product updates'],
          ].map(([key, title, copy]) => (
            <li key={key} className="flex items-center justify-between gap-4 rounded-ticket border border-line px-4 py-3">
              <div>
                <p className="font-semibold">{title}</p>
                <p className="text-xs text-muted">{copy}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={prefs[key]}
                onClick={() => togglePref(key)}
                className={`relative h-7 w-12 rounded-full transition ${prefs[key] ? 'bg-brand' : 'bg-line'}`}
              >
                <span
                  className={`absolute top-1 size-5 rounded-full bg-elevated transition ${
                    prefs[key] ? 'left-6' : 'left-1'
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-6">
        <h2 className="font-display text-2xl tracking-tight">Change password</h2>
        <form className="mt-5 grid max-w-xl gap-4" onSubmit={savePassword} noValidate>
          <Input
            id="current"
            label="Current password"
            type="password"
            value={passwords.current}
            error={passErrors.current}
            onChange={(e) => setPasswords((p) => ({ ...p, current: e.target.value }))}
          />
          <Input
            id="next"
            label="New password"
            type="password"
            value={passwords.next}
            error={passErrors.next}
            onChange={(e) => setPasswords((p) => ({ ...p, next: e.target.value }))}
          />
          <Input
            id="confirm"
            label="Confirm new password"
            type="password"
            value={passwords.confirm}
            error={passErrors.confirm}
            onChange={(e) => setPasswords((p) => ({ ...p, confirm: e.target.value }))}
          />
          <div className="flex items-center gap-3">
            <Button type="submit">Update password</Button>
            {passSaved && (
              <p className="text-sm font-medium text-brand" role="status">
                Password updated in this demo session.
              </p>
            )}
          </div>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="font-display text-2xl tracking-tight">Danger zone</h2>
        <p className="mt-1 text-sm text-muted">Signing out clears the local session. Deleting is a demo confirm only.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Button variant="secondary" onClick={logout}>
            Sign out
          </Button>
          <Button variant="danger" onClick={() => setConfirmDelete(true)}>
            Delete account
          </Button>
        </div>
      </Card>

      {confirmDelete && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/45 p-4 animate-fade-in">
          <Card role="dialog" aria-modal="true" className="w-full max-w-md scale-in p-6">
            <h3 className="font-display text-2xl">Delete this demo account?</h3>
            <p className="mt-2 text-sm text-muted">This only clears local browser data for Quorvia.</p>
            <div className="mt-5 flex gap-2">
              <Button
                variant="danger"
                className="flex-1"
                onClick={() => {
                  logout()
                }}
              >
                Yes, delete
              </Button>
              <Button variant="secondary" onClick={() => setConfirmDelete(false)}>
                Cancel
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
