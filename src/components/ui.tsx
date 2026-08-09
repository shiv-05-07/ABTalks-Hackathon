import React from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  Loader2,
  ShieldAlert,
  ShieldCheck,
  XCircle,
} from 'lucide-react';

type Tone = 'neutral' | 'accent' | 'good' | 'warn' | 'danger' | 'info' | 'signal';

const toneMap: Record<Tone, { wrap: string; icon: string; title: string }> = {
  neutral: {
    wrap: 'border-[color:var(--color-line-strong)] bg-white/55',
    icon: 'text-[color:var(--color-muted)]',
    title: 'text-[color:var(--color-ink)]',
  },
  accent: {
    wrap: 'border-[color:var(--color-accent)]/25 bg-[color:var(--color-accent-soft)]',
    icon: 'text-[color:var(--color-accent-deep)]',
    title: 'text-[color:var(--color-accent-deep)]',
  },
  good: {
    wrap: 'border-[color:var(--color-good)]/25 bg-[color:var(--color-good-soft)]',
    icon: 'text-[color:var(--color-good)]',
    title: 'text-[color:var(--color-good)]',
  },
  warn: {
    wrap: 'border-[color:var(--color-warn)]/30 bg-[color:var(--color-warn-soft)]',
    icon: 'text-[color:var(--color-warn)]',
    title: 'text-[color:var(--color-warn)]',
  },
  danger: {
    wrap: 'border-[color:var(--color-ember)]/30 bg-[color:var(--color-ember-soft)]',
    icon: 'text-[color:var(--color-ember)]',
    title: 'text-[color:var(--color-ember)]',
  },
  info: {
    wrap: 'border-[color:var(--color-info)]/25 bg-[color:var(--color-info-soft)]',
    icon: 'text-[color:var(--color-info)]',
    title: 'text-[color:var(--color-info)]',
  },
  signal: {
    wrap: 'border-[color:var(--color-signal)]/30 bg-[color:var(--color-signal-soft)]',
    icon: 'text-[color:var(--color-signal)]',
    title: 'text-[color:var(--color-signal)]',
  },
};

export function GlassCard({
  children,
  className = '',
  strong = false,
  dark = false,
  shine = false,
  hard = false,
  ...rest
}: {
  children: React.ReactNode;
  className?: string;
  strong?: boolean;
  dark?: boolean;
  shine?: boolean;
  hard?: boolean;
} & React.HTMLAttributes<HTMLDivElement>) {
  const base = dark
    ? 'glass-dark'
    : hard
      ? 'panel-hard'
      : strong
        ? 'glass-strong'
        : 'glass';
  return (
    <div className={`${base} ${shine ? 'shine-edge' : ''} rounded-2xl ${className}`} {...rest}>
      {children}
    </div>
  );
}

