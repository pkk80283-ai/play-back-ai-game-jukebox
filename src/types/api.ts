export type ApiConfig = {
  provider: 'openai-compatible'
  apiKey: string
  baseURL: string
  model: string
}

export type ConnectionTestResult = {
  ok: boolean
  message: string
}
