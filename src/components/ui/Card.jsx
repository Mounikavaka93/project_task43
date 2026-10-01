export function Card({ className = '', children, hover = false, as: Tag = 'div', ...props }) {
  return (
    <Tag
      className={`rounded-ledger border border-line bg-surface shadow-[var(--shadow-card)] ${
        hover ? 'card-lift transition duration-500 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-lg' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
