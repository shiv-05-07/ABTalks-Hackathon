import React, { useEffect, useRef, useState } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { SecondaryButton } from '../ui';

const PRESETS = [
  { label: 'Read 5', seconds: 5 * 60 },
  { label: 'Build 30', seconds: 30 * 60 },
  { label: 'Prove 10', seconds: 10 * 60 },
  { label: 'Full 45', seconds: 45 * 60 },
];

export function FocusTimer({ defaultMinutes = 45 }: { defaultMinutes?: number }) {
  const [secondsLeft, setSecondsLeft] = useState(defaultMinutes * 60);
  const [running, setRunning] = useState(false);
  const [selected, setSelected] = useState(defaultMinutes * 60);
  const endAt = useRef<number | null>(null);

  useEffect(() => {
    if (!running) return;
    endAt.current = Date.now() + secondsLeft * 1000;
    const id = window.setInterval(() => {
      if (!endAt.current) return;
      const left = Math.max(0, Math.ceil((endAt.current - Date.now()) / 1000));
      setSecondsLeft(left);
      if (left === 0) {
        setRunning(false);
        endAt.current = null;
      }
    }, 250);
    return () => window.clearInterval(id);
  }, [running]);

  const m = Math.floor(secondsLeft / 60);
  const s = secondsLeft % 60;
  const pct = Math.round(((selected - secondsLeft) / selected) * 100);

  return (
    <div>
      <h2 className="font-display text-base font-bold">Focus timer</h2>
      <p className="mt-0.5 text-xs text-[color:var(--color-muted)]">
        Tonight’s Ritual — stay on one slice
      </p>

      <p className="mt-4 text-center font-mono text-4xl font-semibold tabular-nums tracking-normal">
        {String(m).padStart(2, '0')}:{String(s).padStart(2, '0')}
      </p>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[color:var(--color-canvas-deep)]">
        <div
          className="h-full rounded-full bg-[color:var(--color-accent)] transition-[width] duration-300"
          style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
        />
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => {
              setSelected(p.seconds);
              setSecondsLeft(p.seconds);
              setRunning(false);
              endAt.current = null;
            }}
            className={`rounded-lg px-2.5 py-1.5 font-mono text-[10px] font-semibold transition ${
              selected === p.seconds
                ? 'bg-[color:var(--color-ink)] text-white'
                : 'bg-white/50 text-[color:var(--color-muted)]'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <SecondaryButton
          className="flex-1"
          onClick={() => setRunning((r) => !r)}
          disabled={secondsLeft === 0}
        >
          {running ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {running ? 'Pause' : 'Start'}
        </SecondaryButton>
        <SecondaryButton
          onClick={() => {
            setSecondsLeft(selected);
            setRunning(false);
            endAt.current = null;
          }}
        >
          <RotateCcw className="h-4 w-4" />
        </SecondaryButton>
      </div>
    </div>
  );
}
