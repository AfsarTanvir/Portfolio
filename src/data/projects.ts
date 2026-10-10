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
  /** Team project: case study says "we" instead of "I". */
  team?: boolean;
  status?: 'In progress' | 'Completed';
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
    tagline:
      'A mock API server that lets frontend developers start work before the backend is ready.',
    period: 'May 2026 – present',
    role: 'Solo project: design, backend, frontend and tests',
    status: 'In progress',
    note: 'my largest project',
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
      { value: 'About 250', label: 'unit and integration tests' },
      { value: '24', label: 'merged pull requests' },
      { value: '200+', label: 'commits' },
    ],
    problem:
      'Frontend development often slows down when the API it depends on is not ready yet. MockFlow lets you define endpoints, fill them with realistic fake data, and share a URL that the frontend can use right away. It started in May 2026 as a 30-day project and has kept growing since then.',
    highlights: [
      'Matches each request to a route. When several routes match, the most specific one is used; for example, /users/me takes priority over /users/:id.',
      'Builds responses from faker.js templates and path parameters, with switchable scenarios and optional random delays for testing slow networks.',
      'Exports to OpenAPI 3 and Postman. Imports work in two steps: first you see a preview, then you apply the changes.',
      'Keeps a version history and saves an automatic backup before every restore.',
      'Supports companies, teams and roles (owner, admin, member and viewer), and includes an admin console that lets administrators sign in as any user.',
      'Caches mock responses in Redis, with protection against cache stampedes, caching of missing results and randomised expiry times.',
    ],
    decisions: [
      {
        title: 'Layered architecture',
        body: 'Each request passes through a controller, a service, a query layer and a model. This adds a few extra files, but it lets me test the business logic without sending HTTP requests.',
      },
      {
        title: 'Safe database migration',
        body: 'When project ownership moved from users to teams, I added a nullable team_id column instead of rewriting the table, so every existing mock URL kept working.',
      },
      {
        title: 'Security fixes',
        body: 'After a security review, I added rate limits to the public authentication routes and a 1 MB limit on request size. I also added a check that stops a team from losing its last admin, even when two requests arrive at once, and a password reset flow that does not reveal whether an account exists.',
      },
      {
        title: 'Accurate documentation',
        body: 'My early plans no longer matched the code, so I rewrote the roadmap based on the Git history. It now describes only what actually exists.',
      },
    ],
    flow: [
      { label: 'Request', detail: 'GET /users/42 reaches the mock URL' },
      { label: 'Match', detail: 'the most specific route is chosen' },
      { label: 'Scenario', detail: 'the active scenario and rules apply' },
      { label: 'Render', detail: 'faker.js templates are filled in' },
      { label: 'Respond', detail: 'status, headers and an optional delay' },
    ],
  },
  {
    slug: 'local-scheduler',
    name: 'local-scheduler',
    tagline: 'A small self-hosted job scheduler that you control through an HTTP API.',
    period: 'Oct 2026 – present',
    role: 'Solo project',
    status: 'In progress',
    note: 'most recent',
    categories: ['Backend', 'Systems', 'Developer tools'],
    stack: ['Go', 'SQLite', 'Docker', 'OpenAPI 3'],
    visual: 'scheduler',
    featured: true,
    repo: 'https://github.com/AfsarTanvir/local-scheduler-',
    metrics: [
      { value: '1', label: 'binary, with SQLite built in' },
      { value: '3', label: 'supported operating systems' },
      { value: 'kill -9', label: 'tested in the end-to-end script' },
    ],
    problem:
      'Cron works well, but other applications cannot manage its jobs through an API, and it gives little feedback when something fails. I wanted a scheduler that any application can use over HTTP, that keeps a history of every run, and that behaves correctly after a restart or a crash.',
    highlights: [
      'Runs jobs on a cron schedule (with time zone support) or once at a specific time. Each job either calls a URL or runs a shell command.',
      'Checks for due jobs every second and runs each one in its own goroutine. Every run is stored in SQLite.',
      'Skips a run if the previous run of the same job is still active, and combines missed runs into a single catch-up run.',
      'Gives running jobs 30 seconds to finish when it shuts down. After a crash, unfinished runs are marked as failed instead of being run again.',
      'Serves its own OpenAPI specification and returns every error in the same JSON format.',
    ],
    decisions: [
      {
        title: 'Decision records',
        body: 'The behaviour for overlapping runs, catch-up runs and shutdown is explained in short decision records in the repository.',
      },
      {
        title: 'End-to-end testing',
        body: 'A test script starts the real binary alongside a fake API. It then restarts the scheduler, lets jobs time out, stops it with kill -9 and checks its memory usage.',
      },
      {
        title: 'Safe defaults',
        body: 'Shell jobs run commands on the host machine, so they are disabled unless ALLOW_SHELL_JOBS=true is set.',
      },
    ],
    flow: [
      { label: 'API', detail: 'POST /jobs with a schedule or a time' },
      { label: 'Store', detail: 'jobs and run history in SQLite' },
      { label: 'Scheduler', detail: 'checks for due jobs every second' },
      { label: 'Runner', detail: 'one goroutine per run, with a timeout' },
      { label: 'Result', detail: 'the response or exit code is saved' },
    ],
  },
  {
    slug: 'audio-visualizer',
    name: 'Audio Visualizer',
    tagline: 'A web app that shows a song’s frequencies in real time as it plays.',
    period: 'Mar – May 2026',
    role: 'Solo project',
    status: 'Completed',
    note: 'live demo available',
    categories: ['Full-stack'],
    stack: ['AdonisJS 7', 'Next.js 16', 'React 19', 'MongoDB', 'Web Audio API'],
    visual: 'audio',
    featured: true,
    repo: 'https://github.com/AfsarTanvir/Audio-Visualizer',
    live: 'https://audio-visualizer-jet-kappa.vercel.app',
    problem:
      'I wanted to learn the Web Audio API by building a complete application, including file upload, storage, streaming and playback.',
    highlights: [
      'Draws frequency bars and a waveform in real time with the Web Audio API, and supports MP3, WAV and FLAC files.',
      'Uses an AdonisJS backend to receive, stream and delete uploaded files, and stores upload records in MongoDB.',
      'Has a Next.js 16 and React 19 frontend with drag-and-drop upload, playback controls and an upload history.',
    ],
  },
  {
    slug: 'taskforge-net',
    name: 'TaskForge.NET',
    tagline: 'A task management app that our team built with ASP.NET Core during Learnathon.',
    period: 'Dec 2024 – Apr 2025',
    role: 'Team member (team of three, with Rejwanul Haque and Enamul Hasan)',
    team: true,
    status: 'Completed',
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
      'Learnathon asked participants to work like a professional software team, with a shared codebase, a code review for every change, and an architecture that everyone could follow.',
    highlights: [
      'Users can create, edit, assign and delete tasks, and move them through To Do, In Progress and Done.',
      'Follows Clean Architecture and SOLID principles, so the core logic does not depend on the web or database layers.',
      'Stores data in SQL Server through Entity Framework Core.',
      'Every change goes through a pull request and is reviewed by teammates and mentors.',
    ],
  },
  {
    slug: 'next-word-predictor',
    name: 'Next Word Predictor',
    tagline: 'A model that predicts the next word as you type a sentence.',
    period: 'Jun 2025',
    role: 'Solo project',
    status: 'Completed',
    categories: ['Machine learning'],
    stack: ['Python', 'TensorFlow/Keras', 'LSTM', 'Flask', 'Tailwind CSS'],
    visual: 'predictor',
    repo: 'https://github.com/AfsarTanvir/Next-Word-Predictor-LSTM',
    problem:
      'This was my first complete natural language processing (NLP) project. It covers the whole process, from raw text to a trained model served through a web page.',
    highlights: [
      'Tokenises the text, builds n-gram sequences and pads them for training.',
      'Trains an LSTM model with TensorFlow/Keras and reports both top-1 and top-5 accuracy.',
      'Uses temperature sampling to make the suggestions less repetitive, and serves the model through Flask with a simple Tailwind CSS interface.',
    ],
  },
];

