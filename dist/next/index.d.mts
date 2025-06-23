import { U as UseQueryInterface } from '../query-params.interface-BRtsT-op.mjs';

/**
 * Custom hook to manage URL query parameters in a flexible way.
 * Designed for Next.js (pages router).
 *
 * Supports reading, adding, removing, and clearing query parameters,
 * with optional debounce for smoother UX during fast input changes.
 *
 * @returns {UseQueryInterface} API to interact with query parameters
 */
declare const useQueryParams: <K extends string = string>() => UseQueryInterface<K>;

export { useQueryParams };
