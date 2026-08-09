import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[color:var(--color-line)] bg-white/40 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="font-display text-base font-bold tracking-normal text-[color:var(--color-ink)]">
            <span className="text-[color:var(--color-accent)]">{'{}'}</span> ABTalks
          </p>
          <p className="mt-1 text-sm text-[color:var(--color-muted)]">
            60 days. Public proof. Recruiter-visible consistency.
          </p>
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[color:var(--color-muted)]">
          Built for late-night builders
        </p>
      </div>
    </footer>
  );
};
