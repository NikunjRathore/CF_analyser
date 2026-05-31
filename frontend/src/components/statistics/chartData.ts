import type { ProblemsByRating, ProblemsByTopic } from '../../types/problems';
import { CHART_COLORS, PIE_COLORS } from './chartConstants';

export const buildRatingChartData = (problemsByRating: ProblemsByRating) => ({
  labels: Object.keys(problemsByRating).sort(
    (a, b) => Number(a) - Number(b)
  ),
  datasets: [
    {
      label: 'Number of Problems',
      data: Object.entries(problemsByRating)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([, problems]) => problems.length),
      backgroundColor: CHART_COLORS.barBg,
      borderColor: CHART_COLORS.barBorder,
      borderWidth: 1,
    },
  ],
});

export const buildTopicChartData = (problemsByTopic: ProblemsByTopic) => ({
  labels: Object.entries(problemsByTopic).map(
    ([topic, problems]) => `${topic} (${problems.length})`
  ),
  datasets: [
    {
      data: Object.values(problemsByTopic).map((problems) => problems.length),
      backgroundColor: PIE_COLORS,
      borderColor: PIE_COLORS,
      borderWidth: 2,
    },
  ],
});
