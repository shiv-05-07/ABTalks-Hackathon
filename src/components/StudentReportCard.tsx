import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  Award,
  CheckCircle2,
  Github,
  Linkedin,
  Loader2,
  RefreshCw,
  Sparkles,
  Target,
  Zap,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { analyzeDailySubmission } from '../services/aiReportService';
import { DAY_12_CHALLENGE, DEFAULT_STUDENT_PROFILE } from '../data/mockData';
import { AIProofAnalysisResult, RoutePath, StudentProfile } from '../types';
import {
  AlertBanner,
  FieldShell,
  GlassCard,
  PrimaryButton,
  ProgressRail,
  SecondaryButton,
  SectionEyebrow,
  VerifyBadge,
  inputClass,
} from './ui';

interface StudentReportCardProps {
  profile: StudentProfile;
  onNavigate: (path: RoutePath) => void;
  initialDayId?: number;
  initialGithubUrl?: string;
  initialCommitUrl?: string;
  initialLinkedinText?: string;
}

const SAMPLE_CODE = `// Day 12 — recruiter-friendly README helpers
export type ReadmeSection = { title: string; body: string; required: boolean };

export function buildRecruiterReadme(sections: ReadmeSection[]) {
  const ordered = sections.filter((s) => s.body.trim().length > 0);
  if (!ordered.length) throw new Error('README needs at least one section');
  return ordered.map((s) => \`## \${s.title}\\n\\n\${s.body.trim()}\\n\`).join('\\n');
}`;

const SAMPLE_POST =
  'Day 12/60 of ABTalks — rewrote my project README for recruiters. Led with the product in 3 lines, added setup + one concrete learning. Consistency compounds.';

