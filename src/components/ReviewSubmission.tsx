import React from 'react';
import { Github, Linkedin, Flame, ArrowRight } from 'lucide-react';

interface ReviewSubmissionProps {
  githubRepoUrl: string;
  githubCommitUrl: string;
  linkedinUrl: string;
  streakCount: number;
  onSubmit: () => void;
  isSubmitted?: boolean;
}

export const ReviewSubmission: React.FC<ReviewSubmissionProps> = ({
  githubRepoUrl,
  githubCommitUrl,
  linkedinUrl,
  streakCount,
  onSubmit,
  isSubmitted,
}) => {
  // Extract repo short name like "arjunmehta/portfolio"
  const getRepoShortName = (url: string) => {
    try {
      const match = url.match(/github\.com\/([^/]+\/[^/]+)/);
      return match ? match[1] : 'arjunmehta/portfolio';
    } catch {
      return 'arjunmehta/portfolio';
    }
  };

  // Extract commit short hash like "abc1234def"
  const getCommitShortHash = (url: string) => {
    try {
      const match = url.match(/commit\/([a-zA-Z0-9]+)/);
      return match ? match[1] : 'abc1234def';
    } catch {
      return 'abc1234def';
    }
  };

  return (
    <section className="bg-white border border-[#dedede] rounded-xl p-4 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
          3
        </div>
        <div>
          <h2 className="text-sm sm:text-base font-bold text-black">
            Review & Submit
          </h2>
          <p className="text-xs text-neutral-500 font-normal mt-0.5">
            Make sure everything looks good before you submit.
          </p>
        </div>
      </div>

      {/* Summary Cards Grid (Horizontal on desktop, Stacked on mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
        {/* GitHub Card */}
        <div className="bg-[#fafafa] border border-[#dedede] rounded-lg p-3.5 flex items-start gap-3">
          <Github className="w-5 h-5 text-black shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <span className="block text-xs font-semibold text-black">GitHub</span>
            <span className="block text-xs text-neutral-600 font-mono truncate">
              {getRepoShortName(githubRepoUrl)}
            </span>
            <span className="block text-[11px] text-neutral-400 font-mono truncate">
              {getCommitShortHash(githubCommitUrl)}
            </span>
          </div>
        </div>

        {/* LinkedIn Card */}
        <div className="bg-[#fafafa] border border-[#dedede] rounded-lg p-3.5 flex items-start gap-3">
          <Linkedin className="w-5 h-5 text-black shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <span className="block text-xs font-semibold text-black">LinkedIn Post</span>
            <span className="block text-xs text-neutral-600 font-medium">Posted</span>
            <span className="block text-[11px] text-neutral-400">just now</span>
          </div>
        </div>

        {/* Streak Card */}
        <div className="bg-[#fafafa] border border-[#dedede] rounded-lg p-3.5 flex items-start gap-3">
          <Flame className="w-5 h-5 text-black fill-black shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <span className="block text-xs font-semibold text-black">{streakCount} Day Streak</span>
            <span className="block text-[11px] text-neutral-500 leading-snug">
              You're on fire! Keep it up.
            </span>
          </div>
        </div>
      </div>

      {/* Main Submit Button */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onSubmit}
          className="w-full h-[48px] sm:h-[52px] bg-black hover:bg-neutral-800 text-white font-semibold text-sm sm:text-base rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.99]"
        >
          <span>{isSubmitted ? "Submitted Today's Proof!" : "Submit Today's Proof"}</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </section>
  );
};
