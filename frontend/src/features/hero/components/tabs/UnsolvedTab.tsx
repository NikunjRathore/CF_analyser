import React from 'react';
import { useHeroContext } from '../../context/HeroContext';
import { getProblemsetUrl } from '../../../../utils/problemUrl';

const UnsolvedTab: React.FC = () => {
  const { unsolvedProblems } = useHeroContext();

  return (
    <div className="bg-cf-gray dark:bg-cf-gray-light rounded-lg p-4 sm:p-6 shadow-cf">
      <h2 className="text-xl sm:text-2xl font-bold text-cf-blue dark:text-cf-blue-light mb-4">
        Unsolved Problems
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-700 dark:bg-gray-600 text-cf-text dark:text-cf-text-light">
              <th className="px-4 py-2 border border-cf-gray dark:border-cf-gray-light">#</th>
              <th className="px-4 py-2 border border-cf-gray dark:border-cf-gray-light">Problem</th>
              <th className="px-4 py-2 border border-cf-gray dark:border-cf-gray-light">Rating</th>
              <th className="px-4 py-2 border border-cf-gray dark:border-cf-gray-light">Attempts</th>
            </tr>
          </thead>
          <tbody>
            {unsolvedProblems.length > 0 ? (
              unsolvedProblems.map((problem, index) => (
                <tr
                  key={problem.id}
                  className="hover:bg-gray-600 dark:hover:bg-gray-500 text-cf-text dark:text-cf-text-light"
                >
                  <td className="px-4 py-2 border border-cf-gray dark:border-cf-gray-light">
                    {index + 1}
                  </td>
                  <td className="px-4 py-2 border border-cf-gray dark:border-cf-gray-light">
                    <a
                      href={getProblemsetUrl(problem.id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cf-blue dark:text-cf-blue-light hover:underline"
                    >
                      {problem.name}
                    </a>
                  </td>
                  <td className="px-4 py-2 border border-cf-gray dark:border-cf-gray-light">
                    {problem.rating ?? 'N/A'}
                  </td>
                  <td className="px-4 py-2 border border-cf-gray dark:border-cf-gray-light">
                    {problem.attempts}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-2 text-center text-cf-text dark:text-cf-text-light"
                >
                  No unsolved problems found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UnsolvedTab;
