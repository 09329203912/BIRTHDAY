import { useRef } from 'react'
import Hero from './components/Landing/Hero'
import MemoryJourney from './components/MemoryJourney/MemoryJourney'
import Gallery from './components/Gallery/Gallery'
import VideoSection from './components/VideoSection/VideoSection'
import BirthdayCake from './components/Cake/BirthdayCake'
import FinalSurprise from './components/FinalSurprise/FinalSurprise'
import ParticleBackground from './components/shared/ParticleBackground'
import { useBackgroundMusic } from './hooks/useBackgroundMusic'

const CELEBRANT_NAME = 'Tita Nida'

export default function App() {
  const { isMuted, toggleMute } = useBackgroundMusic()
  const journeyRef = useRef<HTMLElement | null>(null)

  const scrollToJourney = () => {
    journeyRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="relative min-h-screen">
      <ParticleBackground />

      <main className="relative z-10">
        <Hero
          isMuted={isMuted}
          onToggleMute={toggleMute}
          onBegin={scrollToJourney}
          celebrantName={CELEBRANT_NAME}
        />
        <MemoryJourney registerRef={(el) => (journeyRef.current = el)} />
        <Gallery />
        <VideoSection />
        <BirthdayCake />
        <FinalSurprise celebrantName={CELEBRANT_NAME} />
      </main>

      <footer className="relative z-10 py-10 text-center text-sm text-narra-700/50">
        Made with <span aria-hidden="true">❤️</span> by the family, for {CELEBRANT_NAME}.
      </footer>
    </div>
  )
}
