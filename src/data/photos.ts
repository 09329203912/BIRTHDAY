export interface Photo {
  id: string
  thumb: string
  full: string
  caption: string
}

// Auto-import every processed photo — no manual wiring needed.
// Drop new files into src/assets/images/full and src/assets/images/thumb
// (same filename, .webp) and they will appear here automatically.
const thumbModules = import.meta.glob('../assets/images/thumb/*.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const fullModules = import.meta.glob('../assets/images/full/*.webp', {
  eager: true,
  import: 'default',
}) as Record<string, string>

function idFromPath(path: string): string {
  const file = path.split('/').pop() ?? path
  return file.replace('.webp', '')
}

// Optional: give specific photos a custom caption by id (e.g. "memory-014").
// Anything not listed here gets a caption pulled from the rotating list below.
const customCaptions: Record<string, string> = {}

const fallbackCaptions = [
  'A cherished moment with Tita',
  'Family, love, and laughter',
  'One of so many happy memories',
  'Tita, always the heart of the celebration',
  'Simply a beautiful day together',
  'Making memories that last forever',
  'Surrounded by the people who love her',
  'A snapshot of pure joy',
]

const thumbIds = Object.keys(thumbModules).map(idFromPath)
const fullByIdMap = new Map(Object.keys(fullModules).map((p) => [idFromPath(p), p]))

export const photos: Photo[] = thumbIds
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  .map((id, index) => {
    const thumbPath = Object.keys(thumbModules).find((p) => idFromPath(p) === id)!
    const fullPath = fullByIdMap.get(id)!
    return {
      id,
      thumb: thumbModules[thumbPath],
      full: fullModules[fullPath],
      caption: customCaptions[id] ?? fallbackCaptions[index % fallbackCaptions.length],
    }
  })
