import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../data/projects';
import { ProjectVisual } from './ProjectVisual';
import { Tag } from './ui/Section';

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to={`/projects/${project.slug}`}
      className="spotlight card group flex h-full flex-col overflow-hidden p-3 transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-line-strong"
    >
      <ProjectVisual kind={project.visual} className="aspect-[16/11]" />
      <div className="flex flex-1 flex-col p-3 pt-5">
        <div className="flex items-center justify-between gap-3">
          <p className="font-mono text-xs text-faint">{project.period}</p>
          {project.status === 'In progress' && (
            <span className="inline-flex items-center gap-1.5 font-mono text-[0.7rem] text-accent">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
              </span>
              Active
            </span>
          )}
        </div>
        <h3 className="mt-2 flex items-center gap-2 text-xl font-semibold tracking-tight">
          {project.name}
          <ArrowUpRight
            size={18}
            className="text-faint transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
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
  );
}
