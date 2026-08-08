import React from 'react';
import { Linkedin, CheckCircle2 } from 'lucide-react';
import { ProofInput } from './ProofInput';
import { VerificationStatus } from './VerificationStatus';

interface LinkedinSubmissionProps {
  linkedinUrl: string;
  isVerified: boolean;
  onUrlChange: (url: string) => void;
  onVerify: () => void;
}

export const LinkedinSubmission: React.FC<LinkedinSubmissionProps> = ({
  linkedinUrl,
  isVerified,
  onUrlChange,
  onVerify,
}) => {
  return (
    <section className="bg-white border border-[#dedede] rounded-xl p-4 sm:p-6 space-y-4">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 rounded-full bg-black text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
          2
        </div>
        <div>
          <h2 className="text-sm sm:text-base font-bold text-black">
            Submit LinkedIn Proof
          </h2>
          <p className="text-xs text-neutral-500 font-normal mt-0.5">
            Share your progress on LinkedIn and submit the post link.
          </p>
        </div>
      </div>

      {/* Main Content Area: Input + Verification Badge */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-1">
        {/* Form Input & Button */}
        <div className="flex-1 space-y-3 min-w-0">
          <ProofInput
            id="linkedin-post-input"
            label="LinkedIn Post Link"
            value={linkedinUrl}
            onChange={onUrlChange}
            icon={Linkedin}
            placeholder="https://www.linkedin.com/posts/..."
          />

          <div className="pt-1">
            <button
              type="button"
              onClick={onVerify}
              className="px-4 py-2 bg-black hover:bg-neutral-800 text-white font-medium text-xs rounded-lg transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verify LinkedIn</span>
            </button>
          </div>
        </div>

        {/* Verification Card (Desktop: Right, Mobile: Bottom) */}
        <div className="shrink-0 flex items-center">
          <VerificationStatus type="LinkedIn" isVerified={isVerified} />
        </div>
      </div>
    </section>
  );
};
