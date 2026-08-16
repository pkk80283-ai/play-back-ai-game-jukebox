import { useNavigate } from 'react-router-dom'
import { PixelButton } from '../components/PixelButton'
import { copy } from '../config/copy'
import { routes } from '../config/navigation'

export function EndPage() {
  const navigate = useNavigate()

  return (
    <main className="screen end-screen">
      <div className="end-noise" aria-hidden="true" />
      <section className="end-content">
        <h1>{copy.end.title}</h1>
        <time>{copy.end.time}</time>
        <div className="end-copy">
          {copy.end.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <PixelButton variant="system" onClick={() => navigate(routes.landing)}>
          {copy.end.cta}
        </PixelButton>
      </section>
      <div className="crt-collapse" aria-hidden="true" />
    </main>
  )
}
