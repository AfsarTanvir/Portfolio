// Project case studies. Each entry becomes a card on /projects and a page at /projects/<slug>.
// Keep this file free of asset imports: vite.config.ts reads it to pre-render routes.

export type ProjectCategory =
  'Backend' | 'Full-stack' | 'Systems' | 'Developer tools' | 'Machine learning' | '.NET';
export type ProjectVisual = 'mockflow' | 'scheduler' | 'audio' | 'taskboard' | 'predictor';

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  period: string;
  role: string;
  status?: 'In progress' | 'Done';
  /** Short handwritten note shown on the card. */
  note?: string;
  categories: ProjectCategory[];
  stack: string[];
  visual: ProjectVisual;
  featured?: boolean;
  repo?: string;
  live?: string;
  extraLinks?: { label: string; href: string }[];
  metrics?: { value: string; label: string }[];
  /** "Why I built it": a short paragraph. */
  problem: string;
  highlights: string[];
  decisions?: { title: string; body: string }[];
  /** Optional request flow, drawn as a diagram on the case-study page. */
  flow?: { label: string; detail: string }[];
};

export const projects: Project[] = [
  {
    slug: 'mockflow',
    name: 'MockFlow',
    tagline: 'A mock API server for when the backend isn’t ready yet.',
    period: 'May 2026 to now',
    role: 'Just me: design, backend, frontend and tests',
    status: 'In progress',
    note: 'biggest one so far',
    categories: ['Full-stack', 'Backend', 'Developer tools'],
    stack: [
      'AdonisJS 6',
      'TypeScript',
      'Next.js',
      'React',
      'PostgreSQL',
      'Redis',
      'Tailwind CSS',
      'Japa',
    ],
    visual: 'mockflow',
    featured: true,
    repo: 'https://github.com/AfsarTanvir/mockflow',
    metrics: [
      { value: '~250', label: 'unit and integration tests' },
      { value: '24', label: 'merged pull requests' },
      { value: '200+', label: 'commits' },
    ],
    problem:
      'Frontend work often gets stuck waiting for an API that doesn’t exist yet. With MockFlow you describe the endpoints, fill them with realistic fake data, and give the frontend a URL it can call today. It started in May 2026 as a 30-day project and kept growing.',
    highlights: [
      'Requests are matched by route, and the most specific route wins, so /users/me beats /users/:id.',
      'Responses can use faker.js templates and path parameters. You can switch between scenarios and add random delays to test slow networks.',
      'Export to OpenAPI 3 or Postman. Import happens in two steps: you see a preview first, then apply it.',
      'Version history. Every restore saves a backup first, in case you restore the wrong version.',
      'Companies, teams and roles (owner, admin, member, viewer), plus an admin console that can log in as any user.',
      'Redis caching on the mock path, with protection against cache stampedes, caching of “not found” results, and randomised expiry times.',
    ],
    decisions: [
      {
        title: 'Thin controllers',
        body: 'Every request goes controller → service → query → model. It’s more files, but I can test the business rules without going through HTTP.',
      },
      {
        title: 'No destructive migration',
        body: 'When projects moved from users to teams, I added a nullable team_id instead of rewriting the table. Every existing mock URL kept working.',
      },
      {
        title: 'A security pass',
        body: 'Rate limits on the public auth routes, a 1 MB request limit, a last-admin check that can’t race, and a password reset that doesn’t reveal whether an account exists.',
      },
      {
        title: 'Docs that match the code',
        body: 'My early plans drifted away from what I actually built, so I rewrote the roadmap from the git history and now only write down what exists.',
      },
    ],
    flow: [
      { label: 'Request', detail: 'GET /users/42 hits the mock URL' },
      { label: 'Match', detail: 'the most specific route wins' },
      { label: 'Scenario', detail: 'pick the active scenario and rules' },
      { label: 'Render', detail: 'fill faker.js templates and params' },
      { label: 'Respond', detail: 'status, headers, optional delay' },
    ],
  },
  {
    slug: 'local-scheduler',
    name: 'local-scheduler',
    tagline: 'A small job scheduler you run yourself and talk to over HTTP.',
    period: 'Oct 2026 to now',
    role: 'Just me',
    status: 'In progress',
    note: 'newest',
    categories: ['Backend', 'Systems', 'Developer tools'],
    stack: ['Go', 'SQLite', 'Docker', 'OpenAPI 3'],
    visual: 'scheduler',
    featured: true,
    repo: 'https://github.com/AfsarTanvir/local-scheduler-',
    metrics: [
      { value: '1', label: 'binary, with SQLite built in' },
      { value: '3', label: 'operating systems' },
      { value: 'kill -9', label: 'is part of the test script' },
    ],
    problem:
      'Cron works, but it lives on one machine and says very little when something fails. I wanted a scheduler that any app could use over plain HTTP, that keeps a history of every run, and that behaves sensibly after a restart or a crash.',
    highlights: [
      'Jobs run on a cron schedule (with time zones) or once at a set time. A job either calls a URL or runs a shell command.',
      'A loop checks for due jobs every second and runs each one in its own goroutine. Every run is saved to SQLite.',
      'If a job is still running when its next turn comes, that turn is skipped. Runs missed while the machine was asleep become one catch-up run.',
      'Ctrl+C gives running jobs 30 seconds to finish. After a hard crash, half-finished runs are marked as failed instead of running twice.',
      'The binary serves its own OpenAPI spec, and every error comes back in the same JSON shape.',
    ],
    decisions: [
      {
        title: 'Write the rules down',
        body: 'Overlaps, catch-up runs and shutdown each have a short note in the repo explaining why they work the way they do.',
      },
      {
        title: 'Test it from the outside',
        body: 'An end-to-end script starts the real binary next to a fake API, then restarts it, times jobs out, kills it with kill -9 and checks memory.',
      },
      {
        title: 'Shell jobs are off by default',
        body: 'They run commands on your machine, so you have to switch them on yourself with ALLOW_SHELL_JOBS=true.',
      },
    ],
    flow: [
      { label: 'API', detail: 'POST /jobs with a schedule or a time' },
      { label: 'Store', detail: 'jobs and run history in SQLite' },
      { label: 'Scheduler', detail: 'every second: what’s due?' },
      { label: 'Runner', detail: 'one goroutine per run, with a timeout' },
      { label: 'Result', detail: 'response or exit code, saved' },
    ],
  },
  {
    slug: 'audio-visualizer',
    name: 'Audio Visualizer',
    tagline: 'Drop in a song and watch the frequencies move.',
    period: 'Mar to May 2026',
    role: 'Just me',
    status: 'Done',
    note: 'try the live demo',
    categories: ['Full-stack'],
    stack: ['AdonisJS 7', 'Next.js 16', 'React 19', 'MongoDB', 'Web Audio API'],
    visual: 'audio',
    featured: true,
    repo: 'https://github.com/AfsarTanvir/Audio-Visualizer',
    live: 'https://audio-visualizer-jet-kappa.vercel.app',
    problem:
      'I wanted to learn the Web Audio API, and I wanted to build the whole thing: upload, storage, streaming and playback, not just a canvas demo.',
    highlights: [
      'Frequency bars and a waveform drawn in real time with the Web Audio API. MP3, WAV and FLAC all work.',
      'An AdonisJS backend for uploading, streaming and deleting files, with upload records in MongoDB.',
      'A Next.js 16 and React 19 front end with drag and drop, playback controls and a list of past uploads.',
    ],
  },
  {
    slug: 'taskforge-net',
    name: 'TaskForge.NET',
    tagline: 'A team task manager we built in ASP.NET Core during Learnathon.',
    period: 'Dec 2024 to Apr 2025',
    role: 'Team of three, with Rejwanul Haque and Enamul Hasan',
    status: 'Done',
    categories: ['Backend', '.NET'],
    stack: ['C#', 'ASP.NET Core MVC', 'EF Core', 'SQL Server'],
    visual: 'taskboard',
    repo: 'https://github.com/Learnathon-By-Geeky-Solutions/brainstormers/tree/development/TaskForge.NET',
    extraLinks: [
      {
        label: 'Certificate',
        href: 'https://www.linkedin.com/feed/update/urn:li:activity:7336042619552047105/',
      },
    ],
    problem:
      'Learnathon was about working the way real teams do: one shared codebase, reviews on every change, and an architecture everyone can follow.',
    highlights: [
      'Create, edit, assign and delete tasks, and move them through To Do, In Progress and Done.',
      'Clean Architecture and SOLID, so the core logic doesn’t depend on the web or database layers.',
      'SQL Server through Entity Framework Core.',
      'Pull requests and code review for every change, with two teammates and our mentors.',
    ],
  },
  {
    slug: 'next-word-predictor',
    name: 'Next Word Predictor',
    tagline: 'Type part of a sentence and it guesses the next word.',
    period: 'Jun 2025',
    role: 'Just me',
    status: 'Done',
    categories: ['Machine learning'],
    stack: ['Python', 'TensorFlow / Keras', 'LSTM', 'Flask', 'Tailwind CSS'],
    visual: 'predictor',
    repo: 'https://github.com/AfsarTanvir/Next-Word-Predictor-LSTM',
    problem: 'My first real NLP project, from raw text all the way to a model behind a web page.',
    highlights: [
      'Tokenised the text, built n-gram sequences and padded them for training.',
      'Trained an LSTM in TensorFlow/Keras and measured top-5 accuracy as well as top-1.',
      'Temperature sampling to make the suggestions less repetitive, served with Flask and a simple Tailwind page.',
    ],
  },
];

