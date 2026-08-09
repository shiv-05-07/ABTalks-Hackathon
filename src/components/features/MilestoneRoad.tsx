import React from 'react';
import { Check, Flag } from 'lucide-react';
import { MILESTONES } from '../../data/featuresData';

export function MilestoneRoad({ completedDays }: { completedDays: number }) {
  return (
    <div>
      <h2 className="font-display text-lg font-bold">Milestone road</h2>
      <p className="mt-0.5 text-xs text-[color:var(--color-muted)]">
        Checkpoints that turn a streak into a story
      </p>
      <ol className="mt-4 space-y-2.5">
        {MILESTONES.map((m) => {
          const earned = completedDays >= m.day;
          const next =
            !earned &&
            MILESTONES.filter((x) => completedDays < x.day).sort((a, b) => a.day - b.day)[0]
              ?.day === m.day;
          return (
            <li
              key={m.day}
              className={`flex gap-3 rounded-xl border px-3 py-2.5 ${
                earned
                  ? 'border-[color:var(--color-accent)]/25 bg-[color:var(--color-accent-soft)]'
                  : next
                    ? 'border-[color:var(--color-signal)]/30 bg-[color:var(--color-signal-soft)]'
                    : 'border-[color:var(--color-line)] bg-white/40'
              }`}
            >
              <span
                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${
                  earned
                    ? 'bg-[color:var(--color-accent)] text-white'
                    : next
                      ? 'bg-[color:var(--color-signal)] text-white'
                      : 'bg-[color:var(--color-canvas-deep)] text-[color:var(--color-muted)]'
                }`}
              >
                {earned ? <Check className="h-3.5 w-3.5" /> : <Flag className="h-3.5 w-3.5" />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">
                  Day {m.day} · {m.title}
                </p>
                <p className="text-xs text-[color:var(--color-muted)]">{m.detail}</p>
              </div>
              {next && (
                <span className="self-center font-mono text-[10px] font-bold uppercase tracking-wider text-[color:var(--color-signal)]">
                  Next
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
