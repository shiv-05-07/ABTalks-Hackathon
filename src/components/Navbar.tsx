import React from 'react';
import { Flame } from 'lucide-react';
import { RoutePath } from '../types';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: RoutePath) => void;
  streakCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate, streakCount = 11 }) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#eeeeee]">
      <div className="max-w-[1180px] mx-auto px-3 sm:px-6 h-14 md:h-16 flex items-center justify-between gap-2">
        {/* Left: Brand Logo */}
        <button
          onClick={() => onNavigate('/')}
          className="flex items-center gap-1.5 sm:gap-2 shrink-0 cursor-pointer focus:outline-none"
        >
          <div className="font-mono font-bold text-base sm:text-lg md:text-xl text-black tracking-tighter">
            &#123;&#125;
          </div>
          <span className="font-extrabold text-sm sm:text-base md:text-lg text-black tracking-tight">
            ABTalks
          </span>
        </button>

        {/* Center: Navigation Links */}
        <nav className="flex items-center gap-3 sm:gap-6 md:gap-8">
          <button
            onClick={() => onNavigate('/')}
            className={`relative py-1 text-xs sm:text-sm md:text-base font-semibold transition-colors cursor-pointer focus:outline-none whitespace-nowrap ${
              currentPath === '/' ? 'text-black' : 'text-neutral-500 hover:text-black'
            }`}
          >
            Home
            {currentPath === '/' && (
              <span className="absolute bottom-[-10px] md:bottom-[-13px] left-0 right-0 h-[2px] bg-black rounded-full" />
            )}
          </button>

          <button
            onClick={() => onNavigate('/dashboard')}
            className={`relative py-1 text-xs sm:text-sm md:text-base font-medium transition-colors cursor-pointer focus:outline-none whitespace-nowrap ${
              currentPath === '/dashboard' ? 'text-black font-semibold' : 'text-neutral-500 hover:text-black'
            }`}
          >
            Dashboard
            {currentPath === '/dashboard' && (
              <span className="absolute bottom-[-10px] md:bottom-[-13px] left-0 right-0 h-[2px] bg-black rounded-full" />
            )}
          </button>

          <button
            onClick={() => onNavigate('/day/12')}
            className={`relative py-1 text-xs sm:text-sm md:text-base font-medium transition-colors cursor-pointer focus:outline-none whitespace-nowrap ${
              currentPath === '/day/12' ? 'text-black font-semibold' : 'text-neutral-500 hover:text-black'
            }`}
          >
            Day 12
            {currentPath.startsWith('/day/') && (
              <span className="absolute bottom-[-10px] md:bottom-[-13px] left-0 right-0 h-[2px] bg-black rounded-full" />
            )}
          </button>
        </nav>

        {/* Right: Streak Badge */}
        <div className="flex items-center shrink-0">
          <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 rounded-full text-[11px] sm:text-sm font-semibold text-black bg-white border border-neutral-200 shadow-2xs whitespace-nowrap">
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black fill-black shrink-0" />
            <span>{streakCount} <span className="hidden sm:inline">Day </span>Streak</span>
          </div>
        </div>
      </div>
    </header>
  );
};
