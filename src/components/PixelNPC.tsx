export function PixelNPC({ className = '' }: { className?: string }) {
  return (
    <figure className={`pixel-npc ${className}`}>
      <img
        src="/assets/pixel-webmaster-cutout.png"
        alt="戴星星帽、坐在老式电脑前的 Pixel Webmaster"
      />
    </figure>
  )
}
