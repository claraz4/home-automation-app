import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

type IconComponent =
  | typeof Ionicons
  | typeof MaterialIcons
  | typeof FontAwesome6;

export type IconType = {
  icon: IconComponent;
  name: string;
};
