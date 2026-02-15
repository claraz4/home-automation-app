import { borderRadius, colors, spaces } from "@/src/theme";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AppText } from "@/src/shared/ui/AppText";
import { DropdownOption } from "@/src/shared/types/DropdownOption";
import Checkbox from "@/src/shared/components/Checkbox";

interface AppDropdownProps {
  selectedOptions: DropdownOption[] | null;
  setSelectedOptions: Dispatch<SetStateAction<DropdownOption[] | null>>;
  options: DropdownOption[];
  hasDefault?: boolean;
  defaultVal?: string;
  hasSingleValue?: boolean;
  dropdownContainerStyle?: ViewStyle;
}

export default function AppDropdown({
  selectedOptions,
  setSelectedOptions,
  options,
  defaultVal = "All",
  hasDefault = true,
  hasSingleValue = false,
  dropdownContainerStyle,
}: AppDropdownProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Add the default value
  useEffect(() => {
    if (hasDefault) {
      setSelectedOptions((prev) =>
        prev
          ? [...prev, { value: defaultVal, label: defaultVal }]
          : [
              {
                value: defaultVal,
                label: defaultVal,
              },
            ],
      );
    }
  }, [hasDefault]);

  // Set the selected options when multiple accepted
  const setMultipleIsSelected = (item: DropdownOption, isSelected: boolean) =>
    setSelectedOptions((prev) => {
      const safePrev = prev ?? [];
      let newOptions = [...safePrev];

      // Remove the default value if something else is selected
      if (!isSelected && safePrev.some((o) => o.value === defaultVal)) {
        newOptions = newOptions.filter((o) => o.value !== defaultVal);
      }

      // Remove all options if the default value is selected
      if (item.value === defaultVal && !isSelected) {
        newOptions = [];
      }

      // Add the selected option if nothing is selected
      if (isSelected && newOptions.length === 1) {
        newOptions = [...newOptions, { value: defaultVal, label: defaultVal }];
      }

      return isSelected
        ? newOptions.filter((o) => o.value !== item.value)
        : [...newOptions, item];
    });

  // Set the new selected option when only value is acceptable
  const setSingleIsSelected = (item: DropdownOption) => {
    setSelectedOptions((prev) => [item]);
  };

  // Decide what is selected function to use
  const setIsSelected = (item: DropdownOption, isSelected?: boolean) => {
    if (hasSingleValue) {
      setSingleIsSelected(item);
    } else if (isSelected !== undefined) {
      setMultipleIsSelected(item, isSelected);
    }
  };

  if (!selectedOptions) {
    return;
  }

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setIsModalVisible(true)}
        style={[styles.dropdownBoxContainer, dropdownContainerStyle]}
      >
        <AppText>
          {hasSingleValue && selectedOptions[0].label}
          {!hasSingleValue &&
            (selectedOptions[0].value === defaultVal
              ? selectedOptions[0].label
              : `${selectedOptions.length} Selected`)}
        </AppText>
        <Entypo name="chevron-down" size={24} color={colors.gray[400]} />
      </Pressable>
      <Modal transparent visible={isModalVisible} animationType="fade">
        <Pressable
          style={styles.overlay}
          onPress={() => setIsModalVisible(false)}
        >
          <View style={styles.sheet}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.label}
              renderItem={({ item }) => {
                const isSelected = selectedOptions.some(
                  (option) => option.label === item.label,
                );

                return (
                  <Checkbox
                    value={item.label}
                    isSelected={isSelected}
                    setIsSelected={() =>
                      setIsSelected(
                        item,
                        hasSingleValue ? undefined : isSelected,
                      )
                    }
                  />
                );
              }}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropdownBoxContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.gray[100],
    paddingHorizontal: spaces.sm,
    paddingVertical: spaces.xxs,
    borderRadius: borderRadius.sm,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "white",
    padding: spaces.sm,
    borderTopLeftRadius: borderRadius.lg,
    borderTopRightRadius: borderRadius.lg,
    maxHeight: "70%",
  },
});
