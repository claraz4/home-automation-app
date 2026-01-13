import { Dispatch, SetStateAction } from "react";

export default interface TimeSelectorProps {
  selectedHour: number;
  selectedMinute: number;
  onSelectedHourChange: Dispatch<SetStateAction<number>>;
  onSelectedMinuteChange: Dispatch<SetStateAction<number>>;
}
