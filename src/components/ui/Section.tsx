import type { ReactNode } from 'react';
import { cn, stagger } from '../../lib/utils';
import { Reveal } from './Reveal';
import { RevealText } from './RevealText';

/** Small label like "02 / Projects". */
export function Label({ index, children }: { index?: string; children: ReactNode }) {
  return (
    <p className="eyebrow flex items-center gap-2">
      {index && <span className="text-accent">{index}</span>}
      {index && <span aria-hidden>/</span>}
      <span>{children}</span>
    </p>
  );
}

type HeadingProps = {
  index?: string;
  label: string;
  title: string;
  italic?: string;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
};

export function SectionHeading({
  index,
  label,
  title,
  italic,
  description,
  action,
  className,
}: HeadingProps) {
  return (
    <div
      className={cn(
        'mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between',
        className
      )}
    >
      <div className="max-w-2xl">
        <Reveal>
          <Label index={index}>{label}</Label>
        </Reveal>
        <RevealText text={title} italic={italic} className="mt-3 display text-4xl sm:text-5xl" />
        {description && (
          <Reveal delay={0.15}>
            <p className="mt-4 leading-relaxed text-muted">{description}</p>
          </Reveal>
        )}
      </div>
      {action && <Reveal delay={0.2}>{action}</Reveal>}
    </div>
  );
}

/** Intro block at the top of each inner page. */
export function PageHero({
  label,
  title,
  italic,
  note,
  children,
}: {
  label: string;
  title: string;
  italic?: string;
  /** Optional handwritten margin note. */
  note?: string;
  children?: ReactNode;
}) {
  return (
    <section className="container-page relative pt-16 pb-12 sm:pt-24 sm:pb-16">
      <p data-animate className="eyebrow">
        {label}
      </p>
      <RevealText
        as="h1"
        trigger="mount"
        delay={0.1}
        text={title}
        italic={italic}
        className="mt-4 max-w-4xl display text-5xl sm:text-7xl"
      />
      {note && (
        <p
          data-animate
          style={stagger(3)}
          className="hand mt-3 -rotate-2 text-2xl sm:absolute sm:top-24 sm:right-8 sm:mt-0 sm:max-w-[14rem] sm:rotate-3 sm:text-right"
        >
          {note}
        </p>
      )}
      {children && (
        <div
          data-animate
          style={stagger(2)}
          className="mt-6 max-w-2xl text-lg leading-relaxed text-muted"
        >
          {children}
        </div>
      )}
    </section>
  );
}

export function Tag({ children, active }: { children: ReactNode; active?: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-0.5 font-mono text-[0.7rem]',
        active ? 'border-accent/40 bg-accent-soft text-accent' : 'border-line text-muted'
      )}
    >
      {children}
    </span>
  );
}
