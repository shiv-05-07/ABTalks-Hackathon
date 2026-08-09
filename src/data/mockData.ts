import {
  Achievement,
  DayChallenge,
  ProofSubmission,
  RitualStep,
  StudentProfile,
  Track,
  WeekDay,
} from '../types';

export const MOCK_TRACKS: Track[] = [
  {
    id: 'fullstack',
    name: 'Full-Stack Web',
    description: 'Ship React + Node projects recruiters can click through.',
    days: 60,
    popular: true,
  },
  {
    id: 'ai',
    name: 'AI Engineering',
    description: 'Build LLM apps, agents, and practical AI tools.',
    days: 60,
  },
  {
    id: 'mobile',
    name: 'Mobile Apps',
    description: 'Cross-platform apps with React Native.',
    days: 60,
  },
];

export const DEFAULT_STUDENT_PROFILE: StudentProfile = {
  name: 'Arjun Mehta',
  avatarUrl:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80',
  college: 'IIT Delhi',
  year: '3rd Year · CS',
  currentTrack: 'Full-Stack Web',
  currentStreak: 11,
  longestStreak: 11,
  completedDays: 11,
  totalDays: 60,
  standingRank: 142,
  totalStudents: 10420,
  githubUsername: 'arjunmehta',
  linkedinProfile: 'linkedin.com/in/arjunmehta',
  hasSubmittedToday: false,
  missedYesterday: false,
  visibilityScore: 78,
  linkedinPostsCount: 10,
  githubCommitsCount: 11,
};

export const EMPTY_STUDENT_PROFILE: StudentProfile = {
  name: 'New Builder',
  avatarUrl: '',
  college: 'Your college',
  year: 'Year · Branch',
  currentTrack: 'Pick a track',
  currentStreak: 0,
  longestStreak: 0,
  completedDays: 0,
  totalDays: 60,
  standingRank: 0,
  totalStudents: 10420,
  githubUsername: '',
  linkedinProfile: '',
  hasSubmittedToday: false,
  missedYesterday: false,
  visibilityScore: 0,
  linkedinPostsCount: 0,
  githubCommitsCount: 0,
};

export const FIRST_DAY_PROFILE: StudentProfile = {
  ...DEFAULT_STUDENT_PROFILE,
  name: 'Priya Nair',
  avatarUrl:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80',
  college: 'NIT Trichy',
  year: '2nd Year · ECE',
  currentStreak: 0,
  longestStreak: 0,
  completedDays: 0,
  standingRank: 0,
  hasSubmittedToday: false,
  missedYesterday: false,
  visibilityScore: 8,
  linkedinPostsCount: 0,
  githubCommitsCount: 0,
};

export const MISSED_DAY_PROFILE: StudentProfile = {
  ...DEFAULT_STUDENT_PROFILE,
  currentStreak: 0,
  longestStreak: 11,
  completedDays: 11,
  hasSubmittedToday: false,
  missedYesterday: true,
  visibilityScore: 64,
  linkedinPostsCount: 10,
  githubCommitsCount: 11,
};

export const MOCK_SUBMISSIONS: Record<number, ProofSubmission> = {
  1: {
    dayId: 1,
    githubRepoUrl: 'https://github.com/arjunmehta/abtalks-60',
    githubCommitUrl: 'https://github.com/arjunmehta/abtalks-60/commit/a1b2c3d',
    linkedinUrl: 'https://www.linkedin.com/posts/arjunmehta_day1',
    submittedAt: '2026-07-29T22:14:00.000Z',
    isGithubVerified: true,
    isLinkedinVerified: true,
    status: 'verified',
  },
  11: {
    dayId: 11,
    githubRepoUrl: 'https://github.com/arjunmehta/abtalks-60',
    githubCommitUrl: 'https://github.com/arjunmehta/abtalks-60/commit/e5f6g7h',
    linkedinUrl: 'https://www.linkedin.com/posts/arjunmehta_day11',
    submittedAt: '2026-08-08T23:02:00.000Z',
    isGithubVerified: true,
    isLinkedinVerified: true,
    status: 'verified',
  },
};

