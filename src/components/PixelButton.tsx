import type { ButtonHTMLAttributes, ReactNode } from 'react'

type PixelButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'system' | 'selected' | 'dark' | 'danger'
  wide?: boolean
}

export function PixelButton({
  children,
  className = '',
  variant = 'system',
  wide = false,
  type = 'button',
  ...props
}: PixelButtonProps) {
  return (
    <button
      type={type}
      className={`pixel-button pixel-button--${variant} ${wide ? 'pixel-button--wide' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
