import React from 'react';
import { buildHeatmap } from '../../data/featuresData';
import { RoutePath } from '../../types';

interface ChallengeHeatmapProps {
  completedDays: number;
  currentDay: number;
  missedYesterday: boolean;
  onNavigate: (path: RoutePath) => void;
}

const cellClass: Record<string, string> = {
  done: 'bg-[color:var(--color-accent)]',
  today: 'bg-[color:var(--color-ink)] ring-2 ring-[color:var(--color-signal)]/70',
  missed: 'bg-[color:var(--color-ember)]',
  empty: 'bg-[color:var(--color-canvas-deep)]',
  locked: 'bg-[color:var(--color-canvas-deep)]/45',
};

export function ChallengeHeatmap({
  completedDays,
  currentDay,
  missedYesterday,
  onNavigate,
}: ChallengeHeatmapProps) {
  const cells = buildHeatmap(completedDays, currentDay, missedYesterday);

  return (
    <div>
      <div className="flex items-end justify-between gap-2">
        <div>
          <h2 className="font-display text-lg font-bold">60-day signal map</h2>
          <p className="mt-0.5 text-xs text-[color:var(--color-muted)]">
            Tap any unlocked day to jump in
          </p>
        </div>
        <div className="flex items-center gap-2 font-mono text-[9px] text-[color:var(--color-muted)]">
          <Legend color="bg-[color:var(--color-accent)]" label="Done" />
          <Legend color="bg-[color:var(--color-ink)]" label="Today" />
          <Legend color="bg-[color:var(--color-ember)]" label="Miss" />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-10 gap-1.5 sm:grid-cols-[repeat(15,minmax(0,1fr))]">
        {cells.map((status, i) => {
          const day = i + 1;
          const locked = status === 'locked';
          return (
            <button
              key={day}
              type="button"
              title={`Day ${day}`}
              disabled={locked}
              onClick={() => onNavigate(`/day/${day}`)}
              className={`aspect-square rounded-[5px] transition hover:scale-110 disabled:cursor-default disabled:hover:scale-100 ${cellClass[status]}`}
              aria-label={`Day ${day}, ${status}`}
            />
          );
        })}
      </div>
    </div>
  );
}

function Legend({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <span className={`h-2 w-2 rounded-[2px] ${color}`} />
      {label}
    </span>
  );
}
