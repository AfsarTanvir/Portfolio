import { useEffect, useRef } from 'react'

/**
 * A soft glow that follows the pointer, plus --x/--y on any `.spotlight` card
 * under it. Desktop pointers only, and never when reduced motion is requested.
 */
export function PointerGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ok = matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')
    if (!ok.matches) return

    let frame = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        ref.current?.style.setProperty('background', `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, var(--spot), transparent 80%)`)
        const card = (e.target as Element | null)?.closest?.('.spotlight') as HTMLElement | null
        if (card) {
          const r = card.getBoundingClientRect()
          card.style.setProperty('--x', `${e.clientX - r.left}px`)
          card.style.setProperty('--y', `${e.clientY - r.top}px`)
        }
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return <div ref={ref} aria-hidden className="pointer-events-none fixed inset-0 z-0" />
}
