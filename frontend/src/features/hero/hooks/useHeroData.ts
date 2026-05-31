import { useEffect, useState } from 'react';
import type { CfSubmission, CfUserInfo } from '../../../types/codeforces';
import type { Problem, ProblemsByRating, ProblemsByTopic } from '../../../types/problems';
import { processSubmissions } from '../utils/processSubmissions';

interface UseHeroDataResult {
  userInfo: CfUserInfo | null;
  solvedProblems: ProblemsByRating;
  topicProblems: ProblemsByTopic;
  unsolvedProblems: Problem[];
  loading: boolean;
}

export const useHeroData = (handle: string | undefined): UseHeroDataResult => {
  const [userInfo, setUserInfo] = useState<CfUserInfo | null>(null);
  const [solvedProblems, setSolvedProblems] = useState<ProblemsByRating>({});
  const [topicProblems, setTopicProblems] = useState<ProblemsByTopic>({});
  const [unsolvedProblems, setUnsolvedProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!handle) return;

    setLoading(true);
    setUserInfo(null);
    setSolvedProblems({});
    setTopicProblems({});
    setUnsolvedProblems([]);

    const fetchUserInfo = fetch(
      `https://codeforces.com/api/user.info?handles=${handle}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'OK') {
          setUserInfo(data.result[0]);
        }
      });

    const fetchSubmissions = fetch(
      `https://codeforces.com/api/user.status?handle=${handle}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'OK') {
          const processed = processSubmissions(data.result as CfSubmission[]);
          setSolvedProblems(processed.solvedByRating);
          setTopicProblems(processed.solvedByTopic);
          setUnsolvedProblems(processed.unsolved);
        }
      });

    Promise.all([fetchUserInfo, fetchSubmissions]).finally(() =>
      setLoading(false)
    );
  }, [handle]);

  return { userInfo, solvedProblems, topicProblems, unsolvedProblems, loading };
};
