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
  status?: 'In progress' | 'Shipped';
  categories: ProjectCategory[];
  stack: string[];
  visual: ProjectVisual;
  featured?: boolean;
  repo?: string;
  live?: string;
  extraLinks?: { label: string; href: string }[];
  metrics?: { value: string; label: string }[];
  problem: string;
  highlights: string[];
  decisions?: { title: string; body: string }[];
  /** Optional request/data flow, drawn as a diagram on the case-study page. */
  flow?: { label: string; detail: string }[];
  /** One-line note on how the project relates to an academic interest (shown on /academics). */
  researchAngle?: string;
};

export const projects: Project[] = [
  {
    slug: 'mockflow',
    name: 'MockFlow',
    tagline: 'A collaborative API mock server, so frontend teams never wait on the backend.',
    period: 'May 2026 — Present',
    role: 'Solo: product, backend, frontend, tests',
    status: 'In progress',
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
      { value: '~250', label: 'unit + integration tests' },
      { value: '24', label: 'merged pull requests' },
      { value: '200+', label: 'commits in five months' },
    ],
    problem:
      'Frontend and QA teams regularly block on unfinished APIs. MockFlow lets a team design endpoints, generate realistic responses and share a live mock URL, before the real backend exists.',
    highlights: [
      'Mock engine that matches requests with path-to-regexp and orders candidates by route specificity, so /users/me wins over /users/:id.',
      'Dynamic responses from faker.js templates and path parameters. Scenarios and rules switch responses, and randomised delays simulate slow networks.',
      'OpenAPI 3.x and Postman v2.1 export, plus a two-phase import (preview, then apply) so nothing is overwritten by surprise.',
      'Version history snapshots endpoints, scenarios and rules, and every restore saves an automatic backup first.',
      'Workspaces: companies, teams, role-based access (owner, admin, member, viewer), team-owned projects, and a super-admin console with impersonation.',
      'Redis on the hot path: single-flight to stop cache stampedes, negative caching, TTL jitter, and tag-based invalidation per project, team and company.',
    ],
    decisions: [
      {
        title: 'Strict layering',
        body: 'Controller → Service → Query → Model across the whole API, so business rules can be tested without HTTP and queries live in one place.',
      },
      {
        title: 'An additive migration for the riskiest change',
        body: 'Moving project ownership to teams shipped as a nullable team_id, not the planned destructive migration, so every existing mock URL kept working.',
      },
      {
        title: 'A dedicated security pass',
        body: 'Rate-limited public auth routes, a 1 MB body cap, a race-safe last-admin check (closing a TOCTOU window), and password reset that no longer reveals whether an account exists.',
      },
      {
        title: 'Verify before you document',
        body: 'When the planning docs drifted from reality, I rewrote the roadmap from the code and git history and now record status, not intent.',
      },
    ],
    flow: [
      { label: 'Request', detail: 'GET /users/42 on the mock URL' },
      { label: 'Match', detail: 'path-to-regexp, most specific route wins' },
      { label: 'Resolve', detail: 'active scenario and rules' },
      { label: 'Render', detail: 'faker.js template and path params' },
      { label: 'Respond', detail: 'status, headers, optional delay' },
    ],
    researchAngle:
      'Caching and consistency in a multi-tenant system: stampedes, negative caching, invalidation by scope.',
  },
  {
    slug: 'local-scheduler',
    name: 'local-scheduler',
    tagline: 'A self-hosted job scheduler with an HTTP API. One binary, no dependencies.',
    period: 'Oct 2026 — Present',
    role: 'Solo',
    status: 'In progress',
    categories: ['Backend', 'Systems', 'Developer tools'],
    stack: ['Go', 'SQLite', 'Docker', 'OpenAPI 3'],
    visual: 'scheduler',
    featured: true,
    repo: 'https://github.com/AfsarTanvir/local-scheduler-',
    metrics: [
      { value: '0', label: 'external services to install' },
      { value: '3', label: 'operating systems supported' },
      { value: 'kill -9', label: 'crash recovery tested end to end' },
    ],
    problem:
      'Cron is per-machine and silent, and hosted schedulers are heavy. I wanted a scheduler that any app, in any language, can drive over plain HTTP, and that stays correct when the machine sleeps, restarts or crashes.',
    highlights: [
      'Jobs run on a cron schedule (with time zones, @daily, @every 10m) or once at a set time. Each job either calls a URL or runs a shell command (opt-in).',
      'A one-second loop starts due jobs in goroutines and moves nextRunAt forward. Run history is kept per job in embedded SQLite.',
      'Explicit rules: runs never overlap, missed runs collapse into one catch-up run, and graceful shutdown gives running jobs 30 seconds to finish.',
      'Crash recovery: on start-up, runs interrupted by kill -9 or power loss are marked failed and are not repeated.',
      'One error shape for every endpoint, and a full OpenAPI 3 spec served by the binary itself.',
    ],
    decisions: [
      {
        title: 'Write the rules down',
        body: 'Overlap, catch-up and shutdown behaviour each have a short decision record explaining the trade-off, so the semantics are deliberate and not accidental.',
      },
      {
        title: 'Test from the outside',
        body: 'An end-to-end script starts the real binary beside a fake API and checks scheduling, failures, timeouts, pause/resume, restarts, graceful shutdown, recovery after kill -9, and memory use.',
      },
      {
        title: 'Safe by default',
        body: 'Shell jobs execute commands on the host, so they stay disabled unless ALLOW_SHELL_JOBS=true. Command output is capped while it runs.',
      },
    ],
    flow: [
      { label: 'HTTP API', detail: 'POST /jobs with a schedule or runAt' },
      { label: 'Store', detail: 'SQLite: jobs and run history' },
      { label: 'Scheduler', detail: 'every second: which jobs are due?' },
      { label: 'Runner', detail: 'one goroutine per run, with timeout' },
      { label: 'Result', detail: 'HTTP response or exit code, recorded' },
    ],
    researchAngle:
      'Execution guarantees under failure: what "at most once" means when a scheduler can crash mid-run.',
  },
  {
    slug: 'audio-visualizer',
    name: 'Audio Visualizer',
    tagline:
      'Upload a track and watch it move: real-time frequency bars and waveforms in the browser.',
    period: 'Mar — May 2026',
    role: 'Solo',
    status: 'Shipped',
    categories: ['Full-stack'],
    stack: ['AdonisJS 7', 'Next.js 16', 'React 19', 'MongoDB', 'Web Audio API'],
    visual: 'audio',
    featured: true,
    repo: 'https://github.com/AfsarTanvir/Audio-Visualizer',
    live: 'https://audio-visualizer-jet-kappa.vercel.app',
    problem:
      'A playground for the Web Audio API that is also a complete product: uploads, storage, streaming and playback, end to end.',
    highlights: [
      'Real-time frequency-bar and waveform rendering with the Web Audio API, for MP3, WAV, FLAC and other formats.',
      'AdonisJS 7 backend with upload, streaming and delete endpoints, and upload records stored in MongoDB.',
      'Next.js 16 and React 19 frontend with drag-and-drop upload, playback controls and an upload history.',
    ],
  },
  {
    slug: 'taskforge-net',
    name: 'TaskForge.NET',
    tagline: 'A team task manager built with Clean Architecture during the Learnathon program.',
    period: 'Dec 2024 — Apr 2025',
    role: 'Team of 3 with Rejwanul Haque and Enamul Hasan',
    status: 'Shipped',
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
      'Learn professional .NET development the way teams actually work: layered architecture, code review, and shared ownership of one codebase.',
    highlights: [
      'Task creation, editing, deletion and assignment, with status tracking across To Do, In Progress and Done.',
      'Clean Architecture with SOLID principles, keeping domain logic independent of the web and data layers.',
      'Persistence with Entity Framework Core on SQL Server.',
      'All work went through pull requests and code review with teammates and mentors.',
    ],
  },
  {
    slug: 'next-word-predictor',
    name: 'Next Word Predictor',
    tagline: 'An LSTM language model that suggests the next word as you type.',
    period: 'Jun 2025',
    role: 'Solo',
    status: 'Shipped',
    categories: ['Machine learning'],
    stack: ['Python', 'TensorFlow / Keras', 'LSTM', 'Flask', 'Tailwind CSS'],
    visual: 'predictor',
    repo: 'https://github.com/AfsarTanvir/Next-Word-Predictor-LSTM',
    problem:
      'My first end-to-end NLP model: from raw text to a model behind a small web interface.',
    highlights: [
      'Text pipeline with tokenisation, n-gram sequence generation and padding.',
      'LSTM network in TensorFlow/Keras, evaluated with top-5 accuracy as well as top-1.',
      'Temperature sampling for more varied suggestions, served through Flask with a responsive Tailwind UI.',
    ],
    researchAngle: 'An earlier exploration of sequence models and NLP.',
  },
];

