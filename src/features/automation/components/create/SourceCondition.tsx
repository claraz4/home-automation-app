import { View } from "react-native";
import { conditionStyles } from "@/src/features/automation/styles/conditionStyles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import AppDropdown from "@/src/shared/components/AppDropdown";
import ConditionHeader from "@/src/features/automation/components/create/ConditionHeader";
import { SourceDTO } from "@/src/features/automation/types/SourceDTO";
import { api } from "@/src/api/api";
import { DropdownOption } from "@/src/shared/types/DropdownOption";

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
  const [selectedSource, setSelectedSource] = useState<DropdownOption[] | null>(
    null,
  );

  // Get power sources
  const getPowerSources = async () => {
    try {
      const res = await api.get<{ sources: SourceDTO[] }>("/mains/sources");
      const { sources: sourcesData } = res.data;
      setSources(sourcesData);
      setSelectedSource([
        { value: sourcesData[0].id + "", label: sourcesData[0].name },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    void getPowerSources();
  }, []);

  // Change the current power source id
  useEffect(() => {
    if (selectedSource) {
      editPolicy(Number(selectedSource[0].value));
    }
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
          value: source.id + "",
          label: source.name,
        }))}
        selectedOptions={selectedSource}
        setSelectedOptions={setSelectedSource}
        hasDefault={false}
        hasSingleValue={true}
      />
    </View>
  );
}
