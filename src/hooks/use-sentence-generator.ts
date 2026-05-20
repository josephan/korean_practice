"use client"

import { FormEvent, useState } from "react"

type GenerateSentenceResponse = {
  sentence?: string
  error?: string
}

export function useSentenceGenerator() {
  const [topic, setTopic] = useState("")
  const [sentences, setSentences] = useState<string[]>([])
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

      const data = (await response.json()) as GenerateSentenceResponse

      if (!response.ok) {
        throw new Error(data.error ?? "Could not generate a sentence.")
      }

      const generatedSentence = data.sentence

      if (generatedSentence) {
        setSentences((currentSentences) => [
          ...currentSentences,
          generatedSentence,
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

  return {
    error,
    generateSentence,
    isLoading,
    sentences,
    setTopic,
    topic,
  }
}
