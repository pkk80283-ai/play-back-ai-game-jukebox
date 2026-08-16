import gamesData from '../src/data/games.json'
import { recommendGame } from '../src/services/gameRecommendation'
import type { ApiConfig } from '../src/types/api'
import type { GameRecord } from '../src/types/game'

type ApiRequest = { input?: string; config?: ApiConfig }

function hasValidConfig(config: ApiConfig | undefined): config is ApiConfig {
  return Boolean(config?.apiKey?.trim() && config.baseURL?.trim() && config.model?.trim())
}

async function readError(response: Response): Promise<string> {
  try {
    const payload = (await response.json()) as { error?: { message?: string }; message?: string }
    return payload.error?.message || payload.message || `MODEL CONNECTION FAILED (${response.status})`
  } catch {
    return `MODEL CONNECTION FAILED (${response.status})`
  }
}

async function handleTestConnection(config: ApiConfig): Promise<Response> {
  const response = await fetch(`${config.baseURL.replace(/\/+$/, '')}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      temperature: 0,
      max_tokens: 2,
      messages: [{ role: 'user', content: 'Reply OK.' }],
    }),
  })

  if (!response.ok) {
    return Response.json({ error: await readError(response) }, { status: response.status })
  }
  return Response.json({ ok: true, message: 'SIGNAL RECEIVED' })
}

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)
    if (request.method !== 'POST' || !['/api/recommend', '/api/test-connection'].includes(url.pathname)) {
      return new Response(null, { status: 404 })
    }

    try {
      const body = (await request.json()) as ApiRequest
      if (!hasValidConfig(body.config)) {
        return Response.json({ error: 'NO SIGNAL: API CONFIGURATION REQUIRED' }, { status: 400 })
      }

      if (url.pathname === '/api/test-connection') {
        return handleTestConnection(body.config)
      }

      const input = body.input?.trim()
      if (!input) return Response.json({ error: 'EMPTY PLAYER REQUEST' }, { status: 400 })

      const result = await recommendGame(
        { ...body.config, baseURL: body.config.baseURL.replace(/\/+$/, '') },
        input,
        gamesData as GameRecord[],
        request.signal,
      )
      return Response.json(result)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'UNKNOWN SIGNAL ERROR'
      return Response.json({ error: message }, { status: 500 })
    }
  },
}
