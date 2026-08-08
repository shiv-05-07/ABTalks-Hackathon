export type RoutePath = '/' | '/dashboard' | `/day/${number}` | string;

export interface StudentProfile {
  name: string;
  avatarUrl: string;
  college: string;
  currentTrack: string;
  currentStreak: number;
  longestStreak: number;
  completedDays: number; // e.g. 12
  totalDays: number; // 60
  standingRank: number; // e.g. #142 out of 10,420
  githubUsername: string;
  linkedinProfile: string;
  hasSubmittedToday: boolean;
  missedYesterday: boolean;
}

export interface ProofSubmission {
  dayId: number;
  githubRepoUrl: string;
  githubCommitUrl: string;
  linkedinUrl: string;
  submittedAt: string; // ISO date or formatted
  isGithubVerified: boolean;
  isLinkedinVerified: boolean;
  status: 'verified' | 'pending' | 'skipped';
}

export interface DayChallenge {
  dayId: number; // 1 to 60
  title: string;
  track: string;
  summaryHeadline: string;
  summarySubtext: string;
  estimatedMinutes: number;
  whyItMatters: string;
  deliverables: string[];
  skills: string[];
  defaultRepoUrl: string;
  defaultCommitUrl: string;
  defaultLinkedinUrl: string;
  isCompleted?: boolean;
}

export interface Track {
  id: string;
  name: string;
  description: string;
  popular?: boolean;
}

