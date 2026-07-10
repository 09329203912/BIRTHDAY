import { motion } from 'framer-motion'

interface BalloonConfig {
  left: string
  size: number
  color: string
  delay: number
  duration: number
  drift: number
}

const BALLOONS: BalloonConfig[] = [
  { left: '6%', size: 64, color: '#E14D6E', delay: 0, duration: 8, drift: 14 },
  { left: '16%', size: 46, color: '#F4C868', delay: 1.2, duration: 6.5, drift: -10 },
  { left: '82%', size: 58, color: '#F0708C', delay: 0.6, duration: 7.2, drift: 12 },
  { left: '90%', size: 40, color: '#EDAD3F', delay: 2, duration: 9, drift: -8 },
  { left: '72%', size: 34, color: '#E14D6E', delay: 1.6, duration: 6, drift: 10 },
  { left: '28%', size: 36, color: '#F0708C', delay: 2.4, duration: 7.8, drift: -12 },
]

function Balloon({ config }: { config: BalloonConfig }) {
  return (
    <motion.div
      className="absolute bottom-0 pointer-events-none select-none"
      style={{ left: config.left }}
      initial={{ y: 60, opacity: 0 }}
      animate={{
        y: [0, -18, 0],
        x: [0, config.drift, 0],
        opacity: 1,
      }}
      transition={{
        y: { duration: config.duration, repeat: Infinity, ease: 'easeInOut', delay: config.delay },
        x: { duration: config.duration * 1.3, repeat: Infinity, ease: 'easeInOut', delay: config.delay },
        opacity: { duration: 1, delay: config.delay },
      }}
    >
      <svg width={config.size} height={config.size * 1.3} viewBox="0 0 60 78" fill="none">
        <ellipse cx="30" cy="30" rx="28" ry="30" fill={config.color} opacity={0.88} />
        <ellipse cx="21" cy="18" rx="7" ry="10" fill="white" opacity={0.25} />
        <path d="M30 60 L26 66 L34 66 Z" fill={config.color} opacity={0.88} />
        <line x1="30" y1="66" x2="30" y2="78" stroke="#43201d" strokeOpacity={0.35} strokeWidth={1} />
      </svg>
    </motion.div>
  )
}

export default function Balloons() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {BALLOONS.map((b, i) => (
        <Balloon key={i} config={b} />
      ))}
    </div>
  )
}
