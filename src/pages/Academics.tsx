import { useEffect, useRef } from 'react';
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
import { RatingChart } from '../components/RatingChart';

export function Academics() {
  useScrollToHash();

  return (
    <>
      <PageHero
        eyebrow="Academics"
        title={
          <>
            Academic profile <em className="text-muted">& what I want to study</em>
          </>
        }
      >
        <p>{studyGoal.body}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ButtonLink href={profile.cv.academic}>
            <FileText size={16} /> Academic CV
          </ButtonLink>
          <ButtonLink href={`mailto:${profile.email}?subject=Academic%20enquiry`} variant="ghost">
            <Mail size={16} /> Contact me
          </ButtonLink>
        </div>
      </PageHero>

      {/* Education + motivation */}
      <section className="container-page grid gap-5 lg:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <div className="card flex h-full flex-col gap-8 p-7 sm:flex-row sm:items-center sm:p-9">
            <CgpaRing value={education.cgpa} scale={education.scale} />
            <div>
              <p className="eyebrow">Education</p>
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
          <div className="card relative h-full overflow-hidden p-7 sm:p-9">
            <div
              aria-hidden
              className="absolute -right-20 -bottom-24 size-64 rounded-full bg-accent/10 blur-3xl"
            />
            <p className="eyebrow">Why an MSc, and why now</p>
            <blockquote className="relative mt-4 display text-2xl leading-snug sm:text-[1.7rem]">
              “{motivation}”
            </blockquote>
            <p className="relative mt-5 font-mono text-xs text-faint">{studyGoal.heading}</p>
          </div>
        </Reveal>
      </section>

      {/* Interests */}
      <section id="interests" className="container-page mt-32">
        <SectionHeading
          eyebrow="Academic interests"
          title={
            <>
              Questions I keep running into <em className="text-muted">at work</em>
            </>
          }
          description="Each interest comes from something I have built, so I can point to the code behind it."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {interests.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.08}>
              <div className="spotlight card flex h-full flex-col p-7">
                <p className="font-mono text-xs text-accent">0{i + 1}</p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">{it.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{it.summary}</p>
                <p className="mt-5 border-l-2 border-accent pl-4 display text-xl leading-snug italic">
                  {it.question}
                </p>
                <div className="mt-auto pt-6">
                  <p className="font-mono text-[0.7rem] tracking-wider text-faint uppercase">
                    Evidence
                  </p>
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
                            className="text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
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
        <Reveal className="mt-5">
          <SmartLink
            href={earlierExploration.href}
            className="card group flex flex-col gap-2 p-6 transition-colors hover:border-line-strong sm:flex-row sm:items-center sm:justify-between"
          >
            <span>
              <span className="font-semibold tracking-tight">{earlierExploration.title}</span>
              <span className="mt-1 block text-sm text-muted">{earlierExploration.body}</span>
            </span>
            <ArrowUpRight
              size={18}
              className="shrink-0 text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
            />
          </SmartLink>
        </Reveal>
      </section>

      {/* Competitive programming */}
      <section id="competitive-programming" className="container-page mt-32">
        <SectionHeading
          eyebrow="Competitive programming"
          title={
            <>
              Five years of contests, <em className="text-muted">and a long climb back</em>
            </>
          }
          description="Competitive programming is where I learned to reason about correctness and complexity under pressure. The rating line is real data from the Codeforces API."
        />
        <div className="grid gap-5 lg:grid-cols-[1fr_2fr]">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
            {ratings.map((r, i) => (
              <Reveal key={r.judge} delay={i * 0.06} className="bg-bg p-6">
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
                        className="text-text hover:text-accent"
                      >
                        {r.handle}
                      </a>
                    </>
                  )}
                </p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.1}>
            <RatingChart />
          </Reveal>
        </div>

        <Reveal className="mt-8">
          <ul className="dim-siblings divide-y divide-line border-y border-line">
            {contests.map((c) => (
              <li key={c.name}>
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
                      className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Leadership */}
      <section className="container-page mt-32">
        <SectionHeading
          eyebrow="Leadership & service"
          title="Giving back to the club that taught me"
        />
        {leadership.map((l) => (
          <Reveal key={l.org}>
            <div className="card flex flex-col gap-3 p-7 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-2xl">
                <h3 className="text-lg font-semibold tracking-tight">
                  {l.role} <span className="text-muted">· {l.org}</span>
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
        <circle cx="60" cy="60" r="52" fill="none" stroke="var(--line)" strokeWidth="8" />
        <motion.circle
          cx="60"
          cy="60"
          r="52"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="8"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={inView ? { pathLength: value / scale } : undefined}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <p className="display text-4xl">{value.toFixed(2)}</p>
          <p className="font-mono text-[0.65rem] text-faint">/ {scale.toFixed(2)} CGPA</p>
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
