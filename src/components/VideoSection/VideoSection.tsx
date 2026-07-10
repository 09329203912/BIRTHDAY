import { videos } from '../../data/videos'
import VideoCard from './VideoCard'
import SectionTitle from '../shared/SectionTitle'

export default function VideoSection() {
  if (videos.length === 0) return null

  return (
    <section id="videos" className="relative py-24 md:py-32 px-6">
      <SectionTitle
        eyebrow="Moments in motion"
        title="Some memories move"
        description="A few clips that photos alone couldn't capture."
      />

      <div className="mt-14 max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </section>
  )
}