/** Smaller repositories, shown as a compact archive table. */
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
      note: 'A structured study of CSS transitions, transforms and keyframes',
      stack: 'HTML · CSS',
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
      note: 'Learning AdonisJS from first principles',
      stack: 'TypeScript',
      href: 'https://github.com/AfsarTanvir/AdonisJS_Basic',
    },
    {
      year: '2025',
      name: 'Kanban Board',
      note: 'Kanban board built while learning React',
      stack: 'React · TypeScript',
      href: 'https://github.com/AfsarTanvir/KanbanBoard-Using-React',
    },
    {
      year: '2025',
      name: 'React Auth',
      note: 'Authentication and authorisation flows in React',
      stack: 'React · TypeScript',
      href: 'https://github.com/AfsarTanvir/React-Authentication-and-Authorization',
    },
    {
      year: '2025',
      name: 'Dynamic Form',
      note: 'Dynamic forms in React',
      stack: 'React · TypeScript',
      href: 'https://github.com/AfsarTanvir/Dynamic-Form',
    },
    {
      year: '2025',
      name: 'Templates for CP',
      note: 'My competitive-programming library',
      stack: 'C++',
      href: 'https://github.com/AfsarTanvir/Templates-for-CP',
    },
    {
      year: '2025',
      name: 'Social Media',
      note: 'Social media app built while learning ASP.NET Core',
      stack: 'C# · ASP.NET Core',
      href: 'https://github.com/AfsarTanvir/Social-Media',
    },
    {
      year: '2025',
      name: 'Bulky Book',
      note: 'Book management web app (CRUD, MVC, Razor)',
      stack: 'C# · ASP.NET Core MVC',
      href: 'https://github.com/AfsarTanvir/BookManagementSystem',
    },
    {
      year: '2025',
      name: 'Library & Hotel Management',
      note: 'Classic management systems built while learning .NET',
      stack: 'C#',
      href: 'https://github.com/AfsarTanvir/LibraryManagementSystem',
    },
    {
      year: '2024',
      name: 'Digital Image Processing',
      note: 'Coursework notebooks',
      stack: 'Python · Jupyter',
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
