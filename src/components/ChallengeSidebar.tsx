import React from 'react';
import { ChallengeIntro } from './ChallengeIntro';
import { InfoCard } from './InfoCard';
import { DeliverablesCard } from './DeliverablesCard';
import { SkillSignal } from './SkillSignal';
import { DayChallenge, RoutePath } from '../types';

interface ChallengeSidebarProps {
  challenge: DayChallenge;
  onNavigate: (path: RoutePath) => void;
}

export const ChallengeSidebar: React.FC<ChallengeSidebarProps> = ({
  challenge,
  onNavigate,
}) => {
  return (
    <aside className="space-y-4 sm:space-y-5">
      <ChallengeIntro
        dayId={challenge.dayId}
        totalDays={60}
        title={challenge.title}
        durationMins={challenge.estimatedMinutes}
        headline={challenge.summaryHeadline}
        subtext={challenge.summarySubtext}
        onNavigate={onNavigate}
      />

      <InfoCard
        content={challenge.whyItMatters}
      />

      <DeliverablesCard
        items={challenge.deliverables}
      />

      <SkillSignal
        skills={challenge.skills}
      />
    </aside>
  );
};
