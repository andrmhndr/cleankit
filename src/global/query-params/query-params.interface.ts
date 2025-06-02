export type QueryParamsInterface = Record<
  string,
  string | number | null | undefined
>;

export type UseQueryInterface<K extends string = string> = {
  getAll: () => Record<string, string>;
  getOne: (key: K) => string | null;
  setQuery: (
    param: Partial<Record<K, QueryParamsInterface[K]>>,
    options: { debounce?: number }
  ) => void;
  removeQuery: (...keys: K[]) => void;
  clearQuery: () => void;
};
