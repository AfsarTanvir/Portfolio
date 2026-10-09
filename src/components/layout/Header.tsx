import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, FileText, Menu, X } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { profile } from '../../data/profile';
import { asset, cn } from '../../lib/utils';

export const navItems = [
  { to: '/about', label: 'About' },
  { to: '/experience', label: 'Experience' },
  { to: '/projects', label: 'Projects' },
  { to: '/academics', label: 'Academics' },
  { to: '/contact', label: 'Contact' },
];

const cvLinks = [
  { href: profile.cv.resume, label: 'Résumé', note: 'Industry · 1 page' },
  { href: profile.cv.academic, label: 'Academic CV', note: 'Graduate study' },
];

export function Header() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Hysteresis: different on/off thresholds so momentum scrolling near the top
    // can't toggle the background back and forth.
    const onScroll = () => setScrolled((was) => (was ? window.scrollY > 4 : window.scrollY > 24));
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50">
        {/* The blur lives on its own layer and only its opacity animates. Animating
            backdrop-filter itself makes Chrome flash while the blur radius changes. */}
        <div
          aria-hidden
          className={cn(
            'absolute inset-0 border-b border-line bg-bg/80 backdrop-blur-xl transition-opacity duration-300',
            scrolled || menuOpen ? 'opacity-100' : 'opacity-0'
          )}
        />
        <div className="container-page relative flex h-16 items-center justify-between gap-4">
          <Link to="/" className="group flex items-center gap-2.5" aria-label="Afsar Tanvir, home">
            <span className="grid size-8 place-items-center rounded-lg border border-line-strong font-serif text-lg italic leading-none transition-colors group-hover:border-accent group-hover:text-accent">
              at
            </span>
            <span className="hidden text-sm font-medium tracking-tight sm:inline">
              {profile.name}
            </span>
          </Link>

          <nav aria-label="Main" className="hidden md:block">
            <ul className="flex items-center gap-1 rounded-full border border-line bg-surface/70 p-1">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      cn(
                        'relative isolate block rounded-full px-3.5 py-1.5 text-sm transition-colors',
                        isActive ? 'text-text' : 'text-muted hover:text-text'
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <motion.span
                            layoutId="nav-pill"
                            className="absolute inset-0 -z-10 rounded-full bg-surface-2 ring-1 ring-line-strong"
                            transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                          />
                        )}
                        {item.label}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <CvMenu />
            <button
              type="button"
              className="grid size-9 place-items-center rounded-full text-muted hover:bg-surface-2 hover:text-text md:hidden"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Outside <header>: a filter or transform on the header would trap this fixed overlay inside it. */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            aria-label="Mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-bg px-5 pt-6 pb-10 md:hidden"
          >
            <ul className="flex flex-col">
              {[{ to: '/', label: 'Home' }, ...navItems].map((item, i) => (
                <motion.li
                  key={item.to}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.3 }}
                  className="border-b border-line"
                >
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'flex items-baseline justify-between py-4 display text-4xl',
                        isActive ? 'text-accent' : 'text-text'
                      )
                    }
                  >
                    {item.label}
                    <span className="font-mono text-xs text-faint">0{i + 1}</span>
                  </NavLink>
                </motion.li>
              ))}
            </ul>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {cvLinks.map((cv) => (
                <a
                  key={cv.href}
                  href={asset(cv.href)}
                  target="_blank"
                  rel="noopener"
                  className="card p-4"
                >
                  <FileText size={18} className="text-accent" />
                  <p className="mt-3 text-sm font-medium">{cv.label}</p>
                  <p className="text-xs text-muted">{cv.note}</p>
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}

function CvMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative hidden sm:block">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="ml-1 inline-flex items-center gap-1.5 rounded-full border border-line-strong px-3.5 py-1.5 text-sm transition-colors hover:border-accent hover:text-accent"
      >
        <FileText size={15} /> CV
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="card absolute right-0 mt-2 w-60 origin-top-right p-1.5 shadow-2xl shadow-black/20"
          >
            {cvLinks.map((cv) => (
              <a
                key={cv.href}
                role="menuitem"
                href={asset(cv.href)}
                target="_blank"
                rel="noopener"
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between rounded-xl px-3 py-2.5 hover:bg-surface-2"
              >
                <span>
                  <span className="block text-sm font-medium">{cv.label}</span>
                  <span className="block text-xs text-muted">{cv.note}</span>
                </span>
                <ArrowUpRight
                  size={16}
                  className="text-faint transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                />
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
