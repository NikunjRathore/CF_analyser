import React from 'react';
import RatingBarChart from './RatingBarChart';
import TopicPieChart from './TopicPieChart';
import type { ProblemsByRating, ProblemsByTopic } from '../../types/problems';

interface StatisticsChartsProps {
  problemsByRating: ProblemsByRating;
  problemsByTopic: ProblemsByTopic;
}

const StatisticsCharts: React.FC<StatisticsChartsProps> = ({
  problemsByRating,
  problemsByTopic,
}) => (
  <div className="space-y-8">
    <RatingBarChart problemsByRating={problemsByRating} />
    <TopicPieChart problemsByTopic={problemsByTopic} />
  </div>
);

export default StatisticsCharts;