export const StudentReportCard: React.FC<StudentReportCardProps> = ({
  profile,
  onNavigate,
  initialDayId = 12,
  initialGithubUrl,
  initialCommitUrl,
  initialLinkedinText,
}) => {
  const [dayId, setDayId] = useState(initialDayId);
  const [studentName, setStudentName] = useState(profile.name || DEFAULT_STUDENT_PROFILE.name);
  const [track, setTrack] = useState(profile.currentTrack || 'Full-Stack Web');
  const [githubUrl, setGithubUrl] = useState(
    initialGithubUrl || 'https://github.com/facebook/react'
  );
  const [commitUrl, setCommitUrl] = useState(initialCommitUrl || '');
  const [codeSnippet, setCodeSnippet] = useState(SAMPLE_CODE);
  const [linkedinPostText, setLinkedinPostText] = useState(
    initialLinkedinText || DAY_12_CHALLENGE.linkedinPrompt
  );
  const [timeSpentMinutes, setTimeSpentMinutes] = useState(45);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [errorHint, setErrorHint] = useState('');
  const [result, setResult] = useState<AIProofAnalysisResult | null>(null);

  const canSubmit = useMemo(
    () =>
      githubUrl.trim().length > 10 &&
      (codeSnippet.trim().length > 20 || linkedinPostText.trim().length > 20),
    [githubUrl, codeSnippet, linkedinPostText]
  );

  const fillDemo = () => {
    setDayId(12);
    setStudentName(DEFAULT_STUDENT_PROFILE.name);
    setTrack('Full-Stack Web');
    setGithubUrl('https://github.com/facebook/react');
    setCommitUrl('');
    setCodeSnippet(SAMPLE_CODE);
    setLinkedinPostText(SAMPLE_POST);
    setTimeSpentMinutes(42);
    setError('');
    setErrorHint('');
  };

  const runAnalysis = async () => {
    setError('');
    setErrorHint('');
    if (!githubUrl.trim()) {
      setError('GitHub repository URL is required');
      setErrorHint('Paste a public https://github.com/owner/repo link.');
      return;
    }
    if (!/github\.com\//i.test(githubUrl)) {
      setError('That doesn’t look like a GitHub URL');
      setErrorHint('Private or non-GitHub links can’t be verified for authenticity.');
      return;
    }
    if (!codeSnippet.trim() && !linkedinPostText.trim()) {
      setError('Add code or a LinkedIn caption to score');
      setErrorHint('We need something to evaluate beyond the repo link alone.');
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const analysis = await analyzeDailySubmission({
        dayId,
        studentName,
        track,
        githubUrl: githubUrl.trim(),
        commitUrl: commitUrl.trim() || undefined,
        codeSnippet,
        linkedinPostText,
        timeSpentMinutes,
        submittedAt: new Date().toISOString(),
      });
      setResult(analysis);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Analysis failed. Try again.';
      setError(message);
      setErrorHint(
        /private|not found|404/i.test(message)
          ? 'Make the repository public, double-check the owner/repo spelling, then retry.'
          : 'Check your network and URL, or use Load demo data to see a successful run.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-20 pt-4 sm:pt-6">
      <div className="mx-auto max-w-6xl space-y-4 px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl bg-hero-plane text-white">
          <div className="pointer-events-none absolute inset-0 mesh-grid opacity-50" />
          <div className="relative p-5 sm:p-7">
            <p className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-accent)]">
              <Sparkles className="h-3.5 w-3.5" />
              AI Report Card
            </p>
            <h1 className="mt-2 max-w-2xl font-display text-3xl font-bold tracking-normal sm:text-4xl">
              Turn today’s proof into a recruiter-ready signal.
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
              Live GitHub authenticity check + Gemini coaching. Private or broken links fail loudly —
              the same way a recruiter’s click would.
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {result ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <ReportResult
                result={result}
                studentName={studentName}
                track={track}
                onReset={() => setResult(null)}
                onNavigate={onNavigate}
              />
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid gap-4 lg:grid-cols-5"
            >
              <GlassCard strong className="space-y-4 p-5 lg:col-span-3">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-display text-lg font-bold">Proof intake</h2>
                  <button
                    type="button"
                    onClick={fillDemo}
                    className="text-xs font-semibold text-[color:var(--color-accent-deep)]"
                  >
                    Load demo data
                  </button>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <FieldShell label="Student name">
                    <input
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className={inputClass()}
                    />
                  </FieldShell>
                  <FieldShell label="Track">
                    <input
                      value={track}
                      onChange={(e) => setTrack(e.target.value)}
                      className={inputClass()}
                    />
                  </FieldShell>
                  <FieldShell label="Day number">
                    <input
                      type="number"
                      value={dayId}
                      onChange={(e) => setDayId(Math.max(1, Math.min(60, Number(e.target.value) || 1)))}
                      className={inputClass()}
                    />
                  </FieldShell>
                  <FieldShell label="Minutes spent">
                    <input
                      type="number"
                      value={timeSpentMinutes}
                      onChange={(e) => setTimeSpentMinutes(Math.max(1, Number(e.target.value) || 1))}
                      className={inputClass()}
                    />
                  </FieldShell>
                </div>

                <FieldShell
                  label="GitHub repository URL"
                  hint="Must be public — private repos fail verification"
                >
                  <input
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/owner/repo"
                    className={inputClass(!!error && /github|repo|private|not found/i.test(error))}
                  />
                </FieldShell>

                <FieldShell label="Commit URL (optional)">
                  <input
                    value={commitUrl}
                    onChange={(e) => setCommitUrl(e.target.value)}
                    placeholder="https://github.com/owner/repo/commit/..."
                    className={inputClass()}
                  />
                </FieldShell>

                <FieldShell label="Code snippet from today">
                  <textarea
                    value={codeSnippet}
                    onChange={(e) => setCodeSnippet(e.target.value)}
                    rows={8}
                    className={`${inputClass()} resize-y font-mono text-xs leading-relaxed`}
                  />
                </FieldShell>

                <FieldShell label="LinkedIn post caption">
                  <textarea
                    value={linkedinPostText}
                    onChange={(e) => setLinkedinPostText(e.target.value)}
                    rows={4}
                    className={`${inputClass()} resize-y`}
                  />
                </FieldShell>

                {error && (
                  <AlertBanner tone="danger" title={error}>
                    {errorHint}
                  </AlertBanner>
                )}

                {!canSubmit && !error && (
                  <AlertBanner tone="warn" title="Not ready to score yet">
                    Add a GitHub repo URL plus either a code snippet or LinkedIn caption.
                  </AlertBanner>
                )}

                <PrimaryButton
                  className="w-full"
                  disabled={!canSubmit || loading}
                  onClick={() => void runAnalysis()}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Verifying + scoring…
                    </>
                  ) : (
                    <>
                      Generate AI Report Card
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </PrimaryButton>
              </GlassCard>

              <aside className="space-y-4 lg:col-span-2">
                <GlassCard className="p-5">
                  <h3 className="font-display text-base font-bold">What you get</h3>
                  <ul className="mt-3 space-y-3 text-sm text-[color:var(--color-ink-soft)]">
                    <Feature
                      icon={<Zap className="h-4 w-4" />}
                      title="Public repo authenticity"
                      body="Live GitHub API — private/404 fails with a clear reason."
                    />
                    <Feature
                      icon={<Target className="h-4 w-4" />}
                      title="Dual-signal scoring"
                      body="Code quality + LinkedIn storytelling for recruiter skim speed."
                    />
                    <Feature
                      icon={<Sparkles className="h-4 w-4" />}
                      title="Honest fallback"
                      body="If Gemini is offline, a heuristic engine still returns a full card."
                    />
                  </ul>
                </GlassCard>
                <AlertBanner tone="info" title="Authenticity tip">
                  Use a real public repo. Fake or private links will not verify — by design.
                </AlertBanner>
              </aside>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

function ReportResult({
  result,
  studentName,
  track,
  onReset,
  onNavigate,
}: {
  result: AIProofAnalysisResult;
  studentName: string;
  track: string;
  onReset: () => void;
  onNavigate: (path: RoutePath) => void;
}) {
  return (
    <div className="space-y-4">
      <GlassCard strong className="p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <SectionEyebrow>{result.generatedBadge}</SectionEyebrow>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-normal sm:text-3xl">{studentName}</h2>
            <p className="mt-1 text-sm text-[color:var(--color-muted)]">
              Day {result.dayId} · {track} · {result.engine === 'gemini' ? 'Gemini' : 'Heuristic'}
            </p>
          </div>
          <div className="text-center">
            <ScoreRing score={result.overallScore} />
            <p className="mt-2 text-sm font-semibold">{result.performanceBand}</p>
          </div>
        </div>

        {result.verifiedRepo ? (
          <div className="mt-5 rounded-xl border border-[color:var(--color-good)]/25 bg-[color:var(--color-good-soft)] p-4">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-[color:var(--color-good)]">
                <CheckCircle2 className="h-4 w-4" />
                <p className="text-sm font-semibold">GitHub verified · public</p>
              </div>
              <VerifyBadge state="verified" />
            </div>
            <p className="mt-2 font-display text-lg font-bold">{result.verifiedRepo.fullName}</p>
            <p className="mt-1 text-sm text-[color:var(--color-ink-soft)]">
              <span className="font-mono text-xs">{result.verifiedRepo.commitSha}</span>
              {' · '}
              {result.verifiedRepo.commitMessage}
            </p>
          </div>
        ) : (
          <div className="mt-5">
            <AlertBanner tone="warn" title="GitHub could not be fully verified">
              Scores below use pasted proof only. Make the repo public and regenerate for a stronger
              authenticity signal.
            </AlertBanner>
          </div>
        )}
      </GlassCard>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Metric label="Code quality" value={result.codeQualityScore} />
        <Metric label="LinkedIn pitch" value={result.linkedinPitchScore} />
        <Metric label="Recruiter ready" value={result.recruiterReadiness} />
        <Metric label="Consistency" value={result.consistencySignal} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <GlassCard strong className="p-5">
          <h3 className="font-display text-lg font-bold">AI code review</h3>
          <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
            {result.codeReview.eleganceSummary}
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <ListBlock title="Strengths" items={result.codeReview.strengths} good />
            <ListBlock title="Level-ups" items={result.codeReview.improvements} />
          </div>
        </GlassCard>

        <GlassCard strong className="p-5">
          <h3 className="font-display text-lg font-bold">LinkedIn recruiter feedback</h3>
          <p className="mt-2 text-sm font-semibold text-[color:var(--color-accent-deep)]">
            Appeal: {result.linkedinFeedback.recruiterAppeal}
          </p>
          <p className="mt-2 text-sm text-[color:var(--color-ink-soft)]">
            {result.linkedinFeedback.visibilityTip}
          </p>
          <p className="glass-inset mt-3 rounded-xl p-3 text-sm text-[color:var(--color-ink-soft)]">
            {result.linkedinFeedback.suggestion}
          </p>
        </GlassCard>
      </div>

      <GlassCard strong className="p-5">
        <div className="flex items-center gap-2">
          <Award className="h-4 w-4 text-[color:var(--color-signal)]" />
          <h3 className="font-display text-lg font-bold">Skill signals</h3>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {result.skillSignals.map((skill) => (
            <span
              key={skill}
              className="rounded-lg bg-[color:var(--color-accent-soft)] px-2.5 py-1 text-xs font-semibold text-[color:var(--color-accent-deep)]"
            >
              {skill}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm text-[color:var(--color-muted)]">{result.timeEfficiencyNote}</p>
        <div className="mt-4 rounded-xl border border-[color:var(--color-accent)]/20 bg-[color:var(--color-accent-soft)] p-4">
          <SectionEyebrow>Next move</SectionEyebrow>
          <p className="mt-1 text-sm font-medium">{result.nextMove}</p>
        </div>
      </GlassCard>

      <div className="flex flex-col gap-2 sm:flex-row">
        <SecondaryButton className="flex-1" onClick={onReset}>
          <RefreshCw className="h-4 w-4" />
          Analyze another
        </SecondaryButton>
        <PrimaryButton className="flex-1" onClick={() => onNavigate('/dashboard')}>
          Back to dashboard
          <ArrowRight className="h-4 w-4" />
        </PrimaryButton>
      </div>
    </div>
  );
}

function ScoreRing({ score }: { score: number }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  return (
    <div className="relative mx-auto h-24 w-24">
      <svg className="h-24 w-24 -rotate-90" viewBox="0 0 88 88">
        <circle cx="44" cy="44" r={radius} stroke="rgba(18,28,40,0.1)" strokeWidth="8" fill="none" />
        <motion.circle
          cx="44"
          cy="44"
          r={radius}
          stroke="var(--color-accent)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-mono text-2xl font-bold tabular-nums">{score}</span>
      </div>
    </div>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <GlassCard strong className="p-4">
      <p className="font-mono text-[10px] font-medium uppercase tracking-wide text-[color:var(--color-muted)]">
        {label}
      </p>
      <p className="mt-1 font-mono text-2xl font-bold tabular-nums">{value}</p>
      <ProgressRail className="mt-2" value={value} />
    </GlassCard>
  );
}

function ListBlock({ title, items, good }: { title: string; items: string[]; good?: boolean }) {
  return (
    <div
      className={`rounded-xl p-3 ${
        good ? 'bg-[color:var(--color-good-soft)]' : 'glass-inset'
      }`}
    >
      <p className="font-mono text-[10px] font-semibold uppercase tracking-wide text-[color:var(--color-muted)]">
        {title}
      </p>
      <ul className="mt-2 space-y-2">
        {items.map((item) => (
          <li key={item} className="text-sm leading-snug text-[color:var(--color-ink-soft)]">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Feature({
  icon,
  title,
  body,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
}) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 text-[color:var(--color-accent-deep)]">{icon}</span>
      <div>
        <p className="font-semibold text-[color:var(--color-ink)]">{title}</p>
        <p className="mt-0.5 text-[color:var(--color-muted)]">{body}</p>
      </div>
    </li>
  );
}
