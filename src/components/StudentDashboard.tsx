import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Flame,
  Github,
  Linkedin,
  Moon,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
  UserRound,
} from 'lucide-react';
import { motion } from 'motion/react';
import {
  EMPTY_STUDENT_PROFILE,
  FIRST_DAY_PROFILE,
  MISSED_DAY_PROFILE,
  TONIGHT_RITUAL,
  getAchievements,
  getChallengeForDay,
  getWeekDays,
} from '../data/mockData';
import { DemoMode, RoutePath, StudentProfile } from '../types';
import { ChallengeHeatmap } from './features/ChallengeHeatmap';
import { CohortFeed } from './features/CohortFeed';
import { DayJump } from './features/DayJump';
import { DeadlineClock } from './features/DeadlineClock';
import { MilestoneRoad } from './features/MilestoneRoad';
import { StreakShareCard } from './features/StreakShareCard';
import {
  AlertBanner,
  GlassCard,
  MetaChip,
  PrimaryButton,
  ProgressRail,
  SectionEyebrow,
  StreakDial,
} from './ui';

interface StudentDashboardProps {
  profile: StudentProfile;
  onNavigate: (path: RoutePath) => void;
}

const achievementIcon = {
  flame: Flame,
  commit: Github,
  share: Linkedin,
  comeback: RotateCcw,
  focus: Moon,
  rank: Trophy,
} as const;

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  profile: baseProfile,
  onNavigate,
}) => {
  const [demoMode, setDemoMode] = useState<DemoMode>('active');

  const profile = useMemo(() => {
    if (demoMode === 'first_day') return FIRST_DAY_PROFILE;
    if (demoMode === 'missed_day') return MISSED_DAY_PROFILE;
    if (demoMode === 'empty') return EMPTY_STUDENT_PROFILE;
    return baseProfile;
  }, [baseProfile, demoMode]);

  const currentDay =
    demoMode === 'first_day' || demoMode === 'empty'
      ? 1
      : Math.min(profile.completedDays + (profile.hasSubmittedToday ? 0 : 1), 60);

  const challenge = getChallengeForDay(currentDay);
  const week = getWeekDays(currentDay, profile.missedYesterday);
  const achievements = getAchievements(profile);
  const progressPct = Math.round((profile.completedDays / profile.totalDays) * 100);
  const percentile =
    profile.standingRank > 0
      ? Math.max(1, Math.round((profile.standingRank / profile.totalStudents) * 100))
      : null;

  const greeting =
    demoMode === 'empty'
      ? 'Set up your challenge home'
      : demoMode === 'first_day'
        ? `Day 1, ${profile.name.split(' ')[0]}`
        : profile.missedYesterday
          ? `Welcome back, ${profile.name.split(' ')[0]}`
          : `Good evening, ${profile.name.split(' ')[0]}`;

  return (
    <div className="pb-16 pt-4 sm:pt-6">
      <div className="mx-auto max-w-6xl space-y-4 px-4 sm:space-y-5 sm:px-6">
        {/* Identity + streak hero */}
        <GlassCard strong shine className="overflow-hidden p-0">
          <div className="flex items-stretch gap-0">
            <div className="min-w-0 flex-1 p-5">
              <div className="flex items-start gap-3">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt=""
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-white/90"
                  />
                ) : (
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--color-canvas-deep)] text-[color:var(--color-muted)]">
                    <UserRound className="h-6 w-6" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <SectionEyebrow>Student dashboard</SectionEyebrow>
                  <h1 className="mt-1 font-display text-2xl font-bold tracking-normal">
                    {greeting}
                  </h1>
                  <p className="mt-1 truncate text-sm text-[color:var(--color-muted)]">
                    {demoMode === 'empty'
                      ? 'No college, track, or profiles linked yet'
                      : `${profile.college} · ${profile.year} · ${profile.currentTrack}`}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">
                <MiniStat
                  label="Day"
                  value={String(currentDay)}
                  hint={profile.hasSubmittedToday ? 'Submitted' : 'Open'}
                />
                <MiniStat
                  label="Done"
                  value={`${profile.completedDays}`}
                  hint={`/ ${profile.totalDays}`}
                />
                <MiniStat
                  label="Rank"
                  value={percentile ? `Top ${percentile}%` : '—'}
                  hint={
                    profile.standingRank > 0
                      ? `#${profile.standingRank.toLocaleString()}`
                      : 'After Day 1'
                  }
                />
              </div>
            </div>

            <div className="flex w-[7.25rem] shrink-0 flex-col items-center justify-center border-l border-[color:var(--color-line)] bg-[color:var(--color-accent-soft)]/40 px-2 py-4 sm:w-36">
              <StreakDial streak={profile.currentStreak} />
              <p className="mt-2 text-center text-[10px] leading-snug text-[color:var(--color-muted)]">
                {profile.currentStreak === 0
                  ? profile.missedYesterday
                    ? 'Broken — recover'
                    : 'Starts tonight'
                  : `Best ${profile.longestStreak}`}
              </p>
            </div>
          </div>
        </GlassCard>

        {demoMode === 'first_day' && (
          <AlertBanner tone="accent" title="Your streak starts at zero — that’s normal">
            Submit Day 1’s GitHub commit + LinkedIn post tonight and your flame begins. Nothing is
            broken.
          </AlertBanner>
        )}

        {demoMode === 'empty' && (
          <AlertBanner
            tone="warn"
            title="Empty profile"
            action={
              <PrimaryButton className="h-11" onClick={() => onNavigate('/day/1')}>
                Start Day 1 anyway
                <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
            }
          >
            No college, track, GitHub, or LinkedIn linked. You can still ship Day 1 — standing and
            Visibility Pulse stay at zero until proof lands.
          </AlertBanner>
        )}

        {profile.missedYesterday && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <AlertBanner
              tone="signal"
              title="Comeback Protocol"
              action={
                <PrimaryButton
                  className="h-11 bg-[color:var(--color-ink)] shadow-none hover:bg-[color:var(--color-ink-soft)]"
                  onClick={() => onNavigate(`/day/${currentDay}`)}
                >
                  Restart with Day {currentDay}
                  <ArrowRight className="h-4 w-4" />
                </PrimaryButton>
              }
            >
              You missed a day. Your {profile.longestStreak}-day best still proves you can show up —
              restart cleanly tonight without the guilt spiral.
            </AlertBanner>
          </motion.div>
        )}

        {!profile.hasSubmittedToday && demoMode === 'active' && (
          <AlertBanner tone="info" title="Tonight’s proof is still open">
            Day {currentDay} isn’t locked yet. GitHub + LinkedIn both need to verify before your
            streak advances.
          </AlertBanner>
        )}

        {!profile.hasSubmittedToday && <DeadlineClock />}

        {/* Today's task */}
        <GlassCard strong className="p-5">
          <div className="flex items-center gap-2 text-[color:var(--color-muted)]">
            <Target className="h-3.5 w-3.5" />
            <SectionEyebrow>Today’s task</SectionEyebrow>
          </div>
          <h2 className="mt-2 font-display text-xl font-bold sm:text-2xl">{challenge.title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-muted)]">
            {challenge.summaryHeadline}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <MetaChip>{challenge.difficulty}</MetaChip>
            <MetaChip>{challenge.estimatedMinutes} min</MetaChip>
            <MetaChip>{challenge.track}</MetaChip>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="glass-inset rounded-xl p-3">
              <Github className="h-4 w-4" />
              <p className="mt-1.5 text-xs font-semibold">GitHub proof</p>
              <p className="text-[11px] text-[color:var(--color-muted)]">Live repo + commit check</p>
            </div>
            <div className="glass-inset rounded-xl p-3">
              <Linkedin className="h-4 w-4 text-[#0a66c2]" />
              <p className="mt-1.5 text-xs font-semibold">LinkedIn proof</p>
              <p className="text-[11px] text-[color:var(--color-muted)]">Post URL · not profile</p>
            </div>
          </div>
          <PrimaryButton className="mt-5 w-full" onClick={() => onNavigate(`/day/${currentDay}`)}>
            Open Day {currentDay}
            <ArrowRight className="h-4 w-4" />
          </PrimaryButton>
        </GlassCard>

        {/* Progress */}
        <GlassCard strong className="p-5">
          <div className="flex items-center justify-between gap-2">
            <h2 className="font-display text-lg font-bold">Progress through the challenge</h2>
            <span className="font-mono text-sm font-semibold text-[color:var(--color-accent-deep)]">
              {progressPct}%
            </span>
          </div>
          <ProgressRail className="mt-4" value={progressPct} />
          <p className="mt-3 text-sm text-[color:var(--color-muted)]">
            {profile.completedDays === 0
              ? '0 of 60 days complete. Day 1 unlocks your standing.'
              : `${profile.completedDays} done · ${profile.totalDays - profile.completedDays} left`}
          </p>

          <div className="mt-5 rounded-xl border border-[color:var(--color-accent)]/20 bg-[color:var(--color-accent-soft)] p-3.5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[color:var(--color-accent-deep)]" />
              <p className="text-sm font-semibold text-[color:var(--color-accent-deep)]">
                Recruiter Visibility Pulse
              </p>
            </div>
            <div className="mt-3 flex items-end gap-3">
              <p className="font-mono text-3xl font-bold leading-none tabular-nums">
                {profile.visibilityScore}
                <span className="text-base font-semibold text-[color:var(--color-muted)]">
                  /100
                </span>
              </p>
              <div className="mb-1 h-1.5 flex-1 overflow-hidden rounded-full bg-white/50">
                <div
                  className="h-full rounded-full bg-[color:var(--color-accent)] transition-all duration-700"
                  style={{ width: `${profile.visibilityScore}%` }}
                />
              </div>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-[color:var(--color-ink-soft)]">
              {profile.visibilityScore === 0
                ? 'No public signal yet — verified GitHub + LinkedIn proofs raise this score.'
                : `${profile.githubCommitsCount} commits · ${profile.linkedinPostsCount} posts counted.`}
            </p>
          </div>
        </GlassCard>

        {/* Tonight's Ritual — thoughtful idea */}
        <GlassCard strong className="p-5">
          <SectionEyebrow>
            <span className="inline-flex items-center gap-1.5">
              <Moon className="h-3.5 w-3.5" /> Tonight’s Ritual
            </span>
          </SectionEyebrow>
          <h2 className="mt-1 font-display text-xl font-bold">
            {profile.hasSubmittedToday
              ? 'You’re done for tonight'
              : `~${challenge.estimatedMinutes} min late-night flow`}
          </h2>
          <p className="mt-1 text-sm text-[color:var(--color-muted)]">
            Read the brief, ship a slice, submit verifiable proof.
          </p>
          <ol className="mt-4 space-y-2.5">
            {TONIGHT_RITUAL.map((step, index) => (
              <li key={step.id} className="glass-inset flex gap-3 rounded-xl p-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[color:var(--color-ink)] font-display text-xs font-bold text-white">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">{step.title}</p>
                  <p className="mt-0.5 text-xs text-[color:var(--color-muted)]">{step.detail}</p>
                </div>
                <span className="font-mono text-xs text-[color:var(--color-muted)]">
                  {step.minutes}m
                </span>
              </li>
            ))}
          </ol>
        </GlassCard>

        {/* Week strip */}
        <GlassCard strong className="p-5">
          <h2 className="font-display text-lg font-bold">This week</h2>
          <div className="mt-4 grid grid-cols-7 gap-1.5">
            {week.map((day) => {
              const styles =
                day.status === 'done'
                  ? 'bg-[color:var(--color-accent)] text-white'
                  : day.status === 'today'
                    ? 'bg-[color:var(--color-ink)] text-white ring-2 ring-[color:var(--color-accent)]/45'
                    : day.status === 'missed'
                      ? 'bg-[color:var(--color-ember-soft)] text-[color:var(--color-ember)]'
                      : 'glass-inset text-[color:var(--color-muted)]';

              return (
                <button
                  key={`${day.label}-${day.dayId}`}
                  type="button"
                  onClick={() => {
                    if (day.status !== 'locked') onNavigate(`/day/${day.dayId}`);
                  }}
                  className={`pressable flex flex-col items-center rounded-xl px-0.5 py-2.5 text-center ${styles}`}
                >
                  <span className="text-[10px] font-medium opacity-80">{day.label}</span>
                  <span className="mt-1 font-display text-sm font-bold">{day.dayId}</span>
                </button>
              );
            })}
          </div>
        </GlassCard>

        <GlassCard strong className="p-5">
          <ChallengeHeatmap
            completedDays={profile.completedDays}
            currentDay={currentDay}
            missedYesterday={profile.missedYesterday}
            onNavigate={onNavigate}
          />
          <div className="mt-5 border-t border-[color:var(--color-line)] pt-4">
            <DayJump onNavigate={onNavigate} />
          </div>
        </GlassCard>

        <div className="grid gap-4 sm:grid-cols-2">
          <GlassCard strong className="p-5">
            <MilestoneRoad completedDays={profile.completedDays} />
          </GlassCard>
          <GlassCard strong className="p-5">
            <CohortFeed />
          </GlassCard>
        </div>

        <StreakShareCard
          name={profile.name}
          streak={profile.currentStreak}
          completedDays={profile.completedDays}
          track={profile.currentTrack}
        />

        {/* Achievements / standing */}
        <GlassCard strong className="p-5">
          <h2 className="font-display text-lg font-bold">Standing & achievements</h2>
          <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {achievements.map((item) => {
              const Icon = achievementIcon[item.icon];
              return (
                <div
                  key={item.id}
                  className={`rounded-xl border p-3 ${
                    item.earned
                      ? 'border-[color:var(--color-accent)]/25 bg-[color:var(--color-accent-soft)]'
                      : 'border-[color:var(--color-line)] bg-white/35 opacity-55'
                  }`}
                >
                  <Icon
                    className={`h-4 w-4 ${
                      item.earned
                        ? 'text-[color:var(--color-accent-deep)]'
                        : 'text-[color:var(--color-muted)]'
                    }`}
                  />
                  <p className="mt-2 text-sm font-semibold">{item.title}</p>
                  <p className="mt-0.5 text-xs text-[color:var(--color-muted)]">{item.description}</p>
                </div>
              );
            })}
          </div>
        </GlassCard>

        <button
          type="button"
          onClick={() => onNavigate('/report-card')}
          className="glass pressable flex w-full items-center justify-between gap-3 rounded-2xl px-5 py-4 text-left"
        >
          <div>
            <SectionEyebrow>Bonus</SectionEyebrow>
            <p className="mt-0.5 font-display text-base font-bold">AI Report Card</p>
            <p className="mt-0.5 text-xs text-[color:var(--color-muted)]">
              Score today’s proof — fails honestly when links aren’t public
            </p>
          </div>
          <ArrowRight className="h-4 w-4 shrink-0 text-[color:var(--color-muted)]" />
        </button>

        <div className="rounded-2xl border border-dashed border-[color:var(--color-line-strong)] bg-white/35 p-4">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
            Preview edge cases
          </p>
          <div className="mt-2.5 flex gap-1.5 overflow-x-auto no-scrollbar">
            {(
              [
                ['active', 'Active streak'],
                ['first_day', 'First day'],
                ['missed_day', 'Missed day'],
                ['empty', 'Empty profile'],
              ] as const
            ).map(([mode, label]) => (
              <button
                key={mode}
                type="button"
                onClick={() => setDemoMode(mode)}
                className={`pressable shrink-0 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                  demoMode === mode
                    ? 'bg-[color:var(--color-ink)] text-white'
                    : 'bg-white/50 text-[color:var(--color-muted)]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

function MiniStat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="glass-inset rounded-xl p-2.5">
      <p className="font-mono text-[9px] font-medium uppercase tracking-wide text-[color:var(--color-muted)]">
        {label}
      </p>
      <p className="mt-0.5 truncate font-mono text-lg font-bold tabular-nums leading-tight">
        {value}
      </p>
      <p className="mt-0.5 truncate text-[10px] text-[color:var(--color-muted)]">{hint}</p>
    </div>
  );
}
