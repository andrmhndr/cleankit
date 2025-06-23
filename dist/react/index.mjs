import {
  debounce
} from "../chunk-NYLYRUYK.mjs";

// src/react/use-query-params/useQueryParams.hook.ts
import { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
var useQueryParams = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const debounceMap = useRef({});
  const getSearchParams = () => new URLSearchParams(location.search);
  const getAll = () => {
    const params = getSearchParams();
    const result = {};
    for (const [key, value] of params.entries()) {
      result[key] = value;
    }
    return result;
  };
  const getOne = (key) => getSearchParams().get(key);
  const rawUpdate = (param) => {
    const params = getSearchParams();
    Object.entries(param).forEach(([key, value]) => {
      if (value === void 0 || value === null) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
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
    clearQuery
  };
};
export {
  useQueryParams
};
