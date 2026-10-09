import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

// Red-pen marks that draw themselves once, like someone annotating the page.
// Paths are deliberately a little uneven so they read as hand-drawn.

const draw = (delay: number, duration = 0.8) => ({
  initial: { pathLength: 0, opacity: 0 },
  whileInView: { pathLength: 1, opacity: 1 },
  viewport: { once: true, amount: 0.8 },
  transition: {
    pathLength: { delay, duration, ease: [0.65, 0, 0.35, 1] as const },
    opacity: { delay, duration: 0.01 },
  },
});

/** Wavy underline under inline text. Wrap the words: <Underline>backend</Underline>. */
export function Underline({ children, delay = 0.6 }: { children: ReactNode; delay?: number }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <svg
        aria-hidden
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -bottom-[0.18em] left-0 h-[0.32em] w-full overflow-visible text-accent"
      >
        <motion.path
          d="M2 8.5 C 40 3.5, 70 10.5, 108 6 S 170 3, 198 7.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          {...draw(delay)}
        />
      </svg>
    </span>
  );
}

/** Rough loop drawn around a point (used on the rating chart). */
export function CircleMark({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <svg aria-hidden viewBox="0 0 120 70" className={cn('overflow-visible text-accent', className)}>
      <motion.path
        d="M64 6 C 30 3, 5 18, 8 38 C 11 60, 58 68, 92 58 C 118 50, 120 22, 96 11 C 80 4, 52 4, 34 10"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        {...draw(delay, 1)}
      />
    </svg>
  );
}

/** Curved arrow; points down-left by default. Flip with CSS (scale-x-[-1]) if needed. */
export function ArrowMark({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <svg aria-hidden viewBox="0 0 80 60" className={cn('overflow-visible text-accent', className)}>
      <motion.path
        d="M74 6 C 60 4, 36 10, 24 26 C 16 37, 14 46, 12 54"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        {...draw(delay, 0.7)}
      />
      <motion.path
        d="M3 44 L 12 55 L 22 46"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...draw(delay + 0.6, 0.3)}
      />
    </svg>
  );
}
