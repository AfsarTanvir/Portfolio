// Single source of truth for personal details. Edit here; every page reads from it.
// The phone number is deliberately not on the site — it appears only inside the CV PDFs.

export const profile = {
  name: 'Afsar Tanvir',
  role: 'Software Engineer',
  headline: 'Backend-focused full-stack engineer',
  location: 'Moulvibazar, Bangladesh',
  email: 'afsartanvir805@gmail.com',
  availability: 'Open to backend & full-stack roles · Applying for MSc Computer Science (UK & Europe)',
  photo: 'images/afsar-tanvir.webp',
  intro:
    'I build reliable backends and the products on top of them. By day I ship features on EzyCommunity, a multi-tenant community platform at AppifyLab. In my own time I build developer tools: an API mock server, and a job scheduler written in Go.',
  cv: {
    resume: 'cv/Afsar_Tanvir_Resume.pdf',
    academic: 'cv/Afsar_Tanvir_Academic_CV.pdf',
  },
} as const

export type SocialKey = 'github' | 'linkedin' | 'codeforces' | 'codechef' | 'email'

export const socials: { key: SocialKey; label: string; handle: string; href: string }[] = [
  { key: 'github', label: 'GitHub', handle: 'AfsarTanvir', href: 'https://github.com/AfsarTanvir' },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    handle: 'afsar-tanvir',
    href: 'https://www.linkedin.com/in/afsar-tanvir-81ab17270/',
  },
  { key: 'codeforces', label: 'Codeforces', handle: 'Tanvir2000', href: 'https://codeforces.com/profile/Tanvir2000' },
  { key: 'codechef', label: 'CodeChef', handle: 'afsar_tanvir', href: 'https://www.codechef.com/users/afsar_tanvir' },
  { key: 'email', label: 'Email', handle: 'afsartanvir805@gmail.com', href: 'mailto:afsartanvir805@gmail.com' },
]

export const stats = [
  { value: 550, suffix: '+', label: 'production commits at AppifyLab', note: 'since Feb 2026' },
  { value: 1800, suffix: '+', label: 'algorithmic problems solved', note: 'across online judges' },
  { value: 1476, suffix: '', label: 'max Codeforces rating', note: 'Specialist · 80 rated contests' },
  { value: 3.68, suffix: '', label: 'CGPA out of 4.00', note: 'B.Sc. CSE, 2025', decimals: 2 },
] as const

/** "What I'm doing now" — update every month or two. */
export const now = {
  updated: 'October 2026',
  items: [
    'Shipping moderation, feed and checkout features on EzyCommunity at AppifyLab.',
    'Building local-scheduler, a self-hosted job scheduler in Go with SQLite.',
    'Hardening MockFlow: CI, production packaging and import/export round-trips.',
    'Studying system design and distributed systems, and writing it all down in my engineering knowledge base.',
    'Preparing MSc applications for the UK and Europe.',
  ],
}

export const skills: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['TypeScript', 'JavaScript', 'Go', 'C#', 'C++', 'Python', 'SQL'] },
  { group: 'Backend', items: ['AdonisJS', 'Node.js', 'ASP.NET Core', 'REST API design', 'OpenAPI'] },
  { group: 'Frontend', items: ['Next.js', 'React', 'Tailwind CSS', 'shadcn/ui'] },
  { group: 'Data', items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite'] },
  { group: 'Practice', items: ['Git & code review', 'Docker', 'Linux', 'Automated testing', 'Clean Architecture'] },
]
