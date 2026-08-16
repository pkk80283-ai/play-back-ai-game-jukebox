import { useState, type FormEvent } from 'react'
import { defaultApiConfig, hasValidApiConfig } from '../config/apiConfig'
import { useApiConfig } from '../context/apiConfigContext'
import { testApiConnection } from '../services/gameSearchService'
import type { ApiConfig } from '../types/api'
import { PixelButton } from './PixelButton'
import { PixelWindow } from './PixelWindow'

type TestState = { kind: 'idle' | 'testing' | 'success' | 'error'; message: string }

export function TerminalWindow() {
  const { isTerminalOpen } = useApiConfig()
  return isTerminalOpen ? <TerminalPanel /> : null
}

function TerminalPanel() {
  const { config, saveConfig, clearConfig, closeTerminal } = useApiConfig()
  const [draft, setDraft] = useState<ApiConfig>(config)
  const [testState, setTestState] = useState<TestState>({ kind: 'idle', message: '' })

  function update(field: keyof ApiConfig, value: string) {
    setDraft((current) => ({ ...current, [field]: value }))
    setTestState({ kind: 'idle', message: '' })
  }

  function handleSave(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!hasValidApiConfig(draft)) {
      setTestState({ kind: 'error', message: 'COMPLETE ALL THREE FIELDS' })
      return
    }
    saveConfig(draft)
    setTestState({ kind: 'success', message: 'CONFIG SAVED FOR THIS SESSION' })
  }

  async function handleTest() {
    if (!hasValidApiConfig(draft)) {
      setTestState({ kind: 'error', message: 'COMPLETE ALL THREE FIELDS' })
      return
    }
    setTestState({ kind: 'testing', message: 'DIALING MODEL...' })
    const result = await testApiConnection(draft)
    setTestState({ kind: result.ok ? 'success' : 'error', message: result.message })
  }

  function handleClear() {
    clearConfig()
    setDraft(defaultApiConfig)
    setTestState({ kind: 'idle', message: 'CONFIG CLEARED' })
  }

  return (
    <div className="terminal-overlay" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) closeTerminal()
    }}>
      <PixelWindow title="TERMINAL.EXE / API SIGNAL" className="terminal-window" onClose={closeTerminal}>
        <form className="terminal-form" onSubmit={handleSave}>
          <p className="terminal-form__lead">CONNECT AN OPENAI-COMPATIBLE MODEL</p>
          <label>
            <span>API KEY</span>
            <input
              type="password"
              value={draft.apiKey}
              onChange={(event) => update('apiKey', event.target.value)}
              placeholder="sk-••••••••"
              autoComplete="off"
            />
          </label>
          <label>
            <span>BASE URL</span>
            <input
              value={draft.baseURL}
              onChange={(event) => update('baseURL', event.target.value)}
              placeholder="https://api.example.com/v1"
              spellCheck={false}
            />
          </label>
          <label>
            <span>MODEL</span>
            <input
              value={draft.model}
              onChange={(event) => update('model', event.target.value)}
              placeholder="model-name"
              spellCheck={false}
            />
          </label>
          <p className="terminal-form__notice">
            DEMO MODE: KEY IS STORED IN THIS BROWSER SESSION ONLY. USE A SERVER SECRET IN PRODUCTION.
          </p>
          <div className="terminal-form__actions">
            <PixelButton type="submit" variant="selected">SAVE</PixelButton>
            <PixelButton type="button" onClick={() => void handleTest()} disabled={testState.kind === 'testing'}>
              TEST
            </PixelButton>
            <PixelButton type="button" variant="danger" onClick={handleClear}>CLEAR</PixelButton>
          </div>
          <output className={`terminal-form__status is-${testState.kind}`} aria-live="polite">
            &gt; {testState.message || 'AWAITING CONFIGURATION_'}
          </output>
        </form>
      </PixelWindow>
    </div>
  )
}
