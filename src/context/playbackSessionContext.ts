import { createContext, useContext } from 'react'
import type { ApiConfig } from '../types/api'
import type { GameResult, SearchMode, SearchStatus } from '../types/game'

export type PlaybackSessionValue = {
  userQuery: string
  setUserQuery: (query: string) => void
  gameResult: GameResult
  searchStatus: SearchStatus
  searchMode: SearchMode
  searchError: string
  searchAttempt: number
  beginSearch: (query: string, config: ApiConfig) => void
  loadMockResult: () => void
}

export const PlaybackSessionContext = createContext<PlaybackSessionValue | null>(null)

export function usePlaybackSession() {
  const context = useContext(PlaybackSessionContext)

  if (!context) {
    throw new Error('usePlaybackSession must be used inside PlaybackSessionProvider')
  }

  return context
}
