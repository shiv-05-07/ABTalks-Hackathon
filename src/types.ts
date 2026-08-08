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
  githubUrl: string;
  linkedinUrl: string;
  submittedAt: string; // ISO date or formatted
  reflection?: string;
  status: 'verified' | 'pending' | 'missing';
}

export interface DayChallenge {
  dayId: number; // 1 to 60
  title: string;
  track: string;
  summary: string;
  estimatedMinutes: number;
  objectives: string[];
  deliverables: {
    github: string;
    linkedin: string;
  };
  starterCodeSnippet?: string;
  resources: { title: string; url: string }[];
  isCompleted?: boolean;
}

export interface Track {
  id: string;
  name: string;
  description: string;
  popular?: boolean;
}
