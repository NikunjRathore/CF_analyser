import React from 'react';
import type { Contest } from '../../types';

interface ContestsTabProps {
  contests: Contest[];
  isEmpty?: boolean;
  isSyncing?: boolean;
  onRefresh?: () => void;
  onSync?: () => void;
}

const ContestsTab: React.FC<ContestsTabProps> = ({
  contests,
  isEmpty = false,
  isSyncing = false,
  onRefresh,
  onSync,
}) => (
  <div>
    {isEmpty && (
      <div className="mb-4 rounded-lg border border-cf-gray dark:border-cf-gray-light bg-cf-dark dark:bg-cf-dark-light p-4 text-center">
        <p className="text-cf-text dark:text-cf-text-light text-sm mb-3">
          Contest data is still being fetched from Codeforces. This can take a few
          minutes on first load. The page will refresh automatically.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={onRefresh}
            className="px-4 py-2 rounded bg-cf-blue dark:bg-cf-blue-light text-white text-sm hover:bg-opacity-90"
          >
            Refresh now
          </button>
          <button
            type="button"
            onClick={onSync}
            disabled={isSyncing}
            className="px-4 py-2 rounded bg-cf-gray dark:bg-cf-gray-light text-cf-text dark:text-cf-text-light text-sm hover:bg-opacity-90 disabled:opacity-60"
          >
            {isSyncing ? 'Starting sync...' : 'Re-sync from Codeforces'}
          </button>
        </div>
      </div>
    )}

    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-sm sm:text-base">
        <thead>
          <tr className="bg-gray-700 dark:bg-gray-600 text-cf-text dark:text-cf-text-light">
            <th className="px-2 sm:px-4 py-2 border border-cf-gray dark:border-cf-gray-light">#</th>
            <th className="px-2 sm:px-4 py-2 border border-cf-gray dark:border-cf-gray-light">Contest Name</th>
            <th className="px-2 sm:px-4 py-2 border border-cf-gray dark:border-cf-gray-light">Date</th>
            <th className="px-2 sm:px-4 py-2 border border-cf-gray dark:border-cf-gray-light">Problems</th>
          </tr>
        </thead>
        <tbody>
          {contests.length > 0 ? (
            contests.map((contest, index) => (
              <tr
                key={contest.id}
                className="hover:bg-gray-600 dark:hover:bg-gray-500 text-cf-text dark:text-cf-text-light"
              >
                <td className="px-2 sm:px-4 py-2 border border-cf-gray dark:border-cf-gray-light">
                  {index + 1}
                </td>
                <td className="px-2 sm:px-4 py-2 border border-cf-gray dark:border-cf-gray-light">
                  <a
                    href={`https://codeforces.com/contest/${contest.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cf-blue dark:text-cf-blue-light hover:underline"
                  >
                    {contest.name}
                  </a>
                </td>
                <td className="px-2 sm:px-4 py-2 border border-cf-gray dark:border-cf-gray-light">
                  {new Date(contest.startTimeSeconds * 1000).toLocaleDateString()}
                </td>
                <td className="px-2 sm:px-4 py-2 border border-cf-gray dark:border-cf-gray-light">
                  <a
                    href={`https://codeforces.com/contest/${contest.id}/problems`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cf-blue dark:text-cf-blue-light hover:underline"
                  >
                    View Problems
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={4}
                className="px-2 sm:px-4 py-2 text-center text-cf-text dark:text-cf-text-light"
              >
                No contests found for this division yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
);

export default ContestsTab;
