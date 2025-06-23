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

// src/react/index.ts
var react_exports = {};
__export(react_exports, {
  useQueryParams: () => useQueryParams
});
module.exports = __toCommonJS(react_exports);

// src/react/use-query-params/useQueryParams.hook.ts
var import_react = require("react");
var import_react_router_dom = require("react-router-dom");

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

// src/react/use-query-params/useQueryParams.hook.ts
var useQueryParams = () => {
  const location = (0, import_react_router_dom.useLocation)();
  const navigate = (0, import_react_router_dom.useNavigate)();
  const debounceMap = (0, import_react.useRef)({});
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useQueryParams
});
