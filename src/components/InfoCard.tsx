import React from 'react';
import { Lightbulb } from 'lucide-react';

interface InfoCardProps {
  title?: string;
  content?: string;
}

export const InfoCard: React.FC<InfoCardProps> = ({
  title = "Why this matters",
  content = "Your README is often the first thing recruiters see.\nA clear README shows communication, clarity and\nattention to detail.",
}) => {
  return (
    <div className="bg-white border border-[#dedede] rounded-xl p-4 sm:p-5 space-y-2">
      <div className="flex items-center gap-2 text-black font-semibold text-xs sm:text-sm">
        <Lightbulb className="w-4 h-4 text-black shrink-0" />
        <span>{title}</span>
      </div>
      <p className="text-xs text-neutral-600 leading-relaxed font-normal whitespace-pre-line">
        {content}
      </p>
    </div>
  );
};
