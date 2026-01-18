import { BasePlug } from "@/src/shared/types/BasePlug";

export interface PlugDTO extends BasePlug {
  room: string;
}

export interface AllPlugsDTO {
  plugs: PlugDTO[];
}
