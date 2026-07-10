import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Photo } from '../../data/photos'

interface LightboxProps {
  photos: Photo[]
  activeIndex: number
  onClose: () => void
  onNavigate: (index: number) => void
}

export default function Lightbox({ photos, activeIndex, onClose, onNavigate }: LightboxProps) {
  const photo = photos[activeIndex]

  const goNext = useCallback(
    () => onNavigate((activeIndex + 1) % photos.length),
    [activeIndex, photos.length, onNavigate]
  )
  const goPrev = useCallback(
    () => onNavigate((activeIndex - 1 + photos.length) % photos.length),
    [activeIndex, photos.length, onNavigate]
  )

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [goNext, goPrev, onClose])

  if (!photo) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-narra-800/90 backdrop-blur-md px-4"
        role="dialog"
        aria-modal="true"
        aria-label="Photo viewer"
        onClick={onClose}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close photo viewer"
          className="absolute top-5 right-5 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-sampaguita hover:bg-white/20 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            goPrev()
          }}
          aria-label="Previous photo"
          className="absolute left-3 sm:left-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-sampaguita hover:bg-white/20 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <motion.figure
          key={photo.id}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={photo.full}
            alt={photo.caption}
            className="w-full max-h-[78vh] object-contain rounded-2xl shadow-soft"
          />
          <figcaption className="mt-4 text-center text-sampaguita/80 text-sm">
            {photo.caption} · {activeIndex + 1} / {photos.length}
          </figcaption>
        </motion.figure>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            goNext()
          }}
          aria-label="Next photo"
          className="absolute right-3 sm:right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-sampaguita hover:bg-white/20 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </motion.div>
    </AnimatePresence>
  )
}
