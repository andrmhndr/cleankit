import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { debounce } from "../../debounce/debounce";
import { QueryParamsInterface } from "../query-params.interface";

export const useQueryParamsReact = <K extends string = string>() => {
  const location = useLocation();
  const navigate = useNavigate();
  const debounceMap = useRef<
    Record<number, (param: Partial<Record<K, QueryParamsInterface[K]>>) => void>
  >({});

  const getSearchParams = () => new URLSearchParams(location.search);

  const getAll = (): Record<string, string> => {
    const params = getSearchParams();
    const result: Record<string, string> = {};
    for (const [key, value] of params.entries()) {
      result[key] = value;
    }
    return result;
  };

  // Generic getOne, bisa ketik key yang pasti
  const getOne = (key: K): string | null => getSearchParams().get(key);

  // rawUpdate juga pakai partial record untuk key generic
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

  // setQuery pakai generic key dan optional debounce
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

  const removeQuery = (...keys: K[]) => {
    const params = getSearchParams();
    keys.forEach((key) => params.delete(key));
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

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
