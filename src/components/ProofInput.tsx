import React from 'react';
import { ExternalLink, LucideIcon } from 'lucide-react';

interface ProofInputProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  icon: LucideIcon;
  placeholder?: string;
  id?: string;
}

export const ProofInput: React.FC<ProofInputProps> = ({
  label,
  value,
  onChange,
  icon: Icon,
  placeholder,
  id,
}) => {
  return (
    <div className="w-full min-w-0">
      <label htmlFor={id} className="block text-[11px] sm:text-xs font-semibold text-neutral-800 mb-1">
        {label}
      </label>
      <div className="relative flex items-center w-full min-w-0">
        {/* Left Icon */}
        <div className="absolute left-2.5 sm:left-3 text-black pointer-events-none flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4" />
        </div>

        {/* Input */}
        <input
          id={id}
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full min-w-0 pl-8 sm:pl-9 pr-8 sm:pr-9 py-2 sm:py-2.5 bg-white border border-[#dedede] rounded-lg text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 font-mono transition-colors focus:outline-none focus:border-black h-[36px] sm:h-[40px]"
        />

        {/* Right External Link Button */}
        {value && (
          <a
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            title="Open link in new tab"
            className="absolute right-2.5 sm:right-3 text-neutral-400 hover:text-black transition-colors shrink-0 p-0.5"
            aria-label={`Open ${label} link`}
          >
            <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </a>
        )}
      </div>
    </div>
  );
};
