import { createContext, useContext, useMemo, useState } from 'react'
import { DEMO_ACCOUNT } from '../data/demo'

const USER_KEY = 'quorvia-user'
const SESSION_KEY = 'quorvia-session'
const ACCOUNTS_KEY = 'quorvia-accounts'
const AuthContext = createContext(null)

const defaultProfile = {
  phone: '',
  location: '',
  bio: '',
  role: 'Member',
  joined: 'October 2026',
}

function readStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY) || sessionStorage.getItem(SESSION_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function readAccounts() {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function writeAccounts(accounts) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts))
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readStoredUser)

  const persist = (nextUser, remember) => {
    const payload = JSON.stringify(nextUser)
    localStorage.removeItem(USER_KEY)
    sessionStorage.removeItem(SESSION_KEY)
    if (remember) localStorage.setItem(USER_KEY, payload)
    else sessionStorage.setItem(SESSION_KEY, payload)
  }

  const startSession = (profile, remember) => {
    setUser(profile)
    persist(profile, remember)
    return { ok: true }
  }

  const login = ({ email, password, remember }) => {
    const normalized = email.trim().toLowerCase()
    if (normalized === DEMO_ACCOUNT.email && password === DEMO_ACCOUNT.password) {
      const { password: _secret, ...demoProfile } = DEMO_ACCOUNT
      return startSession(demoProfile, remember)
    }

    const account = readAccounts().find((item) => item.email === normalized)
    if (!account) {
      return { ok: false, error: 'No account found for this email. Create one, or use demo login.' }
    }
    if (account.password !== password) {
      return { ok: false, error: 'Incorrect password. Try again or reset it.' }
    }

    const existing = readStoredUser()
    const profile = {
      ...defaultProfile,
      ...(existing?.email === normalized ? existing : {}),
      name: account.name,
      email: account.email,
      role: 'Member',
      joined: account.joined,
    }
    return startSession(profile, remember)
  }

  const register = ({ name, email, password, remember }) => {
    const normalized = email.trim().toLowerCase()
    if (normalized === DEMO_ACCOUNT.email) {
      return { ok: false, error: 'That email is reserved for the demo workspace.' }
    }

    const accounts = readAccounts()
    if (accounts.some((item) => item.email === normalized)) {
      return { ok: false, error: 'An account with this email already exists. Log in instead.' }
    }

    const joined = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(new Date())
    const nextAccount = {
      name: name.trim(),
      email: normalized,
      password,
      joined,
    }
    writeAccounts([...accounts, nextAccount])

    return startSession(
      {
        ...defaultProfile,
        name: nextAccount.name,
        email: nextAccount.email,
        joined,
        role: 'Member',
      },
      remember,
    )
  }

  const loginDemo = (remember = true) => login({
    email: DEMO_ACCOUNT.email,
    password: DEMO_ACCOUNT.password,
    remember,
  })

  const updateUser = (patch) => {
    setUser((current) => {
      const next = { ...current, ...patch }
      if (localStorage.getItem(USER_KEY)) localStorage.setItem(USER_KEY, JSON.stringify(next))
      if (sessionStorage.getItem(SESSION_KEY)) sessionStorage.setItem(SESSION_KEY, JSON.stringify(next))
      const accounts = readAccounts().map((account) =>
        account.email === current.email
          ? { ...account, name: next.name || account.name, email: next.email || account.email }
          : account,
      )
      writeAccounts(accounts)
      return next
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(USER_KEY)
    sessionStorage.removeItem(SESSION_KEY)
  }

  const value = useMemo(
    () => ({ user, login, register, loginDemo, logout, updateUser }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}

