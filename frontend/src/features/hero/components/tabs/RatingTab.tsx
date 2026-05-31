import React from 'react';
import { useHeroContext } from '../../context/HeroContext';
import { filterByDate, sortByTime } from '../../utils/problemFilters';
import { getProblemsetUrl } from '../../../../utils/problemUrl';

const RatingTab: React.FC = () => {
  const {
    solvedProblems,
    selectedRating,
    setSelectedRating,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    sortOrder,
    setSortOrder,
    showDateInputs,
    setShowDateInputs,
  } = useHeroContext();

  const problemsToShow =
    selectedRating && solvedProblems[selectedRating]
      ? sortByTime(
          filterByDate(solvedProblems[selectedRating], fromDate, toDate),
          sortOrder
        )
      : [];

  return (
    <div className="bg-cf-gray dark:bg-cf-gray-light rounded-lg p-4 sm:p-6 shadow-cf">
      <h2 className="text-xl sm:text-2xl font-bold text-cf-blue dark:text-cf-blue-light mb-4">
        Solved Problems by Rating
      </h2>

      <div className="flex flex-wrap gap-2 mb-4">
        {Object.keys(solvedProblems)
          .sort((a, b) => Number(a) - Number(b))
          .map((rating) => (
            <button
              key={rating}
              type="button"
              className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded text-sm sm:text-base ${
                selectedRating === rating
                  ? 'bg-cf-blue dark:bg-cf-blue-light text-white'
                  : 'bg-cf-dark dark:bg-cf-dark-light text-cf-text dark:text-cf-text-light'
              } hover:bg-opacity-90 transition-colors`}
              onClick={() => setSelectedRating(rating)}
            >
              {rating}
            </button>
          ))}
      </div>

      <button
        type="button"
        className="mb-4 px-4 py-2 bg-cf-blue dark:bg-cf-blue-light text-white rounded hover:bg-opacity-90 transition-colors w-full sm:w-auto"
        onClick={() => setShowDateInputs(!showDateInputs)}
      >
        Select Date Range
      </button>

      {showDateInputs && (
        <div className="mb-4 flex flex-col sm:flex-row gap-4">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="px-4 py-2 border rounded bg-cf-dark dark:bg-cf-dark-light text-cf-text dark:text-cf-text-light w-full"
          />
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="px-4 py-2 border rounded bg-cf-dark dark:bg-cf-dark-light text-cf-text dark:text-cf-text-light w-full"
          />
        </div>
      )}

      <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <label className="text-cf-text dark:text-cf-text-light text-sm sm:text-base">
          Sort by Date:
        </label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
          className="px-4 py-2 border rounded bg-cf-dark dark:bg-cf-dark-light text-cf-text dark:text-cf-text-light w-full sm:w-auto"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-700 dark:bg-gray-600 text-cf-text dark:text-cf-text-light">
              <th className="px-4 py-2 border border-cf-gray dark:border-cf-gray-light">#</th>
              <th className="px-4 py-2 border border-cf-gray dark:border-cf-gray-light">Problem</th>
            </tr>
          </thead>
          <tbody>
            {problemsToShow.length > 0 ? (
              problemsToShow.map((problem, index) => (
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
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={2}
                  className="px-4 py-2 text-center text-cf-text dark:text-cf-text-light"
                >
                  No problems found for the selected criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RatingTab;
