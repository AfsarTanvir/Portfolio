import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import { motion, useInView } from 'motion/react';
import { ArrowUpRight, FileText, Mail } from 'lucide-react';
import {
  contests,
  earlierExploration,
  education,
  interests,
  leadership,
  motivation,
  ratings,
  studyGoal,
} from '../data/academics';
import { profile } from '../data/profile';
import { PageHero, SectionHeading } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import { ButtonLink, SmartLink } from '../components/ui/SmartLink';
import { RatingFlip } from '../components/RatingFlip';
import { cn } from '../lib/utils';

export function Academics() {
  useScrollToHash();
  const [side, setSide] = useState(0);

  return (
    <>
      <PageHero label="Academics" title="Studies, and" italic="what’s next">
        <p>{studyGoal}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href={profile.cv.academic}>
            <FileText size={16} /> Academic CV
          </ButtonLink>
          <ButtonLink href={`mailto:${profile.email}?subject=Academic%20enquiry`} variant="ghost">
            <Mail size={16} /> Email me
          </ButtonLink>
        </div>
      </PageHero>

      {/* Degree + why a master's */}
      <section className="container-page grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <div className="card flex h-full flex-col gap-8 p-7 sm:flex-row sm:items-center sm:p-9">
            <CgpaRing value={education.cgpa} scale={education.scale} />
            <div>
              <p className="eyebrow">Degree</p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight">{education.degree}</h2>
              <p className="mt-1 text-text">{education.institution}</p>
              <p className="text-sm text-muted">{education.affiliation}</p>
              <p className="mt-3 font-mono text-xs text-faint">
                {education.place} · {education.period}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted">{education.note}</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="h-full border-l-2 border-accent py-2 pl-7 sm:pl-9">
            <p className="eyebrow">Why a master’s</p>
            <div className="mt-4 space-y-4 text-lg leading-relaxed text-text">
              {motivation.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Interests */}
      <section id="interests" className="container-page mt-32">
        <SectionHeading
          index="01"
          label="Interests"
          title="What I’d like to"
          italic="study"
          description="Each of these comes out of something I’ve actually built or worked on."
        />
        <div className="grid gap-6 lg:grid-cols-3">
          {interests.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.08}>
              <div className="card flex h-full flex-col p-7">
                <span className="hand text-3xl">{i + 1}.</span>
                <h3 className="mt-1 text-xl font-semibold tracking-tight">{it.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{it.summary}</p>
                <p className="mt-5 display text-xl leading-snug italic">“{it.question}”</p>
                <div className="mt-auto pt-6">
                  <p className="eyebrow">Related work</p>
                  <ul className="mt-2 space-y-1.5 text-sm">
                    {it.evidence.map((e) => (
                      <li key={e.label}>
                        <SmartLink
                          href={e.href}
                          className="group inline-flex items-center gap-1 text-text hover:text-accent"
                        >
                          {e.label}
                          <ArrowUpRight
                            size={13}
                            className="text-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                          />
                        </SmartLink>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-6">
          <SmartLink
            href={earlierExploration.href}
            className="group flex flex-col gap-2 border-y border-line py-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <span>
              <span className="font-semibold tracking-tight">{earlierExploration.title}</span>
              <span className="mt-1 block text-sm text-muted">{earlierExploration.body}</span>
            </span>
            <ArrowUpRight
              size={18}
              className="shrink-0 text-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
            />
          </SmartLink>
        </Reveal>
      </section>

      {/* Competitive programming */}
      <section id="competitive-programming" className="container-page mt-32">
        <SectionHeading
          index="02"
          label="Contests"
          title="Competitive"
          italic="programming"
          description="This is where I learned to think about correctness and running time. Both charts use my real contest history."
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_2fr] lg:items-end">
          <div className="grid border-t border-line">
            {ratings.map((r, i) => {
              // The first two rows (Codeforces, CodeChef) also switch the chart.
              const switches = i < 2;
              const active = switches && side === i;
              return (
                <Reveal
                  key={r.judge}
                  delay={i * 0.06}
                  className={cn(
                    'relative border-b border-line py-5 pl-5 transition-colors',
                    switches && 'hover:bg-surface',
                    active && 'bg-surface'
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="rating-row-marker"
                      className="absolute inset-y-3 left-0 w-0.5 rounded-full bg-accent"
                    />
                  )}
                  {switches && (
                    <button
                      type="button"
                      onClick={() => setSide(i)}
                      aria-pressed={active}
                      aria-label={`Show ${r.judge} rating chart`}
                      className="absolute inset-0"
                    />
                  )}
                  <p className="font-mono text-xs text-faint">{r.judge}</p>
                  <p className="mt-1 display text-4xl">{r.value}</p>
                  <p className="mt-1 text-sm text-muted">
                    {r.detail}
                    {r.href && (
                      <>
                        {' · '}
                        <a
                          href={r.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="relative text-text hover:text-accent"
                        >
                          {r.handle}
                        </a>
                      </>
                    )}
                  </p>
                </Reveal>
              );
            })}
          </div>
          <Reveal delay={0.1}>
            <RatingFlip side={side} onSide={setSide} />
          </Reveal>
        </div>

        <Reveal className="mt-10">
          <ul className="dim-siblings border-t border-line">
            {contests.map((c) => (
              <li key={c.name} className="border-b border-line">
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-mono text-xs text-faint">{c.year}</span>
                    <span className="font-medium">{c.name}</span>
                  </span>
                  <span className="inline-flex items-center gap-2 pl-12 text-accent sm:pl-0">
                    {c.result}
                    <ArrowUpRight
                      size={15}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Club */}
      <section className="container-page mt-32">
        <SectionHeading index="03" label="Leadership" title="The programming" italic="club" />
        {leadership.map((l) => (
          <Reveal key={l.org}>
            <div className="flex flex-col gap-3 border-y border-line py-7 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-2xl">
                <h3 className="text-lg font-semibold tracking-tight">
                  {l.role} <span className="font-normal text-muted">of the {l.org}</span>
                </h3>
                <p className="mt-2 leading-relaxed text-muted">{l.detail}</p>
              </div>
              <span className="font-mono text-xs text-faint">{l.period}</span>
            </div>
          </Reveal>
        ))}
      </section>
    </>
  );
}

function CgpaRing({ value, scale }: { value: number; scale: number }) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  return (
    <div className="relative mx-auto size-36 shrink-0 sm:mx-0">
      <svg
        ref={ref}
        viewBox="0 0 120 120"
        className="size-full -rotate-90"
        role="img"
        aria-label={`CGPA ${value} out of ${scale}`}
      >
        <circle cx="60" cy="60" r="52" fill="none" stroke="var(--line)" strokeWidth="6" />
        <motion.circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: value / scale } : undefined}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="display text-4xl">{value.toFixed(2)}</p>
          <p className="font-mono text-[0.65rem] text-faint">out of {scale.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

/** Scroll to #hash after the page transition (e.g. /academics#interests). */
function useScrollToHash() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return;
    const id = setTimeout(
      () => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' }),
      120
    );
    return () => clearTimeout(id);
  }, [hash]);
}
