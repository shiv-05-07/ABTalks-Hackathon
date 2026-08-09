import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  Circle,
  Clock,
  Copy,
  Flame,
  Github,
  Linkedin,
  Loader2,
  Sparkles,
  Award,
  ShieldCheck,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { DayChallenge, ProofSubmission, RoutePath } from '../types';
import {
  GithubLiveProof,
  parseGithubCommitUrl,
  parseGithubRepoUrl,
  parseLinkedinPostUrl,
  verifyGithubProof,
  verifyLinkedinProof,
} from '../services/proofVerifyService';
import { DeadlineClock } from './features/DeadlineClock';
import { FocusTimer } from './features/FocusTimer';
import { useToast } from './features/ToastHost';
import {
  AlertBanner,
  FieldShell,
  GlassCard,
  MetaChip,
  PrimaryButton,
  SecondaryButton,
  VerifyBadge,
  VerifyState,
  inputClass,
} from './ui';

interface ChallengeDayProps {
  dayId: number;
  challenge: DayChallenge;
  existingSubmission?: ProofSubmission;
  streakCount: number;
  onNavigate: (path: RoutePath) => void;
  onSubmitProof: (submission: ProofSubmission) => void;
}

type Step = 'brief' | 'github' | 'linkedin' | 'review';

type AlertTone = 'danger' | 'warn' | 'info' | 'good' | 'signal';

function githubState(
  repo: string,
  commit: string,
  verified: boolean,
  failed: boolean,
  verifying: boolean
): VerifyState {
  if (verifying) return 'verifying';
  if (verified) return 'verified';
  if (failed) return 'failed';
  if (!repo.trim() || !commit.trim()) return 'empty';
  return 'idle';
}

function linkedinState(
  url: string,
  verified: boolean,
  failed: boolean,
  verifying: boolean
): VerifyState {
  if (verifying) return 'verifying';
  if (verified) return 'verified';
  if (failed) return 'failed';
  if (!url.trim()) return 'empty';
  return 'idle';
}

