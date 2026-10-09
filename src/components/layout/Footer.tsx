import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { profile, socials } from '../../data/profile';
import { SocialIcon } from '../ui/Icons';
import { navItems } from './Header';

export function Footer() {
  return (
    <footer className="relative z-10 mt-32 border-t border-line">
      <div className="container-page py-16">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="eyebrow">Get in touch</p>
            <a
              href={`mailto:${profile.email}`}
              className="group mt-4 inline-flex items-center gap-3 display text-4xl break-all sm:text-5xl"
            >
              <span className="link-underline">Say hello</span>
              <ArrowUpRight className="size-8 text-accent transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
            <p className="mt-4 text-muted">
              Always happy to talk about backend engineering, developer tools, or research in
              distributed and data-intensive systems.
            </p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {socials.map((s) => (
              <li key={s.key}>
                <a
                  href={s.href}
                  {...(s.key === 'email' ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                  aria-label={s.label}
                  className="grid size-11 place-items-center rounded-full border border-line text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <SocialIcon name={s.key} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-6 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-5 gap-y-2">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:text-text">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p>
            © {new Date().getFullYear()} {profile.name} · Built with React, Motion &amp; Vite
          </p>
        </div>
      </div>
    </footer>
  );
}
