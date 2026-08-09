import React from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Github,
  Linkedin,
  Map,
  Moon,
  Radio,
  Share2,
  Timer,
  Users,
} from 'lucide-react';
import { motion } from 'motion/react';
import { HOW_IT_WORKS, LANDING_STATS, MOCK_TRACKS, TRUST_QUOTES } from '../data/mockData';
import { RoutePath } from '../types';
import { GlassCard, SectionEyebrow } from './ui';

const PLATFORM_FEATURES = [
  {
    icon: Timer,
    title: 'Midnight IST deadline',
    body: 'A live countdown keeps late-night sessions honest without guilt.',
  },
  {
    icon: Map,
    title: '60-day signal map',
    body: 'See done, missed, and today at a glance — jump to any unlocked day.',
  },
  {
    icon: Users,
    title: 'Cohort pulse',
    body: 'Feel the campus energy: peers locking proofs across India in real time.',
  },
  {
    icon: Share2,
    title: 'Streak share card',
    body: 'One tap copies a LinkedIn-ready update with your day and streak.',
  },
];

interface LandingPageProps {
  onNavigate: (path: RoutePath) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div>
      {/* Hero — brand-first, mobile 390px composition */}
      <section className="relative overflow-hidden bg-hero-plane text-white">
        <div className="pointer-events-none absolute inset-0 mesh-grid opacity-80" />
        <div className="pointer-events-none absolute inset-0 signal-scan" />
        <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-[color:var(--color-accent)]/35 blur-3xl" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-[color:var(--color-signal)]/20 blur-3xl" />

