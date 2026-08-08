import React, { useState } from 'react';
import {
  Flame,
  CheckCircle2,
  Circle,
  Clock,
  ArrowRight,
  FileText,
  BarChart3,
  Code2,
  Github,
  Linkedin,
  CalendarDays,
  Award,
  Rocket,
  AlertTriangle,
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
  // Edge Case Simulator State for testing edge cases
  const [edgeCaseMode, setEdgeCaseMode] = useState<'active' | 'first_day' | 'missed_day'>('active');

  const activeStreak = edgeCaseMode === 'first_day' ? 0 : edgeCaseMode === 'missed_day' ? 0 : profile.currentStreak;
  const currentDay = edgeCaseMode === 'first_day' ? 1 : 12;
  const isMissed = edgeCaseMode === 'missed_day';

  return (
    <div className="min-h-screen bg-white pb-16 pt-4 sm:pt-6">
      {/* Optional Simulator Bar for Testing */}
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 mb-4">
        <div className="bg-neutral-900 text-white px-3 py-1.5 rounded-xl text-xs font-mono flex items-center justify-between overflow-x-auto gap-2">
          <span className="text-neutral-400 font-medium whitespace-nowrap text-[11px]">
            ⚡ View Mode:
          </span>
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => setEdgeCaseMode('active')}
              className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
                edgeCaseMode === 'active' ? 'bg-white text-black font-bold' : 'bg-neutral-800 text-neutral-300 hover:text-white'
              }`}
            >
              Active Streak (Day 12)
            </button>
            <button
              onClick={() => setEdgeCaseMode('first_day')}
              className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
                edgeCaseMode === 'first_day' ? 'bg-white text-black font-bold' : 'bg-neutral-800 text-neutral-300 hover:text-white'
              }`}
            >
              Day 1 (No Streak)
            </button>
            <button
              onClick={() => setEdgeCaseMode('missed_day')}
              className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
                edgeCaseMode === 'missed_day' ? 'bg-white text-black font-bold' : 'bg-neutral-800 text-neutral-300 hover:text-white'
              }`}
            >
              Missed Day
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 space-y-5 sm:space-y-6">
        {/* Missed Day Banner Alert */}
        {isMissed && (
          <div className="bg-neutral-900 text-white rounded-2xl p-4 sm:p-5 border border-neutral-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-neutral-800 text-white shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-white">Your streak paused yesterday!</h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Missed Day 11 submission. Submit now to protect your streak.
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

        {/* 1. GREETING SECTION */}
        <div className="pt-1 pb-1">
          <h1 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
            Good evening, {profile.name.split(' ')[0]}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 font-normal mt-0.5">
            Let's keep the streak alive.
          </p>
        </div>

        {/* 2. FOUR STAT CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Card 1: Day Streak */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-4 sm:p-5 flex items-center gap-3.5">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-neutral-100 flex items-center justify-center shrink-0">
              <Flame className={`w-5 h-5 ${activeStreak > 0 ? 'text-black fill-black' : 'text-neutral-400'}`} />
            </div>
            <div className="min-w-0">
              <div className="text-xl sm:text-2xl font-black text-black tracking-tight leading-none mb-1">
                {activeStreak}
              </div>
              <div className="text-xs font-bold text-black truncate">Day Streak</div>
              <div className="text-[11px] text-neutral-500 font-normal truncate mt-0.5">
                {activeStreak > 0 ? "You're on a roll! 🔥" : "Start your streak! 🚀"}
              </div>
            </div>
          </div>

          {/* Card 2: Journey Progress */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-4 sm:p-5 flex items-center gap-3.5">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 shrink-0 flex items-center justify-center">
              <svg className="w-10 h-10 sm:w-11 sm:h-11 -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="14" fill="none" stroke="#eeeeee" strokeWidth="3.5" />
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  fill="none"
                  stroke="#000000"
                  strokeWidth="3.5"
                  strokeDasharray="88"
                  strokeDashoffset={edgeCaseMode === 'first_day' ? "88" : "70.4"}
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <div className="min-w-0">
              <div className="text-xl sm:text-2xl font-black text-black tracking-tight leading-none mb-1">
                {edgeCaseMode === 'first_day' ? '0%' : '20%'}
              </div>
              <div className="text-xs font-bold text-black truncate">Journey Progress</div>
              <div className="text-[11px] text-neutral-500 font-normal truncate mt-0.5">
                {edgeCaseMode === 'first_day' ? '0 / 60 days' : '12 / 60 days'}
              </div>
            </div>
          </div>

          {/* Card 3: Projects Built */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-4 sm:p-5 flex items-center gap-3.5">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-neutral-100 flex items-center justify-center shrink-0">
              <Code2 className="w-5 h-5 text-black stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <div className="text-xl sm:text-2xl font-black text-black tracking-tight leading-none mb-1">
                {edgeCaseMode === 'first_day' ? '0' : '12'}
              </div>
              <div className="text-xs font-bold text-black truncate">Projects Built</div>
              <div className="text-[11px] text-neutral-500 font-normal truncate mt-0.5">
                Keep shipping!
              </div>
            </div>
          </div>

          {/* Card 4: Your Standing */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-4 sm:p-5 flex items-center gap-3.5">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-neutral-100 flex items-center justify-center shrink-0">
              <BarChart3 className="w-5 h-5 text-black stroke-[2.2]" />
            </div>
            <div className="min-w-0">
              <div className="text-xl sm:text-2xl font-black text-black tracking-tight leading-none mb-1">
                Top 18%
              </div>
              <div className="text-xs font-bold text-black truncate">Your Standing</div>
              <div className="text-[11px] text-neutral-500 font-normal truncate mt-0.5">
                Among all builders
              </div>
            </div>
          </div>
        </div>

        {/* 3. MAIN CONTENT GRID (2-Column Grid on Desktop, 1-Column Stack on Mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-start">
          {/* LEFT COLUMN - ROW 1: TODAY'S CHALLENGE */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-5 sm:p-6 flex flex-col justify-between h-full">
            <div>
              <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-4">
                TODAY'S CHALLENGE
              </div>

              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-black rounded-2xl text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <FileText className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.75]" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg md:text-xl font-black text-black tracking-tight leading-snug">
                    Build a recruiter-friendly README
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-600 mt-1 leading-relaxed">
                    A good README tells your story before you do.
                  </p>
                  <p className="text-xs sm:text-sm text-neutral-500 mt-0.5 leading-relaxed">
                    Make your project easy to understand and impressive.
                  </p>

                  <div className="flex items-center gap-1.5 mt-3 text-xs text-neutral-500 font-medium">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    <span>45 min</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-4 border-t border-neutral-100 mt-2">
              <button
                onClick={() => onNavigate(`/day/${currentDay}` as RoutePath)}
                className="flex-1 py-2.5 px-4 bg-black hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <span>Start Today's Challenge</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate(`/day/${currentDay}` as RoutePath)}
                className="py-2.5 px-4 bg-white hover:bg-neutral-50 text-black border border-neutral-200 font-bold text-xs sm:text-sm rounded-lg transition-all cursor-pointer whitespace-nowrap"
              >
                View Details
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN - ROW 1: OVERALL PROGRESS */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-5 sm:p-6 flex flex-col justify-between h-full">
            <div>
              <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-3">
                OVERALL PROGRESS
              </div>

              <div className="flex items-baseline justify-between mb-1">
                <span className="text-2xl sm:text-3xl font-black text-black tracking-tight">
                  {edgeCaseMode === 'first_day' ? '0 / 60 Days' : '12 / 60 Days'}
                </span>
                <span className="text-xs font-semibold text-neutral-500">
                  {edgeCaseMode === 'first_day' ? '0% Completed' : '20% Completed'}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-neutral-100 rounded-full h-2 my-3 overflow-hidden">
                <div
                  className="bg-black h-2 rounded-full transition-all duration-300"
                  style={{ width: edgeCaseMode === 'first_day' ? '0%' : '20%' }}
                />
              </div>

              {/* Breakdown Rows */}
              <div className="space-y-3 pt-3 border-t border-neutral-100">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-neutral-800 font-medium">
                    <Github className="w-4 h-4 text-black" />
                    <span>GitHub Proofs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-black">
                      {edgeCaseMode === 'first_day' ? '0 / 12' : '12 / 12'}
                    </span>
                    <CheckCircle2 className="w-4 h-4 text-black fill-black text-white" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-neutral-800 font-medium">
                    <Linkedin className="w-4 h-4 text-black" />
                    <span>LinkedIn Proofs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-black">
                      {edgeCaseMode === 'first_day' ? '0 / 12' : '10 / 12'}
                    </span>
                    <Circle className="w-4 h-4 text-neutral-300" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-neutral-800 font-medium">
                    <CalendarDays className="w-4 h-4 text-black" />
                    <span>Days Completed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-black">
                      {edgeCaseMode === 'first_day' ? '0 / 60' : '12 / 60'}
                    </span>
                    <Circle className="w-4 h-4 text-neutral-300" />
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-2 text-neutral-800 font-medium">
                    <Flame className="w-4 h-4 text-black" />
                    <span>Current Streak</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-black">{activeStreak} Days</span>
                    <Circle className="w-4 h-4 text-neutral-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LEFT COLUMN - ROW 2: THIS WEEK */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-5 sm:p-6">
            <div className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider mb-5">
              THIS WEEK
            </div>

            <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center items-center">
              {[
                { day: 'Mon', num: 8, status: 'completed' },
                { day: 'Tue', num: 9, status: 'completed' },
                { day: 'Wed', num: 10, status: 'completed' },
                { day: 'Thu', num: 11, status: 'completed' },
                { day: 'Fri', num: 12, status: 'current' },
                { day: 'Sat', num: 13, status: 'future' },
                { day: 'Sun', num: 14, status: 'future' },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1.5">
                  <span className={`text-xs font-semibold ${item.status === 'current' ? 'text-black font-bold' : 'text-neutral-500'}`}>
                    {item.day}
                  </span>

                  {item.status === 'completed' && (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black text-white flex items-center justify-center my-0.5">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}

                  {item.status === 'current' && (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border-2 border-black flex items-center justify-center my-0.5">
                      <div className="w-2 h-2 rounded-full bg-black" />
                    </div>
                  )}

                  {item.status === 'future' && (
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white border border-dashed border-neutral-300 flex items-center justify-center my-0.5" />
                  )}

                  <span className={`text-[11px] ${item.status === 'current' ? 'font-bold text-black' : 'text-neutral-400'}`}>
                    Day {item.num}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-neutral-100 text-xs text-neutral-500 text-center sm:text-left">
              2 days left this week. You've got this! 💪
            </div>
          </div>

          {/* RIGHT COLUMN - ROW 2: ACHIEVEMENTS */}
          <div className="bg-white border border-neutral-200 rounded-2xl p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                ACHIEVEMENTS
              </span>
              <button className="text-xs font-semibold text-neutral-600 hover:text-black flex items-center gap-1 transition-colors cursor-pointer">
                <span>View all</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3.5">
              {/* Achievement 1 */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0">
                    <Flame className="w-4.5 h-4.5 text-black fill-black" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-black leading-tight">7 Day Streak</h4>
                    <p className="text-[11px] text-neutral-500">Complete 7 days in a row</p>
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              </div>

              {/* Achievement 2 */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0">
                    <Rocket className="w-4.5 h-4.5 text-black" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-black leading-tight">First Commit</h4>
                    <p className="text-[11px] text-neutral-500">Make your first GitHub commit</p>
                  </div>
                </div>
                <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              </div>

              {/* Achievement 3 */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center shrink-0">
                    <Award className="w-4.5 h-4.5 text-black" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-black leading-tight">Public Builder</h4>
                    <p className="text-[11px] text-neutral-500">Share 10 updates on LinkedIn</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-neutral-600 shrink-0">10 / 10</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4. BOTTOM REMINDER BAR */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center justify-center shrink-0">
              <CalendarDays className="w-5 h-5 text-black" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-black">Don't break the chain!</h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Submit your proofs today and keep the streak alive.
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate(`/day/${currentDay}` as RoutePath)}
            className="w-full sm:w-auto px-5 py-2.5 bg-black hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 shadow-2xs"
          >
            <span>Submit Proofs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
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
