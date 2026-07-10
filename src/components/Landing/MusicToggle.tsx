import { motion } from 'framer-motion'

interface MusicToggleProps {
  isMuted: boolean
  onToggle: () => void
  className?: string
}

export default function MusicToggle({ isMuted, onToggle, className = '' }: MusicToggleProps) {
  return (
    <motion.button
      type="button"
      onClick={onToggle}
      whileTap={{ scale: 0.92 }}
      aria-pressed={!isMuted}
      aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
      className={`glass-card flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-narra-700 ${className}`}
    >
      {isMuted ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 5 6 9H2v6h4l5 4V5Z" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M11 5 6 9H2v6h4l5 4V5Z" />
          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
          <path d="M18.5 5.5a9 9 0 0 1 0 13" />
        </svg>
      )}
      <span className="hidden sm:inline">{isMuted ? 'Sound off' : 'Sound on'}</span>
    </motion.button>
  )
}
