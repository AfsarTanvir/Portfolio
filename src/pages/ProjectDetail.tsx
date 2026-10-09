import type { ReactNode } from 'react';
import { Link, useParams } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react';
import { projects, type Project } from '../data/projects';
import { ProjectVisual } from '../components/ProjectVisual';
import { Reveal } from '../components/ui/Reveal';
import { RevealText } from '../components/ui/RevealText';
import { Tag } from '../components/ui/Section';
import { GitHubIcon } from '../components/ui/Icons';
import { stagger } from '../lib/utils';
import { NotFound } from './NotFound';

export function ProjectDetail() {
  const { slug } = useParams();
  const index = projects.findIndex((p) => p.slug === slug);
  const project = projects[index];
  if (!project) return <NotFound />;

  const prev = projects[(index - 1 + projects.length) % projects.length]!;
  const next = projects[(index + 1) % projects.length]!;

  return (
    <article>
      <header className="container-page pt-10 sm:pt-14">
        <Link
          to="/projects"
          data-animate
          className="group inline-flex items-center gap-2 text-sm text-muted hover:text-text"
        >
          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" /> All
          projects
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p data-animate style={stagger(1)} className="eyebrow">
              {project.categories.join(' · ')}
            </p>
            <RevealText
              as="h1"
              trigger="mount"
              delay={0.15}
              text={project.name}
              className="mt-4 display text-6xl sm:text-8xl"
            />
            <p
              data-animate
              style={stagger(3)}
              className="mt-5 max-w-xl display text-2xl text-muted italic sm:text-3xl"
            >
              {project.tagline}
            </p>
          </div>
          <dl data-animate style={stagger(4)} className="grid grid-cols-2 gap-x-6 gap-y-5 text-sm">
            <Meta label="When" value={project.period} />
            <Meta
              label="Status"
              value={project.status === 'In progress' ? 'Still working on it' : 'Done'}
            />
            <Meta label="Who" value={project.role} wide />
            <div className="col-span-2 flex flex-wrap gap-2 pt-1">
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm hover:border-accent hover:text-accent"
                >
                  <GitHubIcon size={15} /> Source
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-text px-4 py-2 text-sm font-medium text-bg hover:bg-accent hover:text-accent-ink"
                >
                  <ExternalLink size={15} /> Live demo
                </a>
              )}
              {project.extraLinks?.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm hover:border-accent hover:text-accent"
                >
                  {l.label} <ArrowUpRight size={14} />
                </a>
              ))}
            </div>
          </dl>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14"
        >
          <ProjectVisual kind={project.visual} className="aspect-[16/9] sm:aspect-[21/9]" />
        </motion.div>
      </header>

      {project.metrics && (
        <section className="container-page mt-10">
          <dl className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3">
            {project.metrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.06} className="bg-bg p-6">
                <dt className="sr-only">{m.label}</dt>
                <dd className="display text-4xl sm:text-5xl">{m.value}</dd>
                <p className="mt-2 text-sm text-muted">{m.label}</p>
              </Reveal>
            ))}
          </dl>
        </section>
      )}

      <div className="container-page mt-24 grid gap-16 lg:grid-cols-[14rem_1fr] lg:gap-20">
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <p className="eyebrow">Built with</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <Tag key={s}>{s}</Tag>
              ))}
            </div>
          </div>
        </aside>

        <div className="min-w-0 space-y-20">
          <Block title="Why I built it">
            <p className="max-w-2xl text-lg leading-relaxed text-muted">{project.problem}</p>
          </Block>

          {project.flow && (
            <Block title="How it works">
              <Flow steps={project.flow} />
            </Block>
          )}

          <Block title="What it does">
            <ol className="max-w-2xl space-y-5">
              {project.highlights.map((h, i) => (
                <Reveal as="li" key={h} delay={i * 0.04} className="flex gap-5">
                  <span className="font-mono text-xs leading-7 text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <p className="leading-relaxed text-muted">{h}</p>
                </Reveal>
              ))}
            </ol>
          </Block>

          {project.decisions && (
            <Block title="A few decisions">
              <div className="grid gap-4 md:grid-cols-2">
                {project.decisions.map((d, i) => (
                  <Reveal key={d.title} delay={i * 0.06}>
                    <div className="card h-full p-6">
                      <h3 className="font-semibold tracking-tight">{d.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{d.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Block>
          )}

          <div className="lg:hidden">
            <Block title="Built with">
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </Block>
          </div>
        </div>
      </div>

      <nav aria-label="More projects" className="container-page mt-32 grid gap-4 sm:grid-cols-2">
        <PagerLink project={prev} direction="prev" />
        <PagerLink project={next} direction="next" />
      </nav>
    </article>
  );
}

function Meta({ label, value, wide }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={wide ? 'col-span-2' : undefined}>
      <dt className="eyebrow">{label}</dt>
      <dd className="mt-1 text-text">{value}</dd>
    </div>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <RevealText text={title} className="mb-6 display text-3xl sm:text-4xl" />
      {children}
    </section>
  );
}

function Flow({ steps }: { steps: { label: string; detail: string }[] }) {
  return (
    <ol className="grid gap-3 md:grid-cols-5 md:gap-0">
      {steps.map((s, i) => (
        <Reveal as="li" key={s.label} delay={i * 0.1} className="relative flex md:flex-col">
          <div className="card relative z-10 flex-1 p-4 md:mr-6">
            <p className="font-mono text-[0.7rem] text-accent">{String(i + 1).padStart(2, '0')}</p>
            <p className="mt-1 font-semibold tracking-tight">{s.label}</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">{s.detail}</p>
          </div>
          {i < steps.length - 1 && (
            <span
              aria-hidden
              className="absolute top-1/2 right-0 hidden h-px w-6 overflow-hidden bg-line md:block"
            >
              <motion.span
                className="absolute inset-y-0 w-3 bg-accent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
              />
            </span>
          )}
        </Reveal>
      ))}
    </ol>
  );
}

function PagerLink({ project, direction }: { project: Project; direction: 'prev' | 'next' }) {
  const Icon = direction === 'prev' ? ArrowLeft : ArrowRight;
  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`card group flex flex-col gap-2 p-6 transition-colors hover:border-line-strong ${direction === 'next' ? 'sm:items-end sm:text-right' : ''}`}
    >
      <span className="inline-flex items-center gap-2 font-mono text-xs text-faint">
        {direction === 'prev' && (
          <Icon size={14} className="transition-transform group-hover:-translate-x-0.5" />
        )}
        {direction === 'prev' ? 'Previous' : 'Next'}
        {direction === 'next' && (
          <Icon size={14} className="transition-transform group-hover:translate-x-0.5" />
        )}
      </span>
      <span className="display text-3xl group-hover:text-accent">{project.name}</span>
      <span className="text-sm text-muted">{project.tagline}</span>
    </Link>
  );
}
