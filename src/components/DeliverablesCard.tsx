import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface DeliverablesCardProps {
  items?: string[];
}

const DEFAULT_ITEMS = [
  'Project overview',
  'Tech stack',
  'Installation / Setup',
  'Screenshots (if any)',
  'Key learnings',
];

export const DeliverablesCard: React.FC<DeliverablesCardProps> = ({
  items = DEFAULT_ITEMS,
}) => {
  return (
    <div className="bg-white border border-[#dedede] rounded-xl p-4 sm:p-5 space-y-3">
      <h3 className="font-semibold text-black text-xs sm:text-sm">Deliverables</h3>
      <p className="text-xs text-neutral-500 font-normal">Your README must include:</p>
      
      <ul className="space-y-2 pt-0.5">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-2 text-xs text-neutral-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-black shrink-0" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