export function AlertBanner({
  tone = 'neutral',
  title,
  children,
  action,
}: {
  tone?: Tone;
  title: string;
  children?: React.ReactNode;
  action?: React.ReactNode;
}) {
  const styles = toneMap[tone];
  const Icon =
    tone === 'good'
      ? CheckCircle2
      : tone === 'warn' || tone === 'signal'
        ? AlertTriangle
        : tone === 'danger'
          ? XCircle
          : tone === 'info'
            ? Info
            : ShieldAlert;

  return (
    <div
      role="alert"
      className={`flex gap-3 rounded-2xl border px-4 py-3.5 ${styles.wrap}`}
    >
      <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${styles.icon}`} />
      <div className="min-w-0 flex-1">
        <p className={`text-sm font-semibold ${styles.title}`}>{title}</p>
        {children && (
          <div className="mt-1 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
            {children}
          </div>
        )}
        {action && <div className="mt-3">{action}</div>}
      </div>
    </div>
  );
}

export type VerifyState = 'idle' | 'verifying' | 'verified' | 'failed' | 'empty';

export function VerifyBadge({ state }: { state: VerifyState }) {
  if (state === 'verifying') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-lg border border-[color:var(--color-info)]/25 bg-[color:var(--color-info-soft)] px-2.5 py-1 text-[11px] font-semibold text-[color:var(--color-info)]">
        <Loader2 className="h-3 w-3 animate-spin" />
        Checking…
      </span>
    );
  }
  if (state === 'verified') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-lg border border-[color:var(--color-good)]/25 bg-[color:var(--color-good-soft)] px-2.5 py-1 text-[11px] font-semibold text-[color:var(--color-good)]">
        <ShieldCheck className="h-3 w-3" />
        Verified
      </span>
    );
  }
  if (state === 'failed') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-lg border border-[color:var(--color-ember)]/25 bg-[color:var(--color-ember-soft)] px-2.5 py-1 text-[11px] font-semibold text-[color:var(--color-ember)]">
        <ShieldAlert className="h-3 w-3" />
        Failed
      </span>
    );
  }
  if (state === 'empty') {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-lg border border-[color:var(--color-line-strong)] bg-white/40 px-2.5 py-1 text-[11px] font-semibold text-[color:var(--color-muted)]">
        Missing
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg border border-[color:var(--color-line-strong)] bg-white/40 px-2.5 py-1 text-[11px] font-semibold text-[color:var(--color-muted)]">
      Unchecked
    </span>
  );
}

export function FieldShell({
  label,
  hint,
  error,
  children,
  trailing,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
  trailing?: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="flex items-center justify-between gap-2">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
          {label}
        </span>
        {trailing}
      </span>
      <div className="mt-1.5">{children}</div>
      {error ? (
        <p className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-[color:var(--color-ember)]">
          <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-xs text-[color:var(--color-muted)]">{hint}</p>
      ) : null}
    </label>
  );
}

export function inputClass(hasError?: boolean) {
  return `w-full rounded-xl border bg-white/65 px-3 py-2.5 font-mono text-[13px] text-[color:var(--color-ink)] outline-none transition placeholder:font-body placeholder:text-[color:var(--color-muted)]/70 backdrop-blur-sm focus:border-[color:var(--color-accent)] focus:bg-white/90 ${
    hasError
      ? 'border-[color:var(--color-ember)]/55 bg-[color:var(--color-ember-soft)]/40'
      : 'border-[color:var(--color-line-strong)]'
  }`;
}

export function PrimaryButton({
  children,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`pressable inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[color:var(--color-accent)] px-5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(15,143,120,0.28)] transition hover:bg-[color:var(--color-accent-deep)] disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none ${className}`}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  className = '',
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`pressable inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-[color:var(--color-line-strong)] bg-white/55 px-4 text-sm font-semibold text-[color:var(--color-ink)] backdrop-blur-sm transition hover:bg-white/85 disabled:opacity-45 ${className}`}
    >
      {children}
    </button>
  );
}

export function ProgressRail({ value, className = '' }: { value: number; className?: string }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div
      className={`h-2.5 overflow-hidden rounded-full bg-[color:var(--color-canvas-deep)]/90 ${className}`}
    >
      <div
        className="relative h-full rounded-full bg-gradient-to-r from-[color:var(--color-accent-deep)] to-[color:var(--color-accent)] transition-[width] duration-700 ease-out"
        style={{ width: `${pct}%` }}
      >
        <span className="absolute inset-0 animate-shimmer opacity-40" />
      </div>
    </div>
  );
}

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-accent-deep)]">
      {children}
    </p>
  );
}

export function MetaChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg border border-[color:var(--color-line-strong)] bg-white/50 px-2.5 py-1 text-xs font-medium text-[color:var(--color-ink-soft)] backdrop-blur-sm">
      {children}
    </span>
  );
}

export function StreakDial({
  streak,
  total = 60,
  size = 88,
}: {
  streak: number;
  total?: number;
  size?: number;
}) {
  const pct = Math.min(100, Math.round((streak / total) * 100));
  return (
    <div
      className="streak-ring relative flex items-center justify-center rounded-full p-[3px]"
      style={{ width: size, height: size, ['--streak-pct' as string]: `${pct}%` }}
    >
      <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-[color:var(--color-surface-solid)]">
        <span className="font-mono text-2xl font-bold leading-none tabular-nums text-[color:var(--color-signal)]">
          {streak}
        </span>
        <span className="mt-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-[color:var(--color-muted)]">
          streak
        </span>
      </div>
    </div>
  );
}
