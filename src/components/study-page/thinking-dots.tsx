export function ThinkingDots() {
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
