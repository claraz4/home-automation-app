import { View } from "react-native";
import { Heading } from "@/src/shared/ui/Heading";
import TemperatureCondition from "@/src/features/automation/components/create/TemperatureCondition";
import SourceCondition from "@/src/features/automation/components/create/SourceCondition";
import { spaces } from "@/src/theme";
import AddCondition from "@/src/features/automation/components/create/AddCondition";

interface PolicyConditionsProps {
  powerSourceId?: number | null;
  tempLessThan?: number | null;
  tempGreaterThan?: number | null;
  editPolicy: (
    powerSourceId?: number | null,
    tempGreaterThan?: number | null,
    tempLessThan?: number | null,
  ) => void;
}

export default function PolicyConditions({
  powerSourceId = null,
  tempGreaterThan = null,
  tempLessThan = null,
  editPolicy,
}: PolicyConditionsProps) {
  return (
    <View style={{ rowGap: spaces.xs }}>
      <Heading variant="h3">Conditions</Heading>
      <View style={{ rowGap: spaces.sm }}>
        {powerSourceId && (
          <SourceCondition
            powerSourceId={powerSourceId}
            editPolicy={editPolicy}
          />
        )}
        {(tempLessThan || tempGreaterThan) && (
          <TemperatureCondition
            tempLessThan={tempLessThan}
            tempGreaterThan={tempGreaterThan}
            editPolicy={editPolicy}
          />
        )}
        <AddCondition editPolicy={editPolicy} />
      </View>
    </View>
  );
}
