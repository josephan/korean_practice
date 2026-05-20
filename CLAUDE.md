# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project Overview

`korean_study` is a personal, offline study tool for learning and practicing Korean. It runs locally from `localhost` and is intended for a single user.

The main flow:

1. The user enters a topic in a text input.
2. The app uses the Claude AI API to generate a Korean sentence about that topic.
3. The user can click a button to generate another sentence for the same topic.

The project should stay small, focused, and pleasant to use.

## Product Principles

- Optimize for personal study, not scale.
- Keep the interface minimal and bookish — like a quiet language notebook.
- Make the Korean sentence the center of attention.
- Prefer simple local-first code over production infrastructure.
- Do not add accounts, analytics, tracking, cloud storage, or deployment machinery unless explicitly requested.

## Technical Stack

Built with Next.js. Recommended UI stack:

- Next.js
- Tailwind CSS
- shadcn/ui
- lucide-react

Use `shadcn/ui` as a source of editable local components, not as a reason to overbuild the interface. Add only the components needed for the current workflow.

Good starter components:

- `Button`
- `Input`
- `Textarea`
- `Label`
- `Separator`
- `Card`, only when it supports the quiet study-book layout
- `Sonner` or another minimal toast component for local error states

Avoid heavier UI frameworks (MUI, Chakra, Ant Design, etc.) — they push the interface away from the desired bookish feel.

## UI Direction

The UI should feel like a quiet study notebook or language book.

Prefer:

- Soft paper-like backgrounds.
- Serif or book-friendly typography where appropriate.
- High readability and calm spacing.
- Restrained colors.
- Clear, focused controls.

Avoid:

- Marketing-style landing pages.
- Dashboard-heavy layouts.
- Loud gradients or flashy animation.
- Decorative clutter or complex navigation.

## AI Integration

Sentence generation uses the Claude AI API. Read API keys from environment variables; never commit them.

```sh
ANTHROPIC_API_KEY=your_api_key_here
```

When implementing generation:

- Keep prompts focused on Korean practice.
- Generate one sentence at a time unless the user asks otherwise.
- Preserve the current topic so the user can generate another sentence without retyping.
- Handle missing API keys with a clear local-development error.
- Handle API failures gracefully in the UI.

## Development Preferences

- Follow the existing project structure.
- Keep dependencies modest.
- Use the project's package manager and scripts (pnpm).
- Add tests when behavior becomes non-trivial or shared.
- Prefer clear names and straightforward code over clever abstractions.
- Keep comments sparse and useful.

## Local Development

This app runs from `localhost`. Common expectations:

- Install dependencies through pnpm.
- Store secrets in a local `.env` file.
- Start a local dev server.
- Verify the main topic-to-sentence flow in the browser.

## Repository Hygiene

- Do not commit secrets or `.env` files containing them.
- Do not add production deployment config unless requested.
- Do not introduce unrelated refactors.
- Keep changes scoped to the requested work.
- If the repository has uncommitted user changes, preserve them and work around them.
