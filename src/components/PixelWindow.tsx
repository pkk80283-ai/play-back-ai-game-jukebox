import type { ReactNode } from 'react'

type PixelWindowProps = {
  title: string
  children: ReactNode
  className?: string
  compact?: boolean
  onClose?: () => void
}

export function PixelWindow({
  title,
  children,
  className = '',
  compact = false,
  onClose,
}: PixelWindowProps) {
  return (
    <section
      className={`pixel-window ${compact ? 'pixel-window--compact' : ''} ${className}`}
      aria-label={title}
    >
      <header className="pixel-window__bar">
        <span>{title}</span>
        <span className="pixel-window__controls">
          <i aria-hidden="true">_</i>
          <i aria-hidden="true">□</i>
          {onClose ? (
            <button type="button" aria-label={`Close ${title}`} onClick={onClose}>×</button>
          ) : (
            <i aria-hidden="true">×</i>
          )}
        </span>
      </header>
      <div className="pixel-window__body">{children}</div>
    </section>
  )
}
