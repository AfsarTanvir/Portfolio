import { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { BookOpen, FlaskConical, GitBranch, ShieldCheck } from 'lucide-react';
import { profile, skills } from '../data/profile';
import { journey, type JourneyTag } from '../data/experience';
import { PageHero, SectionHeading, Tag } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import { asset, cn } from '../lib/utils';

const principles = [
  {
    icon: ShieldCheck,
    title: 'Correctness before cleverness',
    body: 'Competitive programming taught me to hunt for the edge case before writing the code. I still start there: tenant boundaries, races, retries.',
  },
  {
    icon: FlaskConical,
    title: 'Test from the outside',
    body: 'Unit tests are necessary but not enough. I like end-to-end checks that drive the real binary through restarts, timeouts and kill -9.',
  },
  {
    icon: GitBranch,
    title: 'Make risky changes additive',
    body: 'A new nullable column that lives alongside the old path beats a destructive migration. Users should never notice the floor being replaced.',
  },
  {
    icon: BookOpen,
    title: 'Write it down',
    body: 'Decision records, a roadmap rebuilt from git history, and a public knowledge base. Writing is how I check that I actually understand something.',
  },
];

const tags: ('All' | JourneyTag)[] = [
  'All',
  'Industry',
  'Building',
  'Academic',
  'Competitive programming',
  'Leadership',
];

export function About() {
  const [filter, setFilter] = useState<(typeof tags)[number]>('All');
  const items = journey.filter((j) => filter === 'All' || j.tag === filter);

  return (
    <>
      <PageHero
        eyebrow="About"
        title={
          <>
            From contest problems to <em className="text-muted">production systems</em>
          </>
        }
      />

      <section className="container-page grid gap-12 lg:grid-cols-[20rem_1fr] lg:gap-20">
        <Reveal className="mx-auto w-full max-w-xs lg:sticky lg:top-28 lg:mx-0 lg:self-start">
          <div className="card overflow-hidden p-2">
            <img
              src={asset(profile.photo)}
              alt={`Portrait of ${profile.name}`}
              width={461}
              height={579}
              loading="lazy"
              className="aspect-[5/6] w-full rounded-[0.9rem] object-cover object-top"
            />
          </div>
          <p className="mt-4 font-mono text-xs text-faint">{profile.location} · UTC+6</p>
        </Reveal>

        <div className="space-y-6 text-lg leading-relaxed text-muted">
          <Reveal>
            <p>
              <span className="text-text">I’m Afsar, a software engineer from Bangladesh.</span> I
              started programming seriously at Sylhet Engineering College through competitive
              programming: more than 1,800 problems, 80 rated contests, and a Codeforces rating that
              fell to 632 before I worked it back up to Specialist.
            </p>
          </Reveal>
          <Reveal>
            <p>
              That habit of thinking carefully before typing followed me into software engineering.
              I learned the discipline of team development in the Learnathon .NET program, then
              moved to TypeScript, React and AdonisJS. Since September 2025 I have been a full-stack
              developer at{' '}
              <a
                className="text-text underline decoration-line-strong hover:text-accent"
                href="https://www.appifylab.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                AppifyLab
              </a>
              , working on EzyCommunity, a multi-tenant community platform.
            </p>
          </Reveal>
          <Reveal>
            <p>
              Production work keeps pulling me toward the layers underneath the features: caching,
              data isolation, scheduling, failure handling. So I build tools to understand them,
              like an API mock server with a careful Redis layer and a job scheduler in Go that has
              to stay correct after a crash. That curiosity is also why I plan to pursue an{' '}
              <span className="text-text">MSc in Computer Science</span>.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-page mt-32">
        <SectionHeading eyebrow="How I work" title="Four habits I try to keep" />
        <div className="grid gap-4 sm:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.06}>
              <div className="spotlight card h-full p-7">
                <p.icon size={22} className="text-accent" />
                <h3 className="mt-5 text-lg font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-page mt-32">
        <SectionHeading
          eyebrow="Journey"
          title="The road so far"
          description="Filter by thread: industry, building, academics, contests and leadership."
        />
        <LayoutGroup>
          <div role="tablist" aria-label="Filter journey" className="mb-8 flex flex-wrap gap-2">
            {tags.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={filter === t}
                onClick={() => setFilter(t)}
                className={cn(
                  'relative isolate rounded-full border px-3.5 py-1.5 text-sm transition-colors',
                  filter === t
                    ? 'border-transparent text-accent-ink'
                    : 'border-line text-muted hover:text-text'
                )}
              >
                {filter === t && (
                  <motion.span
                    layoutId="journey-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-accent"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative">{t}</span>
              </button>
            ))}
          </div>

          <motion.ol layout className="relative ml-2 border-l border-line">
            <AnimatePresence mode="popLayout" initial={false}>
              {items.map((j) => (
                <motion.li
                  layout
                  key={j.title}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.25 }}
                  className="relative pb-8 pl-8 last:pb-0"
                >
                  <span className="absolute top-1.5 -left-[5px] size-[9px] rounded-full border-2 border-bg bg-accent" />
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-mono text-xs text-faint">{j.date}</span>
                    <Tag>{j.tag}</Tag>
                  </div>
                  <h3 className="mt-1.5 font-semibold tracking-tight">{j.title}</h3>
                  <p className="mt-1 text-muted">{j.detail}</p>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ol>
        </LayoutGroup>
      </section>

      <section className="container-page mt-32">
        <SectionHeading eyebrow="Toolbox" title="What I reach for" />
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
          {skills.map((g, i) => (
            <Reveal key={g.group} delay={i * 0.05} className="bg-bg p-6">
              <h3 className="font-mono text-xs tracking-wider text-accent uppercase">{g.group}</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {g.items.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
