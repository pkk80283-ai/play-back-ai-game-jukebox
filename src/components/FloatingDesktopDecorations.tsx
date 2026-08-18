import { FloatingDesktopItem } from './FloatingDesktopItem'

export function FloatingDesktopDecorations() {
  return (
    <div className="floating-decorations" aria-hidden="true">
      <FloatingDesktopItem
        x="2.5%"
        y="35%"
        duration={6.7}
        delay={-2.1}
        amplitude={8}
        rotation={2.6}
        className="floating-decoration floating-decoration--star"
      >
        <span className="pixel-float-star" />
      </FloatingDesktopItem>

      <FloatingDesktopItem
        x="48%"
        y="82%"
        duration={9.1}
        delay={-4.6}
        amplitude={11}
        rotation={-2.2}
        hideOnSmallScreen
        className="floating-decoration floating-decoration--disc"
      >
        <span className="pixel-disc"><i /></span>
      </FloatingDesktopItem>

      <FloatingDesktopItem
        x="76%"
        y="17%"
        duration={7.8}
        delay={-1.3}
        amplitude={13}
        rotation={1.8}
        hideOnSmallScreen
        className="floating-decoration floating-decoration--floppy"
      >
        <span className="pixel-floppy"><i /><b /></span>
      </FloatingDesktopItem>

      <FloatingDesktopItem
        x="92%"
        y="43%"
        duration={5.9}
        delay={-3.2}
        amplitude={7}
        rotation={-1.4}
        hideOnSmallScreen
        className="floating-decoration floating-decoration--loading"
      >
        <span className="pixel-loading"><i /><i /><i /><i /></span>
      </FloatingDesktopItem>
    </div>
  )
}

