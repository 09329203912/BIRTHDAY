export const heartfeltMessages: string[] = [
  'Thank you for always being there for us.',
  'Your smile makes every gathering brighter.',
  'We are lucky to have you in our lives.',
  'Thank you for all the love and care.',
  'Every memory with you is special.',
  'You make our family stronger.',
  'Happy Birthday to the most caring Tita!',
  'We appreciate everything you do for us.',
  'Your hugs have a way of fixing everything.',
  'You have such a beautiful heart, Tita.',
  'Thank you for spoiling us with your cooking.',
  'Every family gathering is better with you there.',
  'You taught us so much about love and kindness.',
  'Your laughter is one of our favorite sounds.',
  'We treasure every story you share with us.',
  'You are the glue that holds our family together.',
  'Thank you for never missing a birthday or holiday.',
  'Your generosity never goes unnoticed, Tita.',
  'You always know just what to say.',
  'We are so proud to call you family.',
  'Your warmth makes any house feel like home.',
  'Thank you for always checking in on us.',
  'You give the best advice, Tita.',
  'Being around you always feels like a celebration.',
  'You have a way of making everyone feel welcome.',
  'Thank you for all the sacrifices you have made for us.',
  'Your strength inspires the whole family.',
  'We love how you light up every room.',
  'Tita, you are truly one of a kind.',
  'Thank you for the countless memories we have shared.',
  'Your kindness has touched more lives than you know.',
  'You make ordinary days feel special.',
  'We are grateful for every year we have had with you.',
  'Your love for this family knows no limits.',
  'Here is to many more birthdays together, Tita.',
]

/**
 * Deterministic-per-session shuffle. Called once on mount so every photo
 * gets a random heartfelt message, and the mapping stays stable while the
 * user navigates back and forth — a fresh shuffle happens on next reload.
 */
export function shuffleMessages<T>(items: T[]): T[] {
  const arr = [...items]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export function getRandomMessage(exclude?: string): string {
  let msg = heartfeltMessages[Math.floor(Math.random() * heartfeltMessages.length)]
  if (exclude && heartfeltMessages.length > 1) {
    while (msg === exclude) {
      msg = heartfeltMessages[Math.floor(Math.random() * heartfeltMessages.length)]
    }
  }
  return msg
}

/**
 * Builds a photoId -> message map, cycling through a shuffled copy of the
 * message list so messages feel varied rather than purely random-with-repeats
 * when there are more photos than messages.
 */
export function buildMessageMap(photoIds: string[]): Record<string, string> {
  const map: Record<string, string> = {}
  let pool = shuffleMessages(heartfeltMessages)
  let cursor = 0
  for (const id of photoIds) {
    if (cursor >= pool.length) {
      pool = shuffleMessages(heartfeltMessages)
      cursor = 0
    }
    map[id] = pool[cursor]
    cursor++
  }
  return map
}
