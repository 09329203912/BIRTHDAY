import { motion } from 'framer-motion'
import type { Photo } from '../../data/photos'

interface MemoryCardProps {
  photo: Photo
  message: string
  index: number
  total: number
}

export default function MemoryCard({ photo, message, index, total }: MemoryCardProps) {
  return (
    <motion.div
      key={photo.id}
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -24, scale: 0.97 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="glass-card rounded-[28px] p-3 sm:p-5">
        <div className="relative overflow-hidden rounded-3xl bg-narra-800/5">
          <img
            src={photo.full}
            alt={photo.caption}
            className="w-full max-h-[58vh] object-contain mx-auto"
            loading="eager"
          />
          <span className="absolute top-4 right-4 rounded-full bg-narra-800/50 text-sampaguita text-xs font-medium px-3 py-1 backdrop-blur-sm">
            {index + 1} / {total}
          </span>
        </div>

        <div className="px-2 sm:px-4 pt-6 pb-3 text-center">
          <p className="font-script text-2xl sm:text-3xl text-gumamela-600 leading-snug text-balance">
            "{message}"
          </p>
          <p className="mt-3 text-sm text-narra-700/60">{photo.caption}</p>
        </div>
      </div>
    </motion.div>
  )
}
