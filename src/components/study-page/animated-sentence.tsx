"use client"

import { useEffect, useState } from "react"

type AnimatedSentenceProps = {
  sentence: string
  shouldAnimate: boolean
}

export function AnimatedSentence({
  sentence,
  shouldAnimate,
}: AnimatedSentenceProps) {
  const characters = Array.from(sentence)
  const [visibleCharacters, setVisibleCharacters] = useState(
    shouldAnimate ? 0 : characters.length
  )

  useEffect(() => {
    if (!shouldAnimate) {
      return
    }

    const intervalId = window.setInterval(() => {
      setVisibleCharacters((currentVisibleCharacters) => {
        if (currentVisibleCharacters >= characters.length) {
          window.clearInterval(intervalId)
          return currentVisibleCharacters
        }

        return currentVisibleCharacters + 1
      })
    }, 35)

    return () => window.clearInterval(intervalId)
  }, [characters.length, shouldAnimate, sentence])

  return (
    <p
      lang="ko"
      className="font-serif text-2xl leading-relaxed text-stone-950 sm:text-2xl"
    >
      {characters.slice(0, visibleCharacters).join("")}
      {shouldAnimate && visibleCharacters < characters.length ? (
        <span className="ml-0.5 animate-pulse text-stone-500">|</span>
      ) : null}
    </p>
  )
}
