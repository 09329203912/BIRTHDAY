import { useState } from 'react'
import { motion } from 'framer-motion'
import { useConfetti } from '../../hooks/useConfetti'
import SectionTitle from '../shared/SectionTitle'

export default function BirthdayCake() {
  const { burst } = useConfetti()
  const [litCandles, setLitCandles] = useState(true)
  const [taps, setTaps] = useState(0)

  const handleClick = () => {
    burst({ origin: { y: 0.7 }, particleCount: 90, spread: 100 })
    setLitCandles((v) => !v)
    setTaps((t) => t + 1)
  }

  return (
    <section id="cake" className="relative py-24 md:py-32 px-6">
      <SectionTitle
        eyebrow="Make a wish"
        title="Blow out the candles"
        description="Tap the cake for a little celebration."
      />

      <div className="mt-14 flex flex-col items-center gap-6">
        <motion.button
          type="button"
          onClick={handleClick}
          whileTap={{ scale: 0.94 }}
          whileHover={{ scale: 1.03 }}
          aria-label="Tap the birthday cake"
          className="relative"
        >
          <svg width="240" height="220" viewBox="0 0 240 220" className="drop-shadow-xl">
            {/* Plate */}
            <ellipse cx="120" cy="200" rx="100" ry="12" fill="#43201d" opacity="0.12" />

            {/* Cake base */}
            <rect x="40" y="140" width="160" height="55" rx="14" fill="#F0708C" />
            <rect x="40" y="140" width="160" height="16" rx="8" fill="#FBD8E0" />

            {/* Middle tier */}
            <rect x="58" y="95" width="124" height="50" rx="14" fill="#EDAD3F" />
            <rect x="58" y="95" width="124" height="14" rx="7" fill="#F4C868" />

            {/* Top tier */}
            <rect x="78" y="55" width="84" height="45" rx="14" fill="#E14D6E" />
            <rect x="78" y="55" width="84" height="13" rx="6.5" fill="#F0708C" />

            {/* Sprinkles */}
            <circle cx="65" cy="165" r="3" fill="#FFF1E8" />
            <circle cx="150" cy="175" r="3" fill="#FFF1E8" />
            <circle cx="100" cy="120" r="2.5" fill="#FFF1E8" />
            <circle cx="140" cy="115" r="2.5" fill="#FFF1E8" />

            {/* Candles */}
            {[95, 120, 145].map((cx, i) => (
              <g key={i}>
                <rect x={cx - 3} y={30} width="6" height="26" rx="2" fill="#FFFDF9" />
                {litCandles && (
                  <motion.ellipse
                    cx={cx}
                    cy={22}
                    rx="5"
                    ry="8"
                    fill="#F4C868"
                    animate={{ scaleY: [1, 0.85, 1.05, 1], opacity: [1, 0.8, 1] }}
                    transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}
                  />
                )}
              </g>
            ))}
          </svg>
        </motion.button>

        <p className="text-narra-700/70 text-sm">
          {taps === 0
            ? 'Go on, tap it.'
            : litCandles
            ? 'Lit again — make another wish!'
            : 'Wish made! Tap again to relight the candles.'}
        </p>
      </div>
    </section>
  )
}
