import { BasePlug } from "@/src/shared/types/BasePlug";

export interface SingleScheduleDTO {
  id: number;
  name: string;
  time: string;
  onPlugs: BasePlug[];
  offPlugs: BasePlug[];
}
