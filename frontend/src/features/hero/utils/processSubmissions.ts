import type { CfSubmission } from '../../../types/codeforces';
import type { Problem, ProblemsByRating, ProblemsByTopic } from '../../../types/problems';

export interface ProcessedSubmissions {
  solvedByRating: ProblemsByRating;
  solvedByTopic: ProblemsByTopic;
  unsolved: Problem[];
}

export const processSubmissions = (
  submissions: CfSubmission[]
): ProcessedSubmissions => {
  const solvedByRating: ProblemsByRating = {};
  const solvedByTopic: ProblemsByTopic = {};
  const unsolvedMap: Record<string, Problem & { attempts: number }> = {};
  const problemLastSubmission: Record<string, number> = {};
  const solvedProblemIds = new Set<string>();

  submissions.forEach((submission) => {
    const problemId = `${submission.problem.contestId}-${submission.problem.index}`;
    if (submission.verdict === 'OK') {
      solvedProblemIds.add(problemId);
    }
  });

  submissions.forEach((submission) => {
    const problemId = `${submission.problem.contestId}-${submission.problem.index}`;
    const submissionTime = submission.creationTimeSeconds * 1000;
    const problemData: Problem = {
      id: problemId,
      name: submission.problem.name,
      time: submissionTime,
      rating: submission.problem.rating,
      tags: submission.problem.tags ?? [],
    };

    if (
      !problemLastSubmission[problemId] ||
      submissionTime > problemLastSubmission[problemId]
    ) {
      problemLastSubmission[problemId] = submissionTime;
    }

    if (submission.verdict === 'OK' && submission.problem.rating) {
      const rating = submission.problem.rating.toString();

      if (submissionTime === problemLastSubmission[problemId]) {
        if (!solvedByRating[rating]) solvedByRating[rating] = [];
        solvedByRating[rating].push(problemData);

        problemData.tags?.forEach((tag) => {
          if (!solvedByTopic[tag]) solvedByTopic[tag] = [];
          solvedByTopic[tag].push(problemData);
        });
      }
    } else if (submission.verdict !== 'OK' && !solvedProblemIds.has(problemId)) {
      if (!unsolvedMap[problemId]) {
        unsolvedMap[problemId] = { ...problemData, attempts: 1 };
      } else {
        unsolvedMap[problemId].attempts++;
      }
    }
  });

  const dedupe = (map: ProblemsByRating | ProblemsByTopic) => {
    Object.keys(map).forEach((key) => {
      const unique: Record<string, Problem> = {};
      map[key].forEach((problem) => {
        unique[problem.id] = problem;
      });
      map[key] = Object.values(unique);
    });
  };

  dedupe(solvedByRating);
  dedupe(solvedByTopic);

  return {
    solvedByRating,
    solvedByTopic,
    unsolved: Object.values(unsolvedMap),
  };
};
