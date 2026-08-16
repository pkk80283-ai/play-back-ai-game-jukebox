import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { copy } from '../config/copy'
import { mockGames } from '../data/mockGames'
import { requestGameRecommendation } from '../services/gameSearchService'
import type { ApiConfig } from '../types/api'
import type { GameResult, SearchMode, SearchStatus } from '../types/game'
import { PlaybackSessionContext } from './playbackSessionContext'

const STORAGE_KEY = 'playback:user-query:v1'
const RESULT_STORAGE_KEY = 'playback:game-result:v1'

function getInitialQuery() {
  return sessionStorage.getItem(STORAGE_KEY) ?? copy.dialogue.defaultQuery
}

function gameFromMock(index: number): GameResult {
  const game = mockGames[index] ?? mockGames[0]
  return {
    id: game.id,
    title: game.title,
    description: game.description ?? 'A GAME IS WAITING IN THE ARCHIVE.',
    reason: game.reason,
    url: game.url,
    genre: game.genre,
    duration: game.duration,
  }
}

function getInitialGame(): GameResult {
  try {
    const stored = sessionStorage.getItem(RESULT_STORAGE_KEY)
    return stored ? (JSON.parse(stored) as GameResult) : gameFromMock(0)
  } catch {
    return gameFromMock(0)
  }
}

export function PlaybackSessionProvider({ children }: { children: ReactNode }) {
  const [userQuery, updateUserQuery] = useState(getInitialQuery)
  const [gameResult, setGameResult] = useState(getInitialGame)
  const [searchStatus, setSearchStatus] = useState<SearchStatus>('idle')
  const [searchMode, setSearchMode] = useState<SearchMode>(null)
  const [searchError, setSearchError] = useState('')
  const [searchAttempt, setSearchAttempt] = useState(0)
  const activeRequest = useRef<AbortController | null>(null)

  useEffect(() => () => activeRequest.current?.abort(), [])

  const setUserQuery = useCallback((query: string) => {
    const normalizedQuery = query.trim() || copy.dialogue.defaultQuery
    sessionStorage.setItem(STORAGE_KEY, normalizedQuery)
    updateUserQuery(normalizedQuery)
  }, [])

  const beginSearch = useCallback((query: string, config: ApiConfig) => {
    const normalizedQuery = query.trim() || copy.dialogue.defaultQuery
    activeRequest.current?.abort()
    const controller = new AbortController()
    activeRequest.current = controller
    sessionStorage.setItem(STORAGE_KEY, normalizedQuery)
    updateUserQuery(normalizedQuery)
    setSearchStatus('searching')
    setSearchMode('api')
    setSearchError('')
    setSearchAttempt((attempt) => attempt + 1)

    void requestGameRecommendation(normalizedQuery, config, controller.signal)
      .then((result) => {
        if (controller.signal.aborted) return
        sessionStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(result))
        setGameResult(result)
        setSearchStatus('success')
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return
        setSearchError(error instanceof Error ? error.message : 'UNKNOWN SIGNAL ERROR')
        setSearchStatus('error')
      })
  }, [])

  const loadMockResult = useCallback(() => {
    activeRequest.current?.abort()
    const result = gameFromMock(1)
    sessionStorage.setItem(RESULT_STORAGE_KEY, JSON.stringify(result))
    setGameResult(result)
    setSearchMode('mock')
    setSearchError('')
    setSearchStatus('success')
    setSearchAttempt((attempt) => attempt + 1)
  }, [])

  const value = useMemo(
    () => ({
      userQuery,
      setUserQuery,
      gameResult,
      searchStatus,
      searchMode,
      searchError,
      searchAttempt,
      beginSearch,
      loadMockResult,
    }),
    [
      beginSearch,
      gameResult,
      searchAttempt,
      searchError,
      searchMode,
      searchStatus,
      setUserQuery,
      loadMockResult,
      userQuery,
    ],
  )

  return (
    <PlaybackSessionContext.Provider value={value}>
      {children}
    </PlaybackSessionContext.Provider>
  )
}
