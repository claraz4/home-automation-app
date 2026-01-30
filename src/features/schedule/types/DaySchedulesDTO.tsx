export interface ScheduleDTO {
  id: number;
  name: string;
  time: string;
  isActive: boolean;
  deviceCount: number;
}

export interface DaySchedulesDTO {
  schedules: ScheduleDTO[];
}
