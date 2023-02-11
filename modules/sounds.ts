export const soundsLibrary = {
  start: 'start.mp3',
  relax: 'relax.mp3'
}
export type Sounds = keyof typeof soundsLibrary

export const sounds = Object.keys(soundsLibrary)
  .reduce((acc, key)=>({...acc, [key]: key}),{}) as Record<Sounds, Sounds>

export function playSound(sound: Sounds) {
  const audio = new Audio(soundsLibrary[sound]);
  audio.play();
}
