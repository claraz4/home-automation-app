export interface Room {
  id: number;
  name: string;
  deviceNumber: number;
  type: RoomType;
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
