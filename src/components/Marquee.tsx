/** Infinite, pausable row of items. The list is rendered twice for a seamless loop. */
export function Marquee({ items }: { items: string[] }) {
  return (
    <div className="marquee relative overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <div className="marquee-track flex w-max gap-3">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length}
            className="rounded-full border border-line bg-surface/60 px-4 py-1.5 font-mono text-xs whitespace-nowrap text-muted"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
