import { StyleSheet } from "react-native";
import { borderRadius, colors, spaces } from "@/src/theme";
import AppModal from "@/src/shared/components/AppModal";
import { useState } from "react";
import CustomTimeSelection from "@/src/features/timeout/components/CustomTimeSelection";
import Button from "@/src/shared/components/Button";

interface TimeModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  hour: number;
  minute: number;
  saveTime: (hour: number, minute: number) => void;
}

export default function TimeModal({
  visible,
  setVisible,
  hour,
  minute,
  saveTime,
}: TimeModalProps) {
  const minHour = 0,
    maxHour = 23,
    stepHour = 1,
    minMinute = 0,
    maxMinute = 59,
    stepMinute = 1;

  const [editHour, setEditHour] = useState(hour);
  const [editMinute, setEditMinute] = useState(minute);

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
        onPress={() => saveTime(editHour, editMinute)}
        invertColors
        style={{ marginBottom: spaces.md }}
      />
    </AppModal>
  );
}
