import { BasePlug } from "@/src/shared/types/BasePlug";

export interface PolicyDTO {
  id?: number;
  name: string;
  onPlugs: BasePlug[];
  offPlugs: BasePlug[];
  powerSourceId?: number | null;
  powerSourceName: string | null;
  tempGreaterThan: number | null;
  tempLessThan: number | null;
  numOfPlugs: number;
  isActive: boolean;
}
