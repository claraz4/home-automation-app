import { ScheduleDTO } from "@/src/features/schedule/types/DaySchedulesDTO";

export interface SchedulesByDate {
  date: string;
  schedules: ScheduleDTO[];
}

export type UpcomingSchedulesDTO = SchedulesByDate[];
