import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'motion/react';
import type { ProjectVisual as VisualKey } from '../data/projects';
import { cn } from '../lib/utils';

/** A counter that ticks every `ms` while the element is visible and motion is allowed. */
function useTicker(ms: number) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!inView || reduce) return;
    const id = setInterval(() => setTick((t) => t + 1), ms);
    return () => clearInterval(id);
  }, [inView, reduce, ms]);
  return { ref, tick, still: !!reduce };
}

export function ProjectVisual({ kind, className }: { kind: VisualKey; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'relative overflow-hidden rounded-2xl border border-line bg-bg-soft',
        'bg-[radial-gradient(120%_80%_at_100%_0%,var(--accent-soft),transparent_60%)]',
        className
      )}
    >
      <div className="bg-grid absolute inset-0 opacity-40" />
      {/* Content keeps card proportions even when the frame is wide (case-study hero). */}
      <div className="relative mx-auto h-full max-w-xl">
        {kind === 'mockflow' && <MockFlowVisual />}
        {kind === 'scheduler' && <SchedulerVisual />}
        {kind === 'audio' && <AudioVisual />}
        {kind === 'taskboard' && <TaskboardVisual />}
        {kind === 'predictor' && <PredictorVisual />}
      </div>
    </div>
  );
}

const users = [
  { id: 'u_18f2', name: 'Maya Chen', email: 'maya@example.com', ms: 42 },
  { id: 'u_a91c', name: 'Rafi Ahmed', email: 'rafi@example.com', ms: 118 },
  { id: 'u_77d0', name: 'Lena Fischer', email: 'lena@example.com', ms: 67 },
];

