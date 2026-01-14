import { Platform, View } from "react-native";
import { Heading } from "@/src/shared/ui/Heading";
import TimeSelectorIOS from "@/src/features/timeout/components/TimeSelectorIOS";
import TimeSelectorAndroid from "@/src/features/timeout/components/TimeSelectorAndroid";
import { spaces } from "@/src/theme";
import { Dispatch, SetStateAction } from "react";

interface CustomTimeSelectionProps {
  selectedHour: number;
  selectedMinute: number;
  setSelectedHour: Dispatch<SetStateAction<number>>;
  setSelectedMinute: Dispatch<SetStateAction<number>>;
}

export default function CustomTimeSelection({
  selectedHour,
  setSelectedMinute,
  selectedMinute,
  setSelectedHour,
}: CustomTimeSelectionProps) {
  const minHour = 0,
    maxHour = 12,
    stepHour = 1,
    minMinute = 0,
    maxMinute = 59,
    stepMinute = 5;

  return (
    <View>
      <Heading variant="h3" style={{ marginBottom: spaces.sm }}>
        Custom Time
      </Heading>
      {Platform.OS === "ios" ? (
        <TimeSelectorIOS
          maxHourValue={maxHour}
          minHourValue={minHour}
          maxMinuteValue={maxMinute}
          minMinuteValue={minMinute}
          stepHour={stepHour}
          stepMinute={stepMinute}
          selectedHour={selectedHour}
          selectedMinute={selectedMinute}
          onSelectedHourChange={setSelectedHour}
          onSelectedMinuteChange={setSelectedMinute}
        />
      ) : (
        <TimeSelectorAndroid
          maxHourValue={maxHour}
          minHourValue={minHour}
          maxMinuteValue={maxMinute}
          minMinuteValue={minMinute}
          stepHour={stepHour}
          stepMinute={stepMinute}
          selectedHour={selectedHour}
          selectedMinute={selectedMinute}
          onSelectedHourChange={setSelectedHour}
          onSelectedMinuteChange={setSelectedMinute}
        />
      )}
    </View>
  );
}
