import { LayoutGroup, motion } from 'motion/react';
import { RotateCw } from 'lucide-react';
import { RatingChart, ratingSeries } from './RatingChart';
import { cn } from '../lib/utils';

/**
 * Codeforces and CodeChef charts on the two faces of one card. Switch with the
 * tabs, the flip button, or by dragging the card sideways (swipe on touch).
 */
export function RatingFlip({ side, onSide }: { side: number; onSide: (side: number) => void }) {
  const flip = () => onSide(side === 0 ? 1 : 0);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <LayoutGroup id="rating-tabs">
          <div
            role="tablist"
            aria-label="Rating history"
            className="flex gap-1 rounded-full border border-line bg-surface/70 p-1"
          >
            {ratingSeries.map((s, i) => (
              <button
                key={s.key}
                role="tab"
                aria-selected={side === i}
                onClick={() => onSide(i)}
                className={cn(
                  'relative isolate rounded-full px-3.5 py-1 text-sm transition-colors',
                  side === i ? 'text-bg' : 'text-muted hover:text-text'
                )}
              >
                {side === i && (
                  <motion.span
                    layoutId="rating-tab-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-text"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                {s.label}
              </button>
            ))}
          </div>
        </LayoutGroup>
        <button
          type="button"
          onClick={flip}
          className="group inline-flex items-center gap-2 rounded-full px-2 py-1 font-mono text-xs text-faint hover:text-accent"
        >
          <RotateCw
            size={14}
            className="transition-transform duration-500 group-hover:rotate-180"
          />
          <span className="hidden sm:inline">Flip or drag the card to see the other chart</span>
          <span className="sm:hidden">Flip</span>
        </button>
      </div>

      {/* Drag wrapper is not rotated, so the drag stays horizontal while the inner card flips. */}
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.18}
        dragSnapToOrigin
        onDragEnd={(_, info) => {
          if (Math.abs(info.offset.x) > 60 || Math.abs(info.velocity.x) > 400) flip();
        }}
        className="cursor-grab touch-pan-y select-none active:cursor-grabbing"
        style={{ perspective: 1600 }}
      >
        <motion.div
          className="grid [transform-style:preserve-3d]"
          initial={false}
          animate={{ rotateY: side * 180 }}
          transition={{ duration: 0.75, ease: [0.65, 0, 0.35, 1] }}
        >
          {ratingSeries.map((s, i) => (
            <div
              key={s.key}
              aria-hidden={side !== i}
              inert={side !== i}
              className={cn(
                '[grid-area:1/1] [backface-visibility:hidden]',
                i === 1 && '[transform:rotateY(180deg)]'
              )}
            >
              <RatingChart series={s} active={side === i} />
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
