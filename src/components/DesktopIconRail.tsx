import { PixelIcon } from './PixelIcon'

const icons = [
  { name: 'computer' as const, label: 'TERMINAL' },
  { name: 'folder' as const, label: 'ARCHIVES' },
  { name: 'joystick' as const, label: 'GAMES' },
  { name: 'document' as const, label: 'README.TXT' },
]

export function DesktopIconRail() {
  return (
    <nav className="desktop-icons" aria-label="Desktop shortcuts">
      {icons.map((icon) => (
        <button type="button" className="desktop-icon" key={icon.label}>
          <PixelIcon name={icon.name} />
          <span>{icon.label}</span>
        </button>
      ))}
    </nav>
  )
}
