var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/server/index.ts
var server_exports = {};
__export(server_exports, {
  cleanList: () => cleanList,
  cleanObject: () => cleanObject,
  dateFormatter: () => dateFormatter,
  defaultDayNamesFull: () => defaultDayNamesFull,
  defaultDayNamesShort: () => defaultDayNamesShort,
  defaultMonthNames: () => defaultMonthNames
});
module.exports = __toCommonJS(server_exports);

// src/server/date/date.interface.ts
var defaultMonthNames = [
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
  "December"
];
var defaultDayNamesFull = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
var defaultDayNamesShort = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
];

// src/server/date/date.helper.ts
function dateFormatter(dateInput, options) {
  if (!dateInput) return "";
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return "";
  const format = options?.format || "dd/MM/yyyy";
  const pad = (n) => n.toString().padStart(2, "0");
  const padNoZero = (n) => n.toString();
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
  function getWeekNumber(d) {
    const target = new Date(d.valueOf());
    const dayNum = (d.getDay() + 6) % 7;
    target.setDate(target.getDate() - dayNum + 3);
    const firstThursday = target.valueOf();
    target.setMonth(0, 1);
    if (target.getDay() !== 4) {
      target.setMonth(0, 1 + (4 - target.getDay() + 7) % 7);
    }
    return 1 + Math.ceil((firstThursday - target.valueOf()) / 6048e5);
  }
  const quarter = Math.floor(monthIndex / 3) + 1;
  const map = {
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
      const minutes2 = absOffset % 60;
      return sign + pad(hours) + ":" + pad(minutes2);
    })()
  };
  return format.replace(
    /dd|d|MMMM|MM|M|yyyy|yy|EEEE|EEE|HH|H|hh|h|mm|m|ss|s|a|Q|W|Z/g,
    (match) => map[match] || match
  );
}

// src/server/cleaner.ts
var cleanObject = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([_, value]) => value !== null && value !== void 0 && value !== ""
    )
  );
};
var cleanList = (list, spacer) => {
  const data = list.filter(
    (item) => item !== null && item !== void 0 && item !== "" && item.length !== 0
  );
  if (!spacer) return data;
  return data.reduce((prev, curr, index) => {
    if (index !== 0) prev.push(spacer(index - 1));
    prev.push(curr);
    return prev;
  }, []);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cleanList,
  cleanObject,
  dateFormatter,
  defaultDayNamesFull,
  defaultDayNamesShort,
  defaultMonthNames
});
