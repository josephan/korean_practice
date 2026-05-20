import Anthropic from "@anthropic-ai/sdk"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { topic } = (await request.json().catch(() => ({}))) as {
    topic?: unknown
  }

  if (typeof topic !== "string" || topic.trim().length === 0) {
    return NextResponse.json(
      { error: "Enter a topic before generating a sentence." },
      { status: 400 }
    )
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: "Missing ANTHROPIC_API_KEY in your local environment." },
      { status: 500 }
    )
  }

  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
  })

  try {
    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-5",
      max_tokens: 160,
      temperature: 0.8,
      system:
        "You create concise Korean practice sentences for a single learner. Return only one natural Korean sentence, with no translation or explanation.",
      messages: [
        {
          role: "user",
          content: `Write one natural Korean sentence about this topic: ${topic.trim()}`,
        },
      ],
    })

    const sentence = message.content
      .filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("")
      .trim()

    if (!sentence) {
      return NextResponse.json(
        { error: "The model did not return a sentence. Try again." },
        { status: 502 }
      )
    }

    return NextResponse.json({ sentence })
  } catch (error) {
    console.error("Sentence generation failed", error)

    return NextResponse.json(
      { error: "Could not generate a sentence right now. Try again in a moment." },
      { status: 502 }
    )
  }
}
