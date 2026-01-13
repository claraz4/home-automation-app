import { View, StyleSheet } from "react-native";
import ChipOptions from "@/src/shared/components/ChipOptions";
import { SetStateAction, useEffect, useState } from "react";
import { Heading } from "@/src/shared/ui/Heading";
import { spaces } from "@/src/theme";
import CustomTimeSelection from "@/src/features/timeout/components/CustomTimeSelection";

const TIMEOUT_OPTIONS = [0.25, 0.5, 0.75, 1, 1.5, 2, 2.5, 3];

function getTimeout(option: number): string {
  if (option < 1) {
    return `${option * 60} min`;
  }

  if (option === 1) {
    return `${option} hour`;
  }

  return `${option} hours`;
}

export default function TimeoutOptions() {
  const timeoutOptions: string[] = [
    ...TIMEOUT_OPTIONS.map(getTimeout),
    "Custom",
  ];
  const [selectedOption, setSelectedOption] = useState(timeoutOptions[0]);
  const [isCustomSelected, setIsCustomSelected] = useState(false);
  const [selectedCustomHour, setSelectedCustomHour] = useState(0);
  const [selectedCustomMinute, setSelectedCustomMinute] = useState(0);

  useEffect(() => {
    if (selectedOption) {
      setIsCustomSelected(selectedOption === "Custom");
    }
  }, [selectedOption]);

  return (
    <View style={{ marginTop: spaces.md, rowGap: spaces.md }}>
      <View style={{ rowGap: spaces.sm }}>
        <Heading variant="h3">Options</Heading>
        <ChipOptions
          options={timeoutOptions}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
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
    </View>
  );
}
