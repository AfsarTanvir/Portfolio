import { useMemo, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { codechefHistory, codeforcesHistory } from '../data/academics';
import { CircleMark } from './ui/HandDrawn';

const W = 720;
const H = 240;
const PAD = { top: 20, right: 16, bottom: 28, left: 40 };

type Band = { to: number; label: string; color: string };

export type RatingSeries = {
  key: 'codeforces' | 'codechef';
  label: string;
  history: [date: string, rating: number][];
  yMin: number;
  yMax: number;
  yTicks: number[];
  /** Rank bands from low to high; each runs from the previous band's `to` (or yMin). */
  bands: Band[];
  peakTitle: string;
  lowWord: 'low' | 'start';
  note: string;
  /** Handwritten note circled at the lowest point. */
  annotation?: string;
};

export const ratingSeries: RatingSeries[] = [
  {
    key: 'codeforces',
    label: 'Codeforces',
    history: codeforcesHistory,
    yMin: 600,
    yMax: 1600,
    yTicks: [800, 1000, 1200, 1400],
    bands: [
      { to: 1200, label: 'Newbie', color: 'rgb(128 128 128 / 0.10)' },
      { to: 1400, label: 'Pupil', color: 'rgb(34 197 94 / 0.10)' },
      { to: 1600, label: 'Specialist', color: 'rgb(6 182 212 / 0.12)' },
    ],
    peakTitle: 'Specialist',
    lowWord: 'low',
    note: 'My rating dropped to 632 in November 2022. Two years later, I reached Specialist.',
    annotation: 'lowest point',
  },
  {
    key: 'codechef',
    label: 'CodeChef',
    history: codechefHistory,
    yMin: 1000,
    yMax: 1800,
    yTicks: [1200, 1400, 1600],
    bands: [
      { to: 1400, label: '1★', color: 'rgb(128 128 128 / 0.10)' },
      { to: 1600, label: '2★', color: 'rgb(34 197 94 / 0.10)' },
      { to: 1800, label: '3★', color: 'rgb(59 130 246 / 0.12)' },
    ],
    peakTitle: '3★',
    lowWord: 'start',
    note: 'My best result was 99th place in Starters 122 (Division 3).',
  },
];

/**
 * Rating history as a line chart. The line draws itself the first time the
 * chart is both scrolled into view and `active` (the visible side of the flip card).
 */
export function RatingChart({ series, active = true }: { series: RatingSeries; active?: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const seen = useRef(false);
  if (inView && active) seen.current = true;
  const draw = seen.current;

  const chart = useMemo(() => {
    const { history, yMin, yMax } = series;
    const t = history.map(([d]) => new Date(d).getTime());
    const r = history.map(([, v]) => v);
    const t0 = Math.min(...t);
    const t1 = Math.max(...t);
    const x = (v: number) => PAD.left + ((v - t0) / (t1 - t0)) * (W - PAD.left - PAD.right);
    const y = (v: number) =>
      PAD.top + (1 - (Math.max(v, yMin) - yMin) / (yMax - yMin)) * (H - PAD.top - PAD.bottom);
    const pts = t.map((tv, i) => [x(tv), y(r[i]!)] as const);
    const d = pts
      .map(([px, py], i) => `${i ? 'L' : 'M'}${px.toFixed(1)} ${py.toFixed(1)}`)
      .join(' ');
    const peakIdx = r.indexOf(Math.max(...r));
    const lowIdx = r.indexOf(Math.min(...r));

    // Year ticks; add mid-year ticks when the history spans under three years.
    const startYear = new Date(t0).getFullYear();
    const endYear = new Date(t1).getFullYear();
    const short = endYear - startYear < 3;
    const ticks: { label: string; x: number }[] = [];
    for (let yr = startYear; yr <= endYear; yr++) {
      ticks.push({ label: String(yr), x: x(new Date(`${yr}-01-01`).getTime()) });
      if (short) ticks.push({ label: 'Jul', x: x(new Date(`${yr}-07-01`).getTime()) });
    }

    return {
      y,
      path: d,
      area: `${d} L${pts.at(-1)![0].toFixed(1)} ${H - PAD.bottom} L${pts[0]![0].toFixed(1)} ${H - PAD.bottom} Z`,
      points: pts,
      peak: { x: pts[peakIdx]![0], y: pts[peakIdx]![1], v: r[peakIdx]! },
      low: { x: pts[lowIdx]![0], y: pts[lowIdx]![1], v: r[lowIdx]! },
      ticks: ticks.filter((v) => v.x >= PAD.left && v.x <= W - PAD.right),
      first: history[0]![0].slice(0, 4),
      last: history.at(-1)![0].slice(0, 4),
    };
  }, [series]);

  const { y, path, area, points, peak, low, ticks } = chart;
  const fillId = `rating-fill-${series.key}`;

  return (
    <figure className="card overflow-hidden p-4 sm:p-6">
      <figcaption className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-sm font-medium">
          {series.label} rating, {series.history.length} rated contests
        </span>
        <span className="font-mono text-xs text-faint">
          {series.lowWord} {low.v} → peak <span className="text-accent">{peak.v}</span>
        </span>
      </figcaption>
      <div className="relative">
        <svg
          ref={ref}
          viewBox={`0 0 ${W} ${H}`}
          className="h-auto w-full"
          role="img"
          aria-label={`${series.label} rating from ${chart.first} to ${chart.last}: ${series.lowWord} ${low.v}, peak ${peak.v}.`}
        >
          <defs>
            <linearGradient id={fillId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {series.bands.map((b, i) => {
            const from = i === 0 ? series.yMin : series.bands[i - 1]!.to;
            return (
              <g key={b.label}>
                <rect
                  x={PAD.left}
                  width={W - PAD.left - PAD.right}
                  y={y(b.to)}
                  height={y(from) - y(b.to)}
                  fill={b.color}
                />
                <text
                  x={PAD.left + 8}
                  y={y(b.to) + 14}
                  className="fill-[var(--faint)] font-mono text-[10px]"
                >
                  {b.label}
                </text>
              </g>
            );
          })}
          {series.yTicks.map((v) => (
            <text
              key={v}
              x={PAD.left - 8}
              y={y(v) + 3}
              textAnchor="end"
              className="fill-[var(--faint)] font-mono text-[10px]"
            >
              {v}
            </text>
          ))}
          {ticks.map((tick) => (
            <text
              key={`${tick.label}-${tick.x}`}
              x={tick.x}
              y={H - 8}
              textAnchor="middle"
              className="fill-[var(--faint)] font-mono text-[10px]"
            >
              {tick.label}
            </text>
          ))}
          <motion.path
            d={area}
            fill={`url(#${fillId})`}
            initial={{ opacity: 0 }}
            animate={draw ? { opacity: 1 } : undefined}
            transition={{ duration: 1, delay: 1.2 }}
          />
          <motion.path
            d={path}
            fill="none"
            stroke="var(--accent)"
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={draw ? { pathLength: 1 } : undefined}
            transition={{ duration: 2, ease: [0.65, 0, 0.35, 1] }}
          />
          {points.map(([px, py], i) => (
            <motion.circle
              key={i}
              cx={px}
              cy={py}
              r={1.8}
              fill="var(--accent)"
              initial={{ opacity: 0 }}
              animate={draw ? { opacity: 0.7 } : undefined}
              transition={{ delay: 0.2 + (i / points.length) * 1.8 }}
            />
          ))}
          <motion.g
            initial={{ opacity: 0 }}
            animate={draw ? { opacity: 1 } : undefined}
            transition={{ delay: 2 }}
          >
            <circle
              cx={peak.x}
              cy={peak.y}
              r={5}
              fill="var(--bg)"
              stroke="var(--accent)"
              strokeWidth={2}
            />
            <text
              x={peak.x - 8}
              y={peak.y - 10}
              textAnchor="end"
              className="fill-[var(--text)] font-mono text-[11px]"
            >
              {peak.v} · {series.peakTitle}
            </text>
            <circle
              cx={low.x}
              cy={low.y}
              r={4}
              fill="var(--bg)"
              stroke="var(--faint)"
              strokeWidth={1.5}
            />
            <text
              x={low.x + (low.x < W / 2 ? 9 : -9)}
              y={low.y + 4}
              textAnchor={low.x < W / 2 ? 'start' : 'end'}
              className="fill-[var(--faint)] font-mono text-[10px]"
            >
              {low.v}
            </text>
          </motion.g>
        </svg>
        {series.annotation && (
          <div
            aria-hidden
            className="pointer-events-none absolute"
            style={{ left: `${(low.x / W) * 100}%`, top: `${(low.y / H) * 100}%` }}
          >
            <CircleMark
              className="absolute h-10 w-16 -translate-x-1/2 -translate-y-1/2"
              delay={2.2}
            />
            <span className="hand absolute -top-6 left-9 -rotate-6 text-lg whitespace-nowrap sm:text-xl">
              {series.annotation}
            </span>
          </div>
        )}
      </div>
      <p className="mt-3 text-xs leading-relaxed text-muted">{series.note}</p>
    </figure>
  );
}
