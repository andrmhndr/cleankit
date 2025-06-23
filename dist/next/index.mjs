import {
  debounce
} from "../chunk-NYLYRUYK.mjs";

// src/next/use-query-params/useQueryParams.hook.ts
import { useRef } from "react";
import { useRouter } from "next/router";
var useQueryParams = () => {
  const router = useRouter();
  const debounceMap = useRef({});
  const getAll = () => {
    const query = router.query;
    const result = {};
    Object.entries(query).forEach(([key, value]) => {
      if (typeof value === "string") {
        result[key] = value;
      } else if (Array.isArray(value)) {
        result[key] = value.join(",");
      }
    });
    return result;
  };
  const getOne = (key) => {
    const value = router.query[key];
    if (!value) return null;
    if (typeof value === "string") return value;
    if (Array.isArray(value)) return value.join(",");
    return null;
  };
  const rawUpdate = (param) => {
    const currentQuery = { ...router.query };
    Object.entries(param).forEach(([key, value]) => {
      if (value === void 0 || value === null) {
        delete currentQuery[key];
      } else {
        currentQuery[key] = String(value);
      }
    });
    router.replace(
      {
        pathname: router.pathname,
        query: currentQuery
      },
      void 0,
      { shallow: true, scroll: false }
    );
  };
  const setQuery = (param = {}, options = {}) => {
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
  const removeQuery = (...keys) => {
    const currentQuery = { ...router.query };
    keys.forEach((key) => {
      delete currentQuery[key];
    });
    router.replace(
      {
        pathname: router.pathname,
        query: currentQuery
      },
      void 0,
      { shallow: true, scroll: false }
    );
  };
  const clearQuery = () => {
    router.replace(
      {
        pathname: router.pathname,
        query: {}
      },
      void 0,
      { shallow: true, scroll: false }
    );
  };
  return {
    getAll,
    getOne,
    setQuery,
    removeQuery,
    clearQuery
  };
};
export {
  useQueryParams
};
