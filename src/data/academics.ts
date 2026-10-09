export const studyGoal = {
  heading: 'MSc in Computer Science, UK & Europe',
  body: 'I am applying for a master’s in Computer Science, Advanced Computer Science, Software Engineering or Distributed Systems. I am looking for programmes with a substantial dissertation or project component, ideally in the UK, and I am glad to consider strong programmes elsewhere in Europe.',
};

/** Short motivation shown on /academics. Edit freely; it is the seed of a personal statement. */
export const motivation =
  'Shipping a multi-tenant platform and building a scheduler from scratch showed me how much reliable software rests on ideas I only met briefly as an undergraduate: consistency, failure handling, caching and scheduling. I want an MSc to study them properly, and to finish with a dissertation project that is both rigorous and useful to real teams.';

export const education = {
  degree: 'B.Sc. in Computer Science & Engineering',
  institution: 'Sylhet Engineering College',
  // VERIFY: the college is affiliated with Shahjalal University of Science and Technology (SUST).
  affiliation: 'Affiliated with Shahjalal University of Science and Technology',
  place: 'Sylhet, Bangladesh',
  period: 'Jan 2020 — Jul 2025',
  cgpa: 3.68,
  scale: 4.0,
  note: 'Focus areas: algorithms and data structures, software engineering, databases, web development and machine learning.',
};

export type Interest = {
  title: string;
  summary: string;
  question: string;
  evidence: { label: string; href: string }[];
};

export const interests: Interest[] = [
  {
    title: 'Distributed & cloud systems',
    summary:
      'Scheduling, failure handling and execution guarantees: how systems stay correct when processes crash, machines sleep or work is retried.',
    question:
      'What does “run exactly once” cost in a scheduler that can crash mid-run, and when is “at most once” the better contract?',
    evidence: [
      { label: 'local-scheduler', href: '/projects/local-scheduler' },
      { label: 'EzyCommunity (multi-tenant platform)', href: '/experience' },
    ],
  },
  {
    title: 'Data-intensive systems',
    summary:
      'Databases and caching at the boundary of correctness and speed: keyset pagination, cache stampedes, invalidation by scope and multi-tenant isolation.',
    question:
      'When does a cache in a multi-tenant system stop paying for itself, and how should invalidation scopes be designed?',
    evidence: [
      { label: 'MockFlow caching layer', href: '/projects/mockflow' },
      {
        label: 'Engineering knowledge base',
        href: 'https://github.com/AfsarTanvir/engineering-knowledge-base',
      },
    ],
  },
  {
    title: 'Software engineering & developer tools',
    summary:
      'Testability, API contracts and tools that remove waiting from teams: mocking, contract import/export and end-to-end testing from the outside.',
    question:
      'How can API mocks stay faithful to an evolving contract without becoming a second backend to maintain?',
    evidence: [
      { label: 'MockFlow', href: '/projects/mockflow' },
      { label: 'TaskForge.NET', href: '/projects/taskforge-net' },
    ],
  },
];

export const earlierExploration = {
  title: 'Earlier exploration: NLP',
  body: 'An LSTM next-word predictor taught me the full ML loop, from text preprocessing to evaluation with top-k accuracy and temperature sampling.',
  href: '/projects/next-word-predictor',
};

export const contests: { name: string; result: string; year: string; href?: string }[] = [
  {
    name: 'MU IUPC, Sylhet Division',
    result: 'Ranked 14th',
    year: '2024',
    href: 'https://toph.co/c/inter-university-sylhet-division-2024/standings',
  },
  {
    // VERIFY year: the standings URL names the 2023 edition (held onsite at JU).
    name: 'National Collegiate Programming Contest (NCPC), onsite at JU',
    result: 'Ranked 97th',
    year: '2024',
    href: 'https://bapsoj.org/contests/ncpc-onsite-2023-hosted-by-ju/standings',
  },
  {
    name: 'DUET IUPC',
    result: 'Ranked 89th',
    year: '2025',
    href: 'https://toph.co/c/duet-inter-university-iupc-2025/standings',
  },
];

