import { useRef } from "react";
import { useRouter } from "next/router";
import { debounce } from "../../global/debounce/debounce";
import {
  QueryParamsInterface,
  UseQueryInterface,
} from "../../global/query-params/query-params.interface";

export const useQueryParams = <
  K extends string = string
>(): UseQueryInterface<K> => {
  const router = useRouter();
  const debounceMap = useRef<
    Record<number, (param: Partial<Record<K, QueryParamsInterface[K]>>) => void>
  >({});

  // Ambil semua query param sebagai string record
  const getAll = (): Record<string, string> => {
    const query = router.query;
    const result: Record<string, string> = {};
    Object.entries(query).forEach(([key, value]) => {
      if (typeof value === "string") {
        result[key] = value;
      } else if (Array.isArray(value)) {
        result[key] = value.join(","); // fallback kalau array, gabungkan jadi string
      }
    });
    return result;
  };

  // Ambil satu query param sesuai key generic
  const getOne = (key: K): string | null => {
    const value = router.query[key];
    if (!value) return null;
    if (typeof value === "string") return value;
    if (Array.isArray(value)) return value.join(",");
    return null;
  };

  // Update query param tanpa reload page (replaceState)
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

  // setQuery dengan debounce opsional
  const setQuery = (
    param: Partial<Record<K, QueryParamsInterface[K]>> = {},
    options: { debounce?: number } = {}
  ) => {
    const delay = options.debounce;

    if (delay) {
      if (!debounceMap.current[delay]) {
        debounceMap.current[delay] = debounce(rawUpdate, delay);
      }
      debounceMap.current[delay](param);
    } else {
      rawUpdate(param);
    }
  };

  // Remove query keys
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

  // Clear semua query params
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
