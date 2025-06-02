import { useQueryParamsNext } from "./next/useQueryParams.hook.next";
import { UseQueryInterface } from "./query-params.interface";
import { useQueryParamsReact } from "./react/useQueryParams.hook.react";

// Coba import untuk Next.js
let useNextRouter: any = null;
try {
  // ini cuma buat cek, kalau ga ada bakal error dan catch
  useNextRouter = require("next/router").useRouter;
} catch {}

// Coba import untuk React Router
let useReactRouterLocation: any = null;
try {
  useReactRouterLocation = require("react-router-dom").useLocation;
} catch {}

export const useQueryParams = <
  K extends string = string
>(): UseQueryInterface<K> => {
  if (useNextRouter) return useQueryParamsNext<K>();
  return useQueryParamsReact<K>();
};