const CHALLENGE_BANK: Record<number, Partial<DayChallenge>> = {
  1: {
    title: 'Ship your challenge home base',
    summaryHeadline: 'Create the repo that will hold 60 days of proof.',
    summarySubtext: 'A clean public repo is your first credibility signal.',
    estimatedMinutes: 35,
    difficulty: 'Easy',
    whyItMatters:
      'Recruiters open GitHub before they open your résumé. A living challenge repo shows consistency before you even speak.',
    brief: [
      'Create a public GitHub repository named something clear like abtalks-60.',
      'Add a starter README with your track, college, and goal.',
      'Make your first commit today — even a small one counts.',
    ],
    deliverables: ['Public repo', 'Starter README', 'Day 1 commit'],
    skills: ['Git', 'Documentation', 'Public building'],
    acceptanceCriteria: [
      'Repo is public and discoverable',
      'README mentions ABTalks 60-day challenge',
      'At least one commit exists today',
    ],
    linkedinPrompt:
      'Day 1/60 of ABTalks. Starting my Full-Stack track. Repo is live — holding myself accountable in public.',
  },
  12: {
    title: 'Build a recruiter-friendly README',
    summaryHeadline: 'A good README tells your story before you do.',
    summarySubtext: 'Make your project easy to understand and impressive in under 60 seconds.',
    estimatedMinutes: 45,
    difficulty: 'Medium',
    whyItMatters:
      'Your README is often the first thing a recruiter scans. Clear structure signals communication skill, ownership, and polish — not just code.',
    brief: [
      'Rewrite your project README so a stranger understands the product in one scroll.',
      'Lead with what it does, who it’s for, and what you learned.',
      'Add setup steps and a visual if you have one.',
    ],
    deliverables: [
      'Project overview',
      'Tech stack',
      'Installation / setup',
      'Screenshot or demo link',
      'Key learnings',
    ],
    skills: ['Communication', 'Documentation', 'Git'],
    acceptanceCriteria: [
      'Overview explains the product in 3 lines or fewer',
      'Tech stack and setup are copy-paste ready',
      'At least one learning is written in plain language',
    ],
    linkedinPrompt:
      'Day 12/60 — rewrote my project README for recruiters. Clear overview, setup, and what I learned. Consistency compounds.',
  },
};

export const DAY_12_CHALLENGE: DayChallenge = {
  dayId: 12,
  title: 'Build a recruiter-friendly README',
  track: 'Full-Stack Web',
  summaryHeadline: 'A good README tells your story before you do.',
  summarySubtext: 'Make your project easy to understand and impressive in under 60 seconds.',
  estimatedMinutes: 45,
  difficulty: 'Medium',
  whyItMatters:
    'Your README is often the first thing a recruiter scans. Clear structure signals communication skill, ownership, and polish — not just code.',
  brief: [
    'Rewrite your project README so a stranger understands the product in one scroll.',
    'Lead with what it does, who it’s for, and what you learned.',
    'Add setup steps and a visual if you have one.',
  ],
  deliverables: [
    'Project overview',
    'Tech stack',
    'Installation / setup',
    'Screenshot or demo link',
    'Key learnings',
  ],
  skills: ['Communication', 'Documentation', 'Git'],
  acceptanceCriteria: [
    'Overview explains the product in 3 lines or fewer',
    'Tech stack and setup are copy-paste ready',
    'At least one learning is written in plain language',
  ],
  linkedinPrompt:
    'Day 12/60 — rewrote my project README for recruiters. Clear overview, setup, and what I learned. Consistency compounds.',
  defaultRepoUrl: 'https://github.com/arjunmehta/abtalks-60',
  defaultCommitUrl: 'https://github.com/arjunmehta/abtalks-60/commit/f9a12cdef',
  defaultLinkedinUrl: 'https://www.linkedin.com/posts/arjunmehta_day12-readme',
};

export function getChallengeForDay(dayNumber: number): DayChallenge {
  const bank = CHALLENGE_BANK[dayNumber];
  if (dayNumber === 12) return DAY_12_CHALLENGE;

  return {
    dayId: dayNumber,
    title: bank?.title ?? `Day ${dayNumber} build sprint`,
    track: 'Full-Stack Web',
    summaryHeadline: bank?.summaryHeadline ?? `Keep the streak alive on day ${dayNumber}.`,
    summarySubtext:
      bank?.summarySubtext ?? 'Ship one meaningful commit and share what you learned publicly.',
    estimatedMinutes: bank?.estimatedMinutes ?? 40,
    difficulty: bank?.difficulty ?? 'Medium',
    whyItMatters:
      bank?.whyItMatters ??
      'Daily public proof trains consistency — the trait recruiters trust more than a one-off project.',
    brief: bank?.brief ?? [
      `Complete today’s focused build task for day ${dayNumber}.`,
      'Commit your work to your challenge repository.',
      'Share a short LinkedIn update with one concrete learning.',
    ],
    deliverables: bank?.deliverables ?? ['Working change', 'GitHub commit', 'LinkedIn post'],
    skills: bank?.skills ?? ['Consistency', 'Git', 'Communication'],
    acceptanceCriteria: bank?.acceptanceCriteria ?? [
      'Commit is dated today',
      'LinkedIn post mentions the day number',
      'You can explain what you built in one sentence',
    ],
    linkedinPrompt:
      bank?.linkedinPrompt ??
      `Day ${dayNumber}/60 of ABTalks. Built in public again today. One commit. One learning. Still going.`,
    defaultRepoUrl: 'https://github.com/arjunmehta/abtalks-60',
    defaultCommitUrl: `https://github.com/arjunmehta/abtalks-60/commit/${dayNumber.toString(16).padStart(7, 'a')}abc`,
    defaultLinkedinUrl: `https://www.linkedin.com/posts/arjunmehta_day${dayNumber}`,
  };
}

