import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

function format(timeZone: string) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).format(new Date());
}

/** Live HH:MM:SS clock for a time zone. Each digit rolls up when it changes. */
export function LiveClock({ timeZone }: { timeZone: string }) {
  const [time, setTime] = useState(() => format(timeZone));

  useEffect(() => {
    const tick = () => setTime(format(timeZone));
    let interval: number | undefined;
    // Start on the next whole second so the display never skips or repeats a second.
    const timeout = window.setTimeout(
      () => {
        tick();
        interval = window.setInterval(tick, 1000);
      },
      1000 - (Date.now() % 1000)
    );
    return () => {
      window.clearTimeout(timeout);
      window.clearInterval(interval);
    };
  }, [timeZone]);

  return (
    <span className="font-mono font-medium text-text tabular-nums">
      {/* Screen readers get the hour and minute only, so they are not interrupted every second. */}
      <span className="sr-only">{time.slice(0, 5)}</span>
      <span aria-hidden>
        {time.split('').map((ch, i) =>
          ch === ':' ? (
            <span key={i} className="text-faint">
              :
            </span>
          ) : (
            // Clip to the height of the digits (not the whole line), so a digit is only
            // visible inside its own slot while it rolls in or out.
            <span
              key={i}
              className="relative inline-block"
              style={{ clipPath: 'inset(0.28em 0 0.4em 0)' }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={ch}
                  className="inline-block"
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  {ch}
                </motion.span>
              </AnimatePresence>
            </span>
          )
        )}
      </span>
    </span>
  );
}
