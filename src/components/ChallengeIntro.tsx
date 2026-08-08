import React from 'react';
import { ArrowLeft, Clock } from 'lucide-react';
import { RoutePath } from '../types';

interface ChallengeIntroProps {
  dayId: number;
  totalDays: number;
  title: string;
  durationMins: number;
  headline: string;
  subtext: string;
  onNavigate: (path: RoutePath) => void;
}

export const ChallengeIntro: React.FC<ChallengeIntroProps> = ({
  dayId,
  totalDays,
  title,
  durationMins,
  headline,
  subtext,
  onNavigate,
}) => {
  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Back to Dashboard link */}
      <div>
        <button
          onClick={() => onNavigate('/dashboard')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-normal text-neutral-500 hover:text-black transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Day indicator */}
      <div className="pt-1">
        <span className="text-xs font-bold tracking-wider text-black uppercase">
          DAY {dayId} <span className="text-neutral-400 font-medium">/ {totalDays}</span>
        </span>
      </div>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-[34px] font-black text-black leading-[1.15] tracking-tight">
        <span className="hidden sm:inline">
          Build a recruiter-<br />friendly README
        </span>
        <span className="sm:hidden">
          {title}
        </span>
      </h1>

      {/* Duration Pill */}
      <div className="pt-0.5">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#dedede] rounded-md text-xs font-medium text-black">
          <Clock className="w-3.5 h-3.5 text-black shrink-0" />
          <span>{durationMins} min</span>
        </div>
      </div>

      {/* Description */}
      <div className="pt-1 text-xs sm:text-sm text-neutral-500 space-y-0.5 leading-relaxed max-w-sm">
        <p className="font-normal text-neutral-600">{headline}</p>
        <p className="font-normal">{subtext}</p>
      </div>
    </div>
  );
};
