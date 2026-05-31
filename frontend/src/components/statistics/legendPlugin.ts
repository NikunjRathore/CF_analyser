import type { Plugin } from 'chart.js';

export const legendColumnsPlugin: Plugin<'pie'> = {
  id: 'legendColumns',
  beforeInit(chart) {
    const legend = chart.legend;
    if (!legend) return;

    const originalFit = legend.fit.bind(legend);
    legend.fit = function fit() {
      originalFit();
      const legendEl = legend as typeof legend & {
        maxHeight?: number;
        legendItems?: Array<{ x?: number; y?: number }>;
      };
      legendEl.height = legendEl.maxHeight ?? legendEl.height;

      const itemWidth = legendEl.width / 2;
      let currentColumn = 0;
      let currentRow = 0;

      legendEl.legendItems?.forEach((item) => {
        const legendItem = item as typeof item & { x?: number; y?: number };
        legendItem.x = currentColumn * itemWidth + 20;
        legendItem.y = currentRow * 30;
        currentColumn++;
        if (currentColumn >= 2) {
          currentColumn = 0;
          currentRow++;
        }
      });
    };
  },
};
