import { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { profile, skills } from '../data/profile';
import { journey, type JourneyTag } from '../data/experience';
import { PageHero, SectionHeading, Tag } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import { asset, cn } from '../lib/utils';

const habits = [
  {
    title: 'Check the edge cases first',
    body: 'An old contest habit. Before I write anything, I ask what happens with empty input, two requests at the same time, or a user from the wrong team.',
  },
  {
    title: 'Test the real thing',
    body: 'Unit tests are good, but I also like tests that start the actual program and try to break it: restart it, time it out, kill it halfway.',
  },
  {
    title: 'Don’t break what already works',
    body: 'When I change a database, I add the new column next to the old setup first. Nobody should notice the switch.',
  },
  {
    title: 'Write things down',
    body: 'I keep notes, decision records and a public knowledge base. If I can’t explain something simply, I probably don’t understand it yet.',
  },
];

const tags: ('All' | JourneyTag)[] = ['All', 'Work', 'Projects', 'University', 'Contests', 'Club'];

export function About() {
  const [filter, setFilter] = useState<(typeof tags)[number]>('All');
  const items = journey.filter((j) => filter === 'All' || j.tag === filter);

  return (
    <>
      <PageHero label="About" title="Hi, I’m" italic="Afsar." />

      <section className="container-page grid gap-12 lg:grid-cols-[18rem_1fr] lg:gap-20">
        <Reveal className="mx-auto w-full max-w-[16rem] lg:sticky lg:top-28 lg:mx-0 lg:self-start">
          <div className="-rotate-2 bg-surface p-3 pb-4 shadow-[var(--shadow)] ring-1 ring-line transition-transform duration-500 hover:rotate-1">
            <img
              src={asset(profile.photo)}
              alt={`Portrait of ${profile.name}`}
              width={461}
              height={579}
              loading="lazy"
              className="aspect-[5/6] w-full object-cover object-top"
            />
            <p className="hand mt-3 text-center text-xl">that’s me</p>
          </div>
        </Reveal>

        <div className="max-w-2xl space-y-6 text-lg leading-relaxed text-muted">
          <Reveal>
            <p>
              <span className="text-text">
                I live in Moulvibazar, in the north-east of Bangladesh.
              </span>{' '}
              I studied Computer Science and Engineering at Sylhet Engineering College from 2020 to
              2025.
            </p>
          </Reveal>
          <Reveal>
            <p>
              I made my Codeforces account a few weeks after starting university, and competitive
              programming took up most of my free time after that. It didn’t go smoothly. In 2022 my
              rating fell to 632, and it took me two more years to reach Specialist. In my last year
              I was the coordinator of the college programming club.
            </p>
          </Reveal>
          <Reveal>
            <p>
              Contests taught me to think before I type. Learnathon taught me to work in a shared
              codebase, with pull requests and code review. Since September 2025 I’ve been at{' '}
              <a
                className="prose-link"
                href="https://www.appifylab.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                AppifyLab
              </a>
              , working on EzyCommunity.
            </p>
          </Reveal>
          <Reveal>
            <p>
              Work keeps pulling me towards the parts users never see: caching, permissions, keeping
              one customer’s data away from another’s, and what happens when a job crashes halfway.
              My side projects are mostly me trying to understand those things better. It’s also why
              I want to do a master’s.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-page mt-32">
        <SectionHeading index="01" label="How I work" title="A few habits" italic="I try to keep" />
        <ol className="grid gap-x-12 border-t border-line sm:grid-cols-2">
          {habits.map((h, i) => (
            <Reveal
              as="li"
              key={h.title}
              delay={(i % 2) * 0.08}
              className="border-b border-line py-7"
            >
              <span className="hand text-3xl">{i + 1}.</span>
              <h3 className="mt-1 text-lg font-semibold tracking-tight">{h.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{h.body}</p>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="container-page mt-32">
        <SectionHeading
          index="02"
          label="Timeline"
          title="How I got"
          italic="here"
          description="Filter it if you only care about one part."
        />
        <LayoutGroup>
          <div role="tablist" aria-label="Filter timeline" className="mb-10 flex flex-wrap gap-2">
            {tags.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={filter === t}
                onClick={() => setFilter(t)}
                className={cn(
                  'relative isolate rounded-full border px-3.5 py-1.5 text-sm transition-colors',
                  filter === t
                    ? 'border-transparent text-bg'
                    : 'border-line text-muted hover:text-text'
                )}
              >
                {filter === t && (
                  <motion.span
                    layoutId="journey-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-text"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                {t}
              </button>
            ))}
          </div>

          <motion.ol layout className="relative ml-2 border-l border-line-strong">
            <AnimatePresence mode="popLayout" initial={false}>
              {items.map((j) => (
                <motion.li
                  layout
                  key={j.title}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.25 }}
                  className="relative pb-9 pl-8 last:pb-0"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                    className="absolute top-1.5 -left-[5px] size-[9px] rounded-full border-2 border-bg bg-accent"
                  />
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
        <SectionHeading index="03" label="Tools" title="Languages and" italic="tools" />
        <div className="grid gap-x-10 gap-y-8 border-t border-line pt-8 sm:grid-cols-2 lg:grid-cols-5">
          {skills.map((g, i) => (
            <Reveal key={g.group} delay={i * 0.05}>
              <h3 className="font-mono text-xs text-faint">{g.group}</h3>
              <ul className="mt-3 space-y-1.5 text-text">
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
