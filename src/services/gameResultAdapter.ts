import type { BackendGameRecommendation, GameResult } from '../types/game'

function stableId(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'signal-game'
}

export function toGameResult(game: BackendGameRecommendation): GameResult {
  return {
    id: stableId(game.name),
    title: game.name,
    description: game.description || 'A GAME ANSWERED YOUR SIGNAL.',
    reason: game.reason || '这款游戏最接近你刚才发出的信号。',
    url: game.url,
    genre: game.category || 'ARCADE',
    duration: '10–20 MIN',
    image: game.image,
  }
}

