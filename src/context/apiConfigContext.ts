import { createContext, useContext } from 'react'
import type { ApiConfig } from '../types/api'

export type ApiConfigValue = {
  config: ApiConfig
  isConfigured: boolean
  isTerminalOpen: boolean
  saveConfig: (config: ApiConfig) => void
  clearConfig: () => void
  openTerminal: () => void
  closeTerminal: () => void
}

export const ApiConfigContext = createContext<ApiConfigValue | null>(null)

export function useApiConfig() {
  const context = useContext(ApiConfigContext)

  if (!context) {
    throw new Error('useApiConfig must be used inside ApiConfigProvider')
  }

  return context
}
