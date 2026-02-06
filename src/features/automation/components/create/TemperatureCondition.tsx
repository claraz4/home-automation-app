import { StyleSheet, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { conditionStyles } from "@/src/features/automation/styles/conditionStyles";
import AppDropdown from "@/src/shared/components/AppDropdown";
import { useState } from "react";
import { TSelectedItem } from "react-native-input-select/src/types/index.types";
import AppTextInput from "@/src/shared/components/AppTextInput";
import { spaces } from "@/src/theme";
import ConditionHeader from "@/src/features/automation/components/create/ConditionHeader";
import { AppText } from "@/src/shared/ui/AppText";

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
  const temperatureConditions = [
    { label: "Less than", value: "lt" },
    { label: "Greater than", value: "gt" },
    { label: "Between", value: "bt" },
  ];
  const hasGt = tempGreaterThan != null;
  const hasLt = tempLessThan != null;
  const tempCondition = hasGt && hasLt ? "bt" : hasLt ? "lt" : "gt";

  const [selectedCondition, setSelectedCondition] = useState<
    TSelectedItem | TSelectedItem[]
  >(tempCondition);

  const setTemperatureGreaterThan = (temp: number | null) => {
    editPolicy(undefined, temp, tempLessThan);
  };

  const setTemperatureLessThan = (temp: number | null) => {
    editPolicy(undefined, tempGreaterThan, temp);
  };

  // Change the selected option
  const changeSelectedOption = (option: TSelectedItem | TSelectedItem[]) => {
    setSelectedCondition(option);

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

    switch (option) {
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
  };

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
          setOptions={changeSelectedOption}
          selectedOption={selectedCondition}
          dropdownStyle={{ width: selectedCondition === "bt" ? 120 : 150 }}
          dropdownContainerStyle={{
            width: selectedCondition === "bt" ? 120 : 150,
            flex: 0,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            columnGap: spaces.xxs,
          }}
        >
          {tempGreaterThan !== null && (
            <AppTextInput
              value={tempGreaterThan + "" || ""}
              onChange={(value) => setTemperatureGreaterThan(Number(value))}
              inputContainerStyle={styles.inputStyle}
              containerStyle={{
                width: 44,
              }}
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
});
