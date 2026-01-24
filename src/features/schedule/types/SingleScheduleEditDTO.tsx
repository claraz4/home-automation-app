export interface SingleScheduleCreateDTO {
  name: string;
  time: string;
  onPlugIds: number[];
  offPlugIds: number[];
  isActive: boolean;
}

export interface SingleScheduleEditDTO extends SingleScheduleCreateDTO {
  id: number;
}
