import { projects } from './projects.ts';

export type RouteMeta = { path: string; title: string; description: string };

export const homeDescription =
  'Software engineer at AppifyLab in Bangladesh, working mainly on backend systems and developer tools. Codeforces Specialist with a B.Sc. in Computer Science and Engineering.';

const pages: RouteMeta[] = [
  { path: '', title: 'Afsar Tanvir · Software engineer', description: homeDescription },
  {
    path: 'about',
    title: 'About · Afsar Tanvir',
    description: 'My background, how I work, and a timeline of my studies, work and contests.',
  },
  {
    path: 'experience',
    title: 'Experience · Afsar Tanvir',
    description:
      'My work at AppifyLab and in the Learnathon programme, along with my technical skills and CV.',
  },
  {
    path: 'projects',
    title: 'Projects · Afsar Tanvir',
    description:
      'MockFlow, local-scheduler, Audio Visualizer and other projects, with notes on how each one works.',
  },
  {
    path: 'academics',
    title: 'Academics · Afsar Tanvir',
    description: 'My degree, research interests, competitive programming record and academic CV.',
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
