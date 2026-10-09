import { Link } from 'react-router';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Briefcase, FileText, GraduationCap } from 'lucide-react';
import { now, profile, skills, stats } from '../data/profile';
import { experience } from '../data/experience';
import { projects } from '../data/projects';
import { education, leadership } from '../data/academics';
import { ProjectCard } from '../components/ProjectCard';
import { Counter } from '../components/ui/Counter';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/Section';
import { ButtonLink, SmartLink } from '../components/ui/SmartLink';
import { Marquee } from '../components/Marquee';
import { asset, stagger } from '../lib/utils';

const words = profile.name.split(' ');

export function Home() {
  const featured = projects.filter((p) => p.featured);
  return (
    <>
      <Hero />
      <Paths />

      {/* Stats */}
      <section className="container-page mt-24">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} className="bg-bg p-6 sm:p-8">
              <dt className="sr-only">{s.label}</dt>
              <dd className="display text-5xl sm:text-6xl">
                <Counter
                  value={s.value}
                  suffix={s.suffix}
                  decimals={'decimals' in s ? s.decimals : 0}
                />
              </dd>
              <p className="mt-3 text-sm text-text">{s.label}</p>
              <p className="mt-1 font-mono text-xs text-faint">{s.note}</p>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Selected work */}
      <section className="container-page mt-32">
        <SectionHeading
          eyebrow="Selected work"
          title={
            <>
              Tools for developers, <em className="text-muted">built like products</em>
            </>
          }
          description="Each one started from a real annoyance, and each one is tested, documented and honest about its trade-offs."
          action={
            <ButtonLink href="/projects" variant="ghost">
              All projects{' '}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
          }
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Experience preview */}
      <section className="container-page mt-32 grid gap-12 lg:grid-cols-[1fr_1.4fr]">
        <SectionHeading
          className="lg:sticky lg:top-28 lg:self-start"
          eyebrow="Experience"
          title="Production, not just side projects"
          description="I write code that real communities use every day, and I learned to work in a team before I graduated."
          action={null}
        />
        <ol className="dim-siblings flex flex-col gap-3">
          {experience.map((e, i) => (
            <Reveal as="li" key={e.org} delay={i * 0.06}>
              <Link
                to="/experience"
                className="spotlight card group block p-6 transition-colors hover:border-line-strong"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {e.role} <span className="text-muted">· {e.org}</span>
                  </h3>
                  <span className="font-mono text-xs text-faint">{e.period}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{e.summary}</p>
              </Link>
            </Reveal>
          ))}
          <Reveal as="li" delay={0.12}>
            <Link
              to="/academics"
              className="spotlight card group block p-6 transition-colors hover:border-line-strong"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold tracking-tight">
                  {leadership[0]!.role} <span className="text-muted">· {leadership[0]!.org}</span>
                </h3>
                <span className="font-mono text-xs text-faint">{leadership[0]!.period}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{leadership[0]!.detail}</p>
            </Link>
          </Reveal>
        </ol>
      </section>

      {/* Toolbox marquee */}
      <section className="mt-32">
        <Reveal className="container-page mb-6">
          <p className="eyebrow">Toolbox</p>
        </Reveal>
        <Marquee items={skills.flatMap((g) => g.items)} />
      </section>

      {/* Now */}
      <section className="container-page mt-32">
        <div className="card relative overflow-hidden p-8 sm:p-12">
          <div
            aria-hidden
            className="absolute -top-32 -right-32 size-80 rounded-full bg-accent/10 blur-3xl"
          />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_1.6fr]">
            <Reveal>
              <p className="eyebrow">Now</p>
              <h2 className="mt-3 display text-4xl sm:text-5xl">What I’m doing these days</h2>
              <p className="mt-4 font-mono text-xs text-faint">Updated {now.updated}</p>
            </Reveal>
            <ul className="flex flex-col divide-y divide-line">
              {now.items.map((item, i) => (
                <Reveal
                  as="li"
                  key={item}
                  delay={i * 0.05}
                  className="flex gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <span className="font-mono text-xs leading-6 text-accent">0{i + 1}</span>
                  <span className="leading-relaxed text-muted">{item}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div aria-hidden className="bg-grid absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="absolute top-[-20%] left-1/2 -z-10 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--accent-soft),transparent)] blur-2xl"
      />
      <div className="container-page grid items-center gap-12 pt-14 pb-10 sm:pt-20 lg:grid-cols-[1.35fr_1fr] lg:gap-16 lg:pt-28">
        <div>
          <p
            data-animate
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 text-xs text-muted backdrop-blur"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            {profile.availability}
          </p>

          <h1 className="mt-7 display text-[clamp(3.5rem,11vw,7.5rem)]">
            <span className="sr-only">{profile.name}</span>
            {words.map((w, i) => (
              <span
                key={w}
                aria-hidden
                className="mr-[0.22em] inline-block overflow-hidden pb-[0.08em] align-bottom"
              >
                <motion.span
                  className="inline-block"
                  initial={{ y: '105%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </h1>

          <p
            data-animate
            style={stagger(3)}
            className="mt-4 max-w-xl display text-2xl text-muted italic sm:text-3xl"
          >
            {profile.headline}: reliable backends, and the tools teams use to build them.
          </p>
          <p data-animate style={stagger(4)} className="mt-6 max-w-xl leading-relaxed text-muted">
            {profile.intro}
          </p>

          <div data-animate style={stagger(5)} className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="/projects">
              See my work{' '}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
            <ButtonLink href="/academics" variant="ghost">
              <GraduationCap size={16} /> Academic profile
            </ButtonLink>
            <ButtonLink href={profile.cv.resume} variant="quiet">
              <FileText size={16} /> Résumé (PDF)
            </ButtonLink>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          <div className="card relative overflow-hidden p-2">
            <img
              src={asset(profile.photo)}
              alt={`Portrait of ${profile.name}`}
              width={461}
              height={579}
              fetchPriority="high"
              className="aspect-[4/5] w-full rounded-[0.9rem] object-cover object-top grayscale-[15%]"
            />
            <div className="absolute inset-x-2 bottom-2 rounded-b-[0.9rem] bg-gradient-to-t from-black/70 to-transparent p-5 pt-16 text-white">
              <p className="font-mono text-[0.7rem] tracking-wider text-white/70 uppercase">
                Currently
              </p>
              <p className="mt-1 font-medium">Full Stack Developer at AppifyLab</p>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="card absolute -top-4 -right-3 px-4 py-3 shadow-xl shadow-black/10 sm:-right-6"
          >
            <p className="font-mono text-[0.7rem] text-faint">Codeforces</p>
            <p className="text-sm font-semibold">
              Specialist <span className="text-accent">1476</span>
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.95, duration: 0.6 }}
            className="card absolute bottom-20 -left-3 px-4 py-3 shadow-xl shadow-black/10 sm:-left-8"
          >
            <p className="font-mono text-[0.7rem] text-faint">B.Sc. CSE · 2025</p>
            <p className="text-sm font-semibold">
              CGPA <span className="text-accent">{education.cgpa.toFixed(2)}</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Paths() {
  const paths = [
    {
      icon: Briefcase,
      kicker: 'For hiring teams',
      title: 'Engineering track',
      body: 'Production work at AppifyLab, case studies with real trade-offs, and a one-page résumé.',
      links: [
        { href: '/experience', label: 'Experience' },
        { href: '/projects', label: 'Projects' },
        { href: profile.cv.resume, label: 'Résumé PDF' },
      ],
    },
    {
      icon: GraduationCap,
      kicker: 'For admissions & supervisors',
      title: 'Academic track',
      body: 'Degree and CGPA, the questions I want to study, my competitive-programming record, and an academic CV.',
      links: [
        { href: '/academics', label: 'Academic profile' },
        { href: '/academics#interests', label: 'Interests' },
        { href: profile.cv.academic, label: 'Academic CV' },
      ],
    },
  ];
  return (
    <section className="container-page mt-16" aria-label="Choose a track">
      <div className="grid gap-4 md:grid-cols-2">
        {paths.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <div className="spotlight card group h-full p-7 transition-colors hover:border-line-strong sm:p-8">
              <div className="flex items-center justify-between">
                <span className="grid size-11 place-items-center rounded-xl bg-accent-soft text-accent">
                  <p.icon size={20} />
                </span>
                <span className="font-mono text-xs text-faint">{p.kicker}</span>
              </div>
              <h2 className="mt-6 display text-3xl sm:text-4xl">{p.title}</h2>
              <p className="mt-3 leading-relaxed text-muted">{p.body}</p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                {p.links.map((l) => (
                  <SmartLink
                    key={l.href}
                    href={l.href}
                    className="group/link inline-flex items-center gap-1 text-text hover:text-accent"
                  >
                    {l.label}
                    <ArrowUpRight
                      size={14}
                      className="text-faint transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-accent"
                    />
                  </SmartLink>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
