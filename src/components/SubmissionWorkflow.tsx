import React, { useState } from 'react';
import { GithubSubmission } from './GithubSubmission';
import { LinkedinSubmission } from './LinkedinSubmission';
import { ReviewSubmission } from './ReviewSubmission';
import { SkipDay } from './SkipDay';
import { DayChallenge, ProofSubmission } from '../types';

interface SubmissionWorkflowProps {
  challenge: DayChallenge;
  existingSubmission?: ProofSubmission;
  streakCount: number;
  onSubmitProof: (submission: ProofSubmission) => void;
}

export const SubmissionWorkflow: React.FC<SubmissionWorkflowProps> = ({
  challenge,
  existingSubmission,
  streakCount,
  onSubmitProof,
}) => {
  const [repoUrl, setRepoUrl] = useState(
    existingSubmission?.githubRepoUrl || challenge.defaultRepoUrl
  );
  const [commitUrl, setCommitUrl] = useState(
    existingSubmission?.githubCommitUrl || challenge.defaultCommitUrl
  );
  const [linkedinUrl, setLinkedinUrl] = useState(
    existingSubmission?.linkedinUrl || challenge.defaultLinkedinUrl
  );

  const [isGithubVerified, setIsGithubVerified] = useState(
    existingSubmission?.isGithubVerified ?? true
  );
  const [isLinkedinVerified, setIsLinkedinVerified] = useState(
    existingSubmission?.isLinkedinVerified ?? true
  );
  const [isSubmitted, setIsSubmitted] = useState(
    existingSubmission?.status === 'verified'
  );

  const handleVerifyGithub = () => {
    setIsGithubVerified(true);
  };

  const handleVerifyLinkedin = () => {
    setIsLinkedinVerified(true);
  };

  const handleSubmit = () => {
    const newSubmission: ProofSubmission = {
      dayId: challenge.dayId,
      githubRepoUrl: repoUrl,
      githubCommitUrl: commitUrl,
      linkedinUrl: linkedinUrl,
      submittedAt: new Date().toISOString(),
      isGithubVerified: true,
      isLinkedinVerified: true,
      status: 'verified',
    };

    setIsGithubVerified(true);
    setIsLinkedinVerified(true);
    setIsSubmitted(true);
    onSubmitProof(newSubmission);
  };

  const handleSkip = () => {
    const skippedSubmission: ProofSubmission = {
      dayId: challenge.dayId,
      githubRepoUrl: repoUrl,
      githubCommitUrl: commitUrl,
      linkedinUrl: linkedinUrl,
      submittedAt: new Date().toISOString(),
      isGithubVerified: false,
      isLinkedinVerified: false,
      status: 'skipped',
    };
    onSubmitProof(skippedSubmission);
    alert('Day 12 marked as skipped.');
  };

  return (
    <div className="space-y-4 sm:space-y-5">
      <GithubSubmission
        repoUrl={repoUrl}
        commitUrl={commitUrl}
        isVerified={isGithubVerified}
        onRepoChange={setRepoUrl}
        onCommitChange={setCommitUrl}
        onVerify={handleVerifyGithub}
      />

      <LinkedinSubmission
        linkedinUrl={linkedinUrl}
        isVerified={isLinkedinVerified}
        onUrlChange={setLinkedinUrl}
        onVerify={handleVerifyLinkedin}
      />

      <ReviewSubmission
        githubRepoUrl={repoUrl}
        githubCommitUrl={commitUrl}
        linkedinUrl={linkedinUrl}
        streakCount={streakCount}
        onSubmit={handleSubmit}
        isSubmitted={isSubmitted}
      />

      <SkipDay onSkip={handleSkip} />
    </div>
  );
};
