import React, { useState } from 'react';
import { Copy, Share2 } from 'lucide-react';
import { SecondaryButton } from '../ui';

export function StreakShareCard({
  name,
  streak,
  completedDays,
  track,
}: {
  name: string;
  streak: number;
  completedDays: number;
  track: string;
}) {
  const [copied, setCopied] = useState(false);

  const text = [
    `🔥 Day ${completedDays}/60 on ABTalks`,
    `Current streak: ${streak} · Track: ${track}`,
    `Building in public — GitHub commit + LinkedIn proof every night.`,
    `#ABTalks #BuildInPublic`,
  ].join('\n');

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-hero-plane p-5 text-white">
      <div className="pointer-events-none absolute inset-0 mesh-grid opacity-40" />
      <div className="relative">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
          Shareable streak card
        </p>
        <p className="mt-2 font-display text-xl font-bold tracking-normal">{name.split(' ')[0]}’s run</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <Stat label="Streak" value={String(streak)} />
          <Stat label="Days" value={`${completedDays}/60`} />
          <Stat label="Track" value={track.split(' ')[0]} />
        </div>
        <SecondaryButton
          className="mt-4 w-full border-white/15 bg-white/10 text-white hover:bg-white/20"
          onClick={copy}
        >
          {copied ? <Copy className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
          {copied ? 'Copied for LinkedIn' : 'Copy share text'}
        </SecondaryButton>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 px-2 py-2.5 text-center">
      <p className="font-mono text-lg font-bold tabular-nums">{value}</p>
      <p className="font-mono text-[9px] uppercase tracking-wider text-white/45">{label}</p>
    </div>
  );
}
