import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface VerificationStatusProps {
  type: 'GitHub' | 'LinkedIn';
  isVerified: boolean;
}

export const VerificationStatus: React.FC<VerificationStatusProps> = ({ type, isVerified }) => {
  if (!isVerified) return null;

  return (
    <div className="bg-[#fafafa] border border-[#dedede] rounded-lg p-3.5 sm:p-4 min-w-[170px] sm:min-w-[190px] flex flex-col justify-center gap-1 shrink-0">
      <div className="flex items-center gap-1.5 text-black font-semibold text-xs sm:text-sm">
        <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
        <span>Verified</span>
      </div>
      <p className="text-[11px] sm:text-xs text-neutral-500 font-normal">
        {type} proof looks good!
      </p>
    </div>
  );
};
