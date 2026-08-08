import React from 'react';
import { Info, ChevronRight } from 'lucide-react';

interface SkipDayProps {
  onSkip?: () => void;
}

export const SkipDay: React.FC<SkipDayProps> = ({ onSkip }) => {
  return (
    <div className="bg-white border border-[#dedede] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      {/* Left: Info icon + text */}
      <div className="flex items-start gap-3">
        <Info className="w-4 h-4 text-black shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <h4 className="text-xs sm:text-sm font-semibold text-black">
            Can't complete today?
          </h4>
          <p className="text-xs text-neutral-500 font-normal">
            You can mark it as skipped and continue tomorrow. Your streak will be at risk.
          </p>
        </div>
      </div>

      {/* Right: Skip button */}
      <div className="shrink-0 self-end sm:self-center pt-1 sm:pt-0">
        <button
          type="button"
          onClick={onSkip}
          className="px-3.5 py-1.5 bg-white hover:bg-neutral-50 border border-[#dedede] text-neutral-800 hover:text-black font-medium text-xs rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer"
        >
          <span>Skip Day</span>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-500" />
        </button>
      </div>
    </div>
  );
};
