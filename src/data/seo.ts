import { projects } from './projects.ts';

export type RouteMeta = { path: string; title: string; description: string };

const pages: RouteMeta[] = [
  {
    path: '',
    title: 'Afsar Tanvir · Software Engineer',
    description:
      'Backend-focused full-stack engineer at AppifyLab and builder of developer tools. Codeforces Specialist with interests in distributed and data-intensive systems.',
  },
  {
    path: 'about',
    title: 'About · Afsar Tanvir',
    description:
      'From competitive programming to production systems: my story, how I work, and my journey so far.',
  },
  {
    path: 'experience',
    title: 'Experience · Afsar Tanvir',
    description:
      'Full Stack Developer at AppifyLab (EzyCommunity) and Learnathon .NET trainee. Skills and résumé.',
  },
  {
    path: 'projects',
    title: 'Projects · Afsar Tanvir',
    description:
      'MockFlow, local-scheduler, Audio Visualizer and more: case studies with the engineering decisions behind them.',
  },
  {
    path: 'academics',
    title: 'Academics · Afsar Tanvir',
    description:
      'B.Sc. CSE (CGPA 3.68), academic interests in distributed and data-intensive systems, competitive programming record, and academic CV.',
  },
  {
    path: 'contact',
    title: 'Contact · Afsar Tanvir',
    description:
      'Get in touch about engineering, developer tools, collaboration or graduate research.',
  },
];

export const routeMeta: RouteMeta[] = [
  ...pages,
  ...projects.map((p) => ({
    path: `projects/${p.slug}`,
    title: `${p.name} · Afsar Tanvir`,
    description: p.tagline,
  })),
];

/** Title for client-side navigation, so the tab title follows the route. */
export function titleFor(pathname: string) {
  const key = pathname.replace(/^\/+|\/+$/g, '');
  return routeMeta.find((r) => r.path === key)?.title ?? 'Afsar Tanvir';
}