export const ratings = [
  {
    judge: 'Codeforces',
    handle: 'Tanvir2000',
    value: '1476',
    detail: 'Specialist (max) · 80 rated contests',
    href: 'https://codeforces.com/profile/Tanvir2000',
  },
  {
    judge: 'CodeChef',
    handle: 'afsar_tanvir',
    value: '1744',
    detail: '3★',
    href: 'https://www.codechef.com/users/afsar_tanvir',
  },
  { judge: 'All judges', handle: '', value: '1800+', detail: 'problems solved', href: '' },
];

export const leadership = [
  {
    role: 'Coordinator',
    org: 'SEC Programming Club',
    period: '2024 — 2025',
    detail:
      'Organised internal selection contests and warm-up sessions, and managed team registration for inter-university programming contests.',
  },
];

/** Codeforces rating after each rated contest (from the public Codeforces API, Oct 2026). */
export const codeforcesHistory: [date: string, rating: number][] = [
  ['2020-03-26', 1364],
  ['2020-05-24', 1241],
  ['2021-12-14', 1125],
  ['2022-03-08', 1000],
  ['2022-05-10', 929],
  ['2022-05-14', 932],
  ['2022-05-19', 883],
  ['2022-05-22', 894],
  ['2022-05-23', 838],
  ['2022-05-25', 825],
  ['2022-06-10', 791],
  ['2022-06-12', 784],
  ['2022-06-14', 806],
  ['2022-10-16', 708],
  ['2022-10-23', 728],
  ['2022-11-18', 632],
  ['2022-11-21', 733],
  ['2022-12-15', 773],
  ['2022-12-16', 778],
  ['2023-01-21', 811],
  ['2023-02-12', 725],
  ['2023-03-19', 743],
  ['2023-05-06', 798],
  ['2023-05-25', 824],
  ['2023-05-28', 887],
  ['2023-08-12', 935],
  ['2023-08-15', 922],
  ['2023-08-17', 1031],
  ['2023-08-24', 919],
  ['2023-08-31', 912],
  ['2023-09-07', 976],
  ['2023-09-11', 1048],
  ['2023-09-21', 1096],
  ['2023-09-24', 1128],
  ['2023-09-25', 1122],
  ['2023-09-26', 1151],
  ['2023-09-30', 1218],
  ['2023-11-03', 1228],
  ['2024-01-27', 1111],
  ['2024-01-30', 1099],
  ['2024-02-06', 1114],
  ['2024-02-11', 1101],
  ['2024-02-15', 1039],
  ['2024-02-18', 1112],
  ['2024-02-19', 1103],
  ['2024-02-23', 1179],
  ['2024-02-27', 1202],
  ['2024-02-29', 1298],
  ['2024-03-05', 1269],
  ['2024-03-28', 1277],
  ['2024-04-29', 1251],
  ['2024-04-30', 1267],
  ['2024-05-02', 1283],
  ['2024-05-20', 1234],
  ['2024-05-30', 1231],
  ['2024-05-31', 1216],
  ['2024-06-03', 1219],
  ['2024-06-06', 1294],
  ['2024-06-09', 1284],
  ['2024-06-11', 1323],
  ['2024-07-07', 1277],
  ['2024-07-11', 1207],
  ['2024-07-15', 1305],
  ['2024-08-20', 1289],
  ['2024-08-25', 1329],
  ['2024-08-30', 1323],
  ['2024-09-01', 1343],
  ['2024-09-14', 1349],
  ['2024-09-20', 1416],
  ['2024-11-17', 1476],
  ['2024-12-02', 1472],
  ['2024-12-03', 1430],
  ['2024-12-05', 1384],
  ['2024-12-08', 1401],
  ['2024-12-19', 1427],
  ['2024-12-20', 1393],
  ['2024-12-22', 1329],
  ['2024-12-28', 1324],
  ['2025-01-04', 1336],
  ['2025-01-12', 1417],
];
