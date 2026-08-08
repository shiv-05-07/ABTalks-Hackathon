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
  name: 'Aarav Sharma',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  college: 'IIT Delhi — Computer Science 3rd Year',
  currentTrack: 'Full-Stack Web Dev (React & Node)',
  currentStreak: 11,
  longestStreak: 11,
  completedDays: 12,
  totalDays: 60,
  standingRank: 142,
  githubUsername: 'aarav-codes',
  linkedinProfile: 'linkedin.com/in/aarav-sharma-dev',
  hasSubmittedToday: false,
  missedYesterday: false,
};

export const MOCK_SUBMISSIONS: Record<number, ProofSubmission> = {
  1: {
    dayId: 1,
    githubUrl: 'https://github.com/aarav-codes/abtalks-day1-portfolio',
    linkedinUrl: 'https://linkedin.com/posts/aarav-sharma-day1-building-in-public',
    submittedAt: '2026-07-28T21:30:00Z',
    reflection: 'Set up my developer portfolio foundation using Vite + Tailwind.',
    status: 'verified',
  },
  2: {
    dayId: 2,
    githubUrl: 'https://github.com/aarav-codes/abtalks-day2-responsive-navbar',
    linkedinUrl: 'https://linkedin.com/posts/aarav-sharma-day2-abtalks',
    submittedAt: '2026-07-29T22:15:00Z',
    reflection: 'Built accessible, mobile-first navigation drawer with pure Tailwind.',
    status: 'verified',
  },
  11: {
    dayId: 11,
    githubUrl: 'https://github.com/aarav-codes/abtalks-day11-custom-hooks',
    linkedinUrl: 'https://linkedin.com/posts/aarav-sharma-day11-abtalks-streak',
    submittedAt: '2026-08-07T23:00:00Z',
    reflection: 'Created useLocalStorage and useDebounce hooks with TypeScript generic types.',
    status: 'verified',
  },
};

export const MOCK_CHALLENGES: Record<number, DayChallenge> = {
  1: {
    dayId: 1,
    title: 'Hello World & Portfolio Setup',
    track: 'Full-Stack Web Dev',
    summary: 'Kick off Day 1 of your 60-day journey by setting up a clean developer landing page.',
    estimatedMinutes: 30,
    objectives: [
      'Initialize a modern React + TypeScript repository on GitHub',
      'Design a minimal hero section with your headline and skills',
      'Deploy live on Vercel or Netlify and share proof',
    ],
    deliverables: {
      github: 'Repository link containing Day 1 initial commit',
      linkedin: 'LinkedIn post announcing your 60-day commitment with #ABTalks #BuildInPublic',
    },
    starterCodeSnippet: `// Day 1 Starter Component
export default function DeveloperGreeting() {
  return (
    <div className="p-8 font-mono text-sm border border-neutral-200 rounded-lg">
      <h1>Day 01 / 60: Commitment Unlocked 🚀</h1>
      <p>Building in public for the next 60 days with ABTalks!</p>
    </div>
  );
}`,
    resources: [
      { title: 'Vite React TypeScript Quickstart', url: 'https://vitejs.dev/guide/' },
      { title: 'Tailwind CSS Installation Guide', url: 'https://tailwindcss.com/docs' },
    ],
    isCompleted: true,
  },
  12: {
    dayId: 12,
    title: 'Responsive Editorial Landing Page',
    track: 'Full-Stack Web Dev',
    summary: 'Build a high-precision, monochrome editorial landing page with mobile-first grid layout and zero visual noise.',
    estimatedMinutes: 45,
    objectives: [
      'Implement crisp typographic hierarchy with strong black headlines',
      'Create a 4-column feature metrics strip with subtle borders',
      'Build a step-by-step "How It Works" workflow and a 60-dot interactive journey tracker',
      'Ensure 100% responsiveness on mobile (390px viewport width)',
    ],
    deliverables: {
      github: 'GitHub repo or commit with complete page code',
      linkedin: 'LinkedIn post sharing a screenshot of your Day 12 build',
    },
    starterCodeSnippet: `// Day 12: Editorial Layout Structure
export function LandingSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="inline-block px-3 py-1 bg-neutral-100 border border-neutral-200 rounded-full text-[11px] font-mono tracking-wider">
        ⚡ DAY 12 CHALLENGE
      </div>
      <h1 className="text-5xl font-black text-black mt-4 tracking-tight">
        Build for 60 days.
      </h1>
      <p className="text-neutral-500 mt-2 max-w-md">
        Build projects. Share your progress. Grow in public. Get noticed.
      </p>
    </section>
  );
}`,
    resources: [
      { title: 'Mobile-First Design System Specs', url: 'https://tailwindcss.com/docs/responsive-design' },
      { title: 'ABTalks Reference Visual Guide', url: '#' },
    ],
    isCompleted: false,
  },
  13: {
    dayId: 13,
    title: 'Interactive State & Theme Engine',
    track: 'Full-Stack Web Dev',
    summary: 'Build an elegant local state manager that syncs challenge progress with localStorage.',
    estimatedMinutes: 40,
    objectives: [
      'Create a React Context for challenge streak tracking',
      'Persist submissions in local storage',
      'Add instant validation feedback for submission URLs',
    ],
    deliverables: {
      github: 'Commit containing state management hooks',
      linkedin: 'LinkedIn post showcasing state persistence demo video',
    },
    starterCodeSnippet: `export function useStreakCounter() {
  const [streak, setStreak] = useState(11);
  return { streak, increment: () => setStreak(s => s + 1) };
}`,
    resources: [
      { title: 'React State Management Best Practices', url: 'https://react.dev' },
    ],
    isCompleted: false,
  },
};

// Helper function to get or generate any day challenge (1 to 60)
export function getChallengeForDay(dayNumber: number): DayChallenge {
  if (MOCK_CHALLENGES[dayNumber]) {
    return MOCK_CHALLENGES[dayNumber];
  }

  return {
    dayId: dayNumber,
    title: `Day ${dayNumber}: Advanced Project Feature ${dayNumber}`,
    track: 'Full-Stack Web Dev',
    summary: `Day ${dayNumber} focus: Build, refine, and ship a core production feature for your public portfolio.`,
    estimatedMinutes: 45,
    objectives: [
      `Review Day ${dayNumber} architectural specifications`,
      'Implement clean, modular TypeScript code',
      'Publish proof of work on GitHub and share on LinkedIn',
    ],
    deliverables: {
      github: `GitHub repo/commit for Day ${dayNumber}`,
      linkedin: `LinkedIn post describing your Day ${dayNumber} build`,
    },
    starterCodeSnippet: `// Day ${dayNumber} Code Challenge
console.log("Day ${dayNumber} of 60 — Keep building!");`,
    resources: [
      { title: 'ABTalks Developer Documentation', url: '#' },
    ],
    isCompleted: dayNumber <= 11,
  };
}
