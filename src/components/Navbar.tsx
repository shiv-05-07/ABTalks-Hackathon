import React from 'react';
import { Flame, Sparkles } from 'lucide-react';
import { RoutePath } from '../types';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: RoutePath) => void;
  streakCount?: number;
  showStreak?: boolean;
}

const links: {
  path: RoutePath;
  label: string;
  short: string;
  match: (p: string) => boolean;
}[] = [
  { path: '/', label: 'Home', short: 'Home', match: (p) => p === '/' },
  { path: '/dashboard', label: 'Dashboard', short: 'Dash', match: (p) => p === '/dashboard' },
  { path: '/day/12', label: 'Day 12', short: 'Day 12', match: (p) => p.startsWith('/day/') },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  streakCount = 0,
  showStreak = true,
}) => {
  const onReport = currentPath === '/report-card';

  return (
    <header className="glass-nav sticky top-0 z-50">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-3 py-2.5 sm:px-6 sm:py-3">
        {/* Top: brand + AI Report (always visible) + streak */}
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="pressable flex shrink-0 items-center focus:outline-none"
            aria-label="ABTalks Home"
          >
            <span className="font-display text-[15px] font-bold text-[color:var(--color-ink)] sm:text-lg">
              <span className="text-[color:var(--color-accent)]">{'{}'}</span> ABTalks
            </span>
          </button>

          <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => onNavigate('/report-card')}
              className={`pressable inline-flex shrink-0 items-center gap-1 rounded-xl px-2.5 py-1.5 text-[11px] font-bold sm:gap-1.5 sm:px-3 sm:text-xs ${
                onReport
                  ? 'bg-[color:var(--color-accent)] text-white'
                  : 'bg-[color:var(--color-ink)] text-white'
              }`}
              aria-label="AI Report Card"
            >
              <Sparkles className="h-3.5 w-3.5 shrink-0" />
              <span className="sm:hidden">AI Report</span>
              <span className="hidden sm:inline">AI Report Card</span>
            </button>

            {showStreak ? (
              <div className="flex items-center gap-1 rounded-xl border border-[color:var(--color-line)] bg-white/60 px-2 py-1.5 text-[11px] font-semibold">
                <Flame
                  className={`h-3.5 w-3.5 ${
                    streakCount > 0
                      ? 'fill-[color:var(--color-signal)] text-[color:var(--color-signal)]'
                      : 'text-[color:var(--color-muted)]'
                  }`}
                />
                <span className="font-mono tabular-nums">{streakCount}</span>
              </div>
            ) : null}
          </div>
        </div>

        {/* Bottom: Home / Dashboard / Day 12 / AI Report again for clarity */}
        <nav
          className="flex w-full items-center gap-1 overflow-x-auto no-scrollbar rounded-xl border border-[color:var(--color-line)] bg-white/45 p-1"
          aria-label="Primary"
        >
          {links.map((link) => {
            const active = link.match(currentPath);
            return (
              <button
                key={link.path}
                type="button"
                onClick={() => onNavigate(link.path)}
                className={`pressable min-w-0 flex-1 rounded-lg px-2 py-2 text-[11px] font-semibold transition sm:text-sm ${
                  active
                    ? 'bg-[color:var(--color-ink)] text-white shadow-sm'
                    : 'text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]'
                }`}
              >
                <span className="sm:hidden">{link.short}</span>
                <span className="hidden sm:inline">{link.label}</span>
              </button>
            );
          })}
          <button
            type="button"
            onClick={() => onNavigate('/report-card')}
            className={`pressable flex shrink-0 items-center justify-center gap-1 rounded-lg px-2.5 py-2 text-[11px] font-bold transition sm:px-3.5 sm:text-sm ${
              onReport
                ? 'bg-[color:var(--color-accent)] text-white'
                : 'bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent-deep)]'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI
          </button>
        </nav>
      </div>
    </header>
  );
};
