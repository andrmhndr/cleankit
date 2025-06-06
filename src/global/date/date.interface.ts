/**
 * Supported date format types for `dateFormatter`.
 */
export type DateFormatType =
  | "dd/MM/yyyy"
  | "dd/MM/yy"
  | "yyyy-MM-dd"
  | "HH:mm:ss" // 24-hour format
  | "hh:mm:ss a" // 12-hour format with AM/PM
  | "hh:mm a"; // 12-hour format without seconds

/**
 * Options for customizing the date formatting behavior.
 *
 * @template T Custom format string type
 */
export interface DateFormatterOptions<T extends string = string> {
  /**
   * Custom or predefined format string.
   * Accepts `DateFormatType` or any custom string pattern like "dd-MM-yyyy".
   */
  format?: T | DateFormatType;

  /**
   * Custom list of month names. Default is English (January - December).
   * Example: ["Jan", "Feb", ..., "Dec"]
   */
  monthNames?: string[];

  /**
   * Full day names for the week, starting from Sunday.
   * Default is English: ["Sunday", "Monday", ..., "Saturday"]
   */
  dayNamesFull?: string[];

  /**
   * Short day names for the week, starting from Sunday.
   * Default is English: ["Sun", "Mon", ..., "Sat"]
   */
  dayNamesShort?: string[];

  /**
   * Custom labels for AM/PM in 12-hour formats.
   * Default is ["AM", "PM"]
   */
  amPmLabels?: [string, string];
}

/**
 * Default full month names in English.
 */
export const defaultMonthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Default full weekday names in English, starting from Sunday.
 */
export const defaultDayNamesFull = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

/**
 * Default short weekday names in English, starting from Sunday.
 */
export const defaultDayNamesShort = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];
