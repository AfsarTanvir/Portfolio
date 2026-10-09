import type { CSSProperties } from 'react';

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

/** URL for a file in /public, respecting the GitHub Pages base path. */
export function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}

export function isExternal(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href) || href.endsWith('.pdf');
}

/** Delay index for the CSS load-in stagger: <div data-animate style={stagger(2)}>. */
export function stagger(i: number) {
  return { '--stagger': i } as CSSProperties;
}
