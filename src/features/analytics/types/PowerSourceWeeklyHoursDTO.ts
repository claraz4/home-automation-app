export interface DailyHours {
  day: string;
  hours: number;
}

export interface PowerSourceWeeklyHoursDTO {
  powerSourceName: string;
  days: DailyHours[];
}
