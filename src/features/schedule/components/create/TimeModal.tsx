import { StyleSheet, View } from "react-native";
import { borderRadius, colors, spaces } from "@/src/theme";
import AppModal from "@/src/shared/components/AppModal";
import { Dispatch, SetStateAction, useState } from "react";
import CustomTimeSelection from "@/src/features/timeout/components/CustomTimeSelection";
import Button from "@/src/shared/components/Button";

interface TimeModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  setSelectedHour: (hour: number) => void;
  setSelectedMinute: (minute: number) => void;
}

export default function TimeModal({
  visible,
  setVisible,
  setSelectedHour,
  setSelectedMinute,
}: TimeModalProps) {
  const minHour = 0,
    maxHour = 23,
    stepHour = 1,
    minMinute = 0,
    maxMinute = 59,
    stepMinute = 1;

  const [editHour, setEditHour] = useState(0);
  const [editMinute, setEditMinute] = useState(0);

  const saveTime = () => {
    setSelectedHour(editHour);
    setSelectedMinute(editMinute);
  };

  return (
    <AppModal
      visible={visible}
      setVisible={setVisible}
      isBottom={true}
      headingVariant="h3"
      headingText="Select Time"
    >
      <CustomTimeSelection
        selectedHour={editHour}
        selectedMinute={editMinute}
        setSelectedHour={setEditHour}
        setSelectedMinute={setEditMinute}
        maxHour={maxHour}
        minHour={minHour}
        stepHour={stepHour}
        minMinute={minMinute}
        maxMinute={maxMinute}
        stepMinute={stepMinute}
        padStart={2}
        includeHeading={false}
        containerStyle={{ marginVertical: spaces.sm }}
      />
      <Button
        text="Save Time"
        onPress={saveTime}
        invertColors
        style={{ marginBottom: spaces.md }}
      />
    </AppModal>
  );
}

const styles = StyleSheet.create({
  headingContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  subContainer: {
    rowGap: spaces.xs,
    marginTop: spaces.xs,
  },
  checkboxContainer: {
    height: 165,
    borderWidth: 1,
    borderColor: colors.gray[200],
    borderRadius: borderRadius.sm,
  },
});
