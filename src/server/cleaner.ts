/**
 * Removes null, undefined, and empty string values from an object.
 */
export const cleanObject = (obj: Record<string, any>): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== null && value !== undefined && value !== ""
    )
  );
};

/**
 * Filters out null, undefined, empty strings, and empty arrays from a list.
 * Optionally inserts a spacer between items (e.g., for dividers).
 */
export const cleanList = (
  list: any[],
  spacer?: (index: number) => any
): any[] => {
  const data = list.filter(
    (item) =>
      item !== null && item !== undefined && item !== "" && item.length !== 0
  );

  // If no spacer function is provided, return the cleaned list directly
  if (!spacer) return data;

  // Otherwise, insert spacer elements between items
  return data.reduce((prev, curr, index) => {
    if (index !== 0) prev.push(spacer(index - 1));
    prev.push(curr);
    return prev;
  }, []);
};
