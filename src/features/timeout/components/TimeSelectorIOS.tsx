import TimeSelectorProps from "@/src/features/timeout/types/TimeSelectorProps";
import AppPicker, { AppPickerItem } from "@/src/shared/components/AppPicker";
import { StyleSheet, View } from "react-native";
import { spaces } from "@/src/theme";

function getTimeArray(
  min: number,
  max: number,
  step: number = 1,
): AppPickerItem<number>[] {
  const timeArray: AppPickerItem<number>[] = [];
  for (let i = min; i <= max; i += step) {
    timeArray.push({ label: String(i), value: i });
  }

  return timeArray;
}

export default function TimeSelectorIOS({
  maxHourValue,
  minHourValue,
  minMinuteValue,
  maxMinuteValue,
  stepHour,
  stepMinute,
  selectedHour,
  selectedMinute,
  onSelectedMinuteChange,
  onSelectedHourChange,
}: TimeSelectorProps) {
  const hours = getTimeArray(minHourValue, maxHourValue, stepHour);
  const minutes = getTimeArray(minMinuteValue, maxMinuteValue, stepMinute);

  return (
    <View style={styles.container}>
      <AppPicker
        items={hours}
        selectedValue={selectedHour}
        onSelectedValueChange={(value: number) => onSelectedHourChange(value)}
        title="Hours"
      />
      <AppPicker
        items={minutes}
        selectedValue={selectedMinute}
        onSelectedValueChange={(value: number) => onSelectedMinuteChange(value)}
        title="Minutes"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    columnGap: spaces.xxl,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -spaces.sm,
  },
});
