import { fontWeight, spaces } from "@/src/theme";
import PlugsStateSchedule from "@/src/features/schedule/components/create/PlugsStateSchedule";
import Button from "@/src/shared/components/Button";
import { View } from "react-native";
import { BasePlug } from "@/src/shared/types/BasePlug";
import AddPlugModal from "@/src/features/schedule/components/create/AddPlugModal";
import { SmallBasePlug } from "@/src/features/schedule/types/SmallBasePlug";
import { useState } from "react";

interface SchedulePlugsListProps {
  onPlugs: BasePlug[];
  offPlugs: BasePlug[];
  updateOnPlugs: (plugs: SmallBasePlug[]) => void;
  updateOffPlugs: (plugs: SmallBasePlug[]) => void;
}

export function SchedulePlugsList({
  onPlugs,
  offPlugs,
  updateOnPlugs,
  updateOffPlugs,
}: SchedulePlugsListProps) {
  const [showAddPlug, setShowAddPlug] = useState(false);

  return (
    <View style={{ rowGap: spaces.md }}>
      <PlugsStateSchedule isOn plugs={onPlugs} setPlugs={updateOnPlugs} />
      <PlugsStateSchedule
        isOn={false}
        plugs={offPlugs}
        setPlugs={updateOffPlugs}
      />
      <Button
        text="+ Add Plugs"
        onPress={() => setShowAddPlug(true)}
        textStyle={{ fontFamily: fontWeight[600] }}
      />
      <AddPlugModal
        visible={showAddPlug}
        setVisible={setShowAddPlug}
        onPlugs={onPlugs}
        offPlugs={offPlugs}
        setOnPlugs={updateOnPlugs}
        setOffPlugs={updateOffPlugs}
      />
    </View>
  );
}
