import { BasePlug } from "@/src/shared/types/BasePlug";

export interface SingleSchedule {
  name: string;
  time: string;
  onPlugs: BasePlug[];
  offPlugs: BasePlug[];
  isActive: boolean;
  id?: number;
}

export interface SingleScheduleDTO extends SingleSchedule {
  id: number;
  isActive: boolean;
}
