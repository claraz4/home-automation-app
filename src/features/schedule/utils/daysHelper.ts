import dayjs from "dayjs";
import { spaces } from "@/src/theme";

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
