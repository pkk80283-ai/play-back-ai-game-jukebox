import '@fontsource/press-start-2p/400.css'
import '@fontsource/vt323/400.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { ApiConfigProvider } from './context/ApiConfigProvider'
import { PlaybackSessionProvider } from './context/PlaybackSession'
import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ApiConfigProvider>
        <PlaybackSessionProvider>
          <App />
        </PlaybackSessionProvider>
      </ApiConfigProvider>
    </BrowserRouter>
  </StrictMode>,
)
