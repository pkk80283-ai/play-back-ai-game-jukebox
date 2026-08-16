import { useNavigate } from 'react-router-dom'
import { DesktopIconRail } from '../components/DesktopIconRail'
import { DesktopStatusBar } from '../components/DesktopStatusBar'
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

      <PixelWindow title={copy.landing.setupTitle} className="landing-setup" compact>
        <div className="setup-message">
          <PixelIcon name="computer" />
          <span>{copy.landing.setupMessage}</span>
        </div>
      </PixelWindow>

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
          <PixelCursor className="landing-cursor" />
        </div>
        <p className="landing-descriptor">
          <i /> {copy.brand.descriptor} <i />
        </p>
      </section>

      <DesktopIconRail />
      <GamePreviewWindow />
      <DesktopStatusBar left={copy.landing.signal} right={copy.landing.time} />
    </main>
  )
}
