import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  r: number
  speed: number
  drift: number
  opacity: number
}

/**
 * A soft, slow-drifting particle field — meant to feel like warm dust motes
 * or floating light, not a busy animated background. Pure canvas, no deps.
 */
export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const count = prefersReduced ? 0 : Math.min(50, Math.floor((width * height) / 28000))

    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2.4 + 0.6,
      speed: Math.random() * 0.25 + 0.05,
      drift: Math.random() * 0.4 - 0.2,
      opacity: Math.random() * 0.35 + 0.1,
    }))

    let frame = 0
    let raf = 0

    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)
      for (const p of particles) {
        ctx.beginPath()
        ctx.fillStyle = `rgba(244, 200, 104, ${p.opacity})`
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()

        p.y -= p.speed
        p.x += p.drift
        if (p.y < -10) {
          p.y = height + 10
          p.x = Math.random() * width
        }
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
      }
      frame++
      raf = requestAnimationFrame(draw)
    }

    draw()

    function handleResize() {
      width = canvas!.width = window.innerWidth
      height = canvas!.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 opacity-70"
    />
  )
}
