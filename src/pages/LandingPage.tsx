import { useNavigate } from 'react-router-dom'
import { DesktopIconRail } from '../components/DesktopIconRail'
import { DesktopStatusBar } from '../components/DesktopStatusBar'
import { FloatingDesktopDecorations } from '../components/FloatingDesktopDecorations'
import { FloatingDesktopItem } from '../components/FloatingDesktopItem'
import { GamePreviewWindow } from '../components/GamePreviewWindow'
import { PixelButton } from '../components/PixelButton'
import { PixelCursor } from '../components/PixelCursor'
import { PixelIcon } from '../components/PixelIcon'
import { PixelWindow } from '../components/PixelWindow'
import { copy } from '../config/copy'
import { routes } from '../config/navigation'

export function LandingPage() {
  const navigate = useNavigate()

  return (
    <main className="screen desktop-world landing-screen">
      <div className="world-sky" aria-hidden="true" />
      <div className="world-grass" aria-hidden="true" />
      <img className="landing-earth" src="/assets/pixel-earth-transparent.png" alt="" />
      <FloatingDesktopDecorations />

      <FloatingDesktopItem
        x="5%"
        y="4%"
        duration={8.8}
        delay={-3.7}
        amplitude={9}
        rotation={0.8}
        zIndex={3}
        className="landing-setup-float"
      >
        <PixelWindow title={copy.landing.setupTitle} className="landing-setup" compact>
          <div className="setup-message">
            <PixelIcon name="computer" />
            <span>{copy.landing.setupMessage}</span>
          </div>
        </PixelWindow>
      </FloatingDesktopItem>

      <section className="landing-hero" aria-labelledby="landing-title">
        <h1 id="landing-title">
          {copy.landing.titleLines.map((line, index) => (
            <span key={`${line}-${index}`}>{line}</span>
          ))}
        </h1>
        <div className="landing-cta-wrap">
          <PixelButton wide onClick={() => navigate(routes.intro)}>
            {copy.landing.cta}
          </PixelButton>
          <FloatingDesktopItem
            x="91%"
            y="55%"
            duration={5.6}
            delay={-1.8}
            amplitude={6}
            rotation={1.4}
            zIndex={6}
            className="landing-cursor-float"
          >
            <PixelCursor className="landing-cursor" />
          </FloatingDesktopItem>
        </div>
        <p className="landing-descriptor">
          <i /> {copy.brand.descriptor} <i />
        </p>
      </section>

      <DesktopIconRail />
      <FloatingDesktopItem
        x="64%"
        y="52%"
        duration={9.7}
        delay={-5.8}
        amplitude={12}
        rotation={0.65}
        zIndex={3}
        interactive
        hideOnSmallScreen
        className="game-preview-float"
      >
        <GamePreviewWindow />
      </FloatingDesktopItem>
      <DesktopStatusBar left={copy.landing.signal} right={copy.landing.time} />
    </main>
  )
}
