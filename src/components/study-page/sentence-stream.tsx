import { RefObject } from "react"

import { AnimatedSentence } from "@/components/study-page/animated-sentence"
import { ThinkingDots } from "@/components/study-page/thinking-dots"

type SentenceStreamProps = {
  sentences: string[]
  isLoading: boolean
  endOfSentencesRef: RefObject<HTMLDivElement | null>
}

export function SentenceStream({
  sentences,
  isLoading,
  endOfSentencesRef,
}: SentenceStreamProps) {
  if (sentences.length === 0 && !isLoading) {
    return (
      <div className="flex min-h-full items-center">
        <p className="max-w-md font-serif text-2xl leading-relaxed text-stone-500 sm:text-4xl">
          Enter a topic and generate a Korean sentence to study.
        </p>
      </div>
    )
  }

  return (
    <div className={sentences.length > 0 ? "space-y-10 pb-8" : "pb-8"}>
      {sentences.map((generatedSentence, index) => (
        <AnimatedSentence
          key={`${generatedSentence}-${index}-${
            index === sentences.length - 1 ? "latest" : "past"
          }`}
          sentence={generatedSentence}
          shouldAnimate={index === sentences.length - 1}
        />
      ))}
      {isLoading ? <ThinkingDots /> : null}
      <div ref={endOfSentencesRef} />
    </div>
  )
}
