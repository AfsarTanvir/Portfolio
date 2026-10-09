import { projects } from './projects.ts';

export type RouteMeta = { path: string; title: string; description: string };

export const homeDescription =
  'Software engineer at AppifyLab in Bangladesh. I work mostly on the backend, build small tools for developers, and spent university doing competitive programming.';

const pages: RouteMeta[] = [
  { path: '', title: 'Afsar Tanvir · Software engineer', description: homeDescription },
  {
    path: 'about',
    title: 'About · Afsar Tanvir',
    description:
      'How I got into programming, how I like to work, and a timeline of the last few years.',
  },
  {
    path: 'experience',
    title: 'Experience · Afsar Tanvir',
    description:
      'My work at AppifyLab and in the Learnathon .NET program, my skills, and my résumé.',
  },
  {
    path: 'projects',
    title: 'Projects · Afsar Tanvir',
    description:
      'MockFlow, local-scheduler, Audio Visualizer and other things I’ve built, with notes on how they work.',
  },
  {
    path: 'academics',
    title: 'Academics · Afsar Tanvir',
    description:
      'My degree, what I want to study next, my competitive programming record, and my academic CV.',
  },
  {
    path: 'contact',
    title: 'Contact · Afsar Tanvir',
    description: 'How to get in touch with me.',
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
