import {
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { copy } from '../config/copy'
import { PlaybackSessionContext } from './playbackSessionContext'

const STORAGE_KEY = 'playback:user-query:v1'

function getInitialQuery() {
  return sessionStorage.getItem(STORAGE_KEY) ?? copy.dialogue.defaultQuery
}

export function PlaybackSessionProvider({ children }: { children: ReactNode }) {
  const [userQuery, updateUserQuery] = useState(getInitialQuery)

  const setUserQuery = useCallback((query: string) => {
    const normalizedQuery = query.trim() || copy.dialogue.defaultQuery
    sessionStorage.setItem(STORAGE_KEY, normalizedQuery)
    updateUserQuery(normalizedQuery)
  }, [])

  const value = useMemo(
    () => ({ userQuery, setUserQuery }),
    [setUserQuery, userQuery],
  )

  return (
    <PlaybackSessionContext.Provider value={value}>
      {children}
    </PlaybackSessionContext.Provider>
  )
}
