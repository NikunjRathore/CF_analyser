export const getProblemsetUrl = (problemId: string): string => {
  const [contestId, index] = problemId.split('-');
  return `https://codeforces.com/problemset/problem/${contestId}/${index}`;
};

export const getContestProblemUrl = (
  contestId: number,
  problemId: string
): string => {
  const index = problemId.split('-')[1];
  return `https://codeforces.com/contest/${contestId}/problem/${index}`;
};