export const ChallengeDay: React.FC<ChallengeDayProps> = ({
  dayId,
  challenge,
  existingSubmission,
  streakCount,
  onNavigate,
  onSubmitProof,
}) => {
  const toast = useToast();
  const alreadyDone = existingSubmission?.status === 'verified';

  const [step, setStep] = useState<Step>(alreadyDone ? 'review' : 'brief');
  const [repoUrl, setRepoUrl] = useState(
    existingSubmission?.githubRepoUrl || challenge.defaultRepoUrl
  );
  const [commitUrl, setCommitUrl] = useState(
    existingSubmission?.githubCommitUrl || challenge.defaultCommitUrl
  );
  const [linkedinUrl, setLinkedinUrl] = useState(
    existingSubmission?.linkedinUrl || challenge.defaultLinkedinUrl
  );
  const [notes, setNotes] = useState(existingSubmission?.notes || '');
  const [githubVerified, setGithubVerified] = useState(
    existingSubmission?.isGithubVerified ?? false
  );
  const [linkedinVerified, setLinkedinVerified] = useState(
    existingSubmission?.isLinkedinVerified ?? false
  );
  const [githubFailed, setGithubFailed] = useState(false);
  const [linkedinFailed, setLinkedinFailed] = useState(false);
  const [verifying, setVerifying] = useState<'github' | 'linkedin' | null>(null);
  const [submitted, setSubmitted] = useState(alreadyDone);
  const [copied, setCopied] = useState(false);
  const [alert, setAlert] = useState<{ tone: AlertTone; title: string; body: string } | null>(
    null
  );
  const [fieldErrors, setFieldErrors] = useState<{
    repo?: string;
    commit?: string;
    linkedin?: string;
  }>({});
  const [liveProof, setLiveProof] = useState<GithubLiveProof | null>(null);
  const [verifyMode, setVerifyMode] = useState<'live' | 'format' | null>(null);

  useEffect(() => {
    setStep(alreadyDone ? 'review' : 'brief');
    setRepoUrl(existingSubmission?.githubRepoUrl || challenge.defaultRepoUrl);
    setCommitUrl(existingSubmission?.githubCommitUrl || challenge.defaultCommitUrl);
    setLinkedinUrl(existingSubmission?.linkedinUrl || challenge.defaultLinkedinUrl);
    setNotes(existingSubmission?.notes || '');
    setGithubVerified(existingSubmission?.isGithubVerified ?? false);
    setLinkedinVerified(existingSubmission?.isLinkedinVerified ?? false);
    setGithubFailed(false);
    setLinkedinFailed(false);
    setSubmitted(alreadyDone);
    setAlert(null);
    setFieldErrors({});
    setLiveProof(null);
    setVerifyMode(null);
  }, [dayId, challenge, existingSubmission, alreadyDone]);

  const steps: { id: Step; label: string }[] = [
    { id: 'brief', label: 'Brief' },
    { id: 'github', label: 'GitHub' },
    { id: 'linkedin', label: 'LinkedIn' },
    { id: 'review', label: 'Submit' },
  ];

  const stepIndex = steps.findIndex((s) => s.id === step);

  const ghStatus = useMemo(
    () => githubState(repoUrl, commitUrl, githubVerified, githubFailed, verifying === 'github'),
    [repoUrl, commitUrl, githubVerified, githubFailed, verifying]
  );

  const liStatus = useMemo(
    () => linkedinState(linkedinUrl, linkedinVerified, linkedinFailed, verifying === 'linkedin'),
    [linkedinUrl, linkedinVerified, linkedinFailed, verifying]
  );

  const runGithubVerify = async () => {
    setAlert(null);
    setFieldErrors({});
    setGithubFailed(false);
    setGithubVerified(false);
    setLiveProof(null);
    setVerifyMode(null);
    setVerifying('github');

    const result = await verifyGithubProof(repoUrl, commitUrl, {
      // Keep hackathon demo flow usable when the canned mock repo isn't real.
      allowFormatOnlyDemo: true,
    });

    setVerifying(null);

    if (result.ok === false) {
      setGithubFailed(true);
      const { issue } = result;
      if (issue.field === 'repo' || issue.field === 'not_found' || issue.field === 'private') {
        setFieldErrors({ repo: issue.title });
      } else if (issue.field === 'commit') {
        setFieldErrors({ commit: issue.title });
      } else if (issue.field === 'repo_commit_mismatch') {
        setFieldErrors({ repo: 'Doesn’t match commit', commit: 'Doesn’t match repository' });
      }

      setAlert({
        tone: 'danger',
        title: issue.title,
        body: issue.body,
      });
      toast.push({ tone: 'danger', title: issue.title, body: issue.body });
      return;
    }

    setGithubVerified(true);
    setGithubFailed(false);
    setLiveProof(result.proof);
    setVerifyMode(result.mode);
    const title =
      result.mode === 'live'
        ? `Verified · ${result.proof.fullName}`
        : `Format verified · ${result.proof.fullName}`;
    const body =
      result.mode === 'live'
        ? `Public repo confirmed. Commit ${result.proof.commitSha}: “${result.proof.commitMessage}” by ${result.proof.commitAuthor}.`
        : 'Repo/commit URLs are structurally valid. Live GitHub lookup couldn’t find this demo repo — paste a real public repo for a full API check.';
    setAlert({ tone: 'good', title, body });
    toast.push({ tone: 'good', title, body });
  };

  const runLinkedinVerify = async () => {
    setAlert(null);
    setFieldErrors({});
    setLinkedinFailed(false);
    setLinkedinVerified(false);
    setVerifying('linkedin');

    const result = await verifyLinkedinProof(linkedinUrl);
    setVerifying(null);

    if (result.ok === false) {
      setLinkedinFailed(true);
      setFieldErrors({ linkedin: result.issue.title });
      setAlert({
        tone: 'danger',
        title: result.issue.title,
        body: result.issue.body,
      });
      toast.push({
        tone: 'danger',
        title: result.issue.title,
        body: result.issue.body,
      });
      return;
    }

    setLinkedinVerified(true);
    setLinkedinFailed(false);
    const title = 'LinkedIn post URL accepted';
    const body = `Detected a ${result.meta.kind} link. Profile pages alone never count — this one looks like real proof.`;
    setAlert({ tone: 'good', title, body });
    toast.push({ tone: 'good', title, body });
  };

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(challenge.linkedinPrompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setAlert({
        tone: 'warn',
        title: 'Couldn’t copy automatically',
        body: 'Select the draft text manually and copy it to LinkedIn.',
      });
    }
  };

  const handleSubmit = () => {
    if (!githubVerified || !linkedinVerified) {
      setAlert({
        tone: 'danger',
        title: 'Proof incomplete',
        body: !githubVerified && !linkedinVerified
          ? 'Verify GitHub and LinkedIn before submitting. Unverified links won’t count toward your streak.'
          : !githubVerified
            ? 'GitHub still isn’t verified — fix the repo/commit links first.'
            : 'LinkedIn still isn’t verified — paste a real post URL and verify.',
      });
      if (!githubVerified) setStep('github');
      else setStep('linkedin');
      return;
    }

    onSubmitProof({
      dayId,
      githubRepoUrl: repoUrl.trim(),
      githubCommitUrl: commitUrl.trim(),
      linkedinUrl: linkedinUrl.trim(),
      notes: notes.trim(),
      submittedAt: new Date().toISOString(),
      isGithubVerified: true,
      isLinkedinVerified: true,
      status: 'verified',
    });
    setSubmitted(true);
    setStep('review');
    setAlert({
      tone: 'good',
      title: `Day ${dayId} locked`,
      body: 'Both proofs are verified. Your public streak updates on the dashboard.',
    });
    toast.push({
      tone: 'good',
      title: `Day ${dayId} locked`,
      body: 'Streak + visibility updated. See you tomorrow night.',
    });
  };

  const invalidateGithub = () => {
    setGithubVerified(false);
    setGithubFailed(false);
    setLiveProof(null);
    setVerifyMode(null);
    setFieldErrors((prev) => ({ ...prev, repo: undefined, commit: undefined }));
  };

  const invalidateLinkedin = () => {
    setLinkedinVerified(false);
    setLinkedinFailed(false);
    setFieldErrors((prev) => ({ ...prev, linkedin: undefined }));
  };

  const primaryAction = () => {
    if (step === 'brief') setStep('github');
    else if (step === 'github' && githubVerified) setStep('linkedin');
    else if (step === 'github') void runGithubVerify();
    else if (step === 'linkedin' && linkedinVerified) setStep('review');
    else if (step === 'linkedin') void runLinkedinVerify();
    else if (step === 'review') handleSubmit();
  };

  const primaryLabel =
    step === 'brief'
      ? 'Start proof submission'
      : step === 'github'
        ? githubVerified
          ? 'Next: LinkedIn'
          : 'Verify GitHub'
        : step === 'linkedin'
          ? linkedinVerified
            ? 'Review'
            : 'Verify LinkedIn'
          : `Submit Day ${dayId}`;

  return (
    <div className="min-h-[calc(100vh-6.5rem)] pb-10 sm:pb-16">
      <div className="mx-auto max-w-6xl px-3 pt-3 sm:px-6 sm:pt-6">
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => onNavigate('/dashboard')}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[color:var(--color-muted)] transition hover:text-[color:var(--color-ink)]"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </button>
          {!submitted && <DeadlineClock compact />}
        </div>

        {/* Sticky top CTA — mobile-first, not bottom */}
        {!submitted && (
          <div className="sticky top-[6.5rem] z-30 mt-3 rounded-2xl border border-[color:var(--color-line)] bg-white/90 p-2 shadow-sm backdrop-blur-xl sm:top-[7rem]">
            <PrimaryButton className="w-full" onClick={primaryAction}>
              {verifying ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {primaryLabel}
            </PrimaryButton>
          </div>
        )}

        <GlassCard strong className="mt-3 p-4 sm:mt-4 sm:p-5" shine>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[color:var(--color-accent-deep)]">
              Day {dayId} / 60
            </span>
            <span className="text-[color:var(--color-line-strong)]">·</span>
            <span className="inline-flex items-center gap-1 text-xs font-medium text-[color:var(--color-muted)]">
              <Flame
                className={`h-3.5 w-3.5 ${
                  streakCount > 0
                    ? 'fill-[color:var(--color-signal)] text-[color:var(--color-signal)]'
                    : 'text-[color:var(--color-muted)]'
                }`}
              />
              {streakCount > 0 ? `${streakCount}-day streak` : 'Streak starts after submit'}
            </span>
          </div>
          <h1 className="mt-2 font-display text-2xl font-bold tracking-normal text-[color:var(--color-ink)] sm:text-3xl">
            {challenge.title}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-muted)] sm:text-base">
            {challenge.summaryHeadline} {challenge.summarySubtext}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <MetaChip>
              <Clock className="h-3.5 w-3.5" />
              {challenge.estimatedMinutes} min
            </MetaChip>
            <MetaChip>{challenge.difficulty}</MetaChip>
            <MetaChip>{challenge.track}</MetaChip>
          </div>
        </GlassCard>

        <div className="glass mt-4 flex gap-1 rounded-2xl p-1">
          {steps.map((item, index) => {
            const done =
              index < stepIndex ||
              (item.id === 'github' && githubVerified) ||
              (item.id === 'linkedin' && linkedinVerified) ||
              (item.id === 'review' && submitted);
            const active = item.id === step;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setStep(item.id)}
                className={`pressable flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-xs font-semibold transition sm:text-sm ${
                  active
                    ? 'bg-[color:var(--color-ink)] text-white shadow-sm'
                    : done
                      ? 'text-[color:var(--color-accent-deep)]'
                      : 'text-[color:var(--color-muted)]'
                }`}
              >
                {done && !active ? (
                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                ) : (
                  <Circle className={`h-3.5 w-3.5 shrink-0 ${active ? 'text-white/70' : ''}`} />
                )}
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {alert && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-4"
            >
              <AlertBanner tone={alert.tone} title={alert.title}>
                {alert.body}
              </AlertBanner>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-3 grid gap-3 sm:mt-4 sm:gap-4 lg:grid-cols-5">
          {/* Tools first on mobile */}
          <aside className="order-1 space-y-3 lg:order-2 lg:col-span-2 lg:space-y-4">
            <GlassCard className="p-4 sm:p-5">
              <div className="flex items-center gap-2 text-[color:var(--color-accent-deep)]">
                <Sparkles className="h-4 w-4" />
                <h2 className="font-display text-base font-bold">Proof status</h2>
              </div>
              <div className="mt-3 space-y-2">
                <StatusLine label="GitHub" state={ghStatus} />
                <StatusLine label="LinkedIn" state={liStatus} />
                <StatusLine label="Day submission" state={submitted ? 'verified' : 'idle'} />
              </div>
            </GlassCard>

            <GlassCard className="p-4 sm:p-5">
              <FocusTimer defaultMinutes={challenge.estimatedMinutes} />
            </GlassCard>

            <GlassCard className="hidden p-5 lg:block">
              <h2 className="font-display text-base font-bold">Late-night tip</h2>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-muted)]">
                Ship the smallest slice that meets acceptance criteria. One concrete learning in the
                post beats a long thread you never publish.
              </p>
            </GlassCard>
          </aside>

          <div className="order-2 lg:order-1 lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                <GlassCard strong className="p-5">
                  {step === 'brief' && (
                    <div className="space-y-5">
                      <div className="glass-inset rounded-xl p-4">
                        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-accent-deep)]">
                          Required proof today
                        </p>
                        <div className="mt-3 space-y-2">
                          <div className="flex items-center justify-between gap-3 rounded-xl border border-[color:var(--color-line)] bg-white/60 px-3 py-2.5">
                            <div className="flex items-center gap-3">
                              <Github className="h-4 w-4" />
                              <div>
                                <p className="text-sm font-semibold">GitHub repo + commit</p>
                                <p className="text-xs text-[color:var(--color-muted)]">
                                  Live public API check
                                </p>
                              </div>
                            </div>
                            <VerifyBadge state={ghStatus} />
                          </div>
                          <div className="flex items-center justify-between gap-3 rounded-xl border border-[color:var(--color-line)] bg-white/60 px-3 py-2.5">
                            <div className="flex items-center gap-3">
                              <Linkedin className="h-4 w-4 text-[#0a66c2]" />
                              <div>
                                <p className="text-sm font-semibold">LinkedIn post URL</p>
                                <p className="text-xs text-[color:var(--color-muted)]">
                                  Profile alone won’t verify
                                </p>
                              </div>
                            </div>
                            <VerifyBadge state={liStatus} />
                          </div>
                        </div>
                      </div>

                      <Block title="What to build today">
                        <ul className="space-y-2.5">
                          {challenge.brief.map((line) => (
                            <li
                              key={line}
                              className="flex gap-2 text-sm leading-relaxed text-[color:var(--color-ink-soft)]"
                            >
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--color-accent)]" />
                              {line}
                            </li>
                          ))}
                        </ul>
                      </Block>

                      <Block title="Why it matters">
                        <p className="text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
                          {challenge.whyItMatters}
                        </p>
                      </Block>

                      <Block title="Deliverables">
                        <ul className="grid gap-2">
                          {challenge.deliverables.map((item) => (
                            <li
                              key={item}
                              className="glass-inset rounded-lg px-3 py-2 text-sm text-[color:var(--color-ink-soft)]"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </Block>

                      <Block title="Done when">
                        <ul className="space-y-2">
                          {challenge.acceptanceCriteria.map((item) => (
                            <li
                              key={item}
                              className="flex gap-2 text-sm text-[color:var(--color-ink-soft)]"
                            >
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-accent)]" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </Block>

                      <div className="flex flex-wrap gap-2">
                        {challenge.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-lg bg-[color:var(--color-accent-soft)] px-2.5 py-1 text-xs font-semibold text-[color:var(--color-accent-deep)]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>

                      <PrimaryButton className="w-full" onClick={() => setStep('github')}>
                        Start submission — GitHub first
                      </PrimaryButton>
                    </div>
                  )}

                  {step === 'github' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <Github className="h-5 w-5" />
                          <h2 className="font-display text-lg font-bold">GitHub proof</h2>
                        </div>
                        <VerifyBadge state={ghStatus} />
                      </div>

                      {!githubVerified && (
                        <AlertBanner tone="info" title="Live verification">
                          We hit GitHub’s public API: repo must exist, be public, and the commit SHA
                          must belong to that repo. Invalid, private, or mismatched links fail with
                          a clear alert.
                        </AlertBanner>
                      )}

                      <FieldShell
                        label="Repository URL"
                        hint="Must be public — private repos fail verification"
                        error={fieldErrors.repo}
                      >
                        <input
                          value={repoUrl}
                          onChange={(e) => {
                            setRepoUrl(e.target.value);
                            invalidateGithub();
                          }}
                          onBlur={() => {
                            if (repoUrl.trim() && !parseGithubRepoUrl(repoUrl)) {
                              setFieldErrors((p) => ({
                                ...p,
                                repo: 'Invalid repository URL format',
                              }));
                            }
                          }}
                          placeholder="https://github.com/you/repo"
                          className={inputClass(Boolean(fieldErrors.repo) || githubFailed)}
                          autoComplete="off"
                          spellCheck={false}
                        />
                      </FieldShell>

                      <FieldShell
                        label="Commit URL"
                        hint="Open the commit on GitHub → copy the address bar"
                        error={fieldErrors.commit}
                      >
                        <input
                          value={commitUrl}
                          onChange={(e) => {
                            setCommitUrl(e.target.value);
                            invalidateGithub();
                          }}
                          onBlur={() => {
                            if (commitUrl.trim() && !parseGithubCommitUrl(commitUrl)) {
                              setFieldErrors((p) => ({
                                ...p,
                                commit: 'Needs /commit/ + SHA in the URL',
                              }));
                            }
                          }}
                          placeholder="https://github.com/you/repo/commit/abc1234"
                          className={inputClass(Boolean(fieldErrors.commit) || githubFailed)}
                          autoComplete="off"
                          spellCheck={false}
                        />
                      </FieldShell>

                      {/* Quick invalid-test helpers for judges / demos */}
                      <div className="flex flex-wrap gap-1.5">
                        <button
                          type="button"
                          className="rounded-lg border border-[color:var(--color-line)] bg-white/40 px-2.5 py-1.5 font-mono text-[10px] font-semibold text-[color:var(--color-muted)]"
                          onClick={() => {
                            setRepoUrl('https://not-github.com/fake/repo');
                            setCommitUrl('https://github.com/fake/repo/tree/main');
                            invalidateGithub();
                            setAlert({
                              tone: 'warn',
                              title: 'Loaded invalid sample links',
                              body: 'Hit Verify GitHub — you’ll get a precise failure alert.',
                            });
                          }}
                        >
                          Try invalid URLs
                        </button>
                        <button
                          type="button"
                          className="rounded-lg border border-[color:var(--color-line)] bg-white/40 px-2.5 py-1.5 font-mono text-[10px] font-semibold text-[color:var(--color-muted)]"
                          onClick={() => {
                            setRepoUrl(challenge.defaultRepoUrl);
                            setCommitUrl(challenge.defaultCommitUrl);
                            invalidateGithub();
                          }}
                        >
                          Reset demo links
                        </button>
                      </div>

                      {liveProof && githubVerified && (
                        <div className="rounded-xl border border-[color:var(--color-good)]/25 bg-[color:var(--color-good-soft)] p-3.5">
                          <div className="flex items-center gap-2 text-[color:var(--color-good)]">
                            <ShieldCheck className="h-4 w-4" />
                            <p className="text-sm font-semibold">
                              {verifyMode === 'live' ? 'Live GitHub proof' : 'Format-verified proof'}
                            </p>
                          </div>
                          <dl className="mt-2 space-y-1 font-mono text-[11px] text-[color:var(--color-ink-soft)]">
                            <div className="flex justify-between gap-2">
                              <dt className="text-[color:var(--color-muted)]">Repo</dt>
                              <dd className="truncate font-semibold">{liveProof.fullName}</dd>
                            </div>
                            <div className="flex justify-between gap-2">
                              <dt className="text-[color:var(--color-muted)]">SHA</dt>
                              <dd className="font-semibold">{liveProof.commitSha}</dd>
                            </div>
                            <div className="flex justify-between gap-2">
                              <dt className="text-[color:var(--color-muted)]">Message</dt>
                              <dd className="truncate">{liveProof.commitMessage}</dd>
                            </div>
                          </dl>
                        </div>
                      )}

                      <div className="flex flex-col gap-2 sm:flex-row">
                        <SecondaryButton
                          onClick={runGithubVerify}
                          disabled={verifying === 'github'}
                          className="sm:flex-none"
                        >
                          {verifying === 'github' ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : null}
                          {githubVerified ? 'Re-check GitHub' : 'Verify GitHub'}
                        </SecondaryButton>
                        <PrimaryButton
                          className="flex-1"
                          disabled={!githubVerified}
                          onClick={() => setStep('linkedin')}
                        >
                          Continue to LinkedIn
                        </PrimaryButton>
                      </div>
                    </div>
                  )}

                  {step === 'linkedin' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <Linkedin className="h-5 w-5 text-[#0a66c2]" />
                          <h2 className="font-display text-lg font-bold">LinkedIn proof</h2>
                        </div>
                        <VerifyBadge state={liStatus} />
                      </div>

                      {!linkedinVerified && (
                        <AlertBanner tone="info" title="Paste the post — not your profile">
                          After publishing, open the post → Share → Copy link. Profile URLs
                          (`linkedin.com/in/…`) are rejected on purpose.
                        </AlertBanner>
                      )}

                      <div className="glass-inset rounded-xl p-4">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-[color:var(--color-muted)]">
                            Post draft
                          </p>
                          <button
                            type="button"
                            onClick={copyPrompt}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[color:var(--color-accent-deep)]"
                          >
                            <Copy className="h-3.5 w-3.5" />
                            {copied ? 'Copied' : 'Copy'}
                          </button>
                        </div>
                        <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink-soft)]">
                          {challenge.linkedinPrompt}
                        </p>
                      </div>

                      <FieldShell label="LinkedIn post URL" error={fieldErrors.linkedin}>
                        <input
                          value={linkedinUrl}
                          onChange={(e) => {
                            setLinkedinUrl(e.target.value);
                            invalidateLinkedin();
                          }}
                          onBlur={() => {
                            if (linkedinUrl.trim() && !parseLinkedinPostUrl(linkedinUrl)) {
                              setFieldErrors((p) => ({
                                ...p,
                                linkedin: 'Doesn’t look like a post/activity link',
                              }));
                            }
                          }}
                          placeholder="https://www.linkedin.com/posts/..."
                          className={inputClass(Boolean(fieldErrors.linkedin) || linkedinFailed)}
                          autoComplete="off"
                          spellCheck={false}
                        />
                      </FieldShell>

                      <div className="flex flex-wrap gap-1.5">
                        <button
                          type="button"
                          className="rounded-lg border border-[color:var(--color-line)] bg-white/40 px-2.5 py-1.5 font-mono text-[10px] font-semibold text-[color:var(--color-muted)]"
                          onClick={() => {
                            setLinkedinUrl('https://www.linkedin.com/in/arjunmehta');
                            invalidateLinkedin();
                            setAlert({
                              tone: 'warn',
                              title: 'Loaded a profile URL',
                              body: 'Hit Verify LinkedIn — profile-only links are rejected.',
                            });
                          }}
                        >
                          Try profile (invalid)
                        </button>
                        <button
                          type="button"
                          className="rounded-lg border border-[color:var(--color-line)] bg-white/40 px-2.5 py-1.5 font-mono text-[10px] font-semibold text-[color:var(--color-muted)]"
                          onClick={() => {
                            setLinkedinUrl(challenge.defaultLinkedinUrl);
                            invalidateLinkedin();
                          }}
                        >
                          Reset demo post
                        </button>
                      </div>

                      <div className="flex flex-col gap-2 sm:flex-row">
                        <SecondaryButton
                          onClick={runLinkedinVerify}
                          disabled={verifying === 'linkedin'}
                        >
                          {verifying === 'linkedin' ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : null}
                          {linkedinVerified ? 'Re-check LinkedIn' : 'Verify LinkedIn'}
                        </SecondaryButton>
                        <PrimaryButton
                          className="flex-1"
                          disabled={!linkedinVerified}
                          onClick={() => setStep('review')}
                        >
                          Review submission
                        </PrimaryButton>
                      </div>
                    </div>
                  )}

                  {step === 'review' && (
                    <div className="space-y-4">
                      {submitted ? (
                        <div className="rounded-2xl border border-[color:var(--color-good)]/25 bg-[color:var(--color-good-soft)] p-5">
                          <CheckCircle2 className="h-6 w-6 text-[color:var(--color-good)]" />
                          <h2 className="mt-3 font-display text-xl font-bold">
                            Day {dayId} locked in
                          </h2>
                          <p className="mt-1 text-sm text-[color:var(--color-ink-soft)]">
                            GitHub + LinkedIn verified. Consistency is now public — see you tomorrow
                            night.
                          </p>
                          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                            <PrimaryButton
                              className="flex-1"
                              onClick={() => onNavigate('/report-card')}
                            >
                              <Award className="h-4 w-4" />
                              Generate AI Report Card
                            </PrimaryButton>
                            <SecondaryButton onClick={() => onNavigate('/dashboard')}>
                              Back to dashboard
                            </SecondaryButton>
                          </div>
                        </div>
                      ) : (
                        <>
                          <h2 className="font-display text-lg font-bold">Review & submit</h2>
                          <p className="text-sm text-[color:var(--color-muted)]">
                            Unverified links won’t count. Confirm both badges read Verified.
                          </p>

                          {(!githubVerified || !linkedinVerified) && (
                            <AlertBanner tone="warn" title="Submission blocked until verified">
                              {!githubVerified && 'GitHub still unchecked. '}
                              {!linkedinVerified && 'LinkedIn still unchecked. '}
                              Fix those steps, then come back.
                            </AlertBanner>
                          )}

                          <ReviewRow
                            icon={<Github className="h-4 w-4" />}
                            label="Repository"
                            value={repoUrl}
                            state={ghStatus}
                          />
                          <ReviewRow
                            icon={<Github className="h-4 w-4" />}
                            label="Commit"
                            value={commitUrl}
                            state={ghStatus}
                          />
                          <ReviewRow
                            icon={<Linkedin className="h-4 w-4" />}
                            label="LinkedIn"
                            value={linkedinUrl}
                            state={liStatus}
                          />

                          <FieldShell label="Optional note">
                            <textarea
                              value={notes}
                              onChange={(e) => setNotes(e.target.value)}
                              rows={3}
                              placeholder="What was hard today?"
                              className={`${inputClass()} resize-none font-body`}
                            />
                          </FieldShell>

                          <PrimaryButton className="w-full" onClick={handleSubmit}>
                            Submit Day {dayId} proof
                          </PrimaryButton>
                        </>
                      )}
                    </div>
                  )}
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-base font-bold text-[color:var(--color-ink)]">{title}</h2>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function ReviewRow({
  icon,
  label,
  value,
  state,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  state: VerifyState;
}) {
  return (
    <div className="glass-inset flex items-start gap-3 rounded-xl p-3">
      <div className="mt-0.5 text-[color:var(--color-ink)]">{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-wide text-[color:var(--color-muted)]">
          {label}
        </p>
        <p className="mt-0.5 truncate text-sm text-[color:var(--color-ink)]">{value || '—'}</p>
      </div>
      <VerifyBadge state={state} />
    </div>
  );
}

function StatusLine({ label, state }: { label: string; state: VerifyState }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-[color:var(--color-line)] bg-white/50 px-3 py-2.5">
      <span className="text-sm font-medium text-[color:var(--color-ink-soft)]">{label}</span>
      <VerifyBadge state={state} />
    </div>
  );
}
