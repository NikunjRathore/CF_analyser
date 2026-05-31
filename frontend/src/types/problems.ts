export interface Problem {
  id: string;
  name: string;
  time?: number;
  rating?: number;
  tags?: string[];
  attempts?: number;
}

export type ProblemsByRating = Record<string, Problem[]>;
export type ProblemsByTopic = Record<string, Problem[]>;

export interface ContestProblem {
  id: string;
  name: string;
  rating?: number;
  contestId: number;
  contestName: string;
  tags?: string[];
}
