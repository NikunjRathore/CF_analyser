import type { ChartOptions } from 'chart.js';
import { CHART_COLORS } from './chartConstants';

const basePlugins = {
  legend: {
    position: 'right' as const,
    labels: {
      color: CHART_COLORS.text,
      font: { size: 12, weight: 'bold' as const },
      padding: 20,
      usePointStyle: true,
      boxWidth: 10,
      boxHeight: 10,
    },
  },
  title: {
    display: true,
    color: CHART_COLORS.blue,
    font: { size: 18, weight: 'bold' as const },
    padding: 20,
  },
  tooltip: {
    backgroundColor: CHART_COLORS.dark,
    titleColor: CHART_COLORS.blue,
    bodyColor: CHART_COLORS.text,
    borderColor: CHART_COLORS.gray,
    borderWidth: 1,
    padding: 12,
    bodyFont: { size: 14 },
  },
};

export const barChartOptions: ChartOptions<'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: basePlugins,
  scales: {
    x: {
      ticks: { color: CHART_COLORS.text },
      grid: { color: 'rgba(224, 224, 224, 0.1)' },
    },
    y: {
      ticks: { color: CHART_COLORS.text },
      grid: { color: 'rgba(224, 224, 224, 0.1)' },
    },
  },
};

export const pieChartOptions: ChartOptions<'pie'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    ...basePlugins,
    legend: {
      position: 'bottom',
      align: 'center',
      labels: {
        color: CHART_COLORS.text,
        padding: 15,
        font: { size: 13, weight: 'bold' },
        usePointStyle: true,
        pointStyle: 'circle',
        boxWidth: 10,
        boxHeight: 10,
      },
      maxHeight: 200,
      maxWidth: 800,
    },
    tooltip: {
      ...basePlugins.tooltip,
      callbacks: {
        label: (context) => {
          const label = context.label?.split(' (')[0] ?? '';
          return `${label}: ${context.parsed} problems`;
        },
      },
    },
  },
  layout: {
    padding: { left: 20, right: 20, top: 20, bottom: 80 },
  },
  aspectRatio: 1,
};
