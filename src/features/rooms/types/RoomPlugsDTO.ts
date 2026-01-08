export interface RoomPlugDTO {
  id: number;
  name: string;
  isOn: boolean;
  isConstant: boolean;
}

export interface RoomPlugsDTO {
  plugs: RoomPlugDTO[];
}
