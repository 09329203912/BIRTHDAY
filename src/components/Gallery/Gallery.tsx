import { useState } from 'react'
import { motion } from 'framer-motion'
import { photos } from '../../data/photos'
import Lightbox from './Lightbox'
import SectionTitle from '../shared/SectionTitle'

const BATCH_SIZE = 24

export default function Gallery() {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const visiblePhotos = photos.slice(0, visibleCount)
  const hasMore = visibleCount < photos.length

  return (
    <section id="gallery" className="relative py-24 md:py-32 px-6">
      <SectionTitle
        eyebrow="The full album"
        title="A lifetime of moments"
        description={`${photos.length} photos — and counting — of the woman who made every one of them worth taking.`}
      />

      <div className="mt-14 max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {visiblePhotos.map((photo, i) => (
          <motion.button
            type="button"
            key={photo.id}
            onClick={() => setActiveIndex(i)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: (i % BATCH_SIZE) * 0.02 }}
            className="group relative aspect-square overflow-hidden rounded-2xl bg-narra-800/5 shadow-sm"
          >
            <img
              src={photo.thumb}
              alt={photo.caption}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-narra-800/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
              <span className="text-sampaguita text-xs font-medium text-left text-balance">
                {photo.caption}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {hasMore && (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => Math.min(c + BATCH_SIZE, photos.length))}
            className="btn-ghost"
          >
            Show more photos
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </button>
        </div>
      )}

      {activeIndex !== null && (
        <Lightbox
          photos={visiblePhotos}
          activeIndex={activeIndex}
          onClose={() => setActiveIndex(null)}
          onNavigate={setActiveIndex}
        />
      )}
    </section>
  )
}
