# Happy Birthday, Tita Nida 🎂❤️

A React + Vite + TypeScript birthday surprise website — a digital scrapbook and memory
journey built for Tita Nida's birthday, featuring all 107 uploaded photos and 1 video.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually `http://localhost:5173`).

To build a production version:

```bash
npm run build
npm run preview
```

The production files will be in `dist/`, ready to deploy anywhere that serves static
files (Netlify, Vercel, GitHub Pages, etc).

## One thing to add: background music

I couldn't include real background music in this build — licensed birthday/celebration
music isn't something I'm able to source or generate, and a copyrighted MP3 would risk
a takedown if the site is shared publicly. Right now
`src/assets/audio/birthday-music.mp3` is a **silent placeholder** so the project builds
and runs immediately.

To add real music:

1. Find a royalty-free or licensed track you're happy to use (sites like Pixabay Music,
   YouTube Audio Library, or Epidemic Sound all have birthday/celebratory tracks).
2. Replace `src/assets/audio/birthday-music.mp3` with your file, keeping the same
   filename (or update the import in `src/hooks/useBackgroundMusic.ts`).

Everything else — the mute/unmute button, autoplay-with-fallback, looping — is already
wired up and will just work once a real track is in place.

## What's inside

- **Landing hero** — animated headline, floating balloons, confetti burst on load,
  mute/unmute music toggle, "Begin the Journey" button.
- **Memory Journey** (`#memory-journey`) — one photo at a time with a randomly assigned
  heartfelt message (reshuffled every page load), previous/next navigation, keyboard
  arrow support.
- **Photo Gallery** (`#gallery`) — responsive grid of all 107 photos, lazy-loaded,
  hover captions, click to open a fullscreen lightbox with keyboard navigation. Loads
  in batches of 24 with a "Show more" button so the page stays fast.
- **Video Section** (`#videos`) — custom play button, fullscreen support, rounded
  elegant cards.
- **Interactive Cake** (`#cake`) — tap to light/blow out the candles and trigger a
  confetti burst.
- **One Last Surprise** (`#final-surprise`) — a fullscreen auto-advancing slideshow of
  every photo, each with its own heartfelt message, ending on a final "Happy Birthday"
  screen.

## Adding or swapping photos later

Drop new photos into **both**:

- `src/assets/images/full/` (used in the memory journey, lightbox, and slideshow)
- `src/assets/images/thumb/` (used in the gallery grid)

using the same filename in both folders (e.g. `memory-108.webp`). The gallery, memory
journey, and slideshow all auto-detect new files — no code changes needed. For best
results, keep thumbnails around 500px wide and full images around 1400px wide, saved as
`.webp`, to keep the site fast.

To swap the video, replace `src/assets/video/memory-video.mp4` (or add more `.mp4`
files to that folder — the video section will pick up every file in there
automatically).

## Customizing the name

The celebrant's name ("Tita Nida") is set in one place: the `CELEBRANT_NAME` constant
at the top of `src/App.tsx`.

## Tech stack

React 19 · Vite · TypeScript · Tailwind CSS · Framer Motion · canvas-confetti

No backend, no database — everything is static and photos are bundled directly into
the app from `src/assets`.
