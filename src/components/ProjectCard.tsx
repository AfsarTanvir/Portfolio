import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../data/projects';
import { ProjectVisual } from './ProjectVisual';
import { Tag } from './ui/Section';
import { Tilt } from './ui/Pointer';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Tilt className="h-full">
      <Link
        to={`/projects/${project.slug}`}
        className="card group relative flex h-full flex-col p-3 shadow-[var(--shadow)] transition-colors duration-300 hover:border-line-strong"
      >
        {project.note && (
          <span className="hand absolute -top-4 right-5 z-10 rotate-3 rounded bg-bg px-1.5 text-xl">
            {project.note}
          </span>
        )}
        <div className="overflow-hidden rounded-lg">
          <ProjectVisual
            kind={project.visual}
            className="aspect-[16/11] rounded-lg transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 flex-col p-3 pt-5">
          <div className="flex items-center justify-between gap-3 font-mono text-xs text-faint">
            <span>{project.period}</span>
            {project.status === 'In progress' && <span>still working on it</span>}
          </div>
          <h3 className="mt-2 flex items-center gap-2 text-xl font-semibold tracking-tight">
            {project.name}
            <ArrowUpRight
              size={18}
              className="text-faint transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
            />
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{project.tagline}</p>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
            {project.stack.slice(0, 4).map((s) => (
              <Tag key={s}>{s}</Tag>
            ))}
          </div>
        </div>
      </Link>
    </Tilt>
  );
}
