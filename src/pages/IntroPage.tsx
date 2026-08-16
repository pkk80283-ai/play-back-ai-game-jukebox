import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { DesktopStatusBar } from '../components/DesktopStatusBar'
import { PixelButton } from '../components/PixelButton'
import { PixelCursor } from '../components/PixelCursor'
import { PixelIcon } from '../components/PixelIcon'
import { PixelWindow } from '../components/PixelWindow'
import { copy } from '../config/copy'
import { routes } from '../config/navigation'

export function IntroPage() {
  const navigate = useNavigate()
  const [declined, setDeclined] = useState(false)

  return (
    <main className="screen desktop-world intro-screen">
      <div className="intro-landscape" aria-hidden="true" />
      <PixelWindow title={copy.intro.windowTitle} className="intro-frame">
        <div className="intro-content">
          <div className="phone-stage" aria-hidden="true">
            <span className="signal-ring signal-ring--one" />
            <span className="signal-ring signal-ring--two" />
            <span className="signal-ring signal-ring--three" />
            <img src="/assets/y2k-phone-transparent.png" alt="" />
          </div>

          <h1 className="intro-title">
            <span>2000s</span>
            <span>IS CALLING</span>
          </h1>

          <section className="incoming-panel" aria-labelledby="incoming-title">
            <header id="incoming-title">{copy.intro.status}</header>
            <div className="incoming-panel__caller">
              <PixelIcon name="question" />
              <strong>{copy.intro.caller}</strong>
            </div>
            <div className="incoming-panel__copy">
              {copy.intro.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <div className="incoming-panel__actions">
              <PixelButton variant="selected" onClick={() => navigate(routes.dialogue)}>
                <span aria-hidden="true">▶</span> {copy.intro.answer}
              </PixelButton>
              <PixelButton variant="dark" onClick={() => setDeclined(true)}>
                {copy.intro.decline}
              </PixelButton>
            </div>
            <PixelCursor className="intro-cursor" />
          </section>

          {declined ? (
            <PixelWindow title={copy.intro.declineTitle} className="decline-window" compact>
              <p>{copy.intro.declineMessage}</p>
              <PixelButton onClick={() => setDeclined(false)}>OK</PixelButton>
            </PixelWindow>
          ) : null}
        </div>
      </PixelWindow>
      <DesktopStatusBar left={copy.intro.signalStrength} right={copy.intro.ringTime} />
    </main>
  )
}
