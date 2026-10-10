// Personal details. Every page reads from here, so edit text here first.
// The phone number is deliberately not on the site; it is only inside the CV PDFs.

export const profile = {
  name: 'Afsar Tanvir',
  role: 'Software engineer',
  location: 'Moulvibazar, Bangladesh',
  email: 'afsartanvir805@gmail.com',
  /** Small line above the name. Keep it factual, with no job-seeking signals. */
  status: 'Full Stack Developer at AppifyLab',
  photo: 'images/afsar-tanvir.webp',
  cv: {
    resume: 'cv/Afsar_Tanvir_Resume.pdf',
    academic: 'cv/Afsar_Tanvir_Academic_CV.pdf',
  },
} as const;

export type SocialKey = 'github' | 'linkedin' | 'codeforces' | 'codechef' | 'email';

export const socials: { key: SocialKey; label: string; handle: string; href: string }[] = [
  { key: 'github', label: 'GitHub', handle: 'AfsarTanvir', href: 'https://github.com/AfsarTanvir' },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    handle: 'afsar-tanvir',
    href: 'https://www.linkedin.com/in/afsar-tanvir-81ab17270/',
  },
  {
    key: 'codeforces',
    label: 'Codeforces',
    handle: 'Tanvir2000',
    href: 'https://codeforces.com/profile/Tanvir2000',
  },
  {
    key: 'codechef',
    label: 'CodeChef',
    handle: 'afsar_tanvir',
    href: 'https://www.codechef.com/users/afsar_tanvir',
  },
  {
    key: 'email',
    label: 'Email',
    handle: 'afsartanvir805@gmail.com',
    href: 'mailto:afsartanvir805@gmail.com',
  },
];

export const stats = [
  { value: 550, suffix: '+', label: 'commits to EzyCommunity', note: 'at AppifyLab' },
  { value: 1800, suffix: '+', label: 'problems solved', note: 'on online judges' },
  { value: 1476, suffix: '', label: 'highest Codeforces rating', note: 'Specialist' },
  { value: 3.68, suffix: '', label: 'CGPA out of 4.00', note: 'B.Sc. in CSE, 2025', decimals: 2 },
] as const;

/** "Currently" section on the home page. Update it every month or two. */
export const now = {
  updated: 'October 2026',
  items: [
    {
      label: 'At work',
      text: 'Working on moderation tools, the live feed and the checkout flow for EzyCommunity.',
    },
    {
      label: 'Side project',
      text: 'Building local-scheduler, a lightweight job scheduler written in Go.',
    },
    {
      label: 'Side project',
      text: 'Preparing MockFlow for production use with CI, Docker support, and better import and export.',
    },
    {
      label: 'Learning',
      text: 'Studying distributed systems and keeping notes in my knowledge base.',
    },
    { label: 'Next', text: 'Preparing to apply for a master’s degree in Computer Science.' },
  ],
};

export const skills: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['TypeScript', 'JavaScript', 'Go', 'C#', 'C++', 'Python', 'SQL'] },
  { group: 'Backend', items: ['AdonisJS', 'Node.js', 'ASP.NET Core', 'REST APIs', 'OpenAPI'] },
  { group: 'Frontend', items: ['Next.js', 'React', 'Tailwind CSS', 'shadcn/ui'] },
  { group: 'Databases', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite'] },
  { group: 'Tools', items: ['Git', 'Docker', 'Linux', 'Japa', 'go test'] },
];
