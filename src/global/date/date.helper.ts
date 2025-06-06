import {
  DateFormatterOptions,
  defaultDayNamesFull,
  defaultDayNamesShort,
  defaultMonthNames,
} from "./date.interface";

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
export function dateFormatter<T extends string = string>(
  dateInput: string | Date,
  options?: DateFormatterOptions<T>
): string {
  if (!dateInput) return "";

  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return "";

  const format = options?.format || "dd/MM/yyyy";

  const pad = (n: number) => n.toString().padStart(2, "0");
  const padNoZero = (n: number) => n.toString();

  const monthNames = options?.monthNames || defaultMonthNames;
  const dayNamesFull = options?.dayNamesFull || defaultDayNamesFull;
  const dayNamesShort = options?.dayNamesShort || defaultDayNamesShort;
  const [amLabel, pmLabel] = options?.amPmLabels || ["AM", "PM"];

  const yearFull = date.getFullYear();
  const yearShort = yearFull.toString().slice(-2);

  const monthIndex = date.getMonth();
  const dayOfMonth = date.getDate();
  const dayOfWeek = date.getDay();

  const hours24 = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const hours12 = hours24 % 12 || 12;
  const ampm = hours24 >= 12 ? pmLabel : amLabel;

  function getWeekNumber(d: Date): number {
    const target = new Date(d.valueOf());
    const dayNum = (d.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNum + 3);
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
    }
    return 1 + Math.ceil((firstThursday - target.valueOf()) / 604800000);
  }

  const quarter = Math.floor(monthIndex / 3) + 1;

  const map: Record<string, string> = {
    dd: pad(dayOfMonth),
    d: padNoZero(dayOfMonth),
    MM: pad(monthIndex + 1),
    M: padNoZero(monthIndex + 1),
    MMMM: monthNames[monthIndex],
    yyyy: yearFull.toString(),
    yy: yearShort,
    EEEE: dayNamesFull[dayOfWeek],
    EEE: dayNamesShort[dayOfWeek],
    HH: pad(hours24),
    H: padNoZero(hours24),
    hh: pad(hours12),
    h: padNoZero(hours12),
    mm: pad(minutes),
    m: padNoZero(minutes),
    ss: pad(seconds),
    s: padNoZero(seconds),
    a: ampm,
    Q: quarter.toString(),
    W: getWeekNumber(date).toString(),
    Z: (() => {
      const offset = date.getTimezoneOffset();
      const sign = offset > 0 ? "-" : "+";
      const absOffset = Math.abs(offset);
      const hours = Math.floor(absOffset / 60);
      const minutes = absOffset % 60;
      return sign + pad(hours) + ":" + pad(minutes);
    })(),
  };

  return format.replace(
    /dd|d|MMMM|MM|M|yyyy|yy|EEEE|EEE|HH|H|hh|h|mm|m|ss|s|a|Q|W|Z/g,
    (match) => map[match] || match
  );
}
