import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PixelButton } from '../components/PixelButton'
import { copy } from '../config/copy'
import { routes } from '../config/navigation'
import { useApiConfig } from '../context/apiConfigContext'
import { usePlaybackSession } from '../context/playbackSessionContext'

export function GamePage() {
  const navigate = useNavigate()
  const [playing, setPlaying] = useState(false)
  const { config, isConfigured } = useApiConfig()
  const { gameResult: game, userQuery, beginSearch, loadMockResult } = usePlaybackSession()

  function playGame() {
    setPlaying(true)
    if (/^https?:\/\//i.test(game.url)) {
      window.open(game.url, '_blank', 'noopener,noreferrer')
    }
  }

  function tryAnother() {
    if (isConfigured) beginSearch(userQuery, config)
    else loadMockResult()
    navigate(routes.searching)
  }

  return (
    <main className="screen game-screen">
      <header className="game-shell-bar">
        <strong>{copy.brand.name}</strong>
        <button type="button" onClick={() => navigate(routes.dialogue)}>
          ◀ {copy.game.back}
        </button>
        <span>{game.id}</span>
        <button type="button" onClick={() => navigate(routes.end)}>
          {copy.game.exitSystem}
        </button>
      </header>

      <section className={`game-canvas ${playing ? 'is-playing' : ''}`}>
        <div className="game-canvas__sky" aria-hidden="true" />
        <div className="game-canvas__moon" aria-hidden="true" />
        <div className="game-canvas__cloud game-canvas__cloud--one" aria-hidden="true" />
        <div className="game-canvas__cloud game-canvas__cloud--two" aria-hidden="true" />
        <div className="game-canvas__ground" aria-hidden="true" />
        <div className="game-canvas__tower" aria-hidden="true" />
        <div className="game-canvas__hero" aria-hidden="true" />

        <article className="game-card">
          <p>{copy.game.suggested}</p>
          <h1>{game.title}</h1>
          <dl>
            <div>
              <dt>WHY</dt>
              <dd>{game.reason}</dd>
            </div>
            <div>
              <dt>GENRE</dt>
              <dd>{game.genre}</dd>
            </div>
            <div>
              <dt>SESSION</dt>
              <dd>{game.duration}</dd>
            </div>
          </dl>
          <div className="game-card__actions">
            <PixelButton variant="selected" onClick={playGame}>
              {playing ? copy.game.playing : copy.game.play}
            </PixelButton>
            <PixelButton onClick={tryAnother}>
              {copy.game.tryAnother}
            </PixelButton>
            <PixelButton variant="danger" onClick={() => navigate(routes.end)}>
              {copy.game.exit}
            </PixelButton>
          </div>
          <div className="game-card__status">
            <i /> {playing ? copy.game.playing : copy.game.ready}
          </div>
        </article>
      </section>
    </main>
  )
}
