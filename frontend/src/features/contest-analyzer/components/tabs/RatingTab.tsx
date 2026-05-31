import React, { useEffect, useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import type { ContestProblem, ProblemsByRating } from '../../../../types/problems';
import { getContestProblemUrl } from '../../../../utils/problemUrl';

interface RatingTabProps {
  problemsByRating: ProblemsByRating;
}

const RatingTab: React.FC<RatingTabProps> = ({ problemsByRating }) => {
  const [expandedRatings, setExpandedRatings] = useState<Record<string, boolean>>({});
  const ratings = Object.keys(problemsByRating).sort(
    (a, b) => Number(a) - Number(b)
  );

  useEffect(() => {
    setExpandedRatings({});
  }, [problemsByRating]);

  const toggleRating = (rating: string) => {
    setExpandedRatings((prev) => ({ ...prev, [rating]: !prev[rating] }));
  };

  if (ratings.length === 0) {
    return (
      <div className="text-center text-cf-text dark:text-cf-text-light py-4">
        No problems found for this division.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {ratings.map((rating) => (
        <div key={rating} className="bg-cf-dark dark:bg-cf-dark-light rounded-lg shadow-cf">
          <button
            type="button"
            onClick={() => toggleRating(rating)}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-700 dark:hover:bg-gray-600 rounded-t-lg"
          >
            <h3 className="text-lg font-bold text-cf-blue dark:text-cf-blue-light">
              Rating {rating} ({problemsByRating[rating].length} problems)
            </h3>
            {expandedRatings[rating] ? (
              <ChevronUpIcon className="h-5 w-5 text-cf-blue dark:text-cf-blue-light" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-cf-blue dark:text-cf-blue-light" />
            )}
          </button>

          {expandedRatings[rating] && (
            <div className="p-4 border-t border-cf-gray dark:border-cf-gray-light">
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-gray-700 dark:bg-gray-600 text-cf-text dark:text-cf-text-light">
                      <th className="px-2 py-2 border border-cf-gray dark:border-cf-gray-light">Problem</th>
                      <th className="px-2 py-2 border border-cf-gray dark:border-cf-gray-light">Contest</th>
                      <th className="px-2 py-2 border border-cf-gray dark:border-cf-gray-light">Topics</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(problemsByRating[rating] as ContestProblem[]).map((problem) => (
                      <tr
                        key={problem.id}
                        className="hover:bg-gray-600 dark:hover:bg-gray-500 text-cf-text dark:text-cf-text-light"
                      >
                        <td className="px-2 py-2 border border-cf-gray dark:border-cf-gray-light">
                          <a
                            href={getContestProblemUrl(problem.contestId, problem.id)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cf-blue dark:text-cf-blue-light hover:underline"
                          >
                            {problem.name}
                          </a>
                        </td>
                        <td className="px-2 py-2 border border-cf-gray dark:border-cf-gray-light">
                          <a
                            href={`https://codeforces.com/contest/${problem.contestId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cf-blue dark:text-cf-blue-light hover:underline"
                          >
                            {problem.contestName}
                          </a>
                        </td>
                        <td className="px-2 py-2 border border-cf-gray dark:border-cf-gray-light">
                          {problem.tags?.join(', ')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RatingTab;