function MockFlowVisual() {
  const { ref, tick } = useTicker(2600);
  const u = users[tick % users.length]!;
  return (
    <div
      ref={ref}
      className="flex h-full flex-col justify-center gap-3 p-5 font-mono text-[11px] sm:p-7 sm:text-xs"
    >
      <div className="flex items-center gap-2">
        <span className="rounded bg-accent px-1.5 py-0.5 font-semibold text-accent-ink">GET</span>
        <span className="text-text">/api/users/</span>
        <span className="text-accent">:id</span>
        <span className="ml-auto text-faint">mock · faker</span>
      </div>
      <div className="rounded-xl border border-line bg-surface/80 p-4 leading-relaxed backdrop-blur">
        <div className="mb-2 flex items-center gap-2 text-faint">
          <span className="size-1.5 rounded-full bg-accent" />
          <span>200 OK</span>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={u.ms}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="ml-auto"
            >
              {u.ms} ms
            </motion.span>
          </AnimatePresence>
        </div>
        <p className="text-muted">{'{'}</p>
        {(
          [
            ['id', u.id],
            ['name', u.name],
            ['email', u.email],
          ] as const
        ).map(([k, v]) => (
          <p key={k} className="truncate pl-4 whitespace-nowrap text-muted">
            <span className="text-text">"{k}"</span>:{' '}
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={v}
                initial={{ opacity: 0, y: 6, filter: 'blur(3px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -6, filter: 'blur(3px)' }}
                transition={{ duration: 0.35 }}
                className="inline-block text-accent"
              >
                "{v}",
              </motion.span>
            </AnimatePresence>
          </p>
        ))}
        <p className="text-muted">{'}'}</p>
      </div>
    </div>
  );
}

const jobs = [
  { name: 'backup-database', cron: '0 2 * * *', at: 18 },
  { name: 'send-reminder', cron: 'once · 09:00', at: 46 },
  { name: 'health-ping', cron: '@every 10m', at: 72 },
];

function SchedulerVisual() {
  const { ref, still } = useTicker(100000);
  return (
    <div
      ref={ref}
      className="flex h-full flex-col justify-center gap-4 p-5 font-mono text-[11px] sm:p-7 sm:text-xs"
    >
      <div className="relative flex flex-col gap-3.5">
        {jobs.map((job) => (
          <div key={job.name}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <span className="truncate text-text">{job.name}</span>
              <span className="shrink-0 text-faint">{job.cron}</span>
            </div>
            <div className="relative h-2 rounded-full border border-line bg-surface/70">
              <motion.span
                className="absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
                style={{ left: `${job.at}%` }}
                animate={still ? undefined : { scale: [1, 1.9, 1], opacity: [0.55, 1, 0.55] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  delay: (job.at / 100) * 4,
                  times: [0, 0.06, 0.2],
                }}
              />
            </div>
          </div>
        ))}
        {!still && (
          // The playhead sweeps the tracks; transform (x: 100% = full width) keeps it off the layout thread.
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            animate={{ x: ['0%', '100%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          >
            <span className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-accent to-transparent" />
          </motion.div>
        )}
      </div>
      <p className="text-faint">
        <span className="text-accent">●</span> 1 s tick · no overlap
      </p>
    </div>
  );
}

function AudioVisual() {
  const { ref, still } = useTicker(100000);
  const bars = Array.from(
    { length: 28 },
    (_, i) => 0.25 + 0.75 * Math.abs(Math.sin(i * 0.55) * Math.cos(i * 0.21))
  );
  return (
    <div ref={ref} className="flex h-full flex-col justify-center gap-4 p-5 sm:p-7">
      <div className="flex h-24 items-end gap-[3px] sm:h-28">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            className="flex-1 origin-bottom rounded-sm bg-gradient-to-t from-accent/30 to-accent"
            style={{ height: `${h * 100}%` }}
            animate={still ? undefined : { scaleY: [h, 1 - h * 0.6, h * 0.8, 1, h] }}
            transition={{
              duration: 1.6 + (i % 5) * 0.2,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.03,
            }}
          />
        ))}
      </div>
      <svg viewBox="0 0 280 40" className="h-8 w-full text-accent/70" preserveAspectRatio="none">
        <motion.path
          d="M0 20 Q 10 2 20 20 T 40 20 T 60 20 T 80 20 T 100 20 T 120 20 T 140 20 T 160 20 T 180 20 T 200 20 T 220 20 T 240 20 T 260 20 T 280 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          animate={still ? undefined : { x: [0, -40] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        />
      </svg>
      <div className="flex items-center justify-between font-mono text-[11px] text-faint">
        <span>track.flac</span>
        <span>Web Audio · AnalyserNode</span>
      </div>
    </div>
  );
}

const columns = ['To Do', 'In Progress', 'Done'] as const;

function TaskboardVisual() {
  const { ref, tick } = useTicker(1800);
  const col = tick % 3;
  return (
    <div
      ref={ref}
      className="grid h-full grid-cols-3 gap-2.5 p-5 font-mono text-[10px] sm:p-7 sm:text-[11px]"
    >
      {columns.map((c, i) => (
        <div
          key={c}
          className="flex flex-col gap-2 rounded-xl border border-line bg-surface/70 p-2.5"
        >
          <span className="text-faint">{c}</span>
          <div className="h-6 rounded-md bg-surface-2" />
          {i === 2 && <div className="h-6 rounded-md bg-surface-2" />}
          {col === i && (
            <motion.div
              layoutId="task-card"
              transition={{ type: 'spring', stiffness: 260, damping: 26 }}
              className="rounded-md border border-accent/50 bg-accent-soft px-2 py-1.5 text-accent"
            >
              #42 Assign task
            </motion.div>
          )}
        </div>
      ))}
    </div>
  );
}

const sentences = [
  {
    text: 'machine learning is',
    words: [
      ['fun', 0.41],
      ['a', 0.22],
      ['the', 0.14],
    ],
  },
  {
    text: 'thank you for your',
    words: [
      ['help', 0.47],
      ['time', 0.29],
      ['support', 0.12],
    ],
  },
  {
    text: 'the quick brown',
    words: [
      ['fox', 0.63],
      ['dog', 0.11],
      ['bear', 0.06],
    ],
  },
] as const;

function PredictorVisual() {
  const { ref, tick } = useTicker(2800);
  const s = sentences[tick % sentences.length]!;
  return (
    <div
      ref={ref}
      className="flex h-full flex-col justify-center gap-4 p-5 font-mono text-xs sm:p-7"
    >
      <div className="rounded-xl border border-line bg-surface/80 px-4 py-3">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={s.text}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-text"
          >
            {s.text}
          </motion.span>
        </AnimatePresence>
        <span className="ml-1 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-accent" />
      </div>
      <div className="flex flex-col gap-2">
        {s.words.map(([w, p], i) => (
          <div key={i} className="flex items-center gap-3">
            <span className="w-14 text-muted">{w}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
              <motion.div
                className="h-full rounded-full bg-accent"
                initial={false}
                animate={{ width: `${p * 100}%` }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <span className="w-9 text-right text-faint">{Math.round(p * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
