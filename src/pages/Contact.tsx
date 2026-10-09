import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Check, Copy, FileText } from 'lucide-react';
import { profile, socials } from '../data/profile';
import { PageHero } from '../components/ui/Section';
import { Reveal } from '../components/ui/Reveal';
import { SocialIcon } from '../components/ui/Icons';
import { asset } from '../lib/utils';

const openTo = [
  {
    title: 'Backend & full-stack roles',
    body: 'Product teams working on APIs, data and reliability.',
  },
  {
    title: 'MSc programmes & supervisors',
    body: 'Distributed, data-intensive or software-engineering projects in the UK and Europe.',
  },
  {
    title: 'Developer-tool collaborations',
    body: 'API mocking, scheduling, testing tools: happy to compare notes or contribute.',
  },
];

export function Contact() {
  const [copied, setCopied] = useState(false);
  const time = useLocalTime('Asia/Dhaka');

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  }

  return (
    <>
      <PageHero eyebrow="Contact" title={<>Let’s talk.</>}>
        <p>Email is the fastest way to reach me. It’s {time} in Bangladesh right now (UTC+6).</p>
      </PageHero>

      <section className="container-page">
        <Reveal>
          <div className="card flex flex-col gap-6 p-7 sm:p-10 md:flex-row md:items-center md:justify-between">
            <div className="min-w-0">
              <p className="eyebrow">Email</p>
              <a
                href={`mailto:${profile.email}`}
                className="mt-3 block display text-3xl break-all hover:text-accent sm:text-5xl"
              >
                {profile.email}
              </a>
            </div>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-line-strong px-5 py-2.5 text-sm transition-colors hover:border-accent hover:text-accent md:self-auto"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={copied ? 'done' : 'copy'}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.6 }}
                  transition={{ duration: 0.15 }}
                >
                  {copied ? <Check size={16} className="text-accent" /> : <Copy size={16} />}
                </motion.span>
              </AnimatePresence>
              <span aria-live="polite">{copied ? 'Copied' : 'Copy address'}</span>
            </button>
          </div>
        </Reveal>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <ul className="grid h-full gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {socials
                .filter((s) => s.key !== 'email')
                .map((s) => (
                  <li key={s.key} className="bg-bg">
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex h-full items-center justify-between gap-4 p-6 transition-colors hover:bg-surface"
                    >
                      <span className="flex items-center gap-4">
                        <span className="grid size-11 place-items-center rounded-xl border border-line text-muted transition-colors group-hover:border-accent group-hover:text-accent">
                          <SocialIcon name={s.key} />
                        </span>
                        <span>
                          <span className="block font-medium">{s.label}</span>
                          <span className="block font-mono text-xs text-faint">{s.handle}</span>
                        </span>
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      />
                    </a>
                  </li>
                ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="card h-full p-7">
              <p className="eyebrow">Documents</p>
              <div className="mt-5 space-y-3">
                {[
                  { href: profile.cv.resume, label: 'Résumé', note: 'Industry · 1 page PDF' },
                  {
                    href: profile.cv.academic,
                    label: 'Academic CV',
                    note: 'For MSc applications · PDF',
                  },
                ].map((d) => (
                  <a
                    key={d.href}
                    href={asset(d.href)}
                    target="_blank"
                    rel="noopener"
                    className="group flex items-center justify-between rounded-xl border border-line p-4 transition-colors hover:border-accent"
                  >
                    <span className="flex items-center gap-3">
                      <FileText size={18} className="text-accent" />
                      <span>
                        <span className="block text-sm font-medium">{d.label}</span>
                        <span className="block text-xs text-muted">{d.note}</span>
                      </span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      className="text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-24">
          <Reveal>
            <p className="eyebrow">Open to</p>
          </Reveal>
          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {openTo.map((o, i) => (
              <Reveal key={o.title} delay={i * 0.06}>
                <div className="h-full border-t border-line-strong pt-5">
                  <h2 className="font-semibold tracking-tight">{o.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{o.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function useLocalTime(timeZone: string) {
  const format = () =>
    new Intl.DateTimeFormat('en-GB', { timeZone, hour: '2-digit', minute: '2-digit' }).format(
      new Date()
    );
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 30_000);
    return () => clearInterval(id);
  }, [timeZone]);
  return time;
}
