import { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { archive, projectCategories, projects, type ProjectCategory } from '../data/projects';
import { ProjectCard } from '../components/ProjectCard';
import { PageHero, SectionHeading } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import { cn } from '../lib/utils';

type Filter = 'All' | ProjectCategory;

export function Projects() {
  const [filter, setFilter] = useState<Filter>('All');
  const filters: Filter[] = [
    'All',
    ...projectCategories.filter((c) => projects.some((p) => p.categories.includes(c))),
  ];
  const shown = projects.filter((p) => filter === 'All' || p.categories.includes(filter));

  return (
    <>
      <PageHero label="Projects" title="My" italic="projects">
        <p>
          {' '}
          Each of my main projects has its own page that explains why I built it and how it works.
          Smaller practice projects are listed at the end of this page.
        </p>
      </PageHero>

      <section className="container-page">
        <LayoutGroup>
          <div role="tablist" aria-label="Filter projects" className="mb-8 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  'relative isolate rounded-full border px-3.5 py-1.5 text-sm transition-colors',
                  filter === f
                    ? 'border-transparent text-bg'
                    : 'border-line text-muted hover:text-text'
                )}
              >
                {filter === f && (
                  <motion.span
                    layoutId="project-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-text"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                {f}
              </button>
            ))}
          </div>

          <motion.div layout className="grid gap-x-6 gap-y-10 pt-3 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {shown.map((p, i) => (
                <motion.div
                  layout
                  key={p.slug}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                >
                  <Reveal delay={Math.min(i, 3) * 0.06} className="h-full">
                    <ProjectCard project={p} />
                  </Reveal>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </section>

      <section className="container-page mt-32">
        <SectionHeading
          label="Archive"
          title="Other"
          italic="repositories"
          description="Practice projects and experiments, mostly from when I was learning .NET and React."
        />
        <Reveal>
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line font-mono text-xs text-faint">
              <tr>
                <th className="py-3 pr-4 font-normal">Year</th>
                <th className="py-3 pr-4 font-normal">Project</th>
                <th className="hidden py-3 pr-4 font-normal md:table-cell">Description</th>
                <th className="hidden py-3 pr-4 font-normal sm:table-cell">Built with</th>
                <th className="py-3 font-normal">
                  <span className="sr-only">Link</span>
                </th>
              </tr>
            </thead>
            <tbody className="dim-siblings">
              {archive.map((a) => (
                <tr key={a.href} className="group border-b border-line">
                  <td className="py-4 pr-4 align-top font-mono text-xs text-faint">{a.year}</td>
                  <td className="py-4 pr-4 align-top font-medium">{a.name}</td>
                  <td className="hidden py-4 pr-4 align-top text-muted md:table-cell">{a.note}</td>
                  <td className="hidden py-4 pr-4 align-top font-mono text-xs text-muted sm:table-cell">
                    {a.stack}
                  </td>
                  <td className="py-4 text-right align-top">
                    <a
                      href={a.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${a.name} on GitHub`}
                      className="inline-grid size-8 place-items-center rounded-full text-faint transition-colors hover:bg-surface-2 hover:text-accent"
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>
      </section>
    </>
  );
}
