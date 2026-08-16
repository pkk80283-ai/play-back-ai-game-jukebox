import type { ApiConfig } from '../types/api'

export type SearchIntent = {
  genres: string[]
  keywords: string[]
  mood: string
  sessionLength: 'short' | 'medium' | 'long' | 'unknown'
}

const SYSTEM_PROMPT = `You convert a player's natural-language request into game search intent.
Return only valid JSON with this exact shape:
{"genres":["string"],"keywords":["string"],"mood":"string","sessionLength":"short|medium|long|unknown"}
Use concise English search terms. Infer short for roughly 15 minutes or less, medium for 15-45 minutes, and long for longer sessions.`

async function apiErrorMessage(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as { error?: { message?: string }; message?: string }
    return body.error?.message || body.message || `API ERROR ${response.status}`
  } catch {
    return `API ERROR ${response.status}`
  }
}

export async function parseIntent(
  config: ApiConfig,
  userInput: string,
  signal?: AbortSignal,
): Promise<SearchIntent> {
  const response = await fetch(`${config.baseURL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      temperature: 0.1,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userInput },
      ],
    }),
    signal,
  })

  if (!response.ok) throw new Error(await apiErrorMessage(response))

  const payload = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>
  }
  const content = payload.choices?.[0]?.message?.content
  if (!content) throw new Error('EMPTY RESPONSE FROM MODEL')

  const parsed = JSON.parse(content) as Partial<SearchIntent>
  return {
    genres: Array.isArray(parsed.genres) ? parsed.genres.filter(Boolean) : [],
    keywords: Array.isArray(parsed.keywords) ? parsed.keywords.filter(Boolean) : [],
    mood: typeof parsed.mood === 'string' ? parsed.mood : '',
    sessionLength: ['short', 'medium', 'long'].includes(parsed.sessionLength ?? '')
      ? (parsed.sessionLength as SearchIntent['sessionLength'])
      : 'unknown',
  }
}

