import { DayChallenge, StudentProfile, Track, ProofSubmission } from '../types';

export const MOCK_TRACKS: Track[] = [
  {
    id: 'fullstack-web',
    name: 'Full-Stack Web Dev (React & Node)',
    description: 'Master modern frontend & backend by building production web apps.',
    popular: true,
  },
  {
    id: 'ai-engineering',
    name: 'AI & LLM App Development',
    description: 'Build real-world AI tools, agents, and RAG pipelines.',
  },
  {
    id: 'mobile-dev',
    name: 'React Native & Mobile',
    description: 'Create fluid cross-platform iOS and Android applications.',
  },
];

export const DEFAULT_STUDENT_PROFILE: StudentProfile = {
  name: 'Arjun Mehta',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  college: 'IIT Delhi — Computer Science 3rd Year',
  currentTrack: 'Full-Stack Web Dev (React & Node)',
  currentStreak: 11,
  longestStreak: 11,
  completedDays: 12,
  totalDays: 60,
  standingRank: 142,
  githubUsername: 'arjunmehta',
  linkedinProfile: 'linkedin.com/in/arjunmehta',
  hasSubmittedToday: false,
  missedYesterday: false,
};

export const MOCK_SUBMISSIONS: Record<number, ProofSubmission> = {
  12: {
    dayId: 12,
    githubRepoUrl: 'https://github.com/arjunmehta/portfolio',
    githubCommitUrl: 'https://github.com/arjunmehta/portfolio/commit/abc1234def',
    linkedinUrl: 'https://www.linkedin.com/posts/arjunmehta_built-readme-day12',
    submittedAt: new Date().toISOString(),
    isGithubVerified: true,
    isLinkedinVerified: true,
    status: 'verified',
  },
};

export const DAY_12_CHALLENGE: DayChallenge = {
  dayId: 12,
  title: 'Build a recruiter-friendly README',
  track: 'Full-Stack Web Dev',
  summaryHeadline: 'A good README tells your story before you do.',
  summarySubtext: 'Make your project easy to understand and impressive.',
  estimatedMinutes: 45,
  whyItMatters: 'Your README is often the first thing recruiters see.\nA clear README shows communication, clarity and\nattention to detail.',
  deliverables: [
    'Project overview',
    'Tech stack',
    'Installation / Setup',
    'Screenshots (if any)',
    'Key learnings',
  ],
  skills: ['Communication', 'Documentation', 'Git'],
  defaultRepoUrl: 'https://github.com/arjunmehta/portfolio',
  defaultCommitUrl: 'https://github.com/arjunmehta/portfolio/commit/abc1234def',
  defaultLinkedinUrl: 'https://www.linkedin.com/posts/arjunmehta_built-readme-day12',
  isCompleted: false,
};

export function getChallengeForDay(dayNumber: number): DayChallenge {
  if (dayNumber === 12) {
    return DAY_12_CHALLENGE;
  }

  return {
    ...DAY_12_CHALLENGE,
    dayId: dayNumber,
    title: `Day ${dayNumber}: Coding Challenge`,
  };
}

