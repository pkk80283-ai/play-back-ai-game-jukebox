export type GameRecord = {
  name: string
  category: string
  description: string
  url: string
  tags: string[]
  source: string
  image?: string
}

export type BackendGameRecommendation = {
  name: string
  description?: string
  reason?: string
  url: string
  category?: string
  image?: string
}

export type GameResult = {
  id: string
  title: string
  description: string
  reason: string
  url: string
  genre: string
  duration: string
  image?: string
}

export type SearchStatus = 'idle' | 'searching' | 'success' | 'error'
export type SearchMode = 'api' | 'mock' | null
