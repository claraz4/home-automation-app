import { RoomType } from "@/src/features/home/types/RoomDTO";

export interface RoomConsumptionGroupedDTO {
  roomType: RoomType;
  consumption: number;
}
