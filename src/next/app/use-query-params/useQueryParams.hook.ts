"use client";

import { useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { debounce } from "../../../global/debounce/debounce";
import {
  QueryParamsInterface,
  UseQueryInterface,
} from "../../../global/query-params/query-params.interface";

/**
 * Custom hook to manage URL query parameters using Next.js App Router (App Directory).
 *
 * Provides utilities to read, update (with optional debounce), remove,
 * and clear query parameters via `next/navigation`.
 *
 * @template K - A union type of query parameter keys.
 * @returns {UseQueryInterface<K>} Object containing query manipulation methods.
 */
export const useQueryParams = <
  K extends string = string
>(): UseQueryInterface<K> => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const debounceMap = useRef<
    Record<number, (param: Partial<Record<K, QueryParamsInterface[K]>>) => void>
  >({});

  /**
   * Retrieves all current query parameters as key-value pairs.
   *
   * @returns {Record<string, string>} All query parameters from the current URL.
   */
  const getAll = (): Record<string, string> => {
    const result: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      result[key] = value;
    });
    return result;
  };

  /**
   * Retrieves a specific query parameter value.
   *
   * @param {K} key - The name of the query parameter.
   * @returns {string | null} The value of the query parameter or null if not found.
   */
  const getOne = (key: K): string | null => {
    return searchParams.get(key) ?? null;
  };

  /**
   * Internally used to update query parameters instantly without debounce.
   *
   * @private
   * @param {Partial<Record<K, QueryParamsInterface[K]>>} param - Query parameters to update.
   */
  const rawUpdate = (param: Partial<Record<K, QueryParamsInterface[K]>>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(param).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    const newUrl = `${pathname}?${params.toString()}`;
    router.replace(newUrl, { scroll: false });
  };

  /**
   * Sets or updates query parameters with optional debounce delay.
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
   * Removes one or more query parameters from the current URL.
   *
   * @param {...K[]} keys - Query parameter keys to remove.
   */
  const removeQuery = (...keys: K[]) => {
    const params = new URLSearchParams(searchParams.toString());
    keys.forEach((key) => {
      params.delete(key);
    });

    const newUrl = `${pathname}?${params.toString()}`;
    router.replace(newUrl, { scroll: false });
  };

  /**
   * Clears all query parameters from the URL, keeping only the pathname.
   */
  const clearQuery = () => {
    router.replace(pathname, { scroll: false });
  };

  return {
    getAll,
    getOne,
    setQuery,
    removeQuery,
    clearQuery,
  };
};
