export interface RoomDTO {
  roomId: number;
  name: string;
  roomType: string;
  totalPlugsCount: number;
  activePlugsCount: number;
}

export type RoomType =
  | "kitchen"
  | "livingRoom"
  | "bedroom"
  | "bathroom"
  | "diningRoom"
  | "office"
  | "garage"
  | "hallway"
  | "laundryRoom"
  | "basement"
  | "attic"
  | "default";
