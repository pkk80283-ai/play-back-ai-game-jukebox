import MiniSearch, { type SearchResult } from 'minisearch'
import type { GameRecord } from '../types/game'
import type { SearchIntent } from './intentParser'
import { matchGenre } from './genreTaxonomy'

type SearchDocument = {
  id: number
  name: string
  category: string
  description: string
  tags: string
}

export type SearchCandidate = GameRecord & { score: number }

let cachedGames: GameRecord[] | null = null
let cachedIndex: MiniSearch<SearchDocument> | null = null

function getIndex(games: GameRecord[]): MiniSearch<SearchDocument> {
  if (cachedGames === games && cachedIndex) return cachedIndex

  const index = new MiniSearch<SearchDocument>({
    fields: ['name', 'category', 'description', 'tags'],
    storeFields: ['name', 'category', 'description', 'tags'],
    searchOptions: {
      boost: { name: 3, category: 2.4, tags: 2, description: 1 },
      fuzzy: 0.2,
      prefix: true,
    },
  })

  index.addAll(
    games.map((game, id) => ({
      id,
      name: game.name,
      category: game.category,
      description: game.description,
      tags: game.tags.join(' '),
    })),
  )

  cachedGames = games
  cachedIndex = index
  return index
}

function toCandidate(result: SearchResult, games: GameRecord[]): SearchCandidate | null {
  const game = games[Number(result.id)]
  return game ? { ...game, score: result.score } : null
}

export function searchGames(
  games: GameRecord[],
  input: string,
  intent: SearchIntent,
  maxResults = 16,
): SearchCandidate[] {
  const terms = [
    input,
    ...intent.genres,
    ...intent.keywords,
    intent.mood,
  ].filter(Boolean)

  const results = getIndex(games)
    .search(terms.join(' '))
    .slice(0, maxResults)
    .map((result) => toCandidate(result, games))
    .filter((candidate): candidate is SearchCandidate => Boolean(candidate))

  const requestedGenres = intent.genres.map(matchGenre).filter(Boolean)
  if (!requestedGenres.length) return results

  const genreMatches = results.filter((game) => {
    const haystack = `${game.category} ${game.tags.join(' ')}`.toLowerCase()
    return requestedGenres.some((genre) => genre && haystack.includes(genre))
  })

  return genreMatches.length ? genreMatches : results
}

