import { Platform, View, ViewStyle } from "react-native";
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
  maxHour: number;
  minHour: number;
  stepHour: number;
  minMinute: number;
  maxMinute: number;
  stepMinute: number;
  padStart?: number;
  includeHeading?: boolean;
  headingText?: string;
  containerStyle?: ViewStyle;
}

export default function CustomTimeSelection({
  selectedHour,
  setSelectedMinute,
  selectedMinute,
  setSelectedHour,
  minHour = 0,
  maxHour = 12,
  stepHour = 1,
  minMinute = 0,
  maxMinute = 59,
  stepMinute = 5,
  padStart,
  includeHeading = true,
  headingText = "Custom Time",
  containerStyle,
}: CustomTimeSelectionProps) {
  return (
    <View style={containerStyle}>
      {includeHeading && (
        <Heading variant="h3" style={{ marginBottom: spaces.sm }}>
          {headingText}
        </Heading>
      )}
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
          padStart={padStart}
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
          padStart={padStart}
        />
      )}
    </View>
  );
}
