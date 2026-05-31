import type { ContestProblem, ProblemsByRating, ProblemsByTopic } from '../../types/problems';

export type Division = 'div1' | 'div2' | 'div3' | 'div4';
export type ContestTab = 'contests' | 'rating' | 'topics' | 'statistics';

export interface Contest {
  id: number;
  name: string;
  startTimeSeconds: number;
}

export interface DivisionData {
  contests: Contest[];
  problemsByRating: ProblemsByRating;
  problemsByTopic: ProblemsByTopic;
  isLoaded: boolean;
  isLoading: boolean;
}

export interface DivisionAnalyticsResponse {
  contests: Contest[];
  problemsByRating: ProblemsByRating;
  problemsByTopic: ProblemsByTopic;
}

export type ContestDataState = Record<Division, DivisionData>;

export interface RatingApiItem {
  rating: number;
  problems: ContestProblem[];
}

export interface TopicApiItem {
  topic: string;
  problems: ContestProblem[];
}

export const DIVISIONS: Division[] = ['div1', 'div2', 'div3', 'div4'];

export const CONTEST_TABS: { id: ContestTab; label: string }[] = [
  { id: 'contests', label: 'Contests' },
  { id: 'rating', label: 'Rating' },
  { id: 'topics', label: 'Topics' },
  { id: 'statistics', label: 'Statistics' },
];

export const createEmptyDivisionData = (): DivisionData => ({
  contests: [],
  problemsByRating: {},
  problemsByTopic: {},
  isLoaded: false,
  isLoading: false,
});

export const createInitialContestData = (): ContestDataState => ({
  div1: createEmptyDivisionData(),
  div2: createEmptyDivisionData(),
  div3: createEmptyDivisionData(),
  div4: createEmptyDivisionData(),
});
