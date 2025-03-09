import { parseISO } from "date-fns";
import { toZonedTime, fromZonedTime } from "date-fns-tz";
import { addHours } from "date-fns";

const VIETNAM_TIMEZONE = "Asia/Ho_Chi_Minh";

export const toVietnamTime = (utcDate) => {
  if (!utcDate) return null;
  const dateObj = typeof utcDate === "string" ? parseISO(utcDate) : utcDate;
  return toZonedTime(dateObj, VIETNAM_TIMEZONE);
};

export const formatVietnamDate = (utcDate) => {
  if (!utcDate) return "";

  return addHours(new Date(utcDate), 7);
};

export const toISOStringUTC = (localDate) => {
  if (!localDate) return null;
  console.log("localdate", localDate);
  const utcDate = fromZonedTime(localDate, VIETNAM_TIMEZONE);
  console.log("utcDate", utcDate); 
  console.log("utcDate to ISO", utcDate.toISOString());
  return utcDate.toISOString();
};