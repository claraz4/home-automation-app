import { Picker } from "@react-native-picker/picker";
import TimeSelectorProps from "@/src/features/timeout/types/TimeSelectorProps";

interface TimeSelectorIOSProps extends TimeSelectorProps {}

export default function TimeSelectorIOS({
  selectedHour,
  selectedMinute,
  onSelectedMinuteChange,
  onSelectedHourChange,
}: TimeSelectorIOSProps) {
  return (
    <Picker>
      <Picker.Item label="Java" value="java" />
      <Picker.Item label="JavaScript" value="js" />
    </Picker>
  );
}
