import { PixelIcon } from './PixelIcon'

type DesktopStatusBarProps = {
  left: string
  right: string
}

export function DesktopStatusBar({ left, right }: DesktopStatusBarProps) {
  return (
    <footer className="desktop-statusbar">
      <span className="desktop-statusbar__icon">
        <PixelIcon name="signal" />
      </span>
      <span>{left}</span>
      <span className="desktop-statusbar__right">{right}</span>
      <span className="desktop-statusbar__icon">
        <PixelIcon name="speaker" />
      </span>
    </footer>
  )
}
