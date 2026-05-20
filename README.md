# korean_study

`korean_study` is a personal offline study tool for learning and practicing Korean.

The app runs locally from `localhost` and is intended for one user. It provides a minimal, bookish interface where I can enter a topic and generate Korean practice sentences using the Claude AI API.

## Core Idea

1. Enter a topic in a text input.
2. Generate a Korean sentence related to that topic.
3. Read and study the sentence.
4. Click a button to generate another sentence for the same topic.

## Product Goals

- Help me practice Korean with short, topic-focused sentences.
- Keep the experience calm, minimal, and distraction-free.
- Feel a little like studying from a quiet language notebook or book.
- Work locally from `localhost`.

## Expected Features

- Topic input field.
- Sentence generation using the Claude AI API.
- Button to generate another sentence for the current topic.
- Minimal UI with a bookish visual style.
- Local development workflow.

## Suggested Stack

This project will be built with Next.js.

Recommended UI stack:

- Next.js
- Tailwind CSS
- shadcn/ui
- lucide-react

`shadcn/ui` is a good fit because it provides polished, accessible components while still letting this project own and customize the component code directly. It should be used lightly, mostly for basic controls like buttons, inputs, labels, separators, and simple feedback.

Useful starter components:

- `Button`
- `Input`
- `Textarea`
- `Label`
- `Separator`
- `Card`, only if it helps frame the study surface without making the app feel dashboard-like
- `Sonner` or another minimal toast component for local error messages

## Design Direction

The UI should be simple, quiet, and readable. Prefer:

- Soft paper-like backgrounds.
- Serif or book-friendly typography where appropriate.
- Restrained color.
- Comfortable spacing.
- Clear focus on the generated Korean sentence.

Avoid:

- Marketing-style landing pages.
- Busy dashboards.
- Loud gradients or flashy animation.
- Overly complex navigation.
- Heavy UI frameworks that impose a strong product-app visual style.

## Local-Only Use

This project is for personal use and should be designed around local usage from `localhost`. It does not need multi-user accounts, cloud hosting, collaboration features, analytics, or production deployment unless those are explicitly added later.

## API Notes

Sentence generation should use the Claude AI API. API keys should be read from environment variables and must not be committed to the repository.

Suggested environment variable:

```sh
ANTHROPIC_API_KEY=your_api_key_here
```
