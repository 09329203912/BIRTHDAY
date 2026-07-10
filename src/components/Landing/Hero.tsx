import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Balloons from './Balloons'
import MusicToggle from './MusicToggle'
import { useConfetti } from '../../hooks/useConfetti'

interface HeroProps {
  isMuted: boolean
  onToggleMute: () => void
  onBegin: () => void
  celebrantName: string
}

export default function Hero({ isMuted, onToggleMute, onBegin, celebrantName }: HeroProps) {
  const { celebrate } = useConfetti()
  const hasFired = useRef(false)

  useEffect(() => {
    if (hasFired.current) return
    hasFired.current = true
    const timer = setTimeout(() => celebrate(), 500)
    return () => clearTimeout(timer)
  }, [celebrate])

  return (
    <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="absolute inset-0 bg-radial-fade" aria-hidden="true" />
      <Balloons />

      <div className="absolute top-6 right-6 z-20">
        <MusicToggle isMuted={isMuted} onToggle={onToggleMute} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative z-10 max-w-3xl"
      >
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="section-eyebrow inline-block mb-3"
        >
          A little something from all of us
        </motion.span>

        <h1 className="font-display font-semibold text-narra-800 leading-[1.05] text-balance text-5xl sm:text-6xl md:text-7xl">
          Happy Birthday,
          <br />
          <span className="text-gumamela-500">{celebrantName}</span> <span aria-hidden="true">❤️</span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-6 text-lg md:text-xl text-narra-700/80 max-w-xl mx-auto text-balance"
        >
          Every photo here is a little piece of you — the laughter, the love, and every
          moment we've been lucky enough to share with you. Today, it's your turn to be spoiled.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="mt-10"
        >
          <button type="button" onClick={onBegin} className="btn-primary text-lg">
            Begin the Journey
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.6 }, y: { duration: 2, repeat: Infinity, ease: 'easeInOut' } }}
        className="absolute bottom-8 z-10 text-narra-600/60 text-sm flex flex-col items-center gap-1"
        aria-hidden="true"
      >
        <span>Scroll to explore</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </motion.div>
    </section>
  )
}
