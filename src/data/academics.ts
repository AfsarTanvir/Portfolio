export const studyGoal =
  'I want to do a master’s in Computer Science, in distributed systems, data-intensive systems or software engineering. I’m looking for a programme with a real dissertation or research project, not only coursework.';

/** Shown on /academics under "Why a master’s". Edit freely; it can grow into a personal statement. */
export const motivation = [
  'At work I keep running into problems I only touched on at university: caching, consistency, permissions across tenants, and what happens when something fails halfway through.',
  'Building a scheduler from scratch made it obvious how much I still don’t know about these things. I can make them work, but I want to understand them properly. That’s what I want a master’s for, and I’d like to spend my dissertation on one of them.',
];

export const education = {
  degree: 'B.Sc. in Computer Science & Engineering',
  institution: 'Sylhet Engineering College',
  // VERIFY: the college is affiliated with Shahjalal University of Science and Technology (SUST).
  affiliation: 'Affiliated with Shahjalal University of Science and Technology',
  place: 'Sylhet, Bangladesh',
  period: 'Jan 2020 to Jul 2025',
  cgpa: 3.68,
  scale: 4.0,
  note: 'Most of my time went into algorithms and data structures, software engineering, databases, web development and a bit of machine learning.',
};

export type Interest = {
  title: string;
  summary: string;
  question: string;
  evidence: { label: string; href: string }[];
};

export const interests: Interest[] = [
  {
    title: 'Distributed systems',
    summary:
      'What happens when things fail: crashed processes, sleeping machines, retries, and jobs that might run twice.',
    question:
      'How much does “run exactly once” really cost a scheduler, and when is “at most once” good enough?',
    evidence: [
      { label: 'local-scheduler', href: '/projects/local-scheduler' },
      { label: 'My work on EzyCommunity', href: '/experience' },
    ],
  },
  {
    title: 'Data-intensive systems',
    summary:
      'Databases and caches, and the places where speed and correctness pull in different directions.',
    question:
      'In an app with many tenants, when does a cache stop being worth it, and how do you decide what to invalidate?',
    evidence: [
      { label: 'MockFlow’s caching', href: '/projects/mockflow' },
      {
        label: 'My knowledge base',
        href: 'https://github.com/AfsarTanvir/engineering-knowledge-base',
      },
    ],
  },
  {
    title: 'Software engineering',
    summary: 'Testing, API contracts, and tools that stop teams from waiting on each other.',
    question: 'How do you keep a mock API honest when the real API keeps changing?',
    evidence: [
      { label: 'MockFlow', href: '/projects/mockflow' },
      { label: 'TaskForge.NET', href: '/projects/taskforge-net' },
    ],
  },
];

export const earlierExploration = {
  title: 'Before all this: a bit of NLP',
  body: 'My first ML project was an LSTM that predicts the next word. It’s where I learned the basic loop of cleaning data, training and measuring.',
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
    // The 2023 contest was held in March 2024 (delayed by COVID).
    name: 'NCPC 2023, National Collegiate Programming Contest (held at JU)',
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
    detail: '3★ (max) · 33 rated contests',
    href: 'https://www.codechef.com/users/afsar_tanvir',
  },
  { judge: 'All judges', handle: '', value: '1800+', detail: 'problems solved', href: '' },
];

export const leadership = [
  {
    role: 'Coordinator',
    org: 'SEC Programming Club',
    period: '2024 to 2025',
    detail:
      'I set up the internal selection contests, ran warm-up sessions before big contests, and handled team registration for inter-university contests.',
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

/** CodeChef rating after each rated contest (from the public profile page, Oct 2026). */
export const codechefHistory: [date: string, rating: number][] = [
  ['2023-02-15', 1088],
  ['2023-05-24', 1177],
  ['2023-05-31', 1200],
  ['2024-01-24', 1327],
  ['2024-01-31', 1469],
  ['2024-02-07', 1552],
  ['2024-02-14', 1580],
  ['2024-02-21', 1672],
  ['2024-02-28', 1678],
  ['2024-03-06', 1625],
  ['2024-03-27', 1662],
  ['2024-05-08', 1705],
  ['2024-05-15', 1700],
  ['2024-05-22', 1736],
  ['2024-05-29', 1708],
  ['2024-06-05', 1685],
  ['2024-06-12', 1655],
  ['2024-07-03', 1648],
  ['2024-07-10', 1663],
  ['2024-07-17', 1694],
  ['2024-08-21', 1704],
  ['2024-08-28', 1691],
  ['2024-09-04', 1683],
  ['2024-09-11', 1660],
  ['2024-09-25', 1685],
  ['2024-10-09', 1666],
  ['2024-10-23', 1648],
  ['2024-10-30', 1609],
  ['2024-11-06', 1623],
  ['2024-12-04', 1647],
  ['2024-12-18', 1681],
  ['2025-01-01', 1704],
  ['2025-01-15', 1744],
];
