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
  const [roundIndex, setRoundIndex] = useState(0)
  const round = copy.intro.rounds[roundIndex]
  const isFinalRound = roundIndex === copy.intro.rounds.length - 1

  function handleAccept() {
    if (isFinalRound) {
      navigate(routes.dialogue)
      return
    }

    setDeclined(false)
    setRoundIndex((current) => current + 1)
  }

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
            <header id="incoming-title">{round.status}</header>
            <div className="incoming-panel__progress" aria-label={copy.intro.progressLabel}>
              {copy.intro.rounds.map((_, index) => (
                <span
                  className={index <= roundIndex ? 'is-active' : ''}
                  key={index}
                  aria-hidden="true"
                />
              ))}
              <small>{roundIndex + 1} / {copy.intro.rounds.length}</small>
            </div>
            <div className="incoming-panel__caller">
              <PixelIcon name="question" />
              <strong>{round.caller}</strong>
            </div>
            <div className="incoming-panel__copy" key={round.status}>
              {round.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <div className="incoming-panel__actions">
              <PixelButton variant="selected" onClick={handleAccept}>
                <span aria-hidden="true">▶</span> {round.yes}
              </PixelButton>
              <PixelButton variant="dark" onClick={() => setDeclined(true)}>
                {round.no}
              </PixelButton>
            </div>
            <PixelCursor className="intro-cursor" />
          </section>

          {declined ? (
            <PixelWindow title={round.errorTitle} className="decline-window" compact>
              <p>{round.errorMessage}</p>
              <PixelButton onClick={() => setDeclined(false)}>{copy.intro.errorReturn}</PixelButton>
            </PixelWindow>
          ) : null}
        </div>
      </PixelWindow>
      <DesktopStatusBar
        left={`${copy.intro.signalLabel} 0${roundIndex + 1}/0${copy.intro.rounds.length}`}
        right={copy.intro.ringTime}
      />
    </main>
  )
}
