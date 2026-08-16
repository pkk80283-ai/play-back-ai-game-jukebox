import type { IncomingMessage, ServerResponse } from 'node:http'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import gamesData from './src/data/games.json'
import { hasValidApiConfig } from './src/config/apiConfig'
import { recommendGame } from './src/services/gameRecommendation'
import type { ApiConfig } from './src/types/api'
import type { GameRecord } from './src/types/game'

type ApiRequest = { input?: string; config?: ApiConfig }

async function readJson(req: IncomingMessage): Promise<ApiRequest> {
  const chunks: Buffer[] = []
  let size = 0
  for await (const chunk of req) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)
    size += buffer.length
    if (size > 1_000_000) throw new Error('REQUEST TOO LARGE')
    chunks.push(buffer)
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8')) as ApiRequest
}

function sendJson(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(body))
}

function localRecommendationApi(): Plugin {
  return {
    name: 'playback-local-recommendation-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.method !== 'POST' || !['/api/recommend', '/api/test-connection'].includes(req.url ?? '')) {
          next()
          return
        }

        try {
          const body = await readJson(req)
          if (!body.config || !hasValidApiConfig(body.config)) {
            sendJson(res, 400, { error: 'NO SIGNAL: API CONFIGURATION REQUIRED' })
            return
          }

          if (req.url === '/api/test-connection') {
            const response = await fetch(`${body.config.baseURL}/chat/completions`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${body.config.apiKey}`,
              },
              body: JSON.stringify({
                model: body.config.model,
                temperature: 0,
                max_tokens: 2,
                messages: [{ role: 'user', content: 'Reply OK.' }],
              }),
            })
            if (!response.ok) {
              sendJson(res, response.status, { error: `MODEL CONNECTION FAILED (${response.status})` })
              return
            }
            sendJson(res, 200, { ok: true, message: 'SIGNAL RECEIVED' })
            return
          }

          const input = body.input?.trim()
          if (!input) {
            sendJson(res, 400, { error: 'EMPTY PLAYER REQUEST' })
            return
          }

          const result = await recommendGame(
            body.config,
            input,
            gamesData as GameRecord[],
          )
          sendJson(res, 200, result)
        } catch (error) {
          const message = error instanceof Error ? error.message : 'UNKNOWN SIGNAL ERROR'
          sendJson(res, 500, { error: message })
        }
      })
    },
  }
}

export default defineConfig({
  // This API is for the local demo. Move these handlers to a serverless/backend runtime for production.
  plugins: [localRecommendationApi(), react(), tailwindcss()],
})
