import type { ApiConfig } from '../types/api'
import type { BackendGameRecommendation, GameRecord } from '../types/game'
import { searchGames, type SearchCandidate } from './gameSearch'
import { parseIntent } from './intentParser'

async function readApiError(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as { error?: { message?: string }; message?: string }
    return body.error?.message || body.message || `API ERROR ${response.status}`
  } catch {
    return `API ERROR ${response.status}`
  }
}

function fallbackCandidates(games: GameRecord[]): SearchCandidate[] {
  return games.slice(0, 12).map((game, index) => ({ ...game, score: 12 - index }))
}

export async function recommendGame(
  config: ApiConfig,
  input: string,
  games: GameRecord[],
  signal?: AbortSignal,
): Promise<BackendGameRecommendation> {
  const intent = await parseIntent(config, input, signal)
  const candidates = searchGames(games, input, intent)
  const shortlist = candidates.length ? candidates : fallbackCandidates(games)

  const response = await fetch(`${config.baseURL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${config.apiKey}`,
    },
    body: JSON.stringify({
      model: config.model,
      temperature: 0.35,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            'Pick exactly one game from the candidates. Return JSON only: {"name":"exact candidate name","reason":"one concise Chinese sentence"}. Never invent a game.',
        },
        {
          role: 'user',
          content: JSON.stringify({
            request: input,
            intent,
            candidates: shortlist.slice(0, 10).map(({ name, category, description, tags }) => ({
              name,
              category,
              description,
              tags,
            })),
          }),
        },
      ],
    }),
    signal,
  })

  if (!response.ok) throw new Error(await readApiError(response))

  const payload = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>
  }
  const content = payload.choices?.[0]?.message?.content
  if (!content) throw new Error('EMPTY RESPONSE FROM MODEL')

  const selection = JSON.parse(content) as { name?: string; reason?: string }
  const selected = shortlist.find(
    (game) => game.name.toLowerCase() === selection.name?.trim().toLowerCase(),
  ) ?? shortlist[0]

  if (!selected) throw new Error('NO GAME MATCHED THIS SIGNAL')

  return {
    name: selected.name,
    description: selected.description,
    reason: selection.reason || '这款游戏最接近你刚才发出的信号。',
    url: selected.url,
    category: selected.category,
    image: selected.image,
  }
}

