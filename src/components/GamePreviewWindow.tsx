import { useState } from 'react'
import { copy } from '../config/copy'
import { PixelWindow } from './PixelWindow'

export function GamePreviewWindow() {
  const [playing, setPlaying] = useState(true)

  return (
    <PixelWindow title={copy.landing.previewTitle} className="game-preview-window">
      <div className={`mini-game-scene ${playing ? 'is-playing' : ''}`}>
        <span className="mini-game-scene__moon" />
        <span className="mini-game-scene__tower" />
        <span className="mini-game-scene__player" />
        <span className="mini-game-scene__ground" />
      </div>
      <div className="media-controls">
        <button
          type="button"
          aria-label={playing ? 'Pause preview' : 'Play preview'}
          onClick={() => setPlaying((value) => !value)}
        >
          {playing ? 'Ⅱ' : '▶'}
        </button>
        <button type="button" aria-label="Stop preview" onClick={() => setPlaying(false)}>
          ■
        </button>
        <span className="media-progress" aria-hidden="true">
          <i />
        </span>
      </div>
    </PixelWindow>
  )
}
