import React from 'react';
import { Bar } from 'react-chartjs-2';
import './chartSetup';
import { buildRatingChartData } from './chartData';
import { barChartOptions } from './chartOptions';
import { CHART_COLORS } from './chartConstants';
import type { ProblemsByRating } from '../../types/problems';

interface RatingBarChartProps {
  problemsByRating: ProblemsByRating;
}

const RatingBarChart: React.FC<RatingBarChartProps> = ({ problemsByRating }) => (
  <div className="bg-cf-dark dark:bg-cf-dark-light rounded-lg p-6 shadow-cf">
    <h3 className="text-xl font-bold text-cf-blue dark:text-cf-blue-light mb-4">
      Problem Rating Distribution
    </h3>
    <div className="h-[300px]">
      <Bar
        data={buildRatingChartData(problemsByRating)}
        options={{
          ...barChartOptions,
          plugins: {
            ...barChartOptions.plugins,
            title: {
              ...barChartOptions.plugins?.title,
              text: 'Problems by Rating',
              color: CHART_COLORS.blue,
            },
            legend: {
              ...barChartOptions.plugins?.legend,
              labels: {
                ...barChartOptions.plugins?.legend?.labels,
                color: CHART_COLORS.blue,
              },
            },
          },
        }}
      />
    </div>
  </div>
);

export default RatingBarChart;
