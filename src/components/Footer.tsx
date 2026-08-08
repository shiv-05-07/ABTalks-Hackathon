import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#eeeeee] bg-white py-8 mt-16">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-medium">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-black text-sm">&#123;&#125;</span>
          <span className="font-bold text-black">ABTalks</span>
          <span>— 60-Day Coding Challenge for Indian College Students</span>
        </div>
        <div>
          <span>Build in Public. Grow Daily.</span>
        </div>
      </div>
    </footer>
  );
};
