export function SplitHeadline({ words, className = '', as: Tag = 'h1' }) {
  return (
    <Tag className={className}>
      {words.map((word, index) => (
        <span key={`${word.text}-${index}`} className="split-word">
          <span className={`split-word-inner ${word.className || ''}`} style={{ animationDelay: `${120 + index * 90}ms` }}>
            {word.text}
            {index < words.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </Tag>
  )
}
