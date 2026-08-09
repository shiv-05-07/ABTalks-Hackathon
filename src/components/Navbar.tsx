import React from 'react';
import { Flame } from 'lucide-react';
import { RoutePath } from '../types';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: RoutePath) => void;
  streakCount?: number;
  showStreak?: boolean;
}

const primaryLinks: {
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
  return (
    <header className="glass-nav sticky top-0 z-50">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-3 sm:h-16 sm:px-6">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="pressable flex shrink-0 items-center focus:outline-none"
          aria-label="ABTalks Home"
        >
          <span className="font-display text-[15px] font-bold tracking-normal text-[color:var(--color-ink)] sm:text-lg">
            <span className="text-[color:var(--color-accent)]">{'{}'}</span> ABTalks
          </span>
        </button>

        <nav className="flex items-center gap-0.5 rounded-xl border border-[color:var(--color-line)] bg-white/40 p-1 backdrop-blur-md sm:gap-1">
          {primaryLinks.map((link) => {
            const active = link.match(currentPath);
            return (
              <button
                key={link.path}
                type="button"
                onClick={() => onNavigate(link.path)}
                className={`pressable rounded-lg px-2.5 py-1.5 text-[11px] font-semibold transition sm:px-3.5 sm:text-sm ${
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
            className={`pressable hidden rounded-lg px-3.5 py-1.5 text-sm font-semibold transition lg:inline ${
              currentPath === '/report-card'
                ? 'bg-[color:var(--color-ink)] text-white'
                : 'text-[color:var(--color-muted)] hover:text-[color:var(--color-ink)]'
            }`}
          >
            AI Report
          </button>
        </nav>

        {showStreak ? (
          <div className="flex items-center gap-1.5 rounded-xl border border-[color:var(--color-line)] bg-white/50 px-2.5 py-1.5 text-[11px] font-semibold text-[color:var(--color-ink)] sm:text-xs">
            <Flame
              className={`h-3.5 w-3.5 ${
                streakCount > 0
                  ? 'fill-[color:var(--color-signal)] text-[color:var(--color-signal)]'
                  : 'text-[color:var(--color-muted)]'
              }`}
            />
            <span className="font-mono tabular-nums">{streakCount}</span>
          </div>
        ) : (
          <div className="w-9" aria-hidden />
        )}
      </div>
    </header>
  );
};
