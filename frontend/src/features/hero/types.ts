import type { CfUserInfo } from '../../types/codeforces';
import type { Problem, ProblemsByRating, ProblemsByTopic } from '../../types/problems';

export interface HeroContextValue {
  userInfo: CfUserInfo | null;
  solvedProblems: ProblemsByRating;
  topicProblems: ProblemsByTopic;
  unsolvedProblems: Problem[];
  selectedRating: string | null;
  setSelectedRating: (rating: string) => void;
  fromDate: string;
  setFromDate: (date: string) => void;
  toDate: string;
  setToDate: (date: string) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
  handle: string | undefined;
  showDateInputs: boolean;
  setShowDateInputs: (show: boolean) => void;
}

export type HeroTab = 'statistics' | 'rating' | 'topics' | 'unsolved';

export const HERO_TABS: { id: HeroTab; label: string }[] = [
  { id: 'statistics', label: 'Statistics' },
  { id: 'rating', label: 'Rating Wise' },
  { id: 'topics', label: 'Topic Wise' },
  { id: 'unsolved', label: 'Unsolved' },
];
