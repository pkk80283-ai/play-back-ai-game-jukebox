type PixelIconName =
  | 'computer'
  | 'folder'
  | 'joystick'
  | 'document'
  | 'signal'
  | 'speaker'
  | 'question'

type PixelIconProps = {
  name: PixelIconName
  className?: string
  label?: string
}

export function PixelIcon({ name, className = '', label }: PixelIconProps) {
  return (
    <svg
      className={`pixel-icon ${className}`}
      viewBox="0 0 32 32"
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      shapeRendering="crispEdges"
    >
      {name === 'computer' ? (
        <>
          <rect x="4" y="3" width="23" height="18" fill="#050505" />
          <rect x="6" y="5" width="19" height="14" fill="#f2f1e8" />
          <rect x="8" y="7" width="15" height="10" fill="#1438d4" />
          <rect x="10" y="9" width="9" height="5" fill="#16f4ff" />
          <rect x="13" y="21" width="6" height="4" fill="#050505" />
          <rect x="8" y="25" width="17" height="4" fill="#c8c8c8" />
          <rect x="6" y="28" width="21" height="2" fill="#050505" />
        </>
      ) : null}
      {name === 'folder' ? (
        <>
          <rect x="3" y="8" width="26" height="20" fill="#050505" />
          <rect x="5" y="10" width="22" height="16" fill="#ffe45c" />
          <rect x="6" y="6" width="10" height="6" fill="#050505" />
          <rect x="7" y="7" width="8" height="5" fill="#fff2a3" />
          <rect x="5" y="13" width="22" height="3" fill="#f1bd2b" />
        </>
      ) : null}
      {name === 'joystick' ? (
        <>
          <rect x="14" y="4" width="4" height="13" fill="#050505" />
          <rect x="12" y="2" width="8" height="7" fill="#ff334f" />
          <rect x="10" y="16" width="12" height="4" fill="#050505" />
          <rect x="6" y="20" width="20" height="8" fill="#c8c8c8" />
          <rect x="4" y="27" width="24" height="3" fill="#050505" />
          <rect x="20" y="22" width="3" height="3" fill="#1438d4" />
        </>
      ) : null}
      {name === 'document' ? (
        <>
          <rect x="6" y="2" width="21" height="28" fill="#050505" />
          <rect x="8" y="4" width="17" height="24" fill="#f2f1e8" />
          <rect x="11" y="9" width="11" height="2" fill="#1438d4" />
          <rect x="11" y="14" width="11" height="2" fill="#050505" />
          <rect x="11" y="19" width="8" height="2" fill="#050505" />
        </>
      ) : null}
      {name === 'signal' ? (
        <>
          <rect x="3" y="22" width="4" height="7" fill="currentColor" />
          <rect x="9" y="17" width="4" height="12" fill="currentColor" />
          <rect x="15" y="12" width="4" height="17" fill="currentColor" />
          <rect x="21" y="7" width="4" height="22" fill="currentColor" />
          <rect x="27" y="3" width="3" height="26" fill="currentColor" />
        </>
      ) : null}
      {name === 'speaker' ? (
        <>
          <rect x="3" y="12" width="7" height="9" fill="currentColor" />
          <path d="M10 12h4l8-7v23l-8-7h-4z" fill="currentColor" />
          <rect x="24" y="10" width="2" height="13" fill="currentColor" />
          <rect x="28" y="7" width="2" height="19" fill="currentColor" />
        </>
      ) : null}
      {name === 'question' ? (
        <>
          <rect x="6" y="5" width="20" height="22" fill="#1438d4" />
          <path
            d="M11 11V8h11v3h3v6h-3v3h-4v3h-5v-6h5v-3h3v-3h-6v3h-4zM13 25h5v5h-5z"
            fill="#dfff00"
          />
        </>
      ) : null}
    </svg>
  )
}
