import dayjs, { Dayjs } from "dayjs";
import { spaces } from "@/src/theme";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

export const LIST_SEPARATOR = spaces.md;
export const DAYS_AFTER = 30;
export const DAYS_PER_VIEW = 5;

export function daysGenerator(): dayjs.Dayjs[] {
  const days: dayjs.Dayjs[] = [];
  const currentDay = dayjs().startOf("day");

  // Add the previous days + today
  for (let i = DAYS_PER_VIEW / 2; i >= 0; i--) {
    days.push(currentDay.subtract(i, "days"));
  }

  // Add all remaining days
  for (let i = 1; i <= DAYS_AFTER; i++) {
    days.push(currentDay.add(i, "days"));
  }

  return days;
}

export function isDayScheduled(
  currentDay: dayjs.Dayjs,
  schedules: string[],
): boolean {
  const currentDayFormatted = dayjs(currentDay).format("YYYY-MM-DD");
  return schedules.includes(currentDayFormatted);
}

export function getFormattedDateTime(date: Dayjs) {
  const formattedDate = date.format("ddd, MMM D");
  const formattedTime = date.format("HH:mm");
  const formattedHour = date.format("HH");
  const formattedMinute = date.format("mm");

  return { formattedDate, formattedTime, formattedHour, formattedMinute };
}
