import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router';
import { asset, cn, isExternal } from '../../lib/utils';

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
  children: ReactNode;
};

/** Internal routes use the router; external URLs and PDFs open in a new tab. */
export function SmartLink({ href, children, ...rest }: Props) {
  if (href.endsWith('.pdf')) {
    return (
      <a href={asset(href)} target="_blank" rel="noopener" {...rest}>
        {children}
      </a>
    );
  }
  if (isExternal(href)) {
    const newTab = !href.startsWith('mailto:');
    return (
      <a
        href={href}
        {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...rest}
      >
        {children}
      </a>
    );
  }
  return (
    <Link to={href} {...rest}>
      {children}
    </Link>
  );
}

type ButtonProps = Props & { variant?: 'primary' | 'ghost' | 'quiet' };

export function ButtonLink({ variant = 'primary', className, children, ...rest }: ButtonProps) {
  return (
    <SmartLink
      className={cn(
        'group inline-flex items-center gap-2 rounded-full py-2.5 text-sm font-medium transition-[background-color,color,border-color,transform] duration-200 active:scale-[0.98]',
        variant === 'primary' && 'bg-text px-5 text-bg hover:bg-accent hover:text-accent-ink',
        variant === 'ghost' &&
          'border border-line-strong px-5 text-text hover:border-text hover:bg-surface',
        variant === 'quiet' && 'px-1 text-muted hover:text-accent',
        className
      )}
      {...rest}
    >
      {children}
    </SmartLink>
  );
}
