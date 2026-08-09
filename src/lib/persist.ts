import { ProofSubmission, StudentProfile } from '../types';
import { DEFAULT_STUDENT_PROFILE, MOCK_SUBMISSIONS } from '../data/mockData';

const PROFILE_KEY = 'abtalks.profile.v1';
const SUBMISSIONS_KEY = 'abtalks.submissions.v1';

export function loadProfile(): StudentProfile {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return DEFAULT_STUDENT_PROFILE;
    return { ...DEFAULT_STUDENT_PROFILE, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_STUDENT_PROFILE;
  }
}

export function saveProfile(profile: StudentProfile) {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch {
    /* ignore quota */
  }
}

export function loadSubmissions(): Record<number, ProofSubmission> {
  try {
    const raw = localStorage.getItem(SUBMISSIONS_KEY);
    if (!raw) return { ...MOCK_SUBMISSIONS };
    return { ...MOCK_SUBMISSIONS, ...JSON.parse(raw) };
  } catch {
    return { ...MOCK_SUBMISSIONS };
  }
}

export function saveSubmissions(submissions: Record<number, ProofSubmission>) {
  try {
    localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
  } catch {
    /* ignore */
  }
}
