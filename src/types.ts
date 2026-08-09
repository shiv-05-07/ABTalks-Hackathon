export type RoutePath = '/' | '/dashboard' | `/day/${number}` | '/report-card'| string;

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

// Add these interfaces to src/types.ts

export interface SubjectScore {
  id: string;
  subjectName: string;
  marksObtained: number;
  totalMarks: number;
  grade?: string;
  teacherComment?: string;
}

export interface StudentProfile {
  studentName: string;
  rollNumber: string;
  gradeLevel: string; // e.g. "Grade 10", "Grade 12"
  academicTerm: string; // e.g. "Term 1 - 2026", "Final Semester"
  schoolName?: string;
  attendancePercentage: number;
  conductRating: 'Excellent' | 'Good' | 'Satisfactory' | 'Needs Improvement';
  teacherNotes?: string;
  subjects: SubjectScore[];
}

export interface AIEvaluationResult {
  overallGpa: string;
  overallPercentage: number;
  performanceBand: string; // e.g. "High Distinction", "Proficient", "Developing"
  executiveSummary: string;
  keyStrengths: string[];
  areasForImprovement: string[];
  subjectInsights: {
    subjectName: string;
    insight: string;
    recommendation: string;
  }[];
  actionableRecommendations: string[];
}

export interface FullReportCardData {
  student: StudentProfile;
  aiEvaluation: AIEvaluationResult;
  generatedAt: string;
}

// Add to src/types.ts

export interface SubmissionProofInput {
  dayId: number;
  githubUrl: string;
  codeSnippet: string;
  linkedinPostText: string;
  timeSpentMinutes: number;
  submittedAt: string;
}

export interface AIProofAnalysisResult {
  dayId: number;
  overallScore: number; // 0 - 100
  isVerified: boolean;
  codeQualityScore: number; // 0 - 100
  linkedinPitchScore: number; // 0 - 100
  codeReview: {
    strengths: string[];
    improvements: string[];
    eleganceSummary: string;
  };
  linkedinFeedback: {
    visibilityTip: string;
    recruiterAppealScore: string; // e.g. "High Impact", "Moderate", "Needs Hook"
    suggestion: string;
  };
  timeEfficiencyNote: string;
  generatedBadge: string;
}

