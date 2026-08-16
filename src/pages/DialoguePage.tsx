import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { PixelNPC } from '../components/PixelNPC'
import { RPGDialogueBox } from '../components/RPGDialogueBox'
import { SystemTopBar } from '../components/SystemTopBar'
import { copy } from '../config/copy'
import { routes } from '../config/navigation'
import { usePlaybackSession } from '../context/playbackSessionContext'

export function DialoguePage() {
  const navigate = useNavigate()
  const { userQuery, setUserQuery } = usePlaybackSession()

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
    </main>
  )
}
