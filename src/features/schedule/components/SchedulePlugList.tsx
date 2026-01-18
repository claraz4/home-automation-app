import { View } from "react-native";
import { Heading } from "@/src/shared/ui/Heading";
import PlugBox from "@/src/features/rooms/components/PlugBox";
import { BasePlug } from "@/src/shared/types/BasePlug";
import { spaces } from "@/src/theme";
import { AppText } from "@/src/shared/ui/AppText";

interface SchedulePlugListProps {
  plugList: BasePlug[];
  editPlugState: (plug: BasePlug, newState: boolean) => void;
  isOn?: boolean;
}

export default function SchedulePlugList({
  plugList,
  editPlugState,
  isOn = true,
}: SchedulePlugListProps) {
  return (
    <View style={{ rowGap: spaces.xs }}>
      <Heading variant="h3">{isOn ? "Turns ON" : "Turns OFF"}</Heading>
      <View style={{ rowGap: spaces.sm }}>
        {plugList.length !== 0 ? (
          plugList.map((plug) => (
            <PlugBox
              key={plug.id}
              plug={plug}
              hasSwitch
              hasExtra={false}
              hasStatus={true}
              status={isOn}
              setStatus={() => editPlugState(plug, !isOn)}
            />
          ))
        ) : (
          <AppText variant="bodySecondary">
            No plugs turn off in this schedule.
          </AppText>
        )}
      </View>
    </View>
  );
}
