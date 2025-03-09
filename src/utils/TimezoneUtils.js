// timezoneUtils.js
import { format, parseISO } from 'date-fns';
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz';

// Define timezones
const UTC = 'UTC';
const VIETNAM_TIMEZONE = 'Asia/Ho_Chi_Minh'; // UTC+7

/**
 * Converts a local date to UTC for API requests
 * @param {Date} localDate - Date in Vietnam timezone
 * @returns {Date} - Date in UTC
 */
export const toUTCFromVietnam = (localDate) => {
  if (!localDate) return null;
  return zonedTimeToUtc(localDate, UTC);
};

/**
 * Converts a UTC date from API to Vietnam time (UTC+7)
 * @param {string|Date} utcDate - Date in UTC (string ISO format or Date object)
 * @returns {Date} - Date in Vietnam timezone
 */
export const toVietnamTime = (utcDate) => {
  if (!utcDate) return null;
  
  const dateObj = typeof utcDate === 'string' ? parseISO(utcDate) : utcDate;
  return utcToZonedTime(dateObj, VIETNAM_TIMEZONE);
};

/**
 * Formats a date for display in Vietnam timezone with microseconds
 * @param {string|Date} utcDate - Date in UTC
 * @returns {string} - Formatted date string in Vietnam timezone (yyyy-MM-dd HH:mm:ss.SSSSSS)
 */
export const formatVietnamDate = (utcDate) => {
  if (!utcDate) return '';
  const vietnamDate = toVietnamTime(utcDate);

  // Format date to include microseconds
  const formattedDate = format(vietnamDate, "yyyy-MM-dd HH:mm:ss.SSS");
  const microseconds = vietnamDate.getMilliseconds().toString().padStart(3, '0') + '000'; // Convert to 6-digit microseconds
  return `${formattedDate}${microseconds}`;
};

/**
 * Helper function to prepare date for API requests
 * Takes a Vietnam local date and returns ISO string in UTC
 * @param {Date} localDate - Date in Vietnam timezone
 * @returns {string} - ISO string in UTC with microseconds
 */
export const prepareApiDateFromVietnam = (localDate) => {
  if (!localDate) return null;
  
  const utcDate = toUTCFromVietnam(localDate);
  const formattedDate = format(utcDate, "yyyy-MM-dd HH:mm:ss.SSS");
  const microseconds = utcDate.getMilliseconds().toString().padStart(3, '0') + '000';
  
  return `${formattedDate}${microseconds}`;
};
