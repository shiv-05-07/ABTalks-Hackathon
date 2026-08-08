import React from 'react';
import { ArrowRight, ArrowDown, Check, Zap } from 'lucide-react';
import { RoutePath } from '../types';

interface LandingHeroProps {
  onNavigate: (path: RoutePath) => void;
  onScrollToHowItWorks: () => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({ onNavigate, onScrollToHowItWorks }) => {
  return (
    <section className="pt-8 md:pt-14 pb-12 md:pb-16 max-w-[1180px] mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
        {/* Left Column: Hero Copy & Actions */}
        <div className="flex flex-col items-start text-left">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-neutral-200 text-neutral-800 text-[11px] font-bold uppercase tracking-wider shadow-2xs">
            <Zap className="w-3.5 h-3.5 text-black fill-black" />
            <span>60-DAY CODING CHALLENGE</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl md:text-[68px] lg:text-[76px] font-black text-black tracking-tight leading-[1.02] mt-5 mb-4">
            Build for<br />
            60 days.
          </h1>

          {/* Subtitle */}
          <p className="text-neutral-500 text-sm sm:text-base leading-relaxed font-normal max-w-md mb-8">
            Build projects. Share your progress.<br />
            Grow in public. Get noticed.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center gap-5 mb-10">
            <button
              onClick={() => onNavigate('/day/1')}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-black hover:bg-neutral-800 text-white font-semibold text-sm rounded-lg transition-all shadow-sm active:scale-98 cursor-pointer"
            >
              <span>Start Day 1</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onScrollToHowItWorks}
              className="inline-flex items-center gap-1.5 text-neutral-600 hover:text-black font-semibold text-sm transition-colors cursor-pointer py-2 px-1"
            >
              <span>How it works</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-3 pt-2">
            <div className="flex -space-x-2.5 items-center">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Student avatar 1"
                className="w-8 h-8 rounded-full border-2 border-white object-cover bg-neutral-200 grayscale"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                alt="Student avatar 2"
                className="w-8 h-8 rounded-full border-2 border-white object-cover bg-neutral-200 grayscale"
              />
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80"
                alt="Student avatar 3"
                className="w-8 h-8 rounded-full border-2 border-white object-cover bg-neutral-200 grayscale"
              />
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80"
                alt="Student avatar 4"
                className="w-8 h-8 rounded-full border-2 border-white object-cover bg-neutral-200 grayscale"
              />
              <div className="w-8 h-8 rounded-full border-2 border-white bg-black text-white text-[10px] font-bold flex items-center justify-center">
                +10K
              </div>
            </div>

            <div className="text-xs text-neutral-600 font-medium leading-tight">
              Join <span className="font-bold text-black">10,000+ students</span><br />
              building in public
            </div>
          </div>
        </div>

        {/* Right Column: Hero Graphic Visual */}
        <div className="relative flex items-center justify-center pt-4 md:pt-0">
          {/* Subtle Dotted Circular Orbit */}
          <div className="absolute w-[290px] sm:w-[350px] md:w-[380px] h-[290px] sm:h-[350px] md:h-[380px] border border-dashed border-neutral-300 rounded-full pointer-events-none -z-0" />

          {/* Dotted Orbit Accent Dots */}
          <div className="absolute w-2 h-2 rounded-full bg-black top-2 right-12 -z-0" />
          <div className="absolute w-2 h-2 rounded-full bg-neutral-400 bottom-4 left-10 -z-0" />

          {/* Main Browser Code Window Card */}
          <div className="relative z-10 bg-white border border-neutral-200 rounded-2xl p-5 md:p-6 shadow-sm w-full max-w-[320px] sm:max-w-[360px] aspect-4/3 flex flex-col justify-between">
            {/* Top row: 3 browser dots */}
            <div className="flex items-center gap-1.5 mb-6">
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-300" />
            </div>

            {/* Center Code Graphic */}
            <div className="my-auto py-2 text-center">
              <div className="font-mono text-5xl md:text-6xl font-extrabold text-black tracking-tight select-none">
                &lt;/&gt;
              </div>
            </div>

            {/* Bottom Code Skeleton Placeholder Lines */}
            <div className="space-y-2 mt-4 pt-2">
              <div className="h-2 bg-neutral-100 rounded-full w-3/4" />
              <div className="h-2 bg-neutral-100 rounded-full w-full" />
              <div className="h-2 bg-neutral-100 rounded-full w-1/2" />
            </div>
          </div>

          {/* Floating Verification Card */}
          <div className="absolute z-20 bottom-[-16px] right-2 sm:right-4 bg-white border border-neutral-200 rounded-xl p-3.5 shadow-lg w-[210px] md:w-[230px] space-y-2.5">
            {/* GitHub Row */}
            <div className="flex items-center justify-between bg-neutral-50/60 p-2 rounded-lg border border-neutral-100">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-black fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <span className="text-xs font-semibold text-neutral-800">GitHub Commit</span>
              </div>
              <div className="w-4 h-4 rounded-full bg-neutral-100 border border-neutral-300 flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-black stroke-[3]" />
              </div>
            </div>

            {/* LinkedIn Row */}
            <div className="flex items-center justify-between bg-neutral-50/60 p-2 rounded-lg border border-neutral-100">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-black text-white font-bold text-[9px] rounded-2xs flex items-center justify-center font-serif">
                  in
                </div>
                <span className="text-xs font-semibold text-neutral-800">LinkedIn Post</span>
              </div>
              <div className="w-4 h-4 rounded-full bg-neutral-100 border border-neutral-300 flex items-center justify-center">
                <Check className="w-2.5 h-2.5 text-black stroke-[3]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
