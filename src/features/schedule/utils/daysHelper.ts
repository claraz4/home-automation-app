import dayjs from "dayjs";
import { spaces } from "@/src/theme";
import { ScheduleDTO } from "@/src/features/schedule/types/AllSchedulesDTO";

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
  schedules: ScheduleDTO[],
): boolean {
  return schedules.some((schedule) =>
    dayjs(schedule.time).startOf("day").isSame(currentDay, "day"),
  );
}

export function getFormattedDateTime(day: dayjs.Dayjs): {
  date: string;
  time: string;
} {
  const date = `${day.format("ddd, MMM D")}`;
  const time = `${day.format("HH:mm")}`;

  return { date, time };
}
