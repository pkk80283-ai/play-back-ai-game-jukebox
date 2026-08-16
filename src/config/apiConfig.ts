import type { ApiConfig } from '../types/api'

const STORAGE_KEY = 'playback:api-config:v1'

export const defaultApiConfig: ApiConfig = {
  provider: 'openai-compatible',
  apiKey: '',
  baseURL: 'https://api.stepfun.com/step_plan/v1',
  model: 'step-3.5-flash',
}

function normalizeConfig(config: ApiConfig): ApiConfig {
  return {
    provider: 'openai-compatible',
    apiKey: config.apiKey.trim(),
    baseURL: config.baseURL.trim().replace(/\/+$/, ''),
    model: config.model.trim(),
  }
}

export function getApiConfig(): ApiConfig {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    if (!saved) return defaultApiConfig

    const parsed = JSON.parse(saved) as Partial<ApiConfig>
    return normalizeConfig({
      ...defaultApiConfig,
      ...parsed,
      provider: 'openai-compatible',
    })
  } catch {
    return defaultApiConfig
  }
}

// DEMO CLIENT-SIDE API CONFIG: replace with server-managed secrets before production.
export function saveApiConfig(config: ApiConfig): ApiConfig {
  const normalized = normalizeConfig(config)
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(normalized))
  return normalized
}

export function clearApiConfig() {
  sessionStorage.removeItem(STORAGE_KEY)
}

export function hasValidApiConfig(config: ApiConfig) {
  return Boolean(config.apiKey && config.baseURL && config.model)
}
