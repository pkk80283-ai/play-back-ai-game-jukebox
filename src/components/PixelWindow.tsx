import type { ReactNode } from 'react'

type PixelWindowProps = {
  title: string
  children: ReactNode
  className?: string
  compact?: boolean
}

export function PixelWindow({
  title,
  children,
  className = '',
  compact = false,
}: PixelWindowProps) {
  return (
    <section
      className={`pixel-window ${compact ? 'pixel-window--compact' : ''} ${className}`}
      aria-label={title}
    >
      <header className="pixel-window__bar">
        <span>{title}</span>
        <span className="pixel-window__controls" aria-hidden="true">
          <i>_</i>
          <i>□</i>
          <i>×</i>
        </span>
      </header>
      <div className="pixel-window__body">{children}</div>
    </section>
  )
}
