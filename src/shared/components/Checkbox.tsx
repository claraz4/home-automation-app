import { Pressable, StyleSheet } from "react-native";
import { AppText } from "@/src/shared/ui/AppText";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { colors, spaces } from "@/src/theme";

interface CheckboxProps {
  isSelected: boolean;
  setIsSelected: (isSelected: boolean) => void;
  value: string;
}

export default function Checkbox({
  isSelected,
  setIsSelected,
  value,
}: CheckboxProps) {
  return (
    <Pressable
      onPress={() => setIsSelected(!isSelected)}
      style={styles.container}
    >
      {isSelected ? (
        <MaterialIcons name="check-box" size={24} color={colors.primary[500]} />
      ) : (
        <MaterialIcons
          name="check-box-outline-blank"
          size={24}
          color={colors.text}
        />
      )}
      <AppText>{value}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: spaces.xs,
    borderBottomColor: colors.gray[200],
    borderBottomWidth: 1,
    padding: spaces.xs,
  },
});
