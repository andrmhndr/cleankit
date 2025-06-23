/**
 * Supported date format types for `dateFormatter`.
 */
type DateFormatType = "dd/MM/yyyy" | "dd/MM/yy" | "yyyy-MM-dd" | "HH:mm:ss" | "hh:mm:ss a" | "hh:mm a";
/**
 * Options for customizing the date formatting behavior.
 *
 * @template T Custom format string type
 */
interface DateFormatterOptions<T extends string = string> {
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
declare const defaultMonthNames: string[];
/**
 * Default full weekday names in English, starting from Sunday.
 */
declare const defaultDayNamesFull: string[];
/**
 * Default short weekday names in English, starting from Sunday.
 */
declare const defaultDayNamesShort: string[];

/**
 * Formats a given date into a custom string format.
 *
 * Supports both common and custom formats including day names, month names, 12/24 hour formats, timezone, quarters, and ISO week number.
 *
 * @template T - The format string type (optional).
 * @param dateInput - The input date, either as a `Date` object or an ISO date string.
 * @param options - Optional settings for formatting:
 *  - `format`: A string pattern like `"dd/MM/yyyy"`, `"MMMM yyyy"`, `"EEE, d MMM"`, etc.
 *  - `monthNames`: Custom month name array.
 *  - `dayNamesFull`: Custom full day name array.
 *  - `dayNamesShort`: Custom short day name array.
 *  - `amPmLabels`: Custom AM/PM labels, e.g. `["AM", "PM"]` or `["pagi", "malam"]`
 *
 * @returns A formatted string according to the specified pattern and locale options.
 *
 * @example
 * dateFormatter("2023-12-25T14:30:00", { format: "dd MMMM yyyy HH:mm" })
 * // "25 December 2023 14:30"
 *
 * @example
 * dateFormatter(new Date(), {
 *   format: "EEEE, d MMM yyyy hh:mm a",
 *   dayNamesFull: ["Minggu", "Senin", ...],
 *   monthNames: ["Januari", "Februari", ...],
 *   amPmLabels: ["pagi", "malam"]
 * })
 */
declare function dateFormatter<T extends string = string>(dateInput: string | Date, options?: DateFormatterOptions<T>): string;

/**
 * Removes null, undefined, and empty string values from an object.
 */
declare const cleanObject: (obj: Record<string, any>) => Record<string, any>;
/**
 * Filters out null, undefined, empty strings, and empty arrays from a list.
 * Optionally inserts a spacer between items (e.g., for dividers).
 */
declare const cleanList: (list: any[], spacer?: (index: number) => any) => any[];

export { type DateFormatType, type DateFormatterOptions, cleanList, cleanObject, dateFormatter, defaultDayNamesFull, defaultDayNamesShort, defaultMonthNames };
