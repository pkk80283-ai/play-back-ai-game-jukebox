import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PixelWindow } from '../components/PixelWindow'
import { PixelButton } from '../components/PixelButton'
import { SystemTopBar } from '../components/SystemTopBar'
import { copy } from '../config/copy'
import { routes } from '../config/navigation'
import { useApiConfig } from '../context/apiConfigContext'
import { usePlaybackSession } from '../context/playbackSessionContext'
import { searchSteps } from '../data/searchSteps'

export function SearchingPage() {
  const { searchAttempt } = usePlaybackSession()
  return <SearchingRun key={searchAttempt} />
}

function SearchingRun() {
  const navigate = useNavigate()
  const { config, isConfigured, openTerminal } = useApiConfig()
  const {
    userQuery,
    searchStatus,
    searchMode,
    searchError,
    beginSearch,
    loadMockResult,
  } = usePlaybackSession()
  const [currentStep, setCurrentStep] = useState(-1)
  const [minimumAnimationComplete, setMinimumAnimationComplete] = useState(false)

  useEffect(() => {
    const stepTimer = window.setInterval(() => {
      setCurrentStep((step) => Math.min(step + 1, searchSteps.length - 1))
    }, 460)
    const minimumTimer = window.setTimeout(() => setMinimumAnimationComplete(true), 2300)

    return () => {
      window.clearInterval(stepTimer)
      window.clearTimeout(minimumTimer)
    }
  }, [])

  useEffect(() => {
    if (minimumAnimationComplete && searchStatus === 'success') {
      navigate(routes.game)
    }
  }, [minimumAnimationComplete, navigate, searchStatus])

  function retry() {
    if (!isConfigured) {
      openTerminal()
      return
    }
    beginSearch(userQuery, config)
  }

  const progress = searchStatus === 'success'
    ? 100
    : Math.min(92, 12 + (currentStep + 1) * 16)
  const isWaiting = minimumAnimationComplete && searchStatus === 'searching'
  const showError = minimumAnimationComplete && (searchStatus === 'error' || searchStatus === 'idle')

  return (
    <main className="screen searching-screen">
      <SystemTopBar middle={copy.searching.archive} right={copy.searching.status} />
      <div className="searching-world" aria-hidden="true" />
      <h1 className="searching-title">
        {showError ? 'SIGNAL LOST' : isWaiting ? 'WAITING FOR SIGNAL...' : copy.searching.title}
      </h1>

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

      {showError ? (
        <PixelWindow title="SIGNAL_ERROR.LOG" className="search-error-window">
          <h2>CONNECTION FAILED</h2>
          <p>{searchError || 'NO ACTIVE SEARCH SIGNAL'}</p>
          <div className="search-error-window__actions">
            <PixelButton variant="selected" onClick={retry}>
              {isConfigured ? 'RETRY' : 'OPEN TERMINAL'}
            </PixelButton>
            <PixelButton onClick={loadMockResult}>USE MOCK ARCHIVE</PixelButton>
          </div>
        </PixelWindow>
      ) : null}

      {searchMode === 'mock' && !showError ? (
        <p className="search-mode-badge">DEMO ARCHIVE / LOCAL MATCH</p>
      ) : null}
    </main>
  )
}
