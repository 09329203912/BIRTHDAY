import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface SectionTitleProps {
  eyebrow: string
  title: string
  description?: ReactNode
  align?: 'left' | 'center'
}

export default function SectionTitle({
  eyebrow,
  title,
  description,
  align = 'center',
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={align === 'center' ? 'text-center mx-auto max-w-2xl' : 'text-left'}
    >
      <span className="section-eyebrow">{eyebrow}</span>
      <h2 className="font-display text-3xl md:text-5xl font-semibold text-narra-800 mt-1 text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-narra-700/80 text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}
    </motion.div>
  )
}
