export type Experience = {
  role: string;
  org: string;
  orgUrl?: string;
  /** Square logo in /public (shown on a white tile). */
  logo?: string;
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
  stack: string[];
  links?: { label: string; href: string; logo?: string }[];
};

export const experience: Experience[] = [
  {
    role: 'Full Stack Developer',
    org: 'AppifyLab',
    orgUrl: 'https://www.appifylab.com/',
    logo: 'images/logos/appifylab.webp',
    period: 'Sep 2025 – present',
    location: 'Bangladesh',
    summary:
      'I work on EzyCommunity, a platform where agencies manage many separate online communities. Most of my work is on the AdonisJS API, and I also contribute to the Next.js frontend. I have made more than 550 commits to the codebase.',
    highlights: [
      'Built the content moderation flow, including a new moderator permission, review queues for new posts and edits, soft deletion, and queries scoped to each community.',
      'Changed the live feed so that new posts appear only when the user clicks a “New posts” button, and fixed layout shifts during infinite scrolling.',
      'Added cursor-based pagination for comments and improved how the Redis channel cache is invalidated.',
      'Built the settings pages for the website builder (fonts, colours, custom CSS and JavaScript) and contributed to the Stripe checkout for paid channels.',
    ],
    stack: ['AdonisJS', 'TypeScript', 'Next.js', 'React', 'MySQL', 'MongoDB', 'Redis', 'Stripe'],
    links: [
      {
        label: 'EzyCommunity',
        href: 'https://www.ezycommunity.com/',
        logo: 'images/logos/ezycommunity.webp',
      },
    ],
  },
  {
    role: '.NET Developer Trainee',
    org: 'Learnathon by Geeky Solutions',
    orgUrl: 'https://learnathon.geeky.solutions/',
    logo: 'images/logos/learnathon.webp',
    period: 'Dec 2024 – Apr 2025',
    summary:
      'Learnathon is a mentored training programme in which small teams build a complete project. Our team of three, “Brainstormers”, built TaskForge.NET.',
    highlights: [
      'Built a task management application with two teammates, using ASP.NET Core MVC, Clean Architecture and SOLID principles.',
      'Implemented task creation, editing, assignment and deletion, with statuses for To Do, In Progress and Done.',
      'Used SQL Server with Entity Framework Core for data storage.',
      'Submitted every change through a pull request and a code review.',
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
    detail: 'A job scheduler written in Go, with built-in SQLite storage and crash recovery.',
    tag: 'Projects',
  },
  {
    date: 'May 2026',
    title: 'Started MockFlow',
    detail:
      'A mock API server for frontend developers. I planned it as a 30-day project, but it grew much larger.',
    tag: 'Projects',
  },
  {
    date: 'Sep 2025',
    title: 'Joined AppifyLab',
    detail: 'Started working as a full-stack developer on EzyCommunity.',
    tag: 'Work',
  },
  {
    date: 'Jul 2025',
    title: 'Completed my degree',
    detail: 'B.Sc. in CSE from Sylhet Engineering College, with a CGPA of 3.68 out of 4.00.',
    tag: 'University',
  },
  {
    date: 'Jun 2025',
    title: 'Built a next-word predictor',
    detail: 'My first natural language processing (NLP) project: an LSTM model using Keras.',
    tag: 'Projects',
  },
  {
    date: '2025',
    title: '89th at DUET IUPC',
    detail:
      'An inter-university programming contest hosted by Dhaka University of Engineering & Technology (DUET).',
    tag: 'Contests',
  },
  {
    date: 'Dec 2024',
    title: 'Joined Learnathon',
    detail: 'Built a .NET project in a team of three, with mentors reviewing our work.',
    tag: 'Work',
  },
  {
    date: 'Nov 2024',
    title: 'Reached Specialist on Codeforces',
    detail: 'My rating rose to 1476, two years after it had dropped to 632.',
    tag: 'Contests',
  },
  {
    date: '2024 – 2025',
    title: 'Programming club coordinator',
    detail:
      'Organised the SEC Programming Club’s selection contests, warm-up sessions and team registrations.',
    tag: 'Club',
  },
  {
    date: '2024',
    title: '14th at MU IUPC',
    detail: 'An inter-university programming contest for universities in the Sylhet Division.',
    tag: 'Contests',
  },
  {
    date: 'Mar 2024',
    title: '97th at NCPC 2023',
    detail:
      'The National Collegiate Programming Contest at Jahangirnagar University. The 2023 contest took place in March 2024 after delays caused by COVID-19.',
    tag: 'Contests',
  },
  {
    date: 'Feb 2020',
    title: 'Created a Codeforces account',
    detail: 'A few weeks after starting university.',
    tag: 'Contests',
  },
  {
    date: 'Jan 2020',
    title: 'Started university',
    detail: 'B.Sc. in Computer Science and Engineering at Sylhet Engineering College.',
    tag: 'University',
  },
];
