import { Func } from "./debounce.interface";

/**
 * Creates a debounced version of the provided function, which delays
 * invoking the function until after the specified wait time has elapsed
 * since the last time the debounced function was called.
 *
 * @template F - A function type that extends Func.
 * @param func - The original function to debounce.
 * @param wait - The number of milliseconds to delay.
 * @returns A new debounced function.
 */
export function debounce<F extends Func>(func: F, wait: number) {
  // Store the timeout ID to clear it when necessary
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  // Return a debounced version of the function
  return function (this: any, ...args: Parameters<F>) {
    // Clear any existing timeout to reset the debounce delay
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout to call the function after the wait period
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
}
