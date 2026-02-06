import { conditionStyles } from "@/src/features/automation/styles/conditionStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Heading } from "@/src/shared/ui/Heading";
import { Pressable, View } from "react-native";
import { ReactElement } from "react";
import { colors } from "@/src/theme";

interface ConditionHeaderProps {
  title: string;
  icon: ReactElement;
  onDelete: () => void;
}

export default function ConditionHeader({
  title,
  icon,
  onDelete,
}: ConditionHeaderProps) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <View style={conditionStyles.titleContainer}>
        {icon}
        <Heading variant="h6" style={{ color: "white" }}>
          {title}
        </Heading>
      </View>
      <Pressable onPress={onDelete}>
        <Ionicons name="close-sharp" size={23} color={colors.primary[500]} />
      </Pressable>
    </View>
  );
}
