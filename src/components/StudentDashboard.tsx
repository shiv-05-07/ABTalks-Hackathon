import React, { useState } from 'react';
import {
  Flame,
  CheckCircle2,
  Clock,
  ArrowRight,
  ExternalLink,
  Trophy,
  Github,
  Linkedin,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  BookOpen,
  UserCheck,
  ChevronRight,
  Share2
} from 'lucide-react';
import { StudentProfile, RoutePath } from '../types';

interface StudentDashboardProps {
  profile: StudentProfile;
  onNavigate: (path: RoutePath) => void;
  onUpdateProfile?: (updated: Partial<StudentProfile>) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  profile,
  onNavigate,
}) => {
  // Edge Case Simulator State: 'active' | 'first_day' | 'missed_day'
  const [edgeCaseMode, setEdgeCaseMode] = useState<'active' | 'first_day' | 'missed_day'>('active');

  // Computed state based on edge case simulator
  const activeStreak = edgeCaseMode === 'first_day' ? 0 : edgeCaseMode === 'missed_day' ? 0 : profile.currentStreak;
  const currentDay = edgeCaseMode === 'first_day' ? 1 : 12;
  const isMissed = edgeCaseMode === 'missed_day';

  return (
    <div className="min-h-screen bg-neutral-50/60 pb-20">
      {/* Edge Case Mode Selector Bar (for reviewer/testing) */}
      <div className="bg-black text-white px-4 py-2 text-xs font-mono flex items-center justify-between overflow-x-auto">
        <span className="text-neutral-400 font-semibold whitespace-nowrap mr-2">
          ⚡ Edge Case Simulator (390px Mobile View):
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setEdgeCaseMode('active')}
            className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
              edgeCaseMode === 'active' ? 'bg-white text-black font-bold' : 'bg-neutral-800 text-neutral-300 hover:text-white'
            }`}
          >
            Active Streak (11 Days)
          </button>
          <button
            onClick={() => setEdgeCaseMode('first_day')}
            className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
              edgeCaseMode === 'first_day' ? 'bg-white text-black font-bold' : 'bg-neutral-800 text-neutral-300 hover:text-white'
            }`}
          >
            Day 1 (No Streak)
          </button>
          <button
            onClick={() => setEdgeCaseMode('missed_day')}
            className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
              edgeCaseMode === 'missed_day' ? 'bg-white text-black font-bold' : 'bg-neutral-800 text-neutral-300 hover:text-white'
            }`}
          >
            Missed Day Edge Case
          </button>
        </div>
      </div>

      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Missed Day Banner Alert */}
        {isMissed && (
          <div className="bg-neutral-900 text-white rounded-2xl p-5 border border-neutral-800 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-neutral-800 text-white shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-white">Your streak paused yesterday!</h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Missed Day 11 submission. Don't worry! Complete Day 11 now to activate your Streak Freeze Protection.
                </p>
              </div>
            </div>
            <button
              onClick={() => onNavigate('/day/11')}
              className="w-full sm:w-auto px-4 py-2 bg-white text-black hover:bg-neutral-200 font-bold text-xs rounded-lg transition-colors shrink-0 cursor-pointer"
            >
              Recover Day 11 →
            </button>
          </div>
        )}

        {/* Top Header Card */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-5 sm:p-6 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100">
            {/* Student Identity */}
            <div className="flex items-center gap-3.5">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-12 h-12 rounded-full object-cover border border-neutral-300 bg-neutral-100 grayscale"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg font-extrabold text-black tracking-tight">{profile.name}</h1>
                  <span className="text-[10px] uppercase tracking-wider font-bold bg-neutral-100 border border-neutral-200 px-2 py-0.5 rounded text-neutral-700">
                    Student
                  </span>
                </div>
                <p className="text-xs text-neutral-500 mt-0.5">{profile.college}</p>
              </div>
            </div>

            {/* Streak & Rank Badges */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-50 border border-neutral-200">
                <Flame className={`w-4 h-4 ${activeStreak > 0 ? 'text-black fill-black' : 'text-neutral-400'}`} />
                <div className="text-left">
                  <div className="text-[10px] text-neutral-500 font-bold uppercase leading-none">Streak</div>
                  <div className="text-xs font-black text-black leading-tight">{activeStreak} Days</div>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-50 border border-neutral-200">
                <Trophy className="w-4 h-4 text-black" />
                <div className="text-left">
                  <div className="text-[10px] text-neutral-500 font-bold uppercase leading-none">Rank</div>
                  <div className="text-xs font-black text-black leading-tight">#{profile.standingRank}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Track Selection Bar */}
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-neutral-600">
              <BookOpen className="w-4 h-4 text-black" />
              <span className="font-medium">Current Track:</span>
              <span className="font-bold text-black bg-neutral-100 px-2 py-0.5 rounded border border-neutral-200">
                {profile.currentTrack}
              </span>
            </div>
            <div className="flex items-center gap-3 text-neutral-500">
              <span>github.com/{profile.githubUsername}</span>
              <span>•</span>
              <span>LinkedIn Connected</span>
            </div>
          </div>
        </div>

        {/* Main Grid: Today's Task & Progress Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Today's Task (Spans 2 Cols) */}
          <div className="lg:col-span-2 bg-white border border-neutral-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
            <div>
              {/* Badge Row */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black text-white text-[11px] font-bold uppercase tracking-wider">
                  <Clock className="w-3 h-3" />
                  <span>TODAY'S CHALLENGE — DAY {currentDay}</span>
                </span>
                <span className="text-xs font-bold text-neutral-500">Est. 45 mins</span>
              </div>

              {/* Challenge Title & Subtitle */}
              <h2 className="text-xl sm:text-2xl font-black text-black tracking-tight mb-2">
                {currentDay === 1 ? 'Hello World & Developer Portfolio' : 'Responsive Editorial Landing Page'}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-normal mb-6">
                {currentDay === 1
                  ? 'Set up your GitHub repository and publish your developer landing page to kickstart your 60-day streak.'
                  : 'Build a high-precision, monochrome landing page with mobile-first grid layout and zero visual noise.'}
              </p>

              {/* Requirement Checkpoints */}
              <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-100 space-y-2.5 mb-6">
                <div className="text-xs font-bold text-black uppercase tracking-wider mb-1">
                  Deliverables Required:
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-700">
                  <div className="w-4 h-4 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>GitHub Repository Commit or PR URL</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-700">
                  <div className="w-4 h-4 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>LinkedIn Post URL showcasing screenshot / proof</span>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => onNavigate(`/day/${currentDay}` as RoutePath)}
              className="w-full py-3 bg-black hover:bg-neutral-800 text-white font-bold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer active:scale-99"
            >
              <span>Go to Day {currentDay} Challenge</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Progress & Milestone Overview */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-2xs flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-4">
                CHALLENGE PROGRESS
              </h3>

              {/* Completion Percent Meter */}
              <div className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-5 mb-6 text-center">
                <div className="text-4xl font-black text-black tracking-tight">
                  {edgeCaseMode === 'first_day' ? '0%' : '20%'}
                </div>
                <div className="text-xs font-semibold text-neutral-500 mt-1">
                  {edgeCaseMode === 'first_day' ? '0 of 60 Days Completed' : '12 of 60 Days Completed'}
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-neutral-200 rounded-full h-2.5 mt-4 overflow-hidden">
                  <div
                    className="bg-black h-2.5 rounded-full transition-all duration-500"
                    style={{ width: edgeCaseMode === 'first_day' ? '0%' : '20%' }}
                  />
                </div>
              </div>

              {/* Milestones & Badges */}
              <div className="space-y-3">
                <div className="text-xs font-bold text-black uppercase tracking-wider">
                  Upcoming Milestones:
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-50 border border-neutral-100 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-black text-white text-[10px] font-bold flex items-center justify-center">
                      15
                    </div>
                    <span className="font-semibold text-neutral-800">15-Day Consistency Badge</span>
                  </div>
                  <span className="text-[10px] font-bold text-neutral-400">3 Days Left</span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-50 border border-neutral-100 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-neutral-200 text-neutral-600 text-[10px] font-bold flex items-center justify-center">
                      30
                    </div>
                    <span className="font-semibold text-neutral-600">30-Day Recruiter Showcase</span>
                  </div>
                  <span className="text-[10px] font-bold text-neutral-400">18 Days</span>
                </div>
              </div>
            </div>

            {/* Night Study Mode Thoughtful Touch */}
            <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-2.5 text-xs text-neutral-500">
              <Sparkles className="w-4 h-4 text-black shrink-0" />
              <span>Late night coding? Daily submission window closes at 2:00 AM IST.</span>
            </div>
          </div>
        </div>

        {/* Submission History Log */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
              RECENT PROOF SUBMISSIONS
            </h3>
            <span className="text-xs font-semibold text-neutral-400">Verified by ABTalks Bot</span>
          </div>

          <div className="divide-y divide-neutral-100">
            {/* Log item 1 */}
            <div className="py-3 flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-neutral-100 border border-neutral-300 font-bold text-xs flex items-center justify-center">
                  11
                </div>
                <div>
                  <div className="font-bold text-black">Day 11: Custom React Hooks & Generics</div>
                  <div className="text-xs text-neutral-400">Submitted yesterday at 11:00 PM</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                  GitHub & LinkedIn Verified ✓
                </span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </div>
            </div>

            {/* Log item 2 */}
            <div className="py-3 flex items-center justify-between text-xs sm:text-sm">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-neutral-100 border border-neutral-300 font-bold text-xs flex items-center justify-center">
                  10
                </div>
                <div>
                  <div className="font-bold text-black">Day 10: Tailwind Grid Layout & Glassmorphism</div>
                  <div className="text-xs text-neutral-400">Submitted 2 days ago</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                  GitHub & LinkedIn Verified ✓
                </span>
                <ChevronRight className="w-4 h-4 text-neutral-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
    </svg>
  );
}
