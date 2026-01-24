import { BasePlug } from "@/src/shared/types/BasePlug";

export interface SingleScheduleUploadDTO {
  id: number;
  name: string;
  time: string;
  onPlugIds: number[];
  offPlugIds: number[];
}
