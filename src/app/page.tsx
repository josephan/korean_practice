"use client"

import { FormEvent, useEffect, useRef, useState } from "react"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function ThinkingDots() {
  return (
    <div
      aria-label="Generating sentence"
      className="flex h-9 items-center gap-2 text-stone-500"
      role="status"
    >
      <span className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.2s]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-current [animation-delay:-0.1s]" />
      <span className="h-2 w-2 animate-bounce rounded-full bg-current" />
    </div>
  )
}

function AnimatedSentence({
  sentence,
  shouldAnimate,
}: {
  sentence: string
  shouldAnimate: boolean
}) {
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

export default function Home() {
  const [topic, setTopic] = useState("")
  const [sentences, setSentences] = useState<string[]>([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const endOfSentencesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endOfSentencesRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [sentences])

  async function generateSentence(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedTopic = topic.trim()

    if (!trimmedTopic) {
      setError("Enter a topic first.")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic: trimmedTopic }),
      })

      const data = (await response.json()) as {
        sentence?: string
        error?: string
      }

      if (!response.ok) {
        throw new Error(data.error ?? "Could not generate a sentence.")
      }

      if (data.sentence) {
        setSentences((currentSentences) => [
          ...currentSentences,
          data.sentence ?? "",
        ])
      }
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Could not generate a sentence."
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#fffdf8_0,#f7f0e5_52%,#efe4d4_100%)] px-5 text-stone-950 sm:px-8">
      <section className="mx-auto flex h-screen w-full max-w-3xl flex-col">
        <div className="flex-1 overflow-y-auto border-x border-stone-300/70 px-5 py-8 sm:px-9 sm:py-10">
          {sentences.length > 0 ? (
            <div className="space-y-10 pb-8">
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
          ) : (
            <div className="flex min-h-full items-center">
              {isLoading ? (
                <ThinkingDots />
              ) : (
                <p className="max-w-md font-serif text-2xl leading-relaxed text-stone-500 sm:text-4xl">
                  Enter a topic and generate a Korean sentence to study.
                </p>
              )}
            </div>
          )}
        </div>

        <div className="border-x border-t border-stone-300/70 bg-[#f7f0e5]/95 px-5 py-4 backdrop-blur sm:px-9">
          <form onSubmit={generateSentence} className="space-y-3">
            <Label htmlFor="topic" className="text-stone-700">
              Topic
            </Label>
            <div className="flex gap-3">
              <Input
                id="topic"
                autoComplete="off"
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                placeholder="coffee, spring rain, visiting a friend"
                className="h-12 border-stone-300 bg-white/70 px-3 text-base shadow-none focus-visible:border-stone-600 focus-visible:ring-stone-500/20"
              />
              <Button
                type="submit"
                disabled={isLoading}
                aria-label={isLoading ? "Generating" : "Generate sentence"}
                className="h-12 w-12 shrink-0 bg-stone-900 p-0 text-white hover:bg-stone-700"
              >
                {isLoading ? (
                  <span className="flex items-center gap-1" aria-hidden="true">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.2s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.1s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
                  </span>
                ) : (
                  <Send aria-hidden="true" />
                )}
              </Button>
            </div>
          </form>

          {error ? (
            <p className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
              {error}
            </p>
          ) : null}
        </div>
      </section>
    </main>
  )
}
