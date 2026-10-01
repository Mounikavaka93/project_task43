export function Input({
  id,
  label,
  error,
  hint,
  className = '',
  rightSlot,
  ...props
}) {
  const describedBy = [error ? `${id}-error` : null, hint ? `${id}-hint` : null].filter(Boolean).join(' ') || undefined

  return (
    <label htmlFor={id} className={`block ${className}`}>
      {label && <span className="mb-1.5 block text-sm font-semibold text-ink">{label}</span>}
      <span className="relative block">
        <input
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={`h-12 w-full rounded-ticket border bg-elevated px-4 text-[15px] text-ink outline-none transition placeholder:text-faint ${
            error ? 'border-danger focus:ring-2 focus:ring-danger/20' : 'border-line focus:border-brand focus:ring-2 focus:ring-brand/20'
          } ${rightSlot ? 'pr-12' : ''}`}
          {...props}
        />
        {rightSlot && <span className="absolute inset-y-0 right-2 flex items-center">{rightSlot}</span>}
      </span>
      <span className="mt-1.5 block min-h-4 text-xs">
        {error ? (
          <span id={`${id}-error`} role="alert" className="font-medium text-danger">
            {error}
          </span>
        ) : hint ? (
          <span id={`${id}-hint`} className="text-muted">
            {hint}
          </span>
        ) : null}
      </span>
    </label>
  )
}
