import { StyleSheet, View } from "react-native";
import { Heading } from "@/src/shared/ui/Heading";
import { AppText } from "@/src/shared/ui/AppText";
import PlugBox from "@/src/features/rooms/components/PlugBox";
import { spaces } from "@/src/theme";
import { SmallBasePlug } from "@/src/features/schedule/types/SmallBasePlug";

interface PlugsStateScheduleProps {
  isOn: boolean;
  plugs: SmallBasePlug[];
  removePlug: (plug: SmallBasePlug) => void;
}

export default function PlugsStateSchedule({
  isOn,
  plugs,
  removePlug,
}: PlugsStateScheduleProps) {
  return (
    <View style={{ rowGap: spaces.md }}>
      <View>
        <Heading variant="h3">Plugs {isOn ? "ON" : "OFF"}</Heading>
        <AppText variant="bodySecondary">
          Turns {isOn ? "on" : "off"} for this schedule
        </AppText>
      </View>
      <View style={{ rowGap: spaces.xs }}>
        {plugs.map((plug) => {
          return (
            <PlugBox
              key={plug.id}
              plug={plug}
              hasStatus={false}
              hasExtra={false}
              hasSwitch={false}
              onRemove={() => removePlug(plug)}
              iconSize={20}
              containerStyles={{ padding: spaces.xs + spaces.xxxs }}
            />
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
