import React from 'react';
import { Github, CheckCircle2 } from 'lucide-react';
import { ProofInput } from './ProofInput';
import { VerificationStatus } from './VerificationStatus';

interface GithubSubmissionProps {
  repoUrl: string;
  commitUrl: string;
  isVerified: boolean;
  onRepoChange: (url: string) => void;
  onCommitChange: (url: string) => void;
  onVerify: () => void;
}

export const GithubSubmission: React.FC<GithubSubmissionProps> = ({
  repoUrl,
  commitUrl,
  isVerified,
  onRepoChange,
  onCommitChange,
  onVerify,
}) => {
  return (
    <section className="bg-white border border-[#dedede] rounded-xl p-4 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
          1
        </div>
        <div>
          <h2 className="text-sm sm:text-base font-bold text-black">
            Submit GitHub Proof
          </h2>
          <p className="text-xs text-neutral-500 font-normal mt-0.5">
            Push your code to GitHub and submit the commit link.
          </p>
        </div>
      </div>

      {/* Main Content Area: Inputs + Verification Badge */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-1">
        {/* Form Inputs & Button */}
        <div className="flex-1 space-y-3 min-w-0">
          <ProofInput
            id="github-repo-input"
            label="Repository Link"
            value={repoUrl}
            onChange={onRepoChange}
            icon={Github}
            placeholder="https://github.com/username/repo"
          />

          <ProofInput
            id="github-commit-input"
            label="Commit Link (or latest commit)"
            value={commitUrl}
            onChange={onCommitChange}
            icon={Github}
            placeholder="https://github.com/username/repo/commit/hash"
          />

          <div className="pt-1">
            <button
              type="button"
              onClick={onVerify}
              className="px-4 py-2 bg-black hover:bg-neutral-800 text-white font-medium text-xs rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verify GitHub</span>
            </button>
          </div>
        </div>

        {/* Verification Card (Desktop: Right, Mobile: Bottom) */}
        <div className="shrink-0 flex items-center">
          <VerificationStatus type="GitHub" isVerified={isVerified} />
        </div>
      </div>
    </section>
  );
};
