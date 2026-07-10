import { useEffect, useRef, useState, useCallback } from 'react'
import musicSrc from '../assets/audio/birthday-music.mp3'

/**
 * Manages the single background-music <audio> element for the whole site.
 * Browsers block autoplay-with-sound, so we: try to play on mount, and if
 * that's blocked, silently retry on the user's first tap/click anywhere.
 */
export function useBackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)

  useEffect(() => {
    const audio = new Audio(musicSrc)
    audio.loop = true
    audio.volume = 0.35
    audioRef.current = audio

    audio
      .play()
      .then(() => setHasStarted(true))
      .catch(() => {
        // Autoplay blocked — wait for first user interaction.
      })

    function startOnInteraction() {
      if (!audioRef.current) return
      audioRef.current
        .play()
        .then(() => setHasStarted(true))
        .catch(() => {})
      window.removeEventListener('pointerdown', startOnInteraction)
      window.removeEventListener('keydown', startOnInteraction)
    }

    window.addEventListener('pointerdown', startOnInteraction, { once: true })
    window.addEventListener('keydown', startOnInteraction, { once: true })

    return () => {
      audio.pause()
      window.removeEventListener('pointerdown', startOnInteraction)
      window.removeEventListener('keydown', startOnInteraction)
    }
  }, [])

  useEffect(() => {
    if (audioRef.current) audioRef.current.muted = isMuted
  }, [isMuted])

  const toggleMute = useCallback(() => {
    setIsMuted((m) => !m)
    if (audioRef.current && audioRef.current.paused) {
      audioRef.current.play().then(() => setHasStarted(true)).catch(() => {})
    }
  }, [])

  return { isMuted, toggleMute, hasStarted }
}
