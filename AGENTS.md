# AGENTS.md

Guidance for Codex and other coding agents working in this repository.

## Project Overview

`korean_study` is a personal study app for learning and practicing Korean. It is used by one person, offline from `localhost`.

The main flow is:

1. The user enters a topic.
2. The app uses the Claude AI API to generate a Korean sentence about that topic.
3. The user can request another sentence for the same topic.

The project should stay small, focused, and pleasant to use.

## Product Principles

- Optimize for personal study, not scale.
- Keep the interface minimal and bookish.
- Make the Korean sentence the center of attention.
- Prefer simple local-first code over production infrastructure.
- Do not add accounts, analytics, tracking, cloud storage, or deployment machinery unless explicitly requested.

## Technical Direction

This project should be built with Next.js.

Recommended UI stack:

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

Avoid heavier UI frameworks unless the project direction changes. MUI, Chakra, Ant Design, and similar libraries are likely more than this app needs and may push the interface away from the desired bookish feel.

## UI Direction

The UI should feel like a quiet study notebook or language book.

Prefer:

- Soft paper-like backgrounds.
- High readability.
- Calm spacing.
- Restrained colors.
- Book-friendly typography.
- Clear, focused controls.

Avoid:

- Landing pages.
- Marketing copy.
- Dashboard-heavy layouts.
- Loud gradients.
- Decorative clutter.
- Unnecessary animation.

## AI Integration

Sentence generation should use the Claude AI API.

Use environment variables for secrets. Never commit API keys or generated `.env` files containing secrets.

Recommended variable:

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

- Follow the existing project structure once one exists.
- Keep dependencies modest.
- Use the project’s package manager and scripts if present.
- Add tests when behavior becomes non-trivial or shared.
- Prefer clear names and straightforward code over clever abstractions.
- Keep comments sparse and useful.

## Local Development

This app is expected to run from `localhost`.

Once a framework is chosen, document the setup and run commands in `README.md`.

Common expectations:

- Install dependencies through the chosen package manager.
- Store secrets in a local `.env` file.
- Start a local dev server.
- Verify the main topic-to-sentence flow in the browser.

## Repository Hygiene

- Do not commit secrets.
- Do not add production deployment config unless requested.
- Do not introduce unrelated refactors.
- Keep changes scoped to the requested work.
- If the repository has uncommitted user changes, preserve them and work around them.
