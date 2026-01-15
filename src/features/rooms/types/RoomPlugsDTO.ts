import { BasePlug } from "@/src/shared/types/BasePlug";

export interface RoomPlugDTO extends BasePlug {
  isConstant: boolean;
}

export interface RoomPlugsDTO {
  plugs: RoomPlugDTO[];
}
