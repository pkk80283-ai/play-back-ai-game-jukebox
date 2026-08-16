import { useState, type FormEvent } from 'react'
import { copy } from '../config/copy'
import { PixelButton } from './PixelButton'

type RPGDialogueBoxProps = {
  initialQuery: string
  onSubmit: (query: string) => void
}

export function RPGDialogueBox({ initialQuery, onSubmit }: RPGDialogueBoxProps) {
  const [query, setQuery] = useState(initialQuery)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit(query)
  }

  return (
    <form className="rpg-dialogue" onSubmit={handleSubmit}>
      <div className="rpg-dialogue__title">{copy.dialogue.speaker}</div>
      <div className="rpg-dialogue__body">
        <div className="rpg-dialogue__copy">
          {copy.dialogue.greeting.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <div className="rpg-dialogue__input-row">
          <label className="sr-only" htmlFor="game-request">
            描述你今天想怎么玩
          </label>
          <span className="rpg-dialogue__prompt" aria-hidden="true">
            &gt;
          </span>
          <input
            id="game-request"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.dialogue.placeholder}
            autoComplete="off"
            autoFocus
          />
          <span className="block-caret" aria-hidden="true" />
          <PixelButton type="submit" className="rpg-dialogue__send">
            {copy.dialogue.send}
          </PixelButton>
        </div>
        <div className="rpg-dialogue__hint">
          <i /> {copy.dialogue.hint} <i />
        </div>
      </div>
    </form>
  )
}
