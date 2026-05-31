import { API_BASE_URL } from '../../../config/api';
import { apiFetch } from '../../../lib/api';

export const MAX_RETRIES = 3;
export const RETRY_DELAY = 2000;

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const fetchWithRetry = async <T>(
  path: string,
  retries = MAX_RETRIES
): Promise<T> => {
  try {
    return await apiFetch<T>(path);
  } catch (error) {
    if (retries > 0) {
      await delay(RETRY_DELAY);
      return fetchWithRetry<T>(path, retries - 1);
    }
    throw error;
  }
};

export { API_BASE_URL };
