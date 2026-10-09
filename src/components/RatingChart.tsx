import { useMemo, useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { codeforcesHistory } from '../data/academics'

const W = 720
const H = 240
const PAD = { top: 20, right: 16, bottom: 28, left: 40 }

// Codeforces rank bands.
const bands = [
  { from: 0, to: 1200, label: 'Newbie', color: 'rgb(128 128 128 / 0.10)' },
  { from: 1200, to: 1400, label: 'Pupil', color: 'rgb(34 197 94 / 0.10)' },
  { from: 1400, to: 1600, label: 'Specialist', color: 'rgb(6 182 212 / 0.12)' },
]

/** Codeforces rating history; the line draws itself once when scrolled into view. */
export function RatingChart() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })

  const { path, area, points, peak, low, years } = useMemo(() => {
    const t = codeforcesHistory.map(([d]) => new Date(d).getTime())
    const r = codeforcesHistory.map(([, v]) => v)
    const t0 = Math.min(...t)
    const t1 = Math.max(...t)
    const yMin = 600
    const yMax = 1600
    const x = (v: number) => PAD.left + ((v - t0) / (t1 - t0)) * (W - PAD.left - PAD.right)
    const y = (v: number) => PAD.top + (1 - (v - yMin) / (yMax - yMin)) * (H - PAD.top - PAD.bottom)
    const pts = t.map((tv, i) => [x(tv), y(r[i]!)] as const)
    const d = pts.map(([px, py], i) => `${i ? 'L' : 'M'}${px.toFixed(1)} ${py.toFixed(1)}`).join(' ')
    const peakIdx = r.indexOf(Math.max(...r))
    const lowIdx = r.indexOf(Math.min(...r))
    const yrs = [2020, 2021, 2022, 2023, 2024, 2025].map((yr) => ({ yr, x: x(new Date(`${yr}-01-01`).getTime()) }))
    return {
      path: d,
      area: `${d} L${pts.at(-1)![0].toFixed(1)} ${H - PAD.bottom} L${pts[0]![0].toFixed(1)} ${H - PAD.bottom} Z`,
      points: pts,
      peak: { x: pts[peakIdx]![0], y: pts[peakIdx]![1], v: r[peakIdx]! },
      low: { x: pts[lowIdx]![0], y: pts[lowIdx]![1], v: r[lowIdx]! },
      years: yrs.filter((v) => v.x >= PAD.left && v.x <= W - PAD.right),
    }
  }, [])

  const yOf = (v: number) => PAD.top + (1 - (v - 600) / 1000) * (H - PAD.top - PAD.bottom)

  return (
    <figure className="card overflow-hidden p-4 sm:p-6">
      <figcaption className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-sm font-medium">Codeforces rating, 80 rated contests</span>
        <span className="font-mono text-xs text-faint">
          low {low.v} → peak <span className="text-accent">{peak.v}</span>
        </span>
      </figcaption>
      <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`Codeforces rating from 2020 to 2025: low of ${low.v} in November 2022, peak of ${peak.v} in November 2024.`}>
        <defs>
          <linearGradient id="rating-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {bands.map((b) => (
          <g key={b.label}>
            <rect x={PAD.left} width={W - PAD.left - PAD.right} y={yOf(b.to)} height={yOf(b.from < 600 ? 600 : b.from) - yOf(b.to)} fill={b.color} />
            <text x={PAD.left + 8} y={yOf(b.to) + 14} className="fill-[var(--faint)] font-mono text-[10px]">
              {b.label}
            </text>
          </g>
        ))}
        {[800, 1000, 1200, 1400].map((v) => (
          <text key={v} x={PAD.left - 8} y={yOf(v) + 3} textAnchor="end" className="fill-[var(--faint)] font-mono text-[10px]">
            {v}
          </text>
        ))}
        {years.map((yr) => (
          <text key={yr.yr} x={yr.x} y={H - 8} textAnchor="middle" className="fill-[var(--faint)] font-mono text-[10px]">
            {yr.yr}
          </text>
        ))}
        <motion.path
          d={area}
          fill="url(#rating-fill)"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
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
          animate={inView ? { pathLength: 1 } : undefined}
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
            animate={inView ? { opacity: 0.7 } : undefined}
            transition={{ delay: 0.2 + (i / points.length) * 1.8 }}
          />
        ))}
        <motion.g initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : undefined} transition={{ delay: 2 }}>
          <circle cx={peak.x} cy={peak.y} r={5} fill="var(--bg)" stroke="var(--accent)" strokeWidth={2} />
          <text x={peak.x - 8} y={peak.y - 10} textAnchor="end" className="fill-[var(--text)] font-mono text-[11px]">
            {peak.v} · Specialist
          </text>
          <circle cx={low.x} cy={low.y} r={4} fill="var(--bg)" stroke="var(--faint)" strokeWidth={1.5} />
          <text x={low.x - 9} y={low.y + 4} textAnchor="end" className="fill-[var(--faint)] font-mono text-[10px]">
            {low.v}
          </text>
        </motion.g>
      </svg>
    </figure>
  )
}
