export type RoutePath = '/' | '/dashboard' | `/day/${number}` | '/report-card' | string;

export type DemoMode = 'active' | 'first_day' | 'missed_day' | 'empty';

export type SubmissionStatus = 'verified' | 'pending' | 'skipped' | 'missed' | 'none';

export interface StudentProfile {
  name: string;
  avatarUrl: string;
  college: string;
  year: string;
  currentTrack: string;
  currentStreak: number;
  longestStreak: number;
  completedDays: number;
  totalDays: number;
  standingRank: number;
  totalStudents: number;
  githubUsername: string;
  linkedinProfile: string;
  hasSubmittedToday: boolean;
  missedYesterday: boolean;
  visibilityScore: number;
  linkedinPostsCount: number;
  githubCommitsCount: number;
}

export interface ProofSubmission {
  dayId: number;
  githubRepoUrl: string;
  githubCommitUrl: string;
  linkedinUrl: string;
  notes?: string;
  submittedAt: string;
  isGithubVerified: boolean;
  isLinkedinVerified: boolean;
  status: SubmissionStatus;
}

export interface DayChallenge {
  dayId: number;
  title: string;
  track: string;
  summaryHeadline: string;
  summarySubtext: string;
  estimatedMinutes: number;
  difficulty: 'Easy' | 'Medium' | 'Stretch';
  whyItMatters: string;
  brief: string[];
  deliverables: string[];
  skills: string[];
  acceptanceCriteria: string[];
  linkedinPrompt: string;
  defaultRepoUrl: string;
  defaultCommitUrl: string;
  defaultLinkedinUrl: string;
}

export interface Track {
  id: string;
  name: string;
  description: string;
  days: number;
  popular?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  earned: boolean;
  icon: 'flame' | 'commit' | 'share' | 'comeback' | 'focus' | 'rank';
}

export interface WeekDay {
  dayId: number;
  label: string;
  status: 'done' | 'today' | 'upcoming' | 'missed' | 'locked';
}

export interface RitualStep {
  id: 'read' | 'build' | 'prove';
  title: string;
  detail: string;
  minutes: number;
}

export interface SubmissionProofInput {
  dayId: number;
  studentName: string;
  track: string;
  githubUrl: string;
  commitUrl?: string;
  codeSnippet: string;
  linkedinPostText: string;
  timeSpentMinutes: number;
  submittedAt: string;
}

export interface GitHubVerification {
  fullName: string;
  description: string | null;
  stars: number;
  language: string | null;
  htmlUrl: string;
  commitSha: string;
  commitMessage: string;
  commitAuthor: string;
  commitDate: string;
  isPublic: boolean;
}

export interface AIProofAnalysisResult {
  dayId: number;
  overallScore: number;
  performanceBand: string;
  isVerified: boolean;
  codeQualityScore: number;
  linkedinPitchScore: number;
  recruiterReadiness: number;
  consistencySignal: number;
  codeReview: {
    strengths: string[];
    improvements: string[];
    eleganceSummary: string;
  };
  linkedinFeedback: {
    visibilityTip: string;
    recruiterAppeal: string;
    suggestion: string;
    hookScore: number;
  };
  skillSignals: string[];
  timeEfficiencyNote: string;
  generatedBadge: string;
  nextMove: string;
  verifiedRepo?: GitHubVerification;
  engine: 'gemini' | 'heuristic';
}