        <div className="relative mx-auto flex min-h-[calc(100dvh-3.5rem)] max-w-6xl flex-col justify-center px-4 py-14 sm:px-6 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-display text-[2.65rem] font-bold leading-[1.02] tracking-normal sm:text-6xl md:text-7xl">
              <span className="text-[color:var(--color-accent)]">{'{}'}</span>
              <span className="text-white"> ABTalks</span>
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 }}
            className="mt-5 font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45"
          >
            60-day coding challenge · Indian college students
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.14 }}
            className="mt-5 max-w-[18rem] font-display text-[1.7rem] font-semibold leading-[1.2] tracking-normal text-white/95 text-balance sm:max-w-lg sm:text-4xl"
          >
            Build every night. Prove it in public.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22 }}
            className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/65 sm:max-w-md sm:text-lg"
          >
            Pick a track. Ship something daily. Lock your streak with a GitHub commit and a LinkedIn
            post — consistency recruiters can click.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <button
              type="button"
              onClick={() => onNavigate('/dashboard')}
              className="pressable inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[color:var(--color-accent)] px-6 text-sm font-semibold text-white shadow-[0_14px_36px_rgba(15,143,120,0.4)]"
            >
              Start Day 1
              <ArrowRight className="h-4 w-4" />
            </button>
            <a
              href="#how-it-works"
              className="inline-flex h-12 items-center justify-center rounded-xl px-1 text-sm font-medium text-white/70 hover:text-white"
            >
              How the streak works ↓
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.42 }}
            className="mt-10"
          >
            <div className="inline-flex max-w-full items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white/60 backdrop-blur-md">
              <div className="flex -space-x-2">
                {[
                  'photo-1507003211169-0a1dd7228f2d',
                  'photo-1494790108377-be9c29b29330',
                  'photo-1500648767791-00dcc994a43e',
                  'photo-1438761681033-6461ffad8d80',
                ].map((id) => (
                  <img
                    key={id}
                    src={`https://images.unsplash.com/${id}?w=64&h=64&fit=crop&q=80`}
                    alt=""
                    className="h-8 w-8 rounded-full border-2 border-[color:var(--color-night)] object-cover"
                  />
                ))}
              </div>
              <p className="leading-snug">
                <span className="font-semibold text-white/90">10,000+</span> students shipping after
                college
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-b border-[color:var(--color-line)]">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-3 px-4 py-8 sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-10">
          {LANDING_STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`rounded-2xl border border-[color:var(--color-line)] bg-white/50 px-5 py-5 text-center backdrop-blur-sm sm:text-left ${
                i === 0 ? 'animate-rise' : i === 1 ? 'animate-rise-delay-1' : 'animate-rise-delay-2'
              }`}
            >
              <p className="font-mono text-3xl font-bold tracking-normal sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-[color:var(--color-muted)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <SectionEyebrow>How it works</SectionEyebrow>
        <h2 className="mt-2 max-w-lg font-display text-3xl font-bold tracking-normal">
          Three steps. Sixty nights.
        </h2>
        <p className="mt-3 max-w-xl text-base text-[color:var(--color-muted)]">
          Built for phones at 11pm — not another roadmap you’ll abandon after week one.
        </p>
        <div className="mt-8 space-y-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0">
          {HOW_IT_WORKS.map((item, index) => (
            <div
              key={item.step}
              className="relative overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-white/70 p-5 backdrop-blur-sm"
            >
              <span className="font-display text-5xl font-extrabold leading-none text-[color:var(--color-accent)]/15">
                {item.step}
              </span>
              <h3 className="mt-3 font-display text-xl font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-muted)]">
                {item.body}
              </p>
              {index < HOW_IT_WORKS.length - 1 && (
                <div className="pointer-events-none absolute bottom-4 right-4 hidden text-[color:var(--color-accent)]/40 sm:block">
                  <ArrowRight className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 sm:pb-20">
        <div className="grid gap-4 sm:grid-cols-2 sm:items-stretch">
          <GlassCard strong className="p-5 sm:p-7">
            <SectionEyebrow>Daily proof of work</SectionEyebrow>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-normal">
              GitHub + LinkedIn. Every day.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[color:var(--color-muted)]">
              Your streak isn’t a claim — it’s public evidence recruiters can open. Invalid links get
              rejected before they ever count.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'GitHub commit = you can build',
                'LinkedIn post = you can explain',
                'Live verification = recruiters trust the click',
              ].map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-2.5 text-sm text-[color:var(--color-ink-soft)]"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--color-accent)]" />
                  {line}
                </li>
              ))}
            </ul>
          </GlassCard>

          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-2xl border border-[color:var(--color-line)] bg-white/65 p-4 backdrop-blur-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--color-ink)] text-white">
                <Github className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">GitHub commit</p>
                <p className="text-xs text-[color:var(--color-muted)]">
                  Live API check · public repo + SHA
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-[color:var(--color-line)] bg-white/65 p-4 backdrop-blur-sm">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0a66c2] text-white">
                <Linkedin className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">LinkedIn post</p>
                <p className="text-xs text-[color:var(--color-muted)]">
                  Post URL only — profiles rejected
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-[color:var(--color-accent)]/25 bg-[color:var(--color-accent-soft)] p-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[color:var(--color-accent)] text-white">
                <Moon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[color:var(--color-accent-deep)]">
                  Tonight’s Ritual
                </p>
                <p className="text-xs text-[color:var(--color-ink-soft)]">
                  Read → build → prove in ~45 minutes
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 sm:pb-20">
        <SectionEyebrow>Built for late nights</SectionEyebrow>
        <h2 className="mt-2 max-w-lg font-display text-3xl font-bold tracking-normal">
          Features that keep you shipping.
        </h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {PLATFORM_FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-[color:var(--color-line)] bg-white/65 p-5 backdrop-blur-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[color:var(--color-accent-soft)] text-[color:var(--color-accent-deep)]">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-display text-lg font-bold">{feature.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[color:var(--color-muted)]">
                  {feature.body}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 sm:pb-20">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <SectionEyebrow>Tracks</SectionEyebrow>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-normal">
              Pick one path. Finish all 60.
            </h2>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {MOCK_TRACKS.map((track) => (
            <div
              key={track.id}
              className="relative rounded-2xl border border-[color:var(--color-line)] bg-white/70 p-5 backdrop-blur-sm"
            >
              {track.popular && (
                <span className="absolute right-4 top-4 inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[color:var(--color-accent)]">
                  <Radio className="h-3 w-3" /> Popular
                </span>
              )}
              <h3 className="pr-20 font-display text-lg font-bold">{track.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-muted)]">
                {track.description}
              </p>
              <p className="mt-4 font-mono text-[11px] text-[color:var(--color-ink-soft)]">
                {track.days} days · daily proofs
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14 sm:px-6 sm:pb-16">
        <h2 className="font-display text-2xl font-bold tracking-normal sm:text-3xl">
          Built for the after-college builder.
        </h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {TRUST_QUOTES.map((item) => (
            <blockquote
              key={item.name}
              className="rounded-2xl border border-[color:var(--color-line)] bg-white/55 p-5 backdrop-blur-sm"
            >
              <p className="text-base leading-relaxed text-[color:var(--color-ink-soft)]">
                “{item.quote}”
              </p>
              <footer className="mt-4 text-sm">
                <span className="font-semibold">{item.name}</span>
                <span className="text-[color:var(--color-muted)]"> · {item.meta}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
        <div className="relative overflow-hidden rounded-[1.75rem] bg-hero-plane px-6 py-10 text-white sm:px-10 sm:py-14">
          <div className="pointer-events-none absolute inset-0 mesh-grid opacity-40" />
          <div className="relative max-w-xl">
            <h2 className="font-display text-3xl font-bold tracking-normal sm:text-4xl">
              Commit to 60 days tonight.
            </h2>
            <p className="mt-3 text-base text-white/65">
              No perfect plan. Just Day 1, a public commit, and a post.
            </p>
            <button
              type="button"
              onClick={() => onNavigate('/dashboard')}
              className="pressable mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-semibold text-[color:var(--color-ink)] transition hover:bg-white/90"
            >
              Enter your dashboard
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
