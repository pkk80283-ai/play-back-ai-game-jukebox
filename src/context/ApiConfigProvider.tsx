import { useCallback, useMemo, useState, type ReactNode } from 'react'
import {
  clearApiConfig,
  defaultApiConfig,
  getApiConfig,
  hasValidApiConfig,
  saveApiConfig,
} from '../config/apiConfig'
import type { ApiConfig } from '../types/api'
import { ApiConfigContext } from './apiConfigContext'

export function ApiConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState(getApiConfig)
  const [isTerminalOpen, setTerminalOpen] = useState(false)

  const saveConfig = useCallback((nextConfig: ApiConfig) => {
    setConfig(saveApiConfig(nextConfig))
  }, [])

  const clearConfig = useCallback(() => {
    clearApiConfig()
    setConfig(defaultApiConfig)
  }, [])

  const openTerminal = useCallback(() => setTerminalOpen(true), [])
  const closeTerminal = useCallback(() => setTerminalOpen(false), [])
  const isConfigured = hasValidApiConfig(config)

  const value = useMemo(
    () => ({
      config,
      isConfigured,
      isTerminalOpen,
      saveConfig,
      clearConfig,
      openTerminal,
      closeTerminal,
    }),
    [clearConfig, closeTerminal, config, isConfigured, isTerminalOpen, openTerminal, saveConfig],
  )

  return <ApiConfigContext.Provider value={value}>{children}</ApiConfigContext.Provider>
}
