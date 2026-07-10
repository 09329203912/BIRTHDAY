import { useCallback } from 'react'
import confetti from 'canvas-confetti'

const PARTY_COLORS = ['#E14D6E', '#F4C868', '#F0708C', '#EDAD3F', '#FFF1E8']

export function useConfetti() {
  const burst = useCallback((options?: confetti.Options) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    confetti({
      particleCount: 120,
      spread: 90,
      startVelocity: 45,
      origin: { y: 0.6 },
      colors: PARTY_COLORS,
      ...options,
    })
  }, [])

  const celebrate = useCallback(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const duration = 1600
    const end = Date.now() + duration
    ;(function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 60,
        origin: { x: 0 },
        colors: PARTY_COLORS,
      })
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 60,
        origin: { x: 1 },
        colors: PARTY_COLORS,
      })
      if (Date.now() < end) requestAnimationFrame(frame)
    })()
  }, [])

  return { burst, celebrate }
}
