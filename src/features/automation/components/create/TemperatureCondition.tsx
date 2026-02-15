import { StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { conditionStyles } from "@/src/features/automation/styles/conditionStyles";
import AppDropdown from "@/src/shared/components/AppDropdown";
import { useEffect, useState } from "react";
import { TSelectedItem } from "react-native-input-select/src/types/index.types";
import AppTextInput from "@/src/shared/components/AppTextInput";
import { spaces } from "@/src/theme";
import ConditionHeader from "@/src/features/automation/components/create/ConditionHeader";
import { AppText } from "@/src/shared/ui/AppText";
import { DropdownOption } from "@/src/shared/types/DropdownOption";

const DEFAULT_TEMP = 20;

interface TemperatureConditionProps {
  tempLessThan: number | null;
  tempGreaterThan: number | null;
  editPolicy: (
    powerSourceId?: number | null,
    tempGreaterThan?: number | null,
    tempLessThan?: number | null,
  ) => void;
}

export default function TemperatureCondition({
  tempGreaterThan,
  tempLessThan,
  editPolicy,
}: TemperatureConditionProps) {
  const temperatureConditions: DropdownOption[] = [
    { label: "Less than", value: "lt" },
    { label: "Greater than", value: "gt" },
    { label: "Between", value: "bt" },
  ];
  const hasGt = tempGreaterThan != null;
  const hasLt = tempLessThan != null;
  const tempCondition =
    hasGt && hasLt
      ? temperatureConditions[2]
      : hasLt
        ? temperatureConditions[0]
        : temperatureConditions[1];

  const [selectedCondition, setSelectedCondition] = useState<
    DropdownOption[] | null
  >([tempCondition]);

  const setTemperatureGreaterThan = (temp: number | null) => {
    editPolicy(undefined, temp, tempLessThan);
  };

  const setTemperatureLessThan = (temp: number | null) => {
    editPolicy(undefined, tempGreaterThan, temp);
  };

  // Change the selected options
  useEffect(() => {
    if (selectedCondition === null) return;

    const gtValue =
      tempGreaterThan === null
        ? tempLessThan === null
          ? DEFAULT_TEMP
          : tempLessThan
        : tempGreaterThan;

    const ltValue =
      tempLessThan === null
        ? tempGreaterThan === null
          ? DEFAULT_TEMP
          : tempGreaterThan
        : tempLessThan;

    switch (selectedCondition[0].value) {
      case "gt":
        editPolicy(undefined, gtValue, null);
        break;

      case "lt":
        editPolicy(undefined, null, ltValue);
        break;

      case "bt":
        editPolicy(undefined, gtValue, gtValue + 10);
        break;
    }
  }, [selectedCondition]);

  return (
    <View style={conditionStyles.container}>
      <ConditionHeader
        title="Temperature"
        icon={
          <MaterialCommunityIcons
            name="thermometer-low"
            size={20}
            color="white"
          />
        }
        onDelete={() => editPolicy(undefined, null, null)}
      />
      <View style={styles.conditionContainer}>
        <AppDropdown
          options={temperatureConditions}
          selectedOptions={selectedCondition}
          setSelectedOptions={setSelectedCondition}
          hasDefault={false}
          hasSingleValue={true}
        />
        <View style={styles.inputContainer}>
          {tempGreaterThan !== null && (
            <AppTextInput
              value={tempGreaterThan + "" || ""}
              onChange={(value) => setTemperatureGreaterThan(Number(value))}
              inputContainerStyle={styles.inputStyle}
              containerStyle={{ width: 44 }}
              keyboardType={"numeric"}
            />
          )}
          {tempGreaterThan !== null && tempLessThan !== null && (
            <AppText style={{ fontSize: 16 }}>and</AppText>
          )}
          {tempLessThan !== null && (
            <AppTextInput
              value={tempLessThan + "" || ""}
              onChange={(value) => setTemperatureLessThan(Number(value))}
              inputContainerStyle={styles.inputStyle}
              containerStyle={{ width: 44 }}
              keyboardType={"numeric"}
            />
          )}
          <AppText style={{ fontSize: 16 }}>{"°C"}</AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conditionContainer: {
    flexDirection: "row",
    columnGap: spaces.sm,
    alignItems: "center",
  },
  inputStyle: {
    paddingVertical: spaces.xs,
    paddingHorizontal: spaces.sm,
    fontSize: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: spaces.xxs,
  },
});
