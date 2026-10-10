import { useRef } from 'react';
import { Link } from 'react-router';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { now, profile, stats } from '../data/profile';
import { experience } from '../data/experience';
import { projects } from '../data/projects';
import { leadership } from '../data/academics';
import { ProjectCard } from '../components/ProjectCard';
import { Counter } from '../components/ui/Counter';
import { Reveal } from '../components/ui/Reveal';
import { SectionHeading } from '../components/ui/Section';
import { ButtonLink, SmartLink } from '../components/ui/SmartLink';
import { Underline } from '../components/ui/HandDrawn';
import { Magnetic } from '../components/ui/Pointer';
import { asset, stagger } from '../lib/utils';

export function Home() {
  const featured = projects.filter((p) => p.featured);
  const club = leadership[0]!;

  return (
    <>
      <Hero />
      <Paths />

      {/* Numbers */}
      <section className="container-page mt-24" aria-label="A few numbers">
        <dl className="grid grid-cols-2 gap-y-8 border-y border-line py-8 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.06}
              className="border-line pr-4 lg:border-l lg:pl-6 lg:first:border-l-0 lg:first:pl-0"
            >
              <dt className="sr-only">{s.label}</dt>
              <dd className="display text-5xl sm:text-6xl">
                <Counter
                  value={s.value}
                  suffix={s.suffix}
                  decimals={'decimals' in s ? s.decimals : 0}
                />
              </dd>
              <p className="mt-2 text-sm text-text">{s.label}</p>
              <p className="font-mono text-xs text-faint">{s.note}</p>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* Projects */}
      <section className="container-page mt-32">
        <SectionHeading
          index="01"
          label="Projects"
          title="Selected"
          italic="projects"
          description="Most of these are tools for developers. Each project has its own page that explains how it works and why I built it that way."
          action={
            <ButtonLink href="/projects" variant="ghost">
              All projects
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
          }
        />
        <div className="grid gap-6 pt-3 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08} className="h-full">
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Work */}
      <section className="container-page mt-32 grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <SectionHeading
          className="lg:sticky lg:top-28 lg:self-start"
          index="02"
          label="Experience"
          title="Work"
          italic="experience"
          description="My work experience and my role in the university programming club."
        />
        <ol className="dim-siblings flex flex-col border-t border-line">
          {experience.map((e) => (
            <Reveal as="li" key={e.org} className="border-b border-line">
              <Link to="/experience" className="group block py-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {e.role} <span className="font-normal text-muted">at {e.org}</span>
                  </h3>
                  <span className="font-mono text-xs text-faint">{e.period}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{e.summary}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm text-text group-hover:text-accent">
                  View details
                  <ArrowRight
                    size={14}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </Reveal>
          ))}
          <Reveal as="li" className="border-b border-line">
            <Link to="/academics" className="group block py-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold tracking-tight">
                  {club.role} <span className="font-normal text-muted">of the {club.org}</span>
                </h3>
                <span className="font-mono text-xs text-faint">{club.period}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{club.detail}</p>
            </Link>
          </Reveal>
        </ol>
      </section>

      {/* Now */}
      <section className="container-page mt-32">
        <div className="grid gap-10 border-t border-line pt-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <SectionHeading
              index="03"
              label="Now"
              title="What I am"
              italic="working on"
              className="mb-0"
            />
            <Reveal delay={0.2}>
              <p className="hand mt-4 -rotate-2 text-xl">Last updated: {now.updated}</p>
            </Reveal>
          </div>
          <ul className="flex flex-col">
            {now.items.map((item, i) => (
              <Reveal
                as="li"
                key={item.label}
                delay={i * 0.05}
                className="grid grid-cols-[7rem_1fr] gap-4 border-b border-line py-4 first:pt-0"
              >
                <span className="font-mono text-xs leading-7 text-faint">{item.label}</span>
                <span className="leading-relaxed text-text">{item.text}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const photoRotate = useTransform(scrollYProgress, [0, 1], [-3, 1]);

  return (
    <section
      ref={ref}
      className="container-page grid items-center gap-14 pt-14 pb-10 sm:pt-20 lg:grid-cols-[1.4fr_1fr] lg:gap-10 lg:pt-24"
    >
      <div>
        <p data-animate className="font-mono text-xs text-faint">
          {profile.status}
        </p>

        <h1 className="mt-6 display text-[clamp(3.6rem,11vw,7.8rem)]">
          <span className="sr-only">{profile.name}</span>
          <Letters text={profile.name} />
        </h1>

        <p
          data-animate
          style={stagger(3)}
          className="mt-6 max-w-xl text-xl leading-snug sm:text-2xl"
        >
          I am a software engineer who works mainly on{' '}
          <Underline delay={1.1}>backend systems</Underline>. In my free time, I build tools for
          other developers.
        </p>
        <p data-animate style={stagger(4)} className="mt-5 max-w-xl leading-relaxed text-muted">
          I currently work at AppifyLab, where I help build EzyCommunity, a platform that agencies
          use to run their online communities. I studied Computer Science and Engineering at Sylhet
          Engineering College (SEC), where I was also active in competitive programming.
        </p>

        <div
          data-animate
          style={stagger(5)}
          className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-3"
        >
          <Magnetic>
            <ButtonLink href="/projects">
              View projects
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </ButtonLink>
          </Magnetic>
          <ButtonLink href="/academics" variant="ghost">
            Academic background
          </ButtonLink>
          <ButtonLink href={profile.cv.resume} variant="quiet">
            CV (PDF) <ArrowUpRight size={15} />
          </ButtonLink>
        </div>
      </div>

      <motion.figure
        style={{ y: photoY, rotate: photoRotate }}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto w-full max-w-[16rem] sm:max-w-[18rem] lg:mr-6 lg:max-w-[19rem]"
      >
        <motion.div
          whileHover={{ rotate: 3, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 220, damping: 18 }}
          className="relative bg-surface p-3 pb-14 shadow-[var(--shadow)] ring-1 ring-line"
        >
          <img
            src={asset(profile.photo)}
            alt={`Portrait of ${profile.name}`}
            width={461}
            height={579}
            fetchPriority="high"
            className="aspect-[5/6] w-full object-cover object-top"
          />
          <p className="hand absolute inset-x-0 bottom-3 text-center text-2xl">
            Moulvibazar, Bangladesh
          </p>
        </motion.div>
      </motion.figure>
    </section>
  );
}

/** Name revealed letter by letter, each rising out of a mask. */
function Letters({ text }: { text: string }) {
  let n = 0;
  return (
    <span aria-hidden>
      {text.split(' ').map((word, w) => (
        <span key={w} className="mr-[0.2em] inline-block overflow-hidden pb-[0.1em] align-bottom">
          {word.split('').map((ch) => (
            <motion.span
              key={n}
              className={w === 1 ? 'inline-block italic' : 'inline-block'}
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 + n++ * 0.035, ease: [0.22, 1, 0.36, 1] }}
            >
              {ch}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  );
}

function Paths() {
  const paths = [
    {
      kicker: 'Work',
      title: 'Professional work',
      body: 'My experience at AppifyLab, the projects I have built and my one-page CV.',
      links: [
        { href: '/experience', label: 'Experience' },
        { href: '/projects', label: 'Projects' },
        { href: profile.cv.resume, label: 'CV' },
      ],
    },
    {
      kicker: 'Study',
      title: 'Academic background',
      body: 'My degree and grades, research interests, competitive programming record and academic CV.',
      links: [
        { href: '/academics', label: 'Academics' },
        { href: '/academics#interests', label: 'Research interests' },
        { href: profile.cv.academic, label: 'Academic CV' },
      ],
    },
  ];

  return (
    <section className="container-page mt-20" aria-label="Where to start">
      <div className="grid gap-5 md:grid-cols-2">
        {paths.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <div className="card h-full p-7 transition-colors hover:border-line-strong sm:p-8">
              <p className="eyebrow">{p.kicker}</p>
              <h2 className="mt-3 display text-3xl sm:text-4xl">{p.title}</h2>
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
                      className="text-faint transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 group-hover/link:text-accent"
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
