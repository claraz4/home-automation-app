import { colors } from "@/src/theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable } from "react-native";

interface PlugStatusProps {
  plugId: number;
  isOn: boolean;
  togglePlugStatus: (isCurrentlyOn: boolean) => void;
}

export default function PlugStatus({
  isOn,
  togglePlugStatus,
}: PlugStatusProps) {
  return (
    <Pressable onPress={() => togglePlugStatus(isOn)}>
      <Ionicons
        name="power"
        size={150}
        color={isOn ? colors.primary[500] : colors.gray[300]}
        style={{ alignSelf: "center" }}
      />
    </Pressable>
  );
}
