export type Experience = {
  role: string;
  org: string;
  orgUrl?: string;
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
  stack: string[];
  links?: { label: string; href: string }[];
};

export const experience: Experience[] = [
  {
    role: 'Full Stack Developer',
    org: 'AppifyLab',
    orgUrl: 'https://www.appifylab.com/',
    period: 'Sep 2025 — Present',
    location: 'Bangladesh',
    summary:
      'Building EzyCommunity, a multi-agency, multi-tenant platform where agencies run many independent communities. I work across the community API (AdonisJS) and the Next.js app, and have shipped 550+ commits since February 2026.',
    highlights: [
      'Implemented a content-moderation workflow around a new moderator permission in the RBAC system: pending-post and pending-edit review queues, soft deletes, and community-scoped queries that close cross-tenant data leaks.',
      'Reworked the live home and channel feeds: a "new posts" pill that never inserts posts unasked, plus infinite-scroll fixes that removed layout shift and per-render row rebuilds.',
      'Added cursor pagination to comments and fixed Redis channel-cache invalidation bugs that served stale data.',
      'Built the website-builder settings area (fonts, colour variables, custom CSS and JS screens) and contributed to Stripe-backed checkout for paid channels.',
    ],
    stack: ['AdonisJS', 'TypeScript', 'Next.js', 'React', 'MySQL', 'MongoDB', 'Redis', 'Stripe'],
    links: [{ label: 'EzyCommunity', href: 'https://www.ezycommunity.com/' }],
  },
  {
    role: '.NET Developer Trainee',
    org: 'Learnathon by Geeky Solutions',
    period: 'Dec 2024 — Apr 2025',
    summary:
      'Selected for an intensive, mentored program. Our team of three ("Brainstormers") built TaskForge.NET with professional review practices.',
    highlights: [
      'Built a task-management system in ASP.NET Core MVC following Clean Architecture and SOLID: task CRUD, user assignment and status tracking.',
      'Modelled persistence with Entity Framework Core on SQL Server.',
      'Worked through pull requests and code review with two teammates and mentors.',
    ],
    stack: ['C#', 'ASP.NET Core MVC', 'EF Core', 'SQL Server', 'Clean Architecture'],
    links: [
      {
        label: 'TaskForge.NET',
        href: 'https://github.com/Learnathon-By-Geeky-Solutions/brainstormers/tree/development/TaskForge.NET',
      },
      {
        label: 'Certificate',
        href: 'https://www.linkedin.com/feed/update/urn:li:activity:7336042619552047105/',
      },
    ],
  },
];

export type JourneyTag =
  'Industry' | 'Academic' | 'Competitive programming' | 'Leadership' | 'Building';

export const journey: { date: string; title: string; detail: string; tag: JourneyTag }[] = [
  {
    date: 'Oct 2026',
    title: 'Started local-scheduler',
    detail: 'A self-hosted job scheduler in Go: one binary, embedded SQLite, crash recovery.',
    tag: 'Building',
  },
  {
    date: 'May 2026',
    title: 'Started MockFlow',
    detail:
      'A collaborative API mock server that grew from a 30-day MVP into a multi-team product.',
    tag: 'Building',
  },
  {
    date: 'Sep 2025',
    title: 'Joined AppifyLab',
    detail: 'Full Stack Developer on EzyCommunity, a multi-tenant community platform.',
    tag: 'Industry',
  },
  {
    date: 'Jul 2025',
    title: 'Graduated in Computer Science & Engineering',
    detail: 'B.Sc. CSE from Sylhet Engineering College, CGPA 3.68 / 4.00.',
    tag: 'Academic',
  },
  {
    date: 'Jun 2025',
    title: 'Next Word Predictor',
    detail: 'An LSTM language model trained on custom and public text corpora.',
    tag: 'Building',
  },
  {
    date: '2025',
    title: 'DUET IUPC 2025: ranked 89th',
    detail: 'Inter-university programming contest.',
    tag: 'Competitive programming',
  },
  {
    date: 'Dec 2024',
    title: 'Learnathon .NET track',
    detail: 'Mentored ASP.NET Core development in a team of three.',
    tag: 'Industry',
  },
  {
    date: 'Nov 2024',
    title: 'Reached 1476 on Codeforces',
    detail: 'Specialist, after climbing back from 632 two years earlier.',
    tag: 'Competitive programming',
  },
  {
    date: '2024 — 2025',
    title: 'Coordinator, SEC Programming Club',
    detail:
      'Ran selection contests and warm-up sessions, and managed team registration for inter-university contests.',
    tag: 'Leadership',
  },
  {
    date: '2024',
    title: 'MU IUPC 2024: ranked 14th',
    detail: 'Inter-university contest, Sylhet Division.',
    tag: 'Competitive programming',
  },
  {
    date: 'Jan 2020',
    title: 'Started B.Sc. in CSE',
    detail: 'Sylhet Engineering College.',
    tag: 'Academic',
  },
];
