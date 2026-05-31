import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useHeroContext } from './context/HeroContext';
import { sortByField } from './utils/problemFilters';
import { getProblemsetUrl } from '../../utils/problemUrl';
import type { Problem } from '../../types/problems';

const TopicPage: React.FC = () => {
  const { topic } = useParams();
  const { topicProblems, handle } = useHeroContext();
  const [problems, setProblems] = useState<Problem[]>([]);
  const [activeSort, setActiveSort] = useState<'date' | 'rating'>('date');
  const [dateSortOrder, setDateSortOrder] = useState<'asc' | 'desc'>('desc');
  const [ratingSortOrder, setRatingSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    if (topic && topicProblems[topic]) {
      setProblems(topicProblems[topic]);
    }
  }, [topic, topicProblems]);

  const sortedProblems = sortByField(
    problems,
    activeSort,
    activeSort === 'date' ? dateSortOrder : ratingSortOrder
  );

  return (
    <div className="max-w-3xl mx-auto mt-4 sm:mt-8 px-4 sm:px-0">
      <div className="bg-cf-gray dark:bg-cf-gray-light rounded-lg p-4 sm:p-6 shadow-cf">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-cf-blue dark:text-cf-blue-light">
            Problems for Topic: {topic}
          </h2>
          <Link
            to={`/hero/${handle}`}
            className="text-cf-blue dark:text-cf-blue-light hover:underline text-sm sm:text-base"
          >
            Back to Home
          </Link>
        </div>

        <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
            <label className="text-cf-text dark:text-cf-text-light text-sm sm:text-base">
              Sort By:
            </label>
            <select
              value={activeSort}
              onChange={(e) => setActiveSort(e.target.value as 'date' | 'rating')}
              className="px-4 py-2 border rounded bg-cf-dark dark:bg-cf-dark-light text-cf-text dark:text-cf-text-light w-full sm:w-auto"
            >
              <option value="date">Date</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          {activeSort === 'date' ? (
            <select
              value={dateSortOrder}
              onChange={(e) => setDateSortOrder(e.target.value as 'asc' | 'desc')}
              className="px-4 py-2 border rounded bg-cf-dark dark:bg-cf-dark-light text-cf-text dark:text-cf-text-light w-full sm:w-auto"
            >
              <option value="asc">Date Ascending</option>
              <option value="desc">Date Descending</option>
            </select>
          ) : (
            <select
              value={ratingSortOrder}
              onChange={(e) => setRatingSortOrder(e.target.value as 'asc' | 'desc')}
              className="px-4 py-2 border rounded bg-cf-dark dark:bg-cf-dark-light text-cf-text dark:text-cf-text-light w-full sm:w-auto"
            >
              <option value="asc">Rating Ascending</option>
              <option value="desc">Rating Descending</option>
            </select>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-sm sm:text-base">
            <thead>
              <tr className="bg-gray-700 dark:bg-gray-600 text-cf-text dark:text-cf-text-light">
                <th className="px-2 sm:px-4 py-2 border border-cf-gray dark:border-cf-gray-light">#</th>
                <th className="px-2 sm:px-4 py-2 border border-cf-gray dark:border-cf-gray-light">Problem</th>
                <th className="px-2 sm:px-4 py-2 border border-cf-gray dark:border-cf-gray-light">Rating</th>
                <th className="px-2 sm:px-4 py-2 border border-cf-gray dark:border-cf-gray-light">Solved Date</th>
              </tr>
            </thead>
            <tbody>
              {sortedProblems.length > 0 ? (
                sortedProblems.map((problem, index) => (
                  <tr
                    key={problem.id}
                    className="hover:bg-gray-600 dark:hover:bg-gray-500 text-cf-text dark:text-cf-text-light"
                  >
                    <td className="px-2 sm:px-4 py-2 border border-cf-gray dark:border-cf-gray-light">
                      {index + 1}
                    </td>
                    <td className="px-2 sm:px-4 py-2 border border-cf-gray dark:border-cf-gray-light">
                      <a
                        href={getProblemsetUrl(problem.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cf-blue dark:text-cf-blue-light hover:underline wrap-break-word"
                      >
                        {problem.name}
                      </a>
                    </td>
                    <td className="px-2 sm:px-4 py-2 border border-cf-gray dark:border-cf-gray-light">
                      {problem.rating ?? 'N/A'}
                    </td>
                    <td className="px-2 sm:px-4 py-2 border border-cf-gray dark:border-cf-gray-light whitespace-nowrap">
                      {problem.time ? new Date(problem.time).toLocaleString() : 'N/A'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-2 sm:px-4 py-2 text-center text-cf-text dark:text-cf-text-light"
                  >
                    No problems found for this topic.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TopicPage;
