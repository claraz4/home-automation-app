export interface ScheduleDTO {
  id: number;
  name: string;
  time: string;
  isActive: boolean;
  deviceCount: number;
}

export interface DaySchedulesDTO {
  date: string; // YYYY-MM-DD
  schedules: ScheduleDTO[];
}

export interface AllSchedulesDTO {
  page: number;
  pageSize: number;
  totalDays: number;
  totalPages: number;
  days: DaySchedulesDTO[];
}
