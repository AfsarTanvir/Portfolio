import { asset, cn } from '../../lib/utils';

/**
 * Square organisation logo on a white tile, so logos look the same in both themes.
 * Falls back to initials when there is no logo file.
 */
export function OrgLogo({
  src,
  name,
  initials,
  size = 48,
  className,
}: {
  src?: string;
  name: string;
  initials?: string;
  size?: number;
  className?: string;
}) {
  const style = { width: size, height: size };
  const tile = 'shrink-0 overflow-hidden rounded-xl ring-1 ring-line';

  if (!src) {
    return (
      <span
        aria-hidden
        style={style}
        className={cn(
          tile,
          'grid place-items-center bg-surface-2 font-mono text-xs font-medium text-muted',
          className
        )}
      >
        {initials ?? name.slice(0, 2)}
      </span>
    );
  }

  return (
    <img
      src={asset(src)}
      alt={`${name} logo`}
      width={size}
      height={size}
      loading="lazy"
      style={style}
      className={cn(tile, 'bg-white object-contain', className)}
    />
  );
}
