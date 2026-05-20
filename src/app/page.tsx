"use client"

import { useEffect, useRef } from "react"

import { SentenceStream } from "@/components/study-page/sentence-stream"
import { TopicForm } from "@/components/study-page/topic-form"
import { useSentenceGenerator } from "@/hooks/use-sentence-generator"

export default function Home() {
  const endOfSentencesRef = useRef<HTMLDivElement>(null)
  const {
    error,
    generateSentence,
    isLoading,
    sentences,
    setTopic,
    topic,
  } = useSentenceGenerator()

  useEffect(() => {
    endOfSentencesRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [sentences])

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#fffdf8_0,#f7f0e5_52%,#efe4d4_100%)] px-5 text-stone-950 sm:px-8">
      <section className="mx-auto flex h-screen w-full max-w-3xl flex-col">
        <div className="flex-1 overflow-y-auto border-x border-stone-300/70 px-5 py-8 sm:px-9 sm:py-10">
          <SentenceStream
            sentences={sentences}
            isLoading={isLoading}
            endOfSentencesRef={endOfSentencesRef}
          />
        </div>

        <TopicForm
          topic={topic}
          error={error}
          isLoading={isLoading}
          onTopicChange={setTopic}
          onSubmit={generateSentence}
        />
      </section>
    </main>
  )
}
