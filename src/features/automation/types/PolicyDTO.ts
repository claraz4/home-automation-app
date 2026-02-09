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
  numOfPlugs?: number;
  isActive: boolean;
}

export interface PolicyCreateDTO {
  name: string;
  onPlugIds: number[];
  offPlugIds: number[];
  powerSourceId: number | null;
  tempGreaterThan: number | null;
  tempLessThan: number | null;
  isActive: boolean;
}

export interface PolicyEditDTO {
  id: number;
  name: string;
  powerSourceId: number | null;
  tempGreaterThan: number | null;
  tempLessThan: number | null;
  onPlugIds: number[];
  offPlugIds: number[];
}
