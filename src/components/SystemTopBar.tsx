import type { ReactNode } from 'react'
import { copy } from '../config/copy'

type SystemTopBarProps = {
  middle?: ReactNode
  right?: ReactNode
  className?: string
}

export function SystemTopBar({ middle, right, className = '' }: SystemTopBarProps) {
  return (
    <header className={`system-topbar ${className}`}>
      <span className="system-topbar__brand">{copy.brand.os}</span>
      <span className="system-topbar__middle">{middle ?? copy.system.time}</span>
      <span className="system-topbar__status">
        {right ?? (
          <>
            <i aria-hidden="true" /> {copy.system.online}
          </>
        )}
      </span>
    </header>
  )
}
