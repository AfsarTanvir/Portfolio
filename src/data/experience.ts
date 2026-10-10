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
    period: 'Sep 2025 to now',
    location: 'Bangladesh',
    summary:
      'I work on EzyCommunity, a platform where agencies run lots of separate online communities. Most of my time goes into the AdonisJS API, and I work on the Next.js app as well. I’ve pushed over 550 commits since February 2026.',
    highlights: [
      'Built the moderation flow: a new moderator permission, review queues for new posts and for edits, soft deletes, and queries that always stay inside the right community.',
      'Reworked the live feed. New posts now wait behind a “new posts” button instead of jumping into the page, and infinite scroll no longer shifts around.',
      'Added cursor pagination to comments and cleaned up how the Redis channel cache gets invalidated.',
      'Built the settings screens for the website builder (fonts, colours, custom CSS and JS) and helped with Stripe checkout for paid channels.',
    ],
    stack: ['AdonisJS', 'TypeScript', 'Next.js', 'React', 'MySQL', 'MongoDB', 'Redis', 'Stripe'],
    links: [{ label: 'EzyCommunity', href: 'https://www.ezycommunity.com/' }],
  },
  {
    role: '.NET Developer Trainee',
    org: 'Learnathon by Geeky Solutions',
    period: 'Dec 2024 to Apr 2025',
    summary:
      'A mentored program where small teams build a real project. Three of us, team “Brainstormers”, built TaskForge.NET together.',
    highlights: [
      'A task manager in ASP.NET Core MVC, organised with Clean Architecture and SOLID.',
      'You can create tasks, assign them, and move them through To Do, In Progress and Done.',
      'SQL Server with Entity Framework Core for the data.',
      'Every change went through a pull request and a review.',
    ],
    stack: ['C#', 'ASP.NET Core MVC', 'EF Core', 'SQL Server'],
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

export type JourneyTag = 'Work' | 'Projects' | 'University' | 'Contests' | 'Club';

export const journey: { date: string; title: string; detail: string; tag: JourneyTag }[] = [
  {
    date: 'Oct 2026',
    title: 'Started local-scheduler',
    detail: 'A job scheduler in Go. One binary, SQLite inside, and it survives crashes.',
    tag: 'Projects',
  },
  {
    date: 'May 2026',
    title: 'Started MockFlow',
    detail: 'Planned as a 30-day project. It kept going.',
    tag: 'Projects',
  },
  {
    date: 'Sep 2025',
    title: 'Joined AppifyLab',
    detail: 'Full-stack developer on EzyCommunity.',
    tag: 'Work',
  },
  {
    date: 'Jul 2025',
    title: 'Finished my degree',
    detail: 'B.Sc. in CSE from Sylhet Engineering College, CGPA 3.68 out of 4.',
    tag: 'University',
  },
  {
    date: 'Jun 2025',
    title: 'Built a next-word predictor',
    detail: 'My first real NLP project, an LSTM in Keras.',
    tag: 'Projects',
  },
  {
    date: '2025',
    title: '89th at DUET IUPC',
    detail: 'Inter-university programming contest.',
    tag: 'Contests',
  },
  {
    date: 'Dec 2024',
    title: 'Learnathon',
    detail: 'Built a .NET project in a team of three, with mentors reviewing our work.',
    tag: 'Work',
  },
  {
    date: 'Nov 2024',
    title: 'Became a Specialist on Codeforces',
    detail: 'Rating 1476, two years after dropping to 632.',
    tag: 'Contests',
  },
  {
    date: '2024 to 2025',
    title: 'Club coordinator',
    detail:
      'Coordinated the SEC Programming Club: selection contests, warm-up sessions and team registrations.',
    tag: 'Club',
  },
  {
    date: '2024',
    title: '14th at MU IUPC',
    detail: 'Sylhet Division round.',
    tag: 'Contests',
  },
  {
    date: 'Mar 2024',
    title: '97th at NCPC 2023',
    detail:
      'The national collegiate programming contest, held at Jahangirnagar University. The 2023 contest ran late because of COVID.',
    tag: 'Contests',
  },
  {
    date: 'Feb 2020',
    title: 'Made a Codeforces account',
    detail: 'A few weeks after starting university.',
    tag: 'Contests',
  },
  {
    date: 'Jan 2020',
    title: 'Started university',
    detail: 'Computer Science & Engineering at Sylhet Engineering College.',
    tag: 'University',
  },
];
