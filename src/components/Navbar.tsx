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
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 h-14 md:h-16 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <button
          onClick={() => onNavigate('/')}
          className="flex items-center gap-2 group text-left cursor-pointer focus:outline-none"
        >
          <div className="font-mono font-bold text-lg md:text-xl text-black tracking-tighter">
            &#123;&#125;
          </div>
          <span className="font-extrabold text-base md:text-lg text-black tracking-tight">
            ABTalks
          </span>
        </button>

        {/* Center: Navigation Links */}
        <nav className="flex items-center gap-6 md:gap-8">
          <button
            onClick={() => onNavigate('/')}
            className={`relative py-1 text-sm md:text-base font-semibold transition-colors cursor-pointer focus:outline-none ${
              currentPath === '/' ? 'text-black' : 'text-neutral-500 hover:text-black'
            }`}
          >
            Home
            {currentPath === '/' && (
              <span className="absolute bottom-[-13px] left-0 right-0 h-[2px] bg-black rounded-full" />
            )}
          </button>

          <button
            onClick={() => onNavigate('/dashboard')}
            className={`relative py-1 text-sm md:text-base font-medium transition-colors cursor-pointer focus:outline-none ${
              currentPath === '/dashboard' ? 'text-black font-semibold' : 'text-neutral-500 hover:text-black'
            }`}
          >
            Dashboard
            {currentPath === '/dashboard' && (
              <span className="absolute bottom-[-13px] left-0 right-0 h-[2px] bg-black rounded-full" />
            )}
          </button>

          <button
            onClick={() => onNavigate('/day/12')}
            className={`relative py-1 text-sm md:text-base font-medium transition-colors cursor-pointer focus:outline-none ${
              currentPath === '/day/12' ? 'text-black font-semibold' : 'text-neutral-500 hover:text-black'
            }`}
          >
            Day 12
            {currentPath.startsWith('/day/') && (
              <span className="absolute bottom-[-13px] left-0 right-0 h-[2px] bg-black rounded-full" />
            )}
          </button>
        </nav>

        {/* Right: Streak Badge */}
        <div className="flex items-center">
          <div className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold text-black bg-white border border-neutral-200 shadow-2xs">
            <Flame className="w-4 h-4 text-black fill-black" />
            <span>{streakCount} Day Streak</span>
          </div>
        </div>
      </div>
    </header>
  );
};
