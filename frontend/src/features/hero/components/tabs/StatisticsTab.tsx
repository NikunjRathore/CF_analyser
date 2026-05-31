import React from 'react';
import StatisticsCharts from '../../../../components/statistics/StatisticsCharts';
import { useHeroContext } from '../../context/HeroContext';

const StatisticsTab: React.FC = () => {
  const { solvedProblems, topicProblems } = useHeroContext();

  return (
    <div className="mt-6 sm:mt-8 space-y-6">
      <StatisticsCharts
        problemsByRating={solvedProblems}
        problemsByTopic={topicProblems}
      />
    </div>
  );
};

export default StatisticsTab;
