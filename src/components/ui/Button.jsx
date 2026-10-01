const variants = {
  primary:
    'btn-shine bg-brand text-brand-ink shadow-sm hover:-translate-y-0.5 hover:shadow-md active:translate-y-0',
  secondary:
    'bg-surface text-ink border border-line hover:bg-elevated hover:-translate-y-0.5 hover:border-gold/50',
  ghost: 'bg-transparent text-ink hover:bg-brand-soft',
  danger: 'bg-danger text-white hover:opacity-90',
}

const sizes = {
  sm: 'h-9 px-3 text-sm',
  md: 'h-11 px-4 text-sm',
  lg: 'h-12 px-5 text-[15px]',
}

export function Button({
  as: Tag = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  type = 'button',
  ...props
}) {
  return (
    <Tag
      type={Tag === 'button' ? type : undefined}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition duration-200 hover:gap-3 disabled:pointer-events-none disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
