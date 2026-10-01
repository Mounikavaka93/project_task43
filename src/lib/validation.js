export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const namePattern = /^[A-Za-z][A-Za-z .'-]{1,49}$/

export function validateEmail(value) {
  if (!value.trim()) return 'Email is required'
  if (!emailPattern.test(value.trim())) return 'Enter a valid email address'
  return ''
}

export function validateName(value) {
  const name = value.trim()
  if (!name) return 'Full name is required'
  if (name.length < 2) return 'Use at least 2 characters'
  if (!namePattern.test(name)) return 'Use letters, spaces, and hyphens only'
  return ''
}

export function passwordChecks(password) {
  return {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  }
}

export function passwordStrength(password) {
  const checks = passwordChecks(password)
  return Object.values(checks).filter(Boolean).length
}

export function validatePassword(password, { requiredLabel = 'Password is required' } = {}) {
  if (!password) return requiredLabel
  const checks = passwordChecks(password)
  if (!checks.length) return 'Use at least 8 characters'
  if (!checks.upper) return 'Add an uppercase letter'
  if (!checks.lower) return 'Add a lowercase letter'
  if (!checks.number) return 'Add a number'
  if (!checks.special) return 'Add a symbol such as ! @ # $'
  return ''
}

export function validateConfirm(password, confirm) {
  if (!confirm) return 'Confirm your password'
  if (confirm !== password) return 'Passwords do not match'
  return ''
}
