export function PixelCursor({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`pixel-cursor ${className}`}
      viewBox="0 0 64 82"
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      <path
        d="M4 2v55h12v-13h8v21h10V44h13V34H37v-9H27v-9H17V8H9V2z"
        fill="#050505"
      />
      <path
        d="M8 8v40h10V36h8v8h12v-6H28v-9h-9v-9h-7v-8z"
        fill="#f2f1e8"
      />
    </svg>
  )
}
