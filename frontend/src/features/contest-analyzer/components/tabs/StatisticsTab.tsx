import React from 'react';
import StatisticsCharts from '../../../../components/statistics/StatisticsCharts';
import type { DivisionData } from '../../types';

interface StatisticsTabProps {
  divisionData: DivisionData;
}

const StatisticsTab: React.FC<StatisticsTabProps> = ({ divisionData }) => {
  const { contests, problemsByRating, problemsByTopic } = divisionData;

  return (
    <div className="space-y-6">
      <StatisticsCharts
        problemsByRating={problemsByRating}
        problemsByTopic={problemsByTopic}
      />

      <div className="bg-cf-dark dark:bg-cf-dark-light rounded-lg p-4 shadow-cf">
        <h3 className="text-lg font-bold text-cf-blue dark:text-cf-blue-light mb-4">
          Overall Statistics
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="bg-gray-700 dark:bg-gray-600 rounded p-3 text-center">
            <div className="text-cf-blue dark:text-cf-blue-light font-semibold">
              Total Contests
            </div>
            <div className="text-cf-text dark:text-cf-text-light">
              {contests.length}
            </div>
          </div>
          <div className="bg-gray-700 dark:bg-gray-600 rounded p-3 text-center">
            <div className="text-cf-blue dark:text-cf-blue-light font-semibold">
              Total Problems
            </div>
            <div className="text-cf-text dark:text-cf-text-light">
              {Object.values(problemsByRating).reduce(
                (sum, problems) => sum + problems.length,
                0
              )}
            </div>
          </div>
          <div className="bg-gray-700 dark:bg-gray-600 rounded p-3 text-center">
            <div className="text-cf-blue dark:text-cf-blue-light font-semibold">
              Unique Topics
            </div>
            <div className="text-cf-text dark:text-cf-text-light">
              {Object.keys(problemsByTopic).length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsTab;
