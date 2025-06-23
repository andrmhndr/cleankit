import { useRef } from "react";
import { useRouter } from "next/router";
import { debounce } from "../../global/debounce/debounce";
import {
  QueryParamsInterface,
  UseQueryInterface,
} from "../../global/query-params/query-params.interface";

/**
 * Custom hook to manage URL query parameters in a flexible way.
 * Designed for Next.js (pages router).
 *
 * Supports reading, adding, removing, and clearing query parameters,
 * with optional debounce for smoother UX during fast input changes.
 *
 * @returns {UseQueryInterface} API to interact with query parameters
 */
export const useQueryParams = <
  K extends string = string
>(): UseQueryInterface<K> => {
  const router = useRouter();

  // Holds debounced update functions based on delay values
  const debounceMap = useRef<
    Record<number, (param: Partial<Record<K, QueryParamsInterface[K]>>) => void>
  >({});

  /**
   * Retrieves all current query parameters as string key-value pairs.
   *
   * @returns {Record<string, string>} All query parameters
   */
  const getAll = (): Record<string, string> => {
    const query = router.query;
    const result: Record<string, string> = {};
    Object.entries(query).forEach(([key, value]) => {
      if (typeof value === "string") {
        result[key] = value;
      } else if (Array.isArray(value)) {
        result[key] = value.join(","); // Fallback: join array as string
      }
    });
    return result;
  };

  /**
   * Retrieves the value of a single query parameter by key.
   *
   * @param key - The query parameter name
   * @returns {string | null} Value or null if not found
   */
  const getOne = (key: K): string | null => {
    const value = router.query[key];
    if (!value) return null;
    if (typeof value === "string") return value;
    if (Array.isArray(value)) return value.join(",");
    return null;
  };

  /**
   * Updates query parameters directly without debounce.
   * (Private method used internally)
   */
  const rawUpdate = (param: Partial<Record<K, QueryParamsInterface[K]>>) => {
    const currentQuery = { ...router.query };

    Object.entries(param).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        delete currentQuery[key];
      } else {
        currentQuery[key] = String(value);
      }
    });

    router.replace(
      {
        pathname: router.pathname,
        query: currentQuery,
      },
      undefined,
      { shallow: true, scroll: false }
    );
  };

  /**
   * Sets or updates query parameters, with optional debounce for delay.
   *
   * @param param - Object with query key-value pairs to update
   * @param options - Optional debounce delay in milliseconds
   */
  const setQuery = (
    param: Partial<Record<K, QueryParamsInterface[K]>> = {},
    options?: { delay?: number }
  ) => {
    const { delay } = options;

    if (delay) {
      if (!debounceMap.current[delay]) {
        debounceMap.current[delay] = debounce(rawUpdate, delay);
      }
      debounceMap.current[delay](param);
    } else {
      rawUpdate(param);
    }
  };

  /**
   * Removes one or more query parameters from the URL.
   *
   * @param keys - Names of the parameters to remove
   */
  const removeQuery = (...keys: K[]) => {
    const currentQuery = { ...router.query };
    keys.forEach((key) => {
      delete currentQuery[key];
    });
    router.replace(
      {
        pathname: router.pathname,
        query: currentQuery,
      },
      undefined,
      { shallow: true, scroll: false }
    );
  };

  /**
   * Clears all query parameters from the URL.
   */
  const clearQuery = () => {
    router.replace(
      {
        pathname: router.pathname,
        query: {},
      },
      undefined,
      { shallow: true, scroll: false }
    );
  };

  return {
    getAll,
    getOne,
    setQuery,
    removeQuery,
    clearQuery,
  };
};
