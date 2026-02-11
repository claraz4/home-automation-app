import { StyleSheet, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { borderRadius, colors, spaces } from "@/src/theme";
import { FilterOption } from "@/src/shared/types/FilterOption";
import { AppText } from "@/src/shared/ui/AppText";
import AppDropdown from "@/src/shared/components/AppDropdown";
import { TSelectedItem } from "react-native-input-select/src/types/index.types";

interface AppSingleFilterProps {
  filterTitle: string;
  filterOptions: FilterOption[];
  selectedOption: TSelectedItem | TSelectedItem[];
  setSelectedOption: (selectedOption: TSelectedItem | TSelectedItem[]) => void;
}

export default function AppSingleFilter({
  filterTitle,
  setSelectedOption,
  selectedOption,
  filterOptions,
}: AppSingleFilterProps) {
  return (
    <View style={styles.container}>
      <FontAwesome5 name="filter" size={20} color={colors.primary[500]} />
      <AppText>{filterTitle}</AppText>
      <AppDropdown
        options={filterOptions}
        setOptions={setSelectedOption}
        selectedOption={selectedOption}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: borderRadius.sm,
    padding: spaces.sm,
    alignItems: "center",
    columnGap: spaces.sm,
    paddingVertical: spaces.xs + spaces.xxxs,
  },
});
