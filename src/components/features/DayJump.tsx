import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { RoutePath } from '../../types';
import { PrimaryButton } from '../ui';

export function DayJump({
  onNavigate,
  maxDay = 60,
}: {
  onNavigate: (path: RoutePath) => void;
  maxDay?: number;
}) {
  const [value, setValue] = useState('12');

  const go = () => {
    const n = Math.min(maxDay, Math.max(1, parseInt(value, 10) || 1));
    onNavigate(`/day/${n}`);
  };

  return (
    <div className="flex items-end gap-2">
      <label className="min-w-0 flex-1">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
          Jump to day
        </span>
        <input
          type="number"
          min={1}
          max={maxDay}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') go();
          }}
          className="mt-1.5 w-full rounded-xl border border-[color:var(--color-line-strong)] bg-white/65 px-3 py-2.5 font-mono text-sm outline-none focus:border-[color:var(--color-accent)]"
        />
      </label>
      <PrimaryButton className="h-11 shrink-0 px-4" onClick={go}>
        Go
        <ArrowRight className="h-4 w-4" />
      </PrimaryButton>
    </div>
  );
}
