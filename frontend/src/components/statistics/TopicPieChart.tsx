import React from 'react';
import { Pie } from 'react-chartjs-2';
import './chartSetup';
import { buildTopicChartData } from './chartData';
import { pieChartOptions } from './chartOptions';
import { legendColumnsPlugin } from './legendPlugin';
import { CHART_COLORS } from './chartConstants';
import type { ProblemsByTopic } from '../../types/problems';

interface TopicPieChartProps {
  problemsByTopic: ProblemsByTopic;
}

const TopicPieChart: React.FC<TopicPieChartProps> = ({ problemsByTopic }) => (
  <div className="bg-cf-dark dark:bg-cf-dark-light rounded-lg p-6 shadow-cf">
    <h3 className="text-xl font-bold text-cf-blue dark:text-cf-blue-light mb-4">
      Problem Topic Distribution
    </h3>
    <div className="relative" style={{ height: '600px' }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full">
          <Pie
            data={buildTopicChartData(problemsByTopic)}
            options={{
              ...pieChartOptions,
              plugins: {
                ...pieChartOptions.plugins,
                title: {
                  ...pieChartOptions.plugins?.title,
                  text: 'Problems by Topic',
                  color: CHART_COLORS.blue,
                  font: { size: 20, weight: 'bold' },
                },
                tooltip: {
                  ...pieChartOptions.plugins?.tooltip,
                  titleColor: CHART_COLORS.blue,
                  bodyColor: CHART_COLORS.text,
                  backgroundColor: CHART_COLORS.dark,
                  borderColor: CHART_COLORS.gray,
                  borderWidth: 1,
                  padding: 12,
                  bodyFont: { size: 14 },
                },
              },
            }}
            plugins={[legendColumnsPlugin]}
          />
        </div>
      </div>
    </div>
  </div>
);

export default TopicPieChart;
