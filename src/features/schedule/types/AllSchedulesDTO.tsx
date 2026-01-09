export interface ScheduleDTO {
  id: number;
  name: string;
  time: Date;
  deviceCount: number;
}

export interface AllSchedulesDTO {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  schedules: ScheduleDTO[];
}
