import React from 'react';
import { Star } from 'lucide-react';

interface SkillSignalProps {
  skills?: string[];
}

export const SkillSignal: React.FC<SkillSignalProps> = ({
  skills = ['Communication', 'Documentation', 'Git'],
}) => {
  return (
    <div className="bg-[#fafafa] border border-[#dedede] rounded-xl p-3.5 sm:p-4 space-y-1.5">
      <div className="flex items-center gap-2 text-black font-semibold text-xs">
        <Star className="w-3.5 h-3.5 text-black shrink-0" />
        <span>Skill signal</span>
      </div>
      <p className="text-xs text-neutral-600 font-medium pl-5">
        {skills.join(' • ')}
      </p>
    </div>
  );
};
