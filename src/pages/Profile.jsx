import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { useAuth } from '../context/AuthContext'

export function Profile() {
  const { user, updateUser } = useAuth()
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || '',
  })
  const [errors, setErrors] = useState({})
  const [saved, setSaved] = useState(false)

  const setField = (key) => (event) => {
    setForm((current) => ({ ...current, [key]: event.target.value }))
    setSaved(false)
  }

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Name is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email'
    if (form.phone && form.phone.replace(/\D/g, '').length < 10) next.phone = 'Enter a full phone number'
    if (form.bio.length > 240) next.bio = 'Keep the bio under 240 characters'
    return next
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const nextErrors = validate()
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) return
    updateUser(form)
    setSaved(true)
  }

  const initials = form.name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-[280px_1fr]">
      <Card className="h-fit p-6 text-center">
        <div className="mx-auto grid size-20 place-items-center rounded-full bg-brand font-display text-2xl text-brand-ink">
          {initials || 'MV'}
        </div>
        <h2 className="mt-4 text-xl font-semibold">{user?.name}</h2>
        <p className="text-sm text-muted">{user?.role}</p>
        <p className="mt-3 text-xs text-faint">Member since {user?.joined}</p>
      </Card>

      <Card className="p-6">
        <h2 className="font-display text-2xl tracking-tight">Profile settings</h2>
        <p className="mt-1 text-sm text-muted">These details stay on this device only.</p>
        <form className="mt-6 grid gap-4 sm:grid-cols-2" onSubmit={onSubmit} noValidate>
          <Input id="name" label="Full name" value={form.name} error={errors.name} onChange={setField('name')} />
          <Input id="profile-email" label="Email" type="email" value={form.email} error={errors.email} onChange={setField('email')} />
          <Input id="phone" label="Phone" value={form.phone} error={errors.phone} onChange={setField('phone')} />
          <Input id="location" label="Location" value={form.location} onChange={setField('location')} />
          <label htmlFor="bio" className="block sm:col-span-2">
            <span className="mb-1.5 block text-sm font-semibold">Bio</span>
            <textarea
              id="bio"
              rows={4}
              value={form.bio}
              onChange={setField('bio')}
              className={`w-full rounded-ticket border bg-elevated px-4 py-3 text-[15px] outline-none ${
                errors.bio ? 'border-danger' : 'border-line focus:border-brand focus:ring-2 focus:ring-brand/20'
              }`}
            />
            <span className="mt-1 block text-xs text-faint">{form.bio.length}/240</span>
            {errors.bio && <span className="text-xs font-medium text-danger">{errors.bio}</span>}
          </label>
          <div className="flex items-center gap-3 sm:col-span-2">
            <Button type="submit">Save profile</Button>
            {saved && (
              <p className="text-sm font-medium text-brand" role="status">
                Profile updated.
              </p>
            )}
          </div>
        </form>
      </Card>
    </div>
  )
}
