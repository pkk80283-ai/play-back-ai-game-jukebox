import { PixelIcon } from './PixelIcon'
import { useApiConfig } from '../context/apiConfigContext'
import { FloatingDesktopItem } from './FloatingDesktopItem'

const icons = [
  { name: 'computer' as const, label: 'TERMINAL', x: '4.5%', y: '82%', duration: 6.2, delay: -1.4, amplitude: 7, rotation: 1.2 },
  { name: 'folder' as const, label: 'ARCHIVES', x: '13.5%', y: '85%', duration: 8.4, delay: -4.1, amplitude: 10, rotation: -1.8 },
  { name: 'joystick' as const, label: 'GAMES', x: '22.5%', y: '81%', duration: 7.1, delay: -2.6, amplitude: 8, rotation: 2.1 },
  { name: 'document' as const, label: 'README.TXT', x: '31%', y: '84%', duration: 9.6, delay: -5.2, amplitude: 12, rotation: -1.3 },
]

export function DesktopIconRail() {
  const { openTerminal } = useApiConfig()

  return (
    <nav className="desktop-icons" aria-label="Desktop shortcuts">
      {icons.map((icon) => (
        <FloatingDesktopItem
          key={icon.label}
          x={icon.x}
          y={icon.y}
          duration={icon.duration}
          delay={icon.delay}
          amplitude={icon.amplitude}
          rotation={icon.rotation}
          zIndex={3}
          interactive
          className={`desktop-shortcut desktop-shortcut--${icon.name}`}
        >
          <button
            type="button"
            className="desktop-icon"
            onClick={icon.name === 'computer' ? openTerminal : undefined}
          >
            <PixelIcon name={icon.name} />
            <span>{icon.label}</span>
          </button>
        </FloatingDesktopItem>
      ))}
    </nav>
  )
}
