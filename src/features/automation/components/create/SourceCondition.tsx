import { View } from "react-native";
import { conditionStyles } from "@/src/features/automation/styles/conditionStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { TSelectedItem } from "react-native-input-select/src/types/index.types";
import AppDropdown from "@/src/shared/components/AppDropdown";
import ConditionHeader from "@/src/features/automation/components/create/ConditionHeader";

interface SourceConditionProps {
  powerSourceId: number;
  editPolicy: (
    powerSourceId?: number | null,
    tempGreaterThan?: number | null,
    tempLessThan?: number | null,
  ) => void;
}

export default function SourceCondition({
  powerSourceId,
  editPolicy,
}: SourceConditionProps) {
  const sources = [
    { label: "EDL", value: "EDL" },
    { label: "Generator", value: "Generator" },
  ]; // TODO: replace the sources with the ones from the api
  const [selectedSource, setSelectedSource] = useState<
    TSelectedItem | TSelectedItem[]
  >(sources[0].value);

  return (
    <View style={conditionStyles.container}>
      <ConditionHeader
        title="Source"
        icon={<Ionicons name="flash" size={20} color="white" />}
        onDelete={() => editPolicy(null)}
      />
      <AppDropdown
        options={sources}
        setOptions={setSelectedSource}
        selectedOption={selectedSource}
        dropdownStyle={{ width: 220 }}
        dropdownContainerStyle={{ width: 220, flex: 0 }}
      />
    </View>
  );
}