/** Smaller repositories, shown as a compact table. */
export const archive: { year: string; name: string; note: string; stack: string; href: string }[] =
  [
    {
      year: '2026',
      name: 'Engineering knowledge base',
      note: 'My notes on backend, databases, caching, networking and system design',
      stack: 'Markdown',
      href: 'https://github.com/AfsarTanvir/engineering-knowledge-base',
    },
    {
      year: '2026',
      name: 'Animation',
      note: 'Working through CSS transitions, transforms and keyframes',
      stack: 'HTML, CSS',
      href: 'https://github.com/AfsarTanvir/Animation',
    },
    {
      year: '2026',
      name: 'DotNet-with-AI',
      note: '.NET experiments',
      stack: 'C#',
      href: 'https://github.com/AfsarTanvir/DotNet-with-AI',
    },
    {
      year: '2025',
      name: 'AdonisJS Basic',
      note: 'Learning AdonisJS from scratch',
      stack: 'TypeScript',
      href: 'https://github.com/AfsarTanvir/AdonisJS_Basic',
    },
    {
      year: '2025',
      name: 'Kanban Board',
      note: 'A Kanban board, built while learning React',
      stack: 'React, TypeScript',
      href: 'https://github.com/AfsarTanvir/KanbanBoard-Using-React',
    },
    {
      year: '2025',
      name: 'React Auth',
      note: 'Login and permissions in React',
      stack: 'React, TypeScript',
      href: 'https://github.com/AfsarTanvir/React-Authentication-and-Authorization',
    },
    {
      year: '2025',
      name: 'Dynamic Form',
      note: 'Dynamic forms in React',
      stack: 'React, TypeScript',
      href: 'https://github.com/AfsarTanvir/Dynamic-Form',
    },
    {
      year: '2025',
      name: 'Templates for CP',
      note: 'The code I copy into contests',
      stack: 'C++',
      href: 'https://github.com/AfsarTanvir/Templates-for-CP',
    },
    {
      year: '2025',
      name: 'Social Media',
      note: 'A social media app, built while learning ASP.NET Core',
      stack: 'C#, ASP.NET Core',
      href: 'https://github.com/AfsarTanvir/Social-Media',
    },
    {
      year: '2025',
      name: 'Bulky Book',
      note: 'A book management app with MVC, Razor pages and Bootstrap',
      stack: 'C#, ASP.NET Core MVC',
      href: 'https://github.com/AfsarTanvir/BookManagementSystem',
    },
    {
      year: '2025',
      name: 'Library and Hotel Management',
      note: 'Classic practice projects from learning .NET',
      stack: 'C#',
      href: 'https://github.com/AfsarTanvir/LibraryManagementSystem',
    },
    {
      year: '2024',
      name: 'Digital Image Processing',
      note: 'Course notebooks',
      stack: 'Python, Jupyter',
      href: 'https://github.com/AfsarTanvir/DIP',
    },
  ];

export const projectCategories: ProjectCategory[] = [
  'Backend',
  'Full-stack',
  'Systems',
  'Developer tools',
  'Machine learning',
  '.NET',
];
