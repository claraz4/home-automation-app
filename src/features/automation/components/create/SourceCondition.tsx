import { View } from "react-native";
import { conditionStyles } from "@/src/features/automation/styles/conditionStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import { TSelectedItem } from "react-native-input-select/src/types/index.types";
import AppDropdown from "@/src/shared/components/AppDropdown";
import ConditionHeader from "@/src/features/automation/components/create/ConditionHeader";
import { SourceDTO } from "@/src/features/automation/types/SourceDTO";
import { api } from "@/src/api/api";

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
  const [sources, setSources] = useState<SourceDTO[]>([]);
  const [selectedSource, setSelectedSource] = useState<
    TSelectedItem | TSelectedItem[] | null
  >(powerSourceId);

  // Get power sources
  const getPowerSources = async () => {
    try {
      const res = await api.get<{ sources: SourceDTO[] }>("/mains/sources");
      setSources(res.data.sources);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    void getPowerSources();
  }, []);

  // Set a default source value
  useEffect(() => {
    if (sources.length !== 0 && selectedSource === null) {
      setSelectedSource(sources[0].id);
    }
  }, [sources]);

  // Change the current power source id
  useEffect(() => {
    editPolicy(Number(selectedSource));
  }, [selectedSource]);

  if (sources.length === 0 && selectedSource === null) {
    return;
  }

  return (
    <View style={conditionStyles.container}>
      <ConditionHeader
        title="Source"
        icon={<Ionicons name="flash" size={20} color="white" />}
        onDelete={() => editPolicy(null)}
      />
      <AppDropdown
        options={sources.map((source) => ({
          value: source.id,
          label: source.name,
        }))}
        setOptions={setSelectedSource}
        selectedOption={selectedSource as TSelectedItem}
        dropdownStyle={{ width: 220 }}
        dropdownContainerStyle={{ width: 220, flex: 0 }}
      />
    </View>
  );
}
