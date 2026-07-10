import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { photos } from '../../data/photos'
import { buildMessageMap } from '../../data/messages'
import MemoryCard from './MemoryCard'
import SectionTitle from '../shared/SectionTitle'

interface MemoryJourneyProps {
  registerRef?: (el: HTMLElement | null) => void
}

export default function MemoryJourney({ registerRef }: MemoryJourneyProps) {
  const [index, setIndex] = useState(0)
  const sectionRef = useRef<HTMLElement | null>(null)

  // Random message per photo, reshuffled once per page load.
  const messageMap = useMemo(() => buildMessageMap(photos.map((p) => p.id)), [])

  useEffect(() => {
    registerRef?.(sectionRef.current)
  }, [registerRef])

  const goNext = () => setIndex((i) => (i + 1) % photos.length)
  const goPrev = () => setIndex((i) => (i - 1 + photos.length) % photos.length)

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const rect = sectionRef.current?.getBoundingClientRect()
      if (!rect || rect.bottom < 0 || rect.top > window.innerHeight) return
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  if (photos.length === 0) return null

  const current = photos[index]

  return (
    <section ref={sectionRef} id="memory-journey" className="relative py-24 md:py-32 px-6">
      <SectionTitle
        eyebrow="The memory journey"
        title="Every photo tells a little story"
        description="Step through the years, one memory at a time."
        align="center"
      />

      <div className="mt-14 flex flex-col items-center gap-8">
        <AnimatePresence mode="wait">
          <MemoryCard
            key={current.id}
            photo={current}
            message={messageMap[current.id]}
            index={index}
            total={photos.length}
          />
        </AnimatePresence>

        <div className="flex items-center gap-4">
          <NavButton direction="prev" onClick={goPrev} label="Previous memory" />

          <div className="flex gap-1.5" aria-hidden="true">
            {photos.slice(0, Math.min(photos.length, 12)).map((p, i) => (
              <span
                key={p.id}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index % 12 ? 'w-6 bg-gumamela-500' : 'w-1.5 bg-narra-700/20'
                }`}
              />
            ))}
          </div>

          <NavButton direction="next" onClick={goNext} label="Next memory" />
        </div>
      </div>
    </section>
  )
}

function NavButton({
  direction,
  onClick,
  label,
}: {
  direction: 'prev' | 'next'
  onClick: () => void
  label: string
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label={label}
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.06 }}
      className="glass-card flex h-12 w-12 items-center justify-center rounded-full text-narra-700"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        {direction === 'prev' ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 18l6-6-6-6" />}
      </svg>
    </motion.button>
  )
}
