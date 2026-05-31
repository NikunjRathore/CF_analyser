import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchWithRetry, RETRY_DELAY } from '../api/contestApi';
import { apiFetch } from '../../../lib/api';
import type {
  ContestDataState,
  Division,
  DivisionAnalyticsResponse,
} from '../types';
import { createInitialContestData } from '../types';

const POLL_INTERVAL_MS = 15_000;

export const useContestData = (activeDivision: Division) => {
  const [error, setError] = useState<string | null>(null);
  const [contestData, setContestData] = useState<ContestDataState>(
    createInitialContestData()
  );
  const [isSyncing, setIsSyncing] = useState(false);
  const retryCountRef = useRef(0);
  const fetchingRef = useRef<Set<Division>>(new Set());

  const divisionState = contestData[activeDivision];
  const isInitialLoading =
    !Object.values(contestData).some((division) => division.isLoaded) &&
    divisionState.isLoading;

  const fetchDivisionData = useCallback(async (division: Division) => {
    if (fetchingRef.current.has(division)) return;

    fetchingRef.current.add(division);
    setContestData((prev) => ({
      ...prev,
      [division]: { ...prev[division], isLoading: true },
    }));
    setError(null);

    try {
      const data = await fetchWithRetry<DivisionAnalyticsResponse>(
        `/api/contests/${division}/analytics`
      );

      setContestData((prev) => ({
        ...prev,
        [division]: {
          contests: data.contests,
          problemsByRating: data.problemsByRating ?? {},
          problemsByTopic: data.problemsByTopic ?? {},
          isLoaded: true,
          isLoading: false,
        },
      }));

      retryCountRef.current = 0;
    } catch (err) {
      console.error('Error fetching division data:', err);
      setContestData((prev) => ({
        ...prev,
        [division]: { ...prev[division], isLoading: false },
      }));
      setError(
        'Failed to load contest data. Check that the backend is running and you are logged in.'
      );

      if (retryCountRef.current < 3) {
        retryCountRef.current += 1;
        setTimeout(() => fetchDivisionData(division), RETRY_DELAY);
      }
    } finally {
      fetchingRef.current.delete(division);
    }
  }, []);

  const triggerSync = useCallback(async () => {
    try {
      setIsSyncing(true);
      await apiFetch('/api/contests/sync', { method: 'POST' });

      setContestData(createInitialContestData());
    } catch (err) {
      console.error('Failed to trigger contest sync:', err);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  const refreshDivision = useCallback(() => {
    setContestData((prev) => ({
      ...prev,
      [activeDivision]: {
        ...prev[activeDivision],
        isLoaded: false,
      },
    }));
  }, [activeDivision]);

  useEffect(() => {
    if (!divisionState.isLoaded && !divisionState.isLoading) {
      fetchDivisionData(activeDivision);
    }
  }, [
    activeDivision,
    divisionState.isLoaded,
    divisionState.isLoading,
    fetchDivisionData,
  ]);

  useEffect(() => {
    if (divisionState.isLoading || divisionState.contests.length > 0) return;

    const interval = setInterval(() => {
      refreshDivision();
    }, POLL_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [
    divisionState.isLoading,
    divisionState.contests.length,
    refreshDivision,
  ]);

  return {
    loading: isInitialLoading,
    divisionLoading: divisionState.isLoading,
    error,
    contestData,
    fetchContestData: () => fetchDivisionData(activeDivision),
    triggerSync,
    refreshDivision,
    isSyncing,
    isEmpty: divisionState.isLoaded && divisionState.contests.length === 0,
  };
};
