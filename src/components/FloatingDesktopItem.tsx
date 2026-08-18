import type { CSSProperties, ReactNode } from 'react'

type FloatingDesktopItemProps = {
  children: ReactNode
  x: string
  y: string
  duration: number
  delay?: number
  amplitude?: number
  rotation?: number
  zIndex?: number
  interactive?: boolean
  hideOnSmallScreen?: boolean
  className?: string
}

type FloatingStyle = CSSProperties & {
  '--float-left': string
  '--float-top': string
  '--float-duration': string
  '--float-delay': string
  '--float-x': string
  '--float-y': string
  '--float-rotation': string
}

export function FloatingDesktopItem({
  children,
  x,
  y,
  duration,
  delay = 0,
  amplitude = 10,
  rotation = 2,
  zIndex = 2,
  interactive = false,
  hideOnSmallScreen = false,
  className = '',
}: FloatingDesktopItemProps) {
  const style: FloatingStyle = {
    '--float-left': x,
    '--float-top': y,
    '--float-duration': `${duration}s`,
    '--float-delay': `${delay}s`,
    '--float-x': `${Math.max(4, amplitude * 0.68)}px`,
    '--float-y': `${Math.max(6, amplitude)}px`,
    '--float-rotation': `${rotation}deg`,
    zIndex,
  }

  return (
    <div
      className={`floating-desktop-item ${interactive ? 'floating-desktop-item--interactive' : ''} ${hideOnSmallScreen ? 'floating-desktop-item--hide-small' : ''} ${className}`}
      style={style}
      aria-hidden={interactive ? undefined : true}
      data-floating-item
    >
      {children}
    </div>
  )
}

