"use client"

import { FormEvent } from "react"
import { ArrowUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type TopicFormProps = {
  topic: string
  error: string
  isLoading: boolean
  onTopicChange: (topic: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
}

export function TopicForm({
  topic,
  error,
  isLoading,
  onTopicChange,
  onSubmit,
}: TopicFormProps) {
  return (
    <div className="border-x border-t border-stone-300/70 bg-[#f7f0e5]/95 px-5 py-4 backdrop-blur sm:px-9">
      <form onSubmit={onSubmit} className="space-y-3">
        <Label htmlFor="topic" className="text-stone-700">
          Topic
        </Label>
        <div className="relative">
          <Input
            id="topic"
            autoComplete="off"
            value={topic}
            onChange={(event) => onTopicChange(event.target.value)}
            placeholder="coffee, spring rain, visiting a friend"
            className="h-12 rounded-full border-stone-300 bg-white/70 px-5 pr-14 text-base shadow-none focus-visible:border-stone-600 focus-visible:ring-stone-500/20"
          />
          <Button
            type="submit"
            disabled={isLoading}
            aria-label={isLoading ? "Generating" : "Generate sentence"}
            className="absolute right-1.5 top-1/2 size-9 -translate-y-1/2 rounded-full bg-stone-900 p-0 text-white hover:bg-stone-700"
          >
            {isLoading ? (
              <span className="flex items-center gap-1" aria-hidden="true">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.2s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current [animation-delay:-0.1s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-current" />
              </span>
            ) : (
              <ArrowUp aria-hidden="true" />
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
  )
}
