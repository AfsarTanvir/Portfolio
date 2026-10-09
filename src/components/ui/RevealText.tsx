import { Fragment } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

type Props = {
  text: string;
  /** Optional tail set in muted italic, e.g. text="Things I've" italic="built". */
  italic?: string;
  as?: 'h1' | 'h2' | 'p';
  className?: string;
  delay?: number;
  /** 'mount' plays on load (page heroes); 'view' plays when scrolled into view. */
  trigger?: 'mount' | 'view';
};

/** Heading whose words rise out of a mask one after another. */
export function RevealText({
  text,
  italic,
  as = 'h2',
  className,
  delay = 0,
  trigger = 'view',
}: Props) {
  const Tag = motion[as];
  const words = [
    ...text.split(' ').map((w) => ({ w, em: false })),
    ...(italic ? italic.split(' ').map((w) => ({ w, em: true })) : []),
  ];
  const play = trigger === 'mount' ? { animate: 'shown' } : { whileInView: 'shown' };

  return (
    <Tag
      className={className}
      initial="hidden"
      {...play}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: 0.06, delayChildren: delay }}
    >
      <span className="sr-only">{italic ? `${text} ${italic}` : text}</span>
      {words.map(({ w, em }, i) => (
        // A real space between the masks keeps normal line wrapping.
        <Fragment key={i}>
          <span
            aria-hidden
            className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom"
          >
            <motion.span
              className={cn('inline-block', em && 'text-muted italic')}
              variants={{ hidden: { y: '108%' }, shown: { y: 0 } }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              {w}
            </motion.span>
          </span>{' '}
        </Fragment>
      ))}
    </Tag>
  );
}
