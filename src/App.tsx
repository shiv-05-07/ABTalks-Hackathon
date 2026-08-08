import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { FeatureMetrics } from './components/FeatureMetrics';
import { HowItWorks } from './components/HowItWorks';
import { JourneyProgress } from './components/JourneyProgress';
import { StudentDashboard } from './components/StudentDashboard';
import { ChallengeDay } from './components/ChallengeDay';
import { Footer } from './components/Footer';
import { DEFAULT_STUDENT_PROFILE, MOCK_SUBMISSIONS, getChallengeForDay } from './data/mockData';
import { StudentProfile, ProofSubmission, RoutePath } from './types';

export default function App() {
  // Client-side router path state synced with browser address bar
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  // State for student profile & submissions
  const [profile, setProfile] = useState<StudentProfile>(DEFAULT_STUDENT_PROFILE);
  const [submissions, setSubmissions] = useState<Record<number, ProofSubmission>>(MOCK_SUBMISSIONS);

  // Sync browser back/forward history buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
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

    // Update streak if it was today's challenge
    if (newSubmission.dayId === profile.completedDays) {
      setProfile((prev) => ({
        ...prev,
        currentStreak: prev.currentStreak + 1,
        completedDays: Math.min(60, prev.completedDays + 1),
        hasSubmittedToday: true,
      }));
    }
  };

  // Helper to parse day ID from path like /day/12
  const getDayIdFromPath = (path: string): number => {
    const match = path.match(/\/day\/(\d+)/);
    return match ? parseInt(match[1], 10) : 12;
  };

  const isDayRoute = currentPath.startsWith('/day/');
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

        {isDayRoute && (
          <ChallengeDay
            dayId={currentDayId}
            challenge={getChallengeForDay(currentDayId)}
            existingSubmission={submissions[currentDayId]}
            onNavigate={navigate}
            onSubmitProof={handleSubmitProof}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
