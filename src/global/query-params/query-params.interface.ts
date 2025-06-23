/**
 * Represents a key-value map for query parameters.
 *
 * Each key can hold a string, number, null, or undefined.
 */
export type QueryParamsInterface = Record<
  string,
  string | number | null | undefined
>;

/**
 * Interface for a custom hook that manages URL query parameters.
 *
 * @template K - The expected string keys for query params (defaults to string).
 */
export type UseQueryInterface<K extends string = string> = {
  /**
   * Returns all query parameters as a key-value pair object.
   *
   * @returns {Record<string, string>} - All query parameters as strings.
   */
  getAll: () => Record<string, string>;

  /**
   * Gets the value of a single query parameter by key.
   *
   * @param key - The key of the query parameter to retrieve.
   * @returns {string | null} - The query value if found, or null.
   */
  getOne: (key: K) => string | null;

  /**
   * Sets one or more query parameters.
   *
   * @param param - An object representing the query parameters to set.
   * @param options - Optional settings:
   *   - debounce: Delay in milliseconds before applying the update.
   */
  setQuery: (
    param: Partial<Record<K, QueryParamsInterface[K]>>,
    options?: { delay?: number }
  ) => void;

  /**
   * Removes one or more query parameters by key.
   *
   * @param keys - One or more keys to remove from the query string.
   */
  removeQuery: (...keys: K[]) => void;

  /**
   * Clears all query parameters from the URL.
   */
  clearQuery: () => void;
};
