import { useState } from 'react'
import { motion } from 'framer-motion'
import Slideshow from './Slideshow'

interface FinalSurpriseProps {
  celebrantName: string
}

export default function FinalSurprise({ celebrantName }: FinalSurpriseProps) {
  const [open, setOpen] = useState(false)

  return (
    <section id="final-surprise" className="relative py-28 md:py-36 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gumamela-400/10 to-transparent" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="relative max-w-xl mx-auto text-center"
      >
        <span className="section-eyebrow">Before you go</span>
        <h2 className="font-display text-4xl md:text-5xl font-semibold text-narra-800 mt-1 text-balance">
          One Last Surprise <span aria-hidden="true">❤️</span>
        </h2>
        <p className="mt-4 text-narra-700/80 text-base md:text-lg">
          One more thing, {celebrantName}. Just for you.
        </p>

        <button type="button" onClick={() => setOpen(true)} className="btn-primary mt-10 text-lg">
          Open your surprise
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 12v9H4v-9M2 7h20v5H2zM12 22V7M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7ZM12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7Z" />
          </svg>
        </button>
      </motion.div>

      {open && <Slideshow onClose={() => setOpen(false)} celebrantName={celebrantName} />}
    </section>
  )
}
