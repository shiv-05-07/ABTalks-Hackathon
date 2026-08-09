import React, { useEffect, useState } from 'react';
import { Radio } from 'lucide-react';
import { COHORT_FEED, formatMinutesAgo } from '../../data/featuresData';

export function CohortFeed() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 15000);
    return () => window.clearInterval(id);
  }, []);

  const events = COHORT_FEED.map((e) => ({
    ...e,
    minutesAgo: Math.min(120, e.minutesAgo + tick),
  }));

  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-accent)] opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--color-accent)]" />
        </span>
        <h2 className="font-display text-lg font-bold">Cohort pulse</h2>
        <Radio className="ml-auto h-3.5 w-3.5 text-[color:var(--color-muted)]" />
      </div>
      <p className="mt-0.5 text-xs text-[color:var(--color-muted)]">
        Students shipping right now across India
      </p>
      <ul className="mt-4 space-y-2">
        {events.map((event) => (
          <li
            key={event.id}
            className="glass-inset flex items-center gap-3 rounded-xl px-3 py-2.5"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[color:var(--color-ink)] font-display text-[11px] font-bold text-white">
              {event.name
                .split(' ')
                .map((p) => p[0])
                .join('')}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm">
                <span className="font-semibold">{event.name}</span>
                <span className="text-[color:var(--color-muted)]"> · {event.college}</span>
              </p>
              <p className="truncate text-xs text-[color:var(--color-ink-soft)]">{event.action}</p>
            </div>
            <span className="shrink-0 font-mono text-[10px] text-[color:var(--color-muted)]">
              {formatMinutesAgo(event.minutesAgo)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
