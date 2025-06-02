import { UseQueryInterface } from "./query-params.interface";

let hook: any = null;

try {
  const { useRouter } = require("next/router");
  if (useRouter) {
    hook = require("../next/useQueryParams.hook.next").useQueryParamsNext;
  }
} catch {}

if (!hook) {
  try {
    const { useLocation } = require("react-router-dom");
    if (useLocation) {
      hook = require("../react/useQueryParams.hook.react").useQueryParamsReact;
    }
  } catch {}
}

if (!hook) {
  throw new Error("No routing library detected for useQueryParams.");
}

export const useQueryParams: <
  K extends string = string
>() => UseQueryInterface<K> = hook;
