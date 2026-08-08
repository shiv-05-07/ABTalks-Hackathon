import React from 'react';
import { ChallengeSidebar } from './ChallengeSidebar';
import { SubmissionWorkflow } from './SubmissionWorkflow';
import { DayChallenge, ProofSubmission, RoutePath } from '../types';

interface ChallengeDayProps {
  dayId: number;
  challenge: DayChallenge;
  existingSubmission?: ProofSubmission;
  streakCount?: number;
  onNavigate: (path: RoutePath) => void;
  onSubmitProof: (submission: ProofSubmission) => void;
}

export const ChallengeDay: React.FC<ChallengeDayProps> = ({
  dayId,
  challenge,
  existingSubmission,
  streakCount = 11,
  onNavigate,
  onSubmitProof,
}) => {
  return (
    <div className="w-full bg-white text-neutral-900 min-h-[calc(100vh-64px)] pb-12 sm:pb-16 pt-4 sm:pt-6">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        {/* Main Grid: Desktop 2-column (32% / 68%), Mobile 1-column */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.32fr_0.68fr] gap-8 lg:gap-10 items-start">
          {/* Left Column: Challenge Information */}
          <ChallengeSidebar
            challenge={challenge}
            onNavigate={onNavigate}
          />

          {/* Right Column: Submission Workflow */}
          <SubmissionWorkflow
            challenge={challenge}
            existingSubmission={existingSubmission}
            streakCount={streakCount}
            onSubmitProof={onSubmitProof}
          />
        </div>
      </div>
    </div>
  );
};
