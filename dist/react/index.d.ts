import { U as UseQueryInterface } from '../query-params.interface-BRtsT-op.js';

/**
 * A custom hook to manage query parameters in React Router with optional debouncing.
 */
declare const useQueryParams: <K extends string = string>() => UseQueryInterface<K>;

export { useQueryParams };
