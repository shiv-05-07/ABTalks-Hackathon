import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { FeatureMetrics } from './components/FeatureMetrics';
import { HowItWorks } from './components/HowItWorks';
import { JourneyProgress } from './components/JourneyProgress';
import { StudentDashboard } from './components/StudentDashboard';
import { ChallengeDay } from './components/ChallengeDay';
import { StudentReportCard } from './components/StudentReportCard';
import { Footer } from './components/Footer';
import { DEFAULT_STUDENT_PROFILE, MOCK_SUBMISSIONS, getChallengeForDay } from './data/mockData';
import { StudentProfile, ProofSubmission, RoutePath } from './types';

export default function App() {
  // Client-side router path state initialized to /day/12 by default
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const p = window.location.pathname;
    return (p && p !== '/') ? p : '/day/12';
  });

  // State for student profile & submissions
  const [profile, setProfile] = useState<StudentProfile>(DEFAULT_STUDENT_PROFILE);
  const [submissions, setSubmissions] = useState<Record<number, ProofSubmission>>(MOCK_SUBMISSIONS);

  // Sync browser back/forward history buttons
  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname;
      setCurrentPath((p && p !== '/') ? p : '/day/12');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Custom navigate function
  const navigate = (path: RoutePath) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToHowItWorks = () => {
    const section = document.getElementById('how-it-works');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmitProof = (newSubmission: ProofSubmission) => {
    setSubmissions((prev) => ({
      ...prev,
      [newSubmission.dayId]: newSubmission,
    }));

    if (newSubmission.dayId === profile.completedDays && newSubmission.status === 'verified') {
      setProfile((prev) => ({
        ...prev,
        hasSubmittedToday: true,
      }));
    }
  };

  // Helper to parse day ID from path like /day/12
  const getDayIdFromPath = (path: string): number => {
    const match = path.match(/\/day\/(\d+)/);
    return match ? parseInt(match[1], 10) : 12;
  };

  const isReportCardRoute = currentPath === '/report-card';
  const isDayRoute = !isReportCardRoute && (currentPath.startsWith('/day/') || currentPath === '/day/12');
  const currentDayId = isDayRoute ? getDayIdFromPath(currentPath) : 12;

  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-['Inter',sans-serif]">
      {/* Navigation Header */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        streakCount={profile.currentStreak}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentPath === '/' && (
          <>
            <LandingHero
              onNavigate={navigate}
              onScrollToHowItWorks={handleScrollToHowItWorks}
            />
            <FeatureMetrics />
            <HowItWorks />
            <JourneyProgress
              completedDays={profile.completedDays}
              totalDays={profile.totalDays}
              onSelectDay={(dayNum) => navigate(`/day/${dayNum}` as RoutePath)}
            />
          </>
        )}

        {currentPath === '/dashboard' && (
          <StudentDashboard
            profile={profile}
            onNavigate={navigate}
            onUpdateProfile={(updated) => setProfile((p) => ({ ...p, ...updated }))}
          />
        )}

        {/* AI Report Card View */}
        {isReportCardRoute && (
          <div className="bg-zinc-950 py-8 min-h-[calc(100vh-64px)]">
            <StudentReportCard />
          </div>
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

      {/* Footer shown on home, dashboard, and report card */}
      {!isDayRoute && (
        <Footer />
      )}
    </div>
  );
}