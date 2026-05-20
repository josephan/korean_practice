"use client"

import { FormEvent, useState } from "react"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Home() {
  const [topic, setTopic] = useState("")
  const [sentence, setSentence] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

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

      setSentence(data.sentence ?? "")
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
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#fffdf8_0,#f7f0e5_46%,#efe4d4_100%)] px-5 py-8 text-stone-950 sm:px-8">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-3xl flex-col justify-center">
        <div className="border-y border-stone-300/80 py-10 sm:py-14">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-stone-500">
            Korean practice
          </p>
          <h1 className="font-serif text-4xl leading-tight text-stone-950 sm:text-5xl">
            One sentence at a time.
          </h1>

          <form onSubmit={generateSentence} className="mt-10 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="topic" className="text-stone-700">
                Topic
              </Label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                  id="topic"
                  value={topic}
                  onChange={(event) => setTopic(event.target.value)}
                  placeholder="coffee, spring rain, visiting a friend"
                  className="h-11 border-stone-300 bg-white/60 px-3 text-base shadow-none focus-visible:border-stone-600 focus-visible:ring-stone-500/20"
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="h-11 bg-stone-900 px-5 text-white hover:bg-stone-700"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Generating
                    </>
                  ) : sentence ? (
                    "Another"
                  ) : (
                    "Generate"
                  )}
                </Button>
              </div>
            </div>
          </form>

          <div className="mt-12 min-h-40 border-l border-stone-300 pl-6">
            {sentence ? (
              <p lang="ko" className="font-serif text-4xl leading-relaxed">
                {sentence}
              </p>
            ) : (
              <p className="max-w-md text-base leading-7 text-stone-500">
                Enter a topic and generate a Korean sentence to study.
              </p>
            )}
          </div>

          {error ? (
            <p className="mt-6 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
              {error}
            </p>
          ) : null}
        </div>
      </section>
    </main>
  )
}
