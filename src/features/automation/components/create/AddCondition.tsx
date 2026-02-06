import { StyleSheet, View } from "react-native";
import Button from "@/src/shared/components/Button";
import { borderRadius, boxShadow, fontWeight } from "@/src/theme";
import { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AddConditionBox from "@/src/features/automation/components/create/AddConditionBox";
import Ionicons from "@expo/vector-icons/Ionicons";

interface AddConditionProps {
  editPolicy: (
    powerSourceId?: number | null,
    tempGreaterThan?: number | null,
    tempLessThan?: number | null,
  ) => void;
}

export default function AddCondition({ editPolicy }: AddConditionProps) {
  const [showOptions, setShowOptions] = useState(false);

  // Temperature box click
  const onClickTemp = () => {
    editPolicy(undefined, 20);
    setShowOptions(false);
  };

  // Source box click
  const onClickSource = () => {
    editPolicy(1);
    setShowOptions(false);
  };

  return (
    <View style={{ position: "relative" }}>
      <Button
        text="+ Add Condition"
        onPress={() => setShowOptions((prev) => !prev)}
        textStyle={{ fontFamily: fontWeight[600] }}
      />
      {showOptions && (
        <View style={styles.optionsContainer}>
          <AddConditionBox
            condition="Temperature"
            icon={
              <MaterialCommunityIcons
                name="thermometer-low"
                size={25}
                color="white"
              />
            }
            onClick={onClickTemp}
          />
          <AddConditionBox
            condition="Source"
            icon={<Ionicons name="flash" size={20} color="white" />}
            onClick={onClickSource}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  optionsContainer: {
    position: "absolute",
    backgroundColor: "white",
    width: "100%",
    top: 55,
    zIndex: 10,
    ...boxShadow.normal,
    borderRadius: borderRadius.sm,
  },
});