/** Smaller repositories, shown as a compact table. */
export const archive: { year: string; name: string; note: string; stack: string; href: string }[] =
  [
    {
      year: '2026',
      name: 'Engineering Knowledge Base',
      note: 'Notes on backend development, databases, caching, networking and system design',
      stack: 'Markdown',
      href: 'https://github.com/AfsarTanvir/engineering-knowledge-base',
    },
    {
      year: '2026',
      name: 'Animation',
      note: 'Practice with CSS transitions, transforms and keyframes',
      stack: 'HTML, CSS',
      href: 'https://github.com/AfsarTanvir/Animation',
    },
    {
      year: '2026',
      name: 'DotNet-with-AI',
      note: 'Experiments with .NET',
      stack: 'C#',
      href: 'https://github.com/AfsarTanvir/DotNet-with-AI',
    },
    {
      year: '2025',
      name: 'AdonisJS Basic',
      note: 'Learning AdonisJS from the basics',
      stack: 'TypeScript',
      href: 'https://github.com/AfsarTanvir/AdonisJS_Basic',
    },
    {
      year: '2025',
      name: 'Kanban Board',
      note: 'A Kanban board built while learning React',
      stack: 'React, TypeScript',
      href: 'https://github.com/AfsarTanvir/KanbanBoard-Using-React',
    },
    {
      year: '2025',
      name: 'React Auth',
      note: 'Authentication and authorisation in React',
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
      note: 'Reusable code templates for programming contests',
      stack: 'C++',
      href: 'https://github.com/AfsarTanvir/Templates-for-CP',
    },
    {
      year: '2025',
      name: 'Social Media',
      note: 'A social media app built while learning ASP.NET Core',
      stack: 'C#, ASP.NET Core',
      href: 'https://github.com/AfsarTanvir/Social-Media',
    },
    {
      year: '2025',
      name: 'Bulky Book',
      note: 'A book management app built with MVC, Razor Pages and Bootstrap',
      stack: 'C#, ASP.NET Core MVC',
      href: 'https://github.com/AfsarTanvir/BookManagementSystem',
    },
    {
      year: '2025',
      name: 'Library and Hotel Management',
      note: 'Practice projects from when I was learning .NET',
      stack: 'C#',
      href: 'https://github.com/AfsarTanvir/LibraryManagementSystem',
    },
    {
      year: '2024',
      name: 'Digital Image Processing',
      note: 'Notebooks from my image processing course',
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
