import { createContext, useContext } from 'react'

export type PlaybackSessionValue = {
  userQuery: string
  setUserQuery: (query: string) => void
}

export const PlaybackSessionContext = createContext<PlaybackSessionValue | null>(null)

export function usePlaybackSession() {
  const context = useContext(PlaybackSessionContext)

  if (!context) {
    throw new Error('usePlaybackSession must be used inside PlaybackSessionProvider')
  }

  return context
}
