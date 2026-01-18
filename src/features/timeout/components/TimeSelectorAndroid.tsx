import { StyleSheet, View } from "react-native";
import TimeSelectorProps from "@/src/features/timeout/types/TimeSelectorProps";
import Stepper from "@/src/shared/components/Stepper";
import { spaces } from "@/src/theme";

export default function TimeSelectorAndroid({
  maxHourValue,
  minHourValue,
  maxMinuteValue,
  minMinuteValue,
  stepHour,
  stepMinute,
  selectedHour,
  selectedMinute,
  onSelectedMinuteChange,
  onSelectedHourChange,
  padStart = 1,
}: TimeSelectorProps) {
  return (
    <View style={styles.container}>
      <Stepper
        max={maxHourValue}
        min={minHourValue}
        step={stepHour}
        current={selectedHour}
        setCurrent={onSelectedHourChange}
        title="Hours"
        padStart={padStart}
      />
      <Stepper
        max={maxMinuteValue}
        min={minMinuteValue}
        step={stepMinute}
        current={selectedMinute}
        setCurrent={onSelectedMinuteChange}
        title="Minutes"
        padStart={padStart}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: spaces.xxxl + spaces.sm,
  },
});
