export interface CfUserInfo {
  handle: string;
  titlePhoto: string;
  rank: string;
  rating: number;
  maxRank: string;
  maxRating: number;
}

export interface CfSubmission {
  verdict: string;
  creationTimeSeconds: number;
  problem: {
    contestId: number;
    index: string;
    name: string;
    rating?: number;
    tags?: string[];
  };
}
