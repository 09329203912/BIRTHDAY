export interface VideoItem {
  id: string
  src: string
  title: string
  poster?: string
}

// Auto-import every video dropped into src/assets/video.
const videoModules = import.meta.glob('../assets/video/*.mp4', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const titles = [
  'A little clip we love',
  'Caught on camera',
  'A moment worth replaying',
  'Tita, in motion',
]

export const videos: VideoItem[] = Object.keys(videoModules)
  .sort()
  .map((path, index) => ({
    id: path.split('/').pop()!.replace('.mp4', ''),
    src: videoModules[path],
    title: titles[index % titles.length],
  }))
