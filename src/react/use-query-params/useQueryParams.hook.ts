import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { debounce } from "../../global/debounce/debounce";
import {
  QueryParamsInterface,
  UseQueryInterface,
} from "../../global/query-params/query-params.interface";

/**
 * A custom hook to manage query parameters in React Router with optional debouncing.
 */
export const useQueryParams = <
  K extends string = string
>(): UseQueryInterface<K> => {
  const location = useLocation();
  const navigate = useNavigate();
  const debounceMap = useRef<
    Record<number, (param: Partial<Record<K, QueryParamsInterface[K]>>) => void>
  >({});

  // Get URLSearchParams from the current location
  const getSearchParams = () => new URLSearchParams(location.search);

  /**
   * Get all query parameters as a key-value object.
   */
  const getAll = (): Record<string, string> => {
    const params = getSearchParams();
    const result: Record<string, string> = {};
    for (const [key, value] of params.entries()) {
      result[key] = value;
    }
    return result;
  };

  /**
   * Get the value of a specific query parameter.
   */
  const getOne = (key: K): string | null => getSearchParams().get(key);

  /**
   * Update query parameters without reloading the page.
   */
  const rawUpdate = (param: Partial<Record<K, QueryParamsInterface[K]>>) => {
    const params = getSearchParams();

    Object.entries(param).forEach(([key, value]) => {
      if (value === undefined || value === null) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  /**
   * Set or update query parameters with optional debounce.
   *
   * @param {Partial<Record<K, QueryParamsInterface[K]>>} param - Query parameters to update.
   * @param {{ delay?: number }} [options] - Optional debounce delay in milliseconds.
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
   * Remove specific query parameters by keys.
   */
  const removeQuery = (...keys: K[]) => {
    const params = getSearchParams();
    keys.forEach((key) => params.delete(key));
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  /**
   * Clear all query parameters.
   */
  const clearQuery = () => {
    navigate(location.pathname, { replace: true });
  };

  return {
    getAll,
    getOne,
    setQuery,
    removeQuery,
    clearQuery,
  };
};
