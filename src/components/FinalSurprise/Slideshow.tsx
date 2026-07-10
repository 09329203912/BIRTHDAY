import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { photos } from '../../data/photos'
import { shuffleMessages, heartfeltMessages } from '../../data/messages'

interface SlideshowProps {
  onClose: () => void
  celebrantName: string
}

const SLIDE_DURATION = 3800

export default function Slideshow({ onClose, celebrantName }: SlideshowProps) {
  const slidePhotos = useMemo(() => photos, [])
  const slideMessages = useMemo(() => {
    // Build a message-per-slide list, cycling a shuffled pool.
    const out: string[] = []
    let pool = shuffleMessages(heartfeltMessages)
    let cursor = 0
    for (let i = 0; i < slidePhotos.length; i++) {
      if (cursor >= pool.length) {
        pool = shuffleMessages(heartfeltMessages)
        cursor = 0
      }
      out.push(pool[cursor])
      cursor++
    }
    return out
  }, [slidePhotos.length])

  const [index, setIndex] = useState(0)
  const [finished, setFinished] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (finished) return
    if (index >= slidePhotos.length - 1) {
      const t = setTimeout(() => setFinished(true), SLIDE_DURATION)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setIndex((i) => i + 1), SLIDE_DURATION)
    return () => clearTimeout(t)
  }, [index, slidePhotos.length, finished])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const progress = finished ? 1 : (index + 1) / slidePhotos.length

  return (
    <div className="fixed inset-0 z-[60] bg-narra-800 flex items-center justify-center overflow-hidden">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close slideshow"
        className="absolute top-5 right-5 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-sampaguita hover:bg-white/20 transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>

      {!finished && (
        <div className="absolute top-0 left-0 right-0 z-20 h-1 bg-white/10">
          <motion.div
            className="h-full bg-gumamela-400"
            animate={{ width: `${progress * 100}%` }}
            transition={{ duration: 0.4, ease: 'linear' }}
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        {!finished ? (
          <motion.div
            key={slidePhotos[index].id}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative w-full h-full flex items-center justify-center px-6"
          >
            <img
              src={slidePhotos[index].full}
              alt={slidePhotos[index].caption}
              className="max-h-[72vh] max-w-full object-contain rounded-2xl shadow-soft"
            />
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 font-script text-2xl sm:text-3xl text-sampaguita text-center px-6 text-balance max-w-xl"
            >
              "{slideMessages[index]}"
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="final"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 text-center px-6 max-w-xl"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="font-display text-4xl sm:text-5xl font-semibold text-sampaguita text-balance"
            >
              Happy Birthday, {celebrantName}! <span aria-hidden="true">🎂</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="mt-6 text-lg text-sampaguita/80 leading-relaxed text-balance"
            >
              Thank you for all the love, care, and wonderful memories.
              <br />
              We love you so much! <span aria-hidden="true">❤️</span>
            </motion.p>
            <motion.button
              type="button"
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="btn-primary mt-10"
            >
              Close
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
