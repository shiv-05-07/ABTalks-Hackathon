import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { StudentDashboard } from './components/StudentDashboard';
import { ChallengeDay } from './components/ChallengeDay';
import { StudentReportCard } from './components/StudentReportCard';
import { ToastProvider } from './components/features/ToastHost';
import { getChallengeForDay } from './data/mockData';
import { loadProfile, loadSubmissions, saveProfile, saveSubmissions } from './lib/persist';
import { ProofSubmission, RoutePath, StudentProfile } from './types';

function getPath(): string {
  return window.location.pathname || '/';
}

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(getPath);
  const [profile, setProfile] = useState<StudentProfile>(() => loadProfile());
  const [submissions, setSubmissions] = useState<Record<number, ProofSubmission>>(() =>
    loadSubmissions()
  );

  useEffect(() => {
    const onPopState = () => setCurrentPath(getPath());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    saveProfile(profile);
  }, [profile]);

  useEffect(() => {
    saveSubmissions(submissions);
  }, [submissions]);

  const navigate = (path: RoutePath) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitProof = (newSubmission: ProofSubmission) => {
    setSubmissions((prev) => ({
      ...prev,
      [newSubmission.dayId]: newSubmission,
    }));

    if (newSubmission.status === 'verified') {
      setProfile((prev) => {
        const alreadyCounted = prev.hasSubmittedToday && newSubmission.dayId <= prev.completedDays;
        const nextCompleted = Math.max(prev.completedDays, newSubmission.dayId);
        const nextStreak = prev.missedYesterday
          ? 1
          : alreadyCounted
            ? prev.currentStreak
            : prev.currentStreak + 1;

        return {
          ...prev,
          hasSubmittedToday: true,
          missedYesterday: false,
          completedDays: nextCompleted,
          currentStreak: nextStreak,
          longestStreak: Math.max(prev.longestStreak, nextStreak),
          githubCommitsCount: alreadyCounted ? prev.githubCommitsCount : prev.githubCommitsCount + 1,
          linkedinPostsCount: alreadyCounted
            ? prev.linkedinPostsCount
            : prev.linkedinPostsCount + 1,
          visibilityScore: Math.min(
            100,
            alreadyCounted ? prev.visibilityScore : prev.visibilityScore + 2
          ),
        };
      });
    }
  };

  const getDayIdFromPath = (path: string): number => {
    const match = path.match(/^\/day\/(\d+)/);
    return match ? parseInt(match[1], 10) : 12;
  };

  const isDayRoute = /^\/day\/\d+/.test(currentPath);
  const isReportRoute = currentPath === '/report-card';
  const currentDayId = isDayRoute ? getDayIdFromPath(currentPath) : 12;
  const isKnownRoute =
    currentPath === '/' || currentPath === '/dashboard' || isDayRoute || isReportRoute;

  const latestSubmission = submissions[12] || submissions[profile.completedDays];

  return (
    <ToastProvider>
      <div className="flex min-h-screen flex-col bg-atmosphere font-body text-[color:var(--color-ink)]">
        <Navbar
          currentPath={isKnownRoute ? currentPath : '/'}
          onNavigate={navigate}
          streakCount={profile.currentStreak}
          showStreak={currentPath !== '/'}
        />

        <main className="relative flex-1">
          {(currentPath === '/' || !isKnownRoute) && <LandingPage onNavigate={navigate} />}

          {currentPath === '/dashboard' && (
            <StudentDashboard profile={profile} onNavigate={navigate} />
          )}

          {isReportRoute && (
            <StudentReportCard
              profile={profile}
              onNavigate={navigate}
              initialDayId={latestSubmission?.dayId || 12}
              initialGithubUrl={latestSubmission?.githubRepoUrl}
              initialCommitUrl={latestSubmission?.githubCommitUrl}
              initialLinkedinText={getChallengeForDay(latestSubmission?.dayId || 12).linkedinPrompt}
            />
          )}

          {isDayRoute && (
            <ChallengeDay
              dayId={currentDayId}
              challenge={getChallengeForDay(currentDayId)}
              existingSubmission={submissions[currentDayId]}
              streakCount={profile.currentStreak}
              onNavigate={navigate}
              onSubmitProof={handleSubmitProof}
            />
          )}
        </main>

        {(currentPath === '/' || currentPath === '/dashboard' || !isKnownRoute) && <Footer />}
      </div>
    </ToastProvider>
  );
}
