import type { CSSProperties } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ScanlineOverlay } from './components/ScanlineOverlay'
import { routes } from './config/navigation'
import { theme } from './config/theme'
import { DialoguePage } from './pages/DialoguePage'
import { EndPage } from './pages/EndPage'
import { GamePage } from './pages/GamePage'
import { IntroPage } from './pages/IntroPage'
import { LandingPage } from './pages/LandingPage'
import { SearchingPage } from './pages/SearchingPage'

const themeVariables = {
  '--pb-cobalt': theme.colors.cobalt,
  '--pb-cobalt-dark': theme.colors.cobaltDark,
  '--pb-chartreuse': theme.colors.chartreuse,
  '--pb-cyan': theme.colors.cyan,
  '--pb-magenta': theme.colors.magenta,
  '--pb-grass': theme.colors.grass,
  '--pb-crt': theme.colors.crt,
  '--pb-win-gray': theme.colors.winGray,
  '--pb-black': theme.colors.black,
  '--pb-fast': theme.motion.fast,
  '--pb-normal': theme.motion.normal,
  '--pb-slow': theme.motion.slow,
} as CSSProperties

export function App() {
  return (
    <div className="app-shell" style={themeVariables}>
      <Routes>
        <Route path={routes.landing} element={<LandingPage />} />
        <Route path={routes.intro} element={<IntroPage />} />
        <Route path={routes.dialogue} element={<DialoguePage />} />
        <Route path={routes.searching} element={<SearchingPage />} />
        <Route path={routes.game} element={<GamePage />} />
        <Route path={routes.end} element={<EndPage />} />
        <Route path="*" element={<Navigate to={routes.landing} replace />} />
      </Routes>
      <ScanlineOverlay />
    </div>
  )
}
