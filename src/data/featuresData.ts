export interface CohortEvent {
  id: string;
  name: string;
  college: string;
  action: string;
  minutesAgo: number;
  dayId: number;
}

export interface Milestone {
  day: number;
  title: string;
  detail: string;
}

export const COHORT_FEED: CohortEvent[] = [
  {
    id: '1',
    name: 'Sana Q.',
    college: 'VIT',
    action: 'locked Day 14 proof',
    minutesAgo: 2,
    dayId: 14,
  },
  {
    id: '2',
    name: 'Rohan D.',
    college: 'BITS',
    action: 'hit a 21-day streak',
    minutesAgo: 8,
    dayId: 21,
  },
  {
    id: '3',
    name: 'Meera K.',
    college: 'NITK',
    action: 'verified GitHub + LinkedIn',
    minutesAgo: 14,
    dayId: 9,
  },
  {
    id: '4',
    name: 'Kabir S.',
    college: 'IIIT-H',
    action: 'used Comeback Protocol',
    minutesAgo: 21,
    dayId: 18,
  },
  {
    id: '5',
    name: 'Ananya P.',
    college: 'DTU',
    action: 'shipped Day 30 milestone',
    minutesAgo: 33,
    dayId: 30,
  },
];

export const MILESTONES: Milestone[] = [
  { day: 1, title: 'First Signal', detail: 'Public repo + first post' },
  { day: 7, title: 'Week Flame', detail: 'One full week of receipts' },
  { day: 14, title: 'Habit Lock', detail: 'Recruiters notice patterns' },
  { day: 30, title: 'Halfway Hero', detail: 'Portfolio starts compounding' },
  { day: 45, title: 'Final Stretch', detail: 'Consistency becomes identity' },
  { day: 60, title: 'Challenge Clear', detail: '60 nights. Done.' },
];

export function buildHeatmap(
  completedDays: number,
  currentDay: number,
  missedYesterday: boolean
): Array<'done' | 'today' | 'missed' | 'empty' | 'locked'> {
  return Array.from({ length: 60 }, (_, i) => {
    const day = i + 1;
    if (day === currentDay) return 'today';
    if (missedYesterday && day === currentDay - 1) return 'missed';
    if (day <= completedDays) return 'done';
    if (day > currentDay) return 'locked';
    return 'empty';
  });
}

export function formatMinutesAgo(mins: number): string {
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  return `${Math.floor(mins / 60)}h ago`;
}
