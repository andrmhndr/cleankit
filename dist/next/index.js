var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/next/index.ts
var next_exports = {};
__export(next_exports, {
  useQueryParams: () => useQueryParams
});
module.exports = __toCommonJS(next_exports);

// src/next/use-query-params/useQueryParams.hook.ts
var import_react = require("react");
var import_router = require("next/router");

// src/global/debounce/debounce.ts
function debounce(func, wait) {
  let timeoutId = null;
  return function(...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}

// src/next/use-query-params/useQueryParams.hook.ts
var useQueryParams = () => {
  const router = (0, import_router.useRouter)();
  const debounceMap = (0, import_react.useRef)({});
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useQueryParams
});
