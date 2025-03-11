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
  const utcDate = fromZonedTime(localDate, VIETNAM_TIMEZONE);
  return utcDate.toISOString();
};


export const formatDate = (isoString) => {
  if (!isoString) return "Không xác định";
  const date = new Date(isoString);
  return date.toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