export const TONIGHT_RITUAL: RitualStep[] = [
  {
    id: 'read',
    title: 'Read the brief',
    detail: 'Understand the task and why it matters to recruiters.',
    minutes: 5,
  },
  {
    id: 'build',
    title: 'Build the smallest shippable slice',
    detail: 'Aim for done, not perfect. One clear outcome.',
    minutes: 30,
  },
  {
    id: 'prove',
    title: 'Submit proof',
    detail: 'GitHub commit + LinkedIn post. Lock the streak.',
    minutes: 10,
  },
];

export function getWeekDays(currentDay: number, missedYesterday: boolean): WeekDay[] {
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const start = Math.max(1, currentDay - 3);

  return labels.map((label, index) => {
    const dayId = start + index;
    if (dayId > 60) {
      return { dayId, label, status: 'locked' as const };
    }
    if (dayId === currentDay) {
      return { dayId, label, status: 'today' as const };
    }
    if (missedYesterday && dayId === currentDay - 1) {
      return { dayId, label, status: 'missed' as const };
    }
    if (dayId < currentDay) {
      return { dayId, label, status: 'done' as const };
    }
    return { dayId, label, status: 'upcoming' as const };
  });
}

export function getAchievements(profile: StudentProfile): Achievement[] {
  return [
    {
      id: 'first-commit',
      title: 'First Commit',
      description: 'Submitted Day 1 proof of work',
      earned: profile.completedDays >= 1,
      icon: 'commit',
    },
    {
      id: 'week-streak',
      title: '7-Day Flame',
      description: 'Kept a streak for a full week',
      earned: profile.longestStreak >= 7,
      icon: 'flame',
    },
    {
      id: 'public-voice',
      title: 'Public Voice',
      description: 'Posted 10 LinkedIn updates',
      earned: profile.linkedinPostsCount >= 10,
      icon: 'share',
    },
    {
      id: 'comeback',
      title: 'Comeback Protocol',
      description: 'Returned after a missed day',
      earned: profile.missedYesterday === false && profile.longestStreak > profile.currentStreak,
      icon: 'comeback',
    },
    {
      id: 'night-builder',
      title: 'Night Builder',
      description: 'Completed Tonight’s Ritual',
      earned: profile.hasSubmittedToday,
      icon: 'focus',
    },
    {
      id: 'top-cohort',
      title: 'Top 20%',
      description: 'Standing in the top fifth of the cohort',
      earned: profile.standingRank > 0 && profile.standingRank / profile.totalStudents <= 0.2,
      icon: 'rank',
    },
  ];
}

export const LANDING_STATS = [
  { value: '10,000+', label: 'Students building in public' },
  { value: '60', label: 'Days of focused shipping' },
  { value: '2 proofs', label: 'GitHub + LinkedIn every day' },
];

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Pick a track',
    body: 'Full-stack, AI, or mobile. One path for 60 days so your portfolio tells a coherent story.',
  },
  {
    step: '02',
    title: 'Build every day',
    body: 'A focused task lands each night. Ship something real — not just “studied a tutorial.”',
  },
  {
    step: '03',
    title: 'Prove it publicly',
    body: 'Submit a GitHub commit and a LinkedIn post. Consistency becomes visible to recruiters.',
  },
];

export const TRUST_QUOTES = [
  {
    quote: 'I used to disappear after exams. Now recruiters can see 40 days of receipts.',
    name: 'Sana Qureshi',
    meta: 'VIT · AI track',
  },
  {
    quote: 'The nightly ritual is the only reason I still ship after 10pm labs.',
    name: 'Rohan Das',
    meta: 'BITS Pilani · Full-Stack',
  },
];
