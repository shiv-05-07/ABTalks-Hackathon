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
    <header className="sticky top-0 z-50 bg-white border-b border-[#dedede] select-none">
      <div className="max-w-[1180px] mx-auto px-3 sm:px-6 h-14 md:h-16 flex items-center justify-between gap-1.5 sm:gap-4">
        {/* Left: Brand Logo */}
        <button
          onClick={() => onNavigate('/')}
          className="flex items-center gap-1.5 shrink-0 cursor-pointer focus:outline-none"
          aria-label="ABTalks Home"
        >
          <span className="font-mono font-bold text-base sm:text-lg text-black tracking-tight">
            &#123;&#125;
          </span>
          <span className="font-bold text-sm sm:text-base md:text-lg text-black tracking-tight">
            ABTalks
          </span>
        </button>

        {/* Center: Navigation Links */}
        <nav className="flex items-center gap-3 sm:gap-6 md:gap-8 shrink-0">
          <button
            onClick={() => onNavigate('/')}
            className={`relative text-xs sm:text-sm font-medium transition-colors cursor-pointer focus:outline-none whitespace-nowrap ${
              currentPath === '/' ? 'text-black font-semibold' : 'text-neutral-500 hover:text-black'
            }`}
          >
            Home
            {currentPath === '/' && (
              <span className="absolute -bottom-2.5 sm:-bottom-3.5 left-0 right-0 h-[2px] bg-black rounded-full" />
            )}
          </button>

          <button
            onClick={() => onNavigate('/dashboard')}
            className={`relative text-xs sm:text-sm font-medium transition-colors cursor-pointer focus:outline-none whitespace-nowrap ${
              currentPath === '/dashboard' ? 'text-black font-semibold' : 'text-neutral-500 hover:text-black'
            }`}
          >
            Dashboard
            {currentPath === '/dashboard' && (
              <span className="absolute -bottom-2.5 sm:-bottom-3.5 left-0 right-0 h-[2px] bg-black rounded-full" />
            )}
          </button>

          <button
            onClick={() => onNavigate('/day/12')}
            className={`relative text-xs sm:text-sm font-medium transition-colors cursor-pointer focus:outline-none whitespace-nowrap ${
              currentPath.startsWith('/day/') ? 'text-black font-semibold' : 'text-neutral-500 hover:text-black'
            }`}
          >
            Day 12
            {currentPath.startsWith('/day/') && (
              <span className="absolute -bottom-2.5 sm:-bottom-3.5 left-0 right-0 h-[2px] bg-black rounded-full" />
            )}
          </button>
        </nav>

        {/* Right: Streak Badge */}
        <div className="flex items-center shrink-0">
          <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 rounded-full text-xs font-semibold text-black bg-white border border-[#dedede] whitespace-nowrap">
            <Flame className="w-3.5 h-3.5 text-black fill-black shrink-0" />
            <span>{streakCount} <span className="hidden min-[380px]:inline">Day </span>Streak</span>
          </div>
        </div>
      </div>
    </header>
  );
};
