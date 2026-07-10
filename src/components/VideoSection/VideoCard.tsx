import { useRef, useState } from 'react'
import type { VideoItem } from '../../data/videos'

export default function VideoCard({ video }: { video: VideoItem }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = () => {
    if (!videoRef.current) return
    videoRef.current.play()
    setIsPlaying(true)
  }

  const handleFullscreen = () => {
    if (videoRef.current?.requestFullscreen) {
      videoRef.current.requestFullscreen()
    }
  }

  return (
    <div className="glass-card group relative overflow-hidden rounded-3xl shadow-soft">
      <div className="relative aspect-video bg-narra-800/10">
        <video
          ref={videoRef}
          src={video.src}
          controls={isPlaying}
          playsInline
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          className="h-full w-full object-cover rounded-3xl"
        />

        {!isPlaying && (
          <button
            type="button"
            onClick={handlePlay}
            aria-label={`Play video: ${video.title}`}
            className="absolute inset-0 flex items-center justify-center bg-narra-800/25 transition-colors hover:bg-narra-800/35"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-sampaguita/90 shadow-glow transition-transform group-hover:scale-110">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#E14D6E">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        )}

        {isPlaying && (
          <button
            type="button"
            onClick={handleFullscreen}
            aria-label="View fullscreen"
            className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-narra-800/50 text-sampaguita backdrop-blur-sm hover:bg-narra-800/70"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
          </button>
        )}
      </div>

      <div className="px-5 py-4">
        <p className="font-display text-lg text-narra-800">{video.title}</p>
      </div>
    </div>
  )
}
