import Dropdown from "react-native-input-select";
import {
  TFlatList,
  TSelectedItem,
} from "react-native-input-select/src/types/index.types";
import { colors, spaces } from "@/src/theme";
import { StyleSheet, ViewStyle } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

interface AppDropdownProps {
  label?: string;
  options: TFlatList;
  setOptions: (options: TSelectedItem | TSelectedItem[]) => void;
  selectedOption: TSelectedItem | TSelectedItem[];
  dropdownContainerStyle?: ViewStyle;
  dropdownStyle?: ViewStyle;
}

export default function AppDropdown({
  label,
  options,
  setOptions,
  selectedOption,
  dropdownContainerStyle,
  dropdownStyle,
}: AppDropdownProps) {
  return (
    <Dropdown
      label={label}
      placeholder="Select an option"
      options={options}
      selectedValue={selectedOption}
      onValueChange={(value) => setOptions(value)}
      primaryColor={colors.primary[500]}
      dropdownContainerStyle={StyleSheet.flatten([
        styles.containerStyle,
        dropdownContainerStyle,
      ])}
      dropdownStyle={StyleSheet.flatten([styles.dropdownStyle, dropdownStyle])} // for the box before selecting the dropdown
      dropdownIconStyle={styles.dropdownIcon}
      dropdownIcon={<Entypo name="chevron-down" size={24} color="black" />}
    />
  );
}

const styles = StyleSheet.create({
  dropdownStyle: {
    paddingHorizontal: spaces.md,
    paddingVertical: spaces.xs,
    minHeight: 1,
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: colors.gray[300],
  },
  dropdownIcon: {
    top: 6,
    right: spaces.md,
  },
  containerStyle: {
    flex: 1,
    marginBottom: 0,
  },
});
