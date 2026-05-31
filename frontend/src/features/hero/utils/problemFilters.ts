import type { Problem } from '../../../types/problems';

export const filterByDate = (
  problems: Problem[],
  fromDate: string,
  toDate: string
): Problem[] => {
  if (!fromDate || !toDate) return problems;
  const fromTimestamp = new Date(fromDate).getTime();
  const toTimestamp = new Date(toDate).getTime();
  return problems.filter(
    (problem) =>
      problem.time !== undefined &&
      problem.time >= fromTimestamp &&
      problem.time <= toTimestamp
  );
};

export const sortByTime = (
  problems: Problem[],
  sortOrder: 'asc' | 'desc'
): Problem[] =>
  [...problems].sort((a, b) =>
    sortOrder === 'asc'
      ? (a.time ?? 0) - (b.time ?? 0)
      : (b.time ?? 0) - (a.time ?? 0)
  );

export const sortByField = (
  problems: Problem[],
  field: 'date' | 'rating',
  order: 'asc' | 'desc'
): Problem[] =>
  [...problems].sort((a, b) => {
    if (field === 'date') {
      return order === 'asc'
        ? (a.time ?? 0) - (b.time ?? 0)
        : (b.time ?? 0) - (a.time ?? 0);
    }
    return order === 'asc'
      ? (a.rating ?? 0) - (b.rating ?? 0)
      : (b.rating ?? 0) - (a.rating ?? 0);
  });
