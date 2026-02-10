import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { JSX } from "react";

export const roomIcons = (
  color: string,
  size: number,
): Record<string, JSX.Element> => ({
  kitchen: <FontAwesome6 name="kitchen-set" size={size} color={color} />,
  livingRoom: <FontAwesome6 name="couch" size={size} color={color} />,
  bedroom: <FontAwesome6 name="bed" size={size} color={color} />,
  bathroom: <FontAwesome6 name="bath" size={size} color={color} />,
  diningRoom: <FontAwesome6 name="utensils" size={size} color={color} />,
  office: <FontAwesome6 name="briefcase" size={size} color={color} />,
  garage: <FontAwesome6 name="car" size={size} color={color} />,
  hallway: <FontAwesome6 name="person-walking" size={size} color={color} />,
  laundryRoom: <FontAwesome6 name="shirt" size={size} color={color} />,
  basement: <FontAwesome6 name="stairs" size={size} color={color} />,
  attic: <MaterialIcons name="window" size={size + 9} color={color} />,
  default: <FontAwesome6 name="door-closed" size={size} color={color} />,
});
