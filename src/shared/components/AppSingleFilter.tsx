import { StyleSheet, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { borderRadius, colors, spaces } from "@/src/theme";
import { DropdownOption } from "@/src/shared/types/DropdownOption";
import { AppText } from "@/src/shared/ui/AppText";
import AppDropdown from "@/src/shared/components/AppDropdown";
import { Dispatch, SetStateAction } from "react";

interface AppSingleFilterProps {
  filterTitle: string;
  filterOptions: DropdownOption[];
  selectedOptions: DropdownOption[] | null;
  setSelectedOptions: Dispatch<SetStateAction<DropdownOption[] | null>>;
}

export default function AppSingleFilter({
  filterTitle,
  setSelectedOptions,
  selectedOptions,
  filterOptions,
}: AppSingleFilterProps) {
  return (
    <View style={styles.container}>
      <FontAwesome5 name="filter" size={20} color={colors.primary[500]} />
      <AppText>{filterTitle}</AppText>
      <AppDropdown
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
        options={filterOptions}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: borderRadius.sm,
    padding: spaces.xs,
    alignItems: "center",
    columnGap: spaces.sm,
    width: "100%",
  },
});
