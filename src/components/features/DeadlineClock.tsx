import React, { useEffect, useState } from 'react';
import { Timer } from 'lucide-react';

/** Countdown to midnight IST — soft deadline for today's proof. */
export function DeadlineClock({ compact = false }: { compact?: boolean }) {
  const [left, setLeft] = useState(getMsToMidnightIST);

  useEffect(() => {
    const id = window.setInterval(() => setLeft(getMsToMidnightIST()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const totalSec = Math.max(0, Math.floor(left / 1000));
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const urgent = h < 2;

  const pad = (n: number) => String(n).padStart(2, '0');

  if (compact) {
    return (
      <div
        className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 font-mono text-[11px] font-semibold tabular-nums ${
          urgent
            ? 'bg-[color:var(--color-ember-soft)] text-[color:var(--color-ember)]'
            : 'bg-[color:var(--color-ink)] text-white'
        }`}
      >
        <Timer className="h-3.5 w-3.5" />
        {pad(h)}:{pad(m)}:{pad(s)}
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl border px-4 py-3.5 ${
        urgent
          ? 'border-[color:var(--color-ember)]/30 bg-[color:var(--color-ember-soft)]'
          : 'border-[color:var(--color-line)] bg-white/65'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
            Tonight’s soft deadline · IST
          </p>
          <p className="mt-1 font-mono text-[1.65rem] font-semibold tabular-nums tracking-normal">
            {pad(h)}
            <span className="text-[color:var(--color-muted)]">:</span>
            {pad(m)}
            <span className="text-[color:var(--color-muted)]">:</span>
            {pad(s)}
          </p>
        </div>
        <Timer
          className={`h-5 w-5 ${
            urgent ? 'text-[color:var(--color-ember)]' : 'text-[color:var(--color-accent)]'
          }`}
        />
      </div>
      <p className="mt-1.5 text-xs text-[color:var(--color-muted)]">
        {urgent
          ? 'Under 2 hours — ship the smallest slice that still proves work.'
          : 'Lock GitHub + LinkedIn before midnight to keep the streak.'}
      </p>
    </div>
  );
}

function getMsToMidnightIST(): number {
  const now = Date.now();
  // IST = UTC+5:30
  const istOffsetMs = (5 * 60 + 30) * 60 * 1000;
  const istNow = new Date(now + istOffsetMs);
  const nextMidnightUtc =
    Date.UTC(istNow.getUTCFullYear(), istNow.getUTCMonth(), istNow.getUTCDate() + 1) -
    istOffsetMs;
  return nextMidnightUtc - now;
}
