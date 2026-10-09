import { useRef } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { ArrowUpRight, FileText } from 'lucide-react'
import { experience } from '../data/experience'
import { leadership } from '../data/academics'
import { profile, skills } from '../data/profile'
import { PageHero, SectionHeading, Tag } from '../components/ui/Section'
import { Reveal } from '../components/ui/Reveal'
import { ButtonLink } from '../components/ui/SmartLink'

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 60%'] })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <>
      <PageHero eyebrow="Experience" title={<>Where I’ve worked, and <em className="text-muted">what I shipped</em></>}>
        <p>
          Production features on a multi-tenant platform, preceded by a mentored team program. The details are below,
          and the one-page résumé has the short version.
        </p>
        <div className="mt-6">
          <ButtonLink href={profile.cv.resume}>
            <FileText size={16} /> Download résumé
          </ButtonLink>
        </div>
      </PageHero>

      <section className="container-page">
        <ol ref={listRef} className="relative">
          {/* Track + scroll-linked progress line */}
          <span aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-line md:left-[calc(12rem+7px)]" />
          <motion.span
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-accent md:left-[calc(12rem+7px)]"
          />

          {experience.map((e) => (
            <li key={e.org} className="relative grid gap-4 pb-16 pl-10 last:pb-0 md:grid-cols-[12rem_1fr] md:gap-10 md:pl-0">
              <Reveal className="md:pt-0.5 md:text-right md:pr-6">
                <p className="font-mono text-xs text-faint">{e.period}</p>
                {e.location && <p className="mt-1 font-mono text-xs text-faint">{e.location}</p>}
              </Reveal>
              <span aria-hidden className="absolute top-1 left-0 grid size-[15px] place-items-center rounded-full border border-accent bg-bg md:left-48">
                <span className="size-[7px] rounded-full bg-accent" />
              </span>
              <Reveal className="md:pl-10">
                <h2 className="text-2xl font-semibold tracking-tight">{e.role}</h2>
                <p className="mt-1 text-muted">
                  {e.orgUrl ? (
                    <a href={e.orgUrl} target="_blank" rel="noopener noreferrer" className="link-underline text-text hover:text-accent">
                      {e.org}
                    </a>
                  ) : (
                    <span className="text-text">{e.org}</span>
                  )}
                </p>
                <p className="mt-4 max-w-2xl leading-relaxed text-muted">{e.summary}</p>
                <ul className="mt-5 max-w-2xl space-y-3">
                  {e.highlights.map((h) => (
                    <li key={h} className="flex gap-3 leading-relaxed text-muted">
                      <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-accent" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {e.stack.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
                {e.links && (
                  <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                    {e.links.map((l) => (
                      <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-1 text-text hover:text-accent">
                        {l.label}
                        <ArrowUpRight size={14} className="text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                      </a>
                    ))}
                  </div>
                )}
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="container-page mt-32">
        <SectionHeading eyebrow="Leadership" title="Beyond the job" />
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

      <section className="container-page mt-32">
        <SectionHeading eyebrow="Skills" title="Technical toolbox" description="Grouped by how I use them, not by how long the list can get." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((g, i) => (
            <Reveal key={g.group} delay={i * 0.05}>
              <div className="spotlight card h-full p-6">
                <h3 className="font-mono text-xs tracking-wider text-accent uppercase">{g.group}</h3>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {g.items.map((s) => (
                    <Tag key={s}>{s}</Tag>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
