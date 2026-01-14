import { View } from "react-native";
import ChipOptions, { ChipOption } from "@/src/shared/components/ChipOptions";
import { useEffect, useMemo, useState } from "react";
import { Heading } from "@/src/shared/ui/Heading";
import { spaces } from "@/src/theme";
import CustomTimeSelection from "@/src/features/timeout/components/CustomTimeSelection";
import Button from "@/src/shared/components/Button";
import { useLocalSearchParams } from "expo-router";
import { api } from "@/src/api/api";
import {
  getTimeout,
  HHMMSSToHoursMinutes,
  minutesToHHMMSS,
} from "@/src/features/timeout/utils/timeoutUtils";

const TIMEOUT_OPTIONS = [15, 30, 45, 60, 90, 120, 150, 180]; // in minutes

interface TimeoutOptionsProp {
  initialTimeout: string | null;
  onConfirm?: () => void;
}

export default function TimeoutOptions({
  initialTimeout,
  onConfirm,
}: TimeoutOptionsProp) {
  const timeoutOptions = useMemo<ChipOption[]>(
    () => [
      ...TIMEOUT_OPTIONS.map(getTimeout),
      { id: "custom", text: "Custom" },
    ],
    [],
  );
  const [selectedOption, setSelectedOption] = useState(timeoutOptions[0]);
  const isCustomSelected = selectedOption.id === "custom";
  const [selectedCustomHour, setSelectedCustomHour] = useState(0);
  const [selectedCustomMinute, setSelectedCustomMinute] = useState(0);

  const initialTotalMinutes: number | null = useMemo(() => {
    if (!initialTimeout) return null;

    const { hours, minutes } = HHMMSSToHoursMinutes(initialTimeout);
    return hours * 60 + minutes;
  }, [initialTimeout]);

  const { plugId } = useLocalSearchParams<{
    plugId: string;
  }>();

  // Set the initial timeout
  useEffect(() => {
    if (initialTimeout && initialTotalMinutes) {
      if (TIMEOUT_OPTIONS.includes(initialTotalMinutes)) {
        setSelectedOption({
          id: String(initialTotalMinutes),
          text: String(getTimeout(initialTotalMinutes)),
        });
      } else {
        const { hours, minutes } = HHMMSSToHoursMinutes(initialTimeout);
        setSelectedOption({ id: "custom", text: "Custom" });
        setSelectedCustomHour(hours);
        setSelectedCustomMinute(minutes);
      }
    }
  }, [initialTimeout]);

  // Detect when the custom button is selected
  const handleSelectedOption = (item: ChipOption) => {
    setSelectedOption(item);

    if (item.id === "custom") {
      if (initialTimeout) {
        const { hours, minutes } = HHMMSSToHoursMinutes(initialTimeout);
        setSelectedCustomHour(hours);
        setSelectedCustomMinute(minutes);
      } else {
        setSelectedCustomHour(0);
        setSelectedCustomMinute(0);
      }
    }
  };

  // Set the timeout
  const sendTimeout = async () => {
    try {
      const totalMinutes = isCustomSelected
        ? selectedCustomHour * 60 + selectedCustomMinute
        : Number(selectedOption.id);

      if (totalMinutes <= 0) return;

      const timeout = minutesToHHMMSS(totalMinutes);

      await api.post("plugs/timeout", { plugId, timeout });
      if (onConfirm) {
        onConfirm();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Decide whether to disable the button or not
  const currentTotalMinutes = isCustomSelected
    ? selectedCustomHour * 60 + selectedCustomMinute
    : Number(selectedOption.id);
  const isUnchanged =
    initialTotalMinutes !== null && initialTotalMinutes === currentTotalMinutes;

  return (
    <View style={{ marginTop: spaces.md, rowGap: spaces.md }}>
      <View style={{ rowGap: spaces.sm }}>
        <Heading variant="h3">Options</Heading>
        <ChipOptions
          options={timeoutOptions}
          selectedOption={selectedOption}
          setSelectedOption={handleSelectedOption}
        />
      </View>
      {isCustomSelected && (
        <CustomTimeSelection
          selectedHour={selectedCustomHour}
          selectedMinute={selectedCustomMinute}
          setSelectedHour={setSelectedCustomHour}
          setSelectedMinute={setSelectedCustomMinute}
        />
      )}
      <Button
        text="Confirm Timeout"
        onPress={sendTimeout}
        style={{ marginTop: spaces.md }}
        invertColors
        disabled={isUnchanged}
      ></Button>
    </View>
  );
}
