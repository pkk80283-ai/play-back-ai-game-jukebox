import type { ApiConfig, ConnectionTestResult } from '../types/api'
import type { BackendGameRecommendation, GameResult } from '../types/game'
import { toGameResult } from './gameResultAdapter'

async function readError(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as { error?: string; message?: string }
    return body.error || body.message || `SIGNAL ERROR ${response.status}`
  } catch {
    return `SIGNAL ERROR ${response.status}`
  }
}

export async function requestGameRecommendation(
  input: string,
  config: ApiConfig,
  signal?: AbortSignal,
): Promise<GameResult> {
  const response = await fetch('/api/recommend', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ input, config }),
    signal,
  })

  if (!response.ok) throw new Error(await readError(response))
  return toGameResult((await response.json()) as BackendGameRecommendation)
}

export async function testApiConnection(config: ApiConfig): Promise<ConnectionTestResult> {
  try {
    const response = await fetch('/api/test-connection', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ config }),
    })
    if (!response.ok) return { ok: false, message: await readError(response) }
    return (await response.json()) as ConnectionTestResult
  } catch {
    return { ok: false, message: 'LOCAL SIGNAL SERVER IS OFFLINE' }
  }
}

