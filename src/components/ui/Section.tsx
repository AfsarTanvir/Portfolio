import type { ReactNode } from 'react'
import { cn, stagger } from '../../lib/utils'
import { Reveal } from './Reveal'

type HeadingProps = {
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
  className?: string
}

export function SectionHeading({ eyebrow, title, description, action, className }: HeadingProps) {
  return (
    <Reveal className={cn('mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between', className)}>
      <div className="max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 display text-4xl sm:text-5xl">{title}</h2>
        {description && <p className="mt-4 text-muted leading-relaxed">{description}</p>}
      </div>
      {action}
    </Reveal>
  )
}

/** Large page intro used at the top of every inner page. */
export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10 opacity-60" />
      <div className="container-page pt-16 pb-12 sm:pt-24 sm:pb-16">
        <p data-animate className="eyebrow">
          {eyebrow}
        </p>
        <h1 data-animate style={stagger(1)} className="mt-4 max-w-4xl display text-5xl sm:text-7xl">
          {title}
        </h1>
        {children && (
          <div data-animate style={stagger(2)} className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {children}
          </div>
        )}
      </div>
    </section>
  )
}

export function Tag({ children, active }: { children: ReactNode; active?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-[0.7rem] tracking-tight',
        active ? 'border-accent/40 bg-accent-soft text-accent' : 'border-line text-muted',
      )}
    >
      {children}
    </span>
  )
}
