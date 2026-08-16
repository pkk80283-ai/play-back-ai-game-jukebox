import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PixelButton } from '../components/PixelButton'
import { PixelNPC } from '../components/PixelNPC'
import { RPGDialogueBox } from '../components/RPGDialogueBox'
import { SystemTopBar } from '../components/SystemTopBar'
import { copy } from '../config/copy'
import { routes } from '../config/navigation'
import { useApiConfig } from '../context/apiConfigContext'
import { usePlaybackSession } from '../context/playbackSessionContext'

export function DialoguePage() {
  const navigate = useNavigate()
  const { config, isConfigured, openTerminal } = useApiConfig()
  const { userQuery, setUserQuery, beginSearch, loadMockResult } = usePlaybackSession()
  const [pendingQuery, setPendingQuery] = useState(userQuery)
  const [showNoSignal, setShowNoSignal] = useState(false)

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        navigate(routes.landing)
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [navigate])

  function handleSubmit(query: string) {
    setUserQuery(query)
    setPendingQuery(query)
    if (!isConfigured) {
      setShowNoSignal(true)
      return
    }
    beginSearch(query, config)
    navigate(routes.searching)
  }

  function reconnect() {
    if (!isConfigured) {
      openTerminal()
      return
    }
    setShowNoSignal(false)
    beginSearch(pendingQuery, config)
    navigate(routes.searching)
  }

  function continueInDemoMode() {
    setShowNoSignal(false)
    loadMockResult()
    navigate(routes.searching)
  }

  return (
    <main className="screen dialogue-screen">
      <SystemTopBar />
      <div className="dialogue-world" aria-hidden="true">
        <div className="dialogue-words">
          {copy.dialogue.backgroundWords.map((word) => (
            <span key={word}>{word}</span>
          ))}
        </div>
      </div>
      <div className="npc-stage">
        <div className="speech-bubble">{copy.dialogue.speech}</div>
        <PixelNPC />
      </div>
      <RPGDialogueBox initialQuery={userQuery} onSubmit={handleSubmit} />
      {showNoSignal ? (
        <section className="no-signal-dialog" role="alertdialog" aria-labelledby="no-signal-title">
          <div className="no-signal-dialog__bar">NETWORK_ERROR.EXE</div>
          <div className="no-signal-dialog__body">
            <h2 id="no-signal-title">NO SIGNAL</h2>
            <p>MODEL CONNECTION IS NOT CONFIGURED.</p>
            <div>
              <PixelButton variant="selected" onClick={reconnect}>
                {isConfigured ? 'RECONNECT' : 'OPEN TERMINAL'}
              </PixelButton>
              <PixelButton onClick={continueInDemoMode}>USE DEMO MODE</PixelButton>
            </div>
          </div>
        </section>
      ) : null}
    </main>
  )
}
