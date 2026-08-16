import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PixelWindow } from '../components/PixelWindow'
import { SystemTopBar } from '../components/SystemTopBar'
import { copy } from '../config/copy'
import { routes } from '../config/navigation'
import { usePlaybackSession } from '../context/playbackSessionContext'
import { searchSteps } from '../data/searchSteps'

export function SearchingPage() {
  const navigate = useNavigate()
  const { userQuery } = usePlaybackSession()
  const [currentStep, setCurrentStep] = useState(-1)

  useEffect(() => {
    const stepTimer = window.setInterval(() => {
      setCurrentStep((step) => Math.min(step + 1, searchSteps.length - 1))
    }, 460)
    const navigationTimer = window.setTimeout(() => navigate(routes.game), 3400)

    return () => {
      window.clearInterval(stepTimer)
      window.clearTimeout(navigationTimer)
    }
  }, [navigate])

  const progress = Math.min(92, 12 + (currentStep + 1) * 16)

  return (
    <main className="screen searching-screen">
      <SystemTopBar middle={copy.searching.archive} right={copy.searching.status} />
      <div className="searching-world" aria-hidden="true" />
      <h1 className="searching-title">{copy.searching.title}</h1>

      <PixelWindow title="ARCHIVE_QUERY.DAT" className="request-window">
        <span>{copy.searching.request}</span>
        <blockquote>“{userQuery}”</blockquote>
      </PixelWindow>

      <section className="archive-scan" aria-label="Archive scan status">
        <ol className="scan-steps">
          {searchSteps.map((step, index) => {
            const isComplete = index <= currentStep
            const isActive = index === currentStep + 1

            return (
              <li
                key={step.id}
                className={`${isComplete ? 'is-complete' : ''} ${isActive ? 'is-active' : ''}`}
              >
                <span>{step.label}</span>
                <strong>{isComplete ? step.detail : isActive ? 'SCANNING...' : '—'}</strong>
                <i>{isComplete ? '✓' : isActive ? '...' : ''}</i>
              </li>
            )
          })}
        </ol>

        <div className="match-funnel" aria-hidden="true">
          {copy.searching.narrowing.map((label, index) => (
            <div key={label} className={index <= Math.max(0, currentStep - 1) ? 'is-lit' : ''}>
              <span>{label}</span>
              {index < copy.searching.narrowing.length - 1 ? <i>↓</i> : null}
            </div>
          ))}
        </div>
      </section>

      <div className="search-progress" aria-label={`${progress}% complete`}>
        <div className="search-progress__track">
          <span style={{ width: `${progress}%` }} />
        </div>
        <strong>{progress}%</strong>
      </div>
    </main>
  )
}
