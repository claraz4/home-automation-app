import ScreenView from "@/src/shared/ui/ScreenView";
import { fontWeight, paddings, spaces } from "@/src/theme";
import { Heading } from "@/src/shared/ui/Heading";
import { StyleSheet, View } from "react-native";
import AppTextInput from "@/src/shared/components/AppTextInput";
import { useState } from "react";
import DateTime from "@/src/features/schedule/components/create/DateTime";
import PlugsStateSchedule from "@/src/features/schedule/components/create/PlugsStateSchedule";
import Button from "@/src/shared/components/Button";
import AddPlugModal from "@/src/features/schedule/components/create/AddPlugModal";
import { SmallBasePlug } from "@/src/features/schedule/types/SmallBasePlug";
import { api } from "@/src/api/api";
import dayjs from "dayjs";

export default function CreateSchedule() {
  const [scheduleName, setScheduleName] = useState("");
  const [showAddPlug, setShowAddPlug] = useState(false);

  const [onPlugs, setOnPlugs] = useState<SmallBasePlug[]>([]);
  const [offPlugs, setOffPlugs] = useState<SmallBasePlug[]>([]);

  const [dateTime, setDateTime] = useState({
    day: new Date(),
    hour: 0,
    minute: 0,
  });

  // Plug handlers
  const removeOnPlug = (id: number) =>
    setOnPlugs((prev) => prev.filter((p) => p.id !== id));

  const removeOffPlug = (id: number) =>
    setOffPlugs((prev) => prev.filter((p) => p.id !== id));

  // Create schedule
  const createSchedule = async () => {
    if (!scheduleName.trim()) return;

    if (onPlugs.length === 0 && offPlugs.length === 0) {
      console.error("A schedule needs at least one plug");
      return;
    }

    const jsDate = dayjs(dateTime.day)
      .hour(dateTime.hour)
      .minute(dateTime.minute)
      .toDate();

    try {
      await api.post("/schedules", {
        name: scheduleName,
        time: jsDate,
        onPlugIds: onPlugs.map((p) => p.id),
        offPlugIds: offPlugs.map((p) => p.id),
        isActive: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScreenView style={{ padding: paddings.page }}>
      <Heading variant="h2" hasBackButton>
        Create Schedule
      </Heading>

      <View style={styles.subContainer}>
        <AppTextInput
          label="Schedule Name"
          value={scheduleName}
          onChange={setScheduleName}
          containerStyle={{ marginTop: spaces.md }}
        />

        <DateTime
          selectedDate={dateTime.day}
          setSelectedDate={(day) => setDateTime((prev) => ({ ...prev, day }))}
          selectedHour={dateTime.hour}
          setSelectedHour={(hour) => setDateTime((prev) => ({ ...prev, hour }))}
          selectedMinute={dateTime.minute}
          setSelectedMinute={(minute) =>
            setDateTime((prev) => ({ ...prev, minute }))
          }
        />

        <View style={{ rowGap: spaces.sm }}>
          <PlugsStateSchedule
            isOn
            plugs={onPlugs}
            removePlug={(plug) => removeOnPlug(plug.id)}
          />

          <PlugsStateSchedule
            isOn={false}
            plugs={offPlugs}
            removePlug={(plug) => removeOffPlug(plug.id)}
          />

          <Button
            text="+ Add Plugs"
            onPress={() => setShowAddPlug(true)}
            textStyle={{ fontFamily: fontWeight[600] }}
          />
        </View>

        <Button
          text="Create Schedule"
          onPress={createSchedule}
          invertColors
          disabled={
            !scheduleName.trim() ||
            (onPlugs.length === 0 && offPlugs.length === 0)
          }
          textStyle={{ fontFamily: fontWeight[600] }}
        />

        <AddPlugModal
          visible={showAddPlug}
          setVisible={setShowAddPlug}
          onPlugs={onPlugs}
          offPlugs={offPlugs}
          setOnPlugs={setOnPlugs}
          setOffPlugs={setOffPlugs}
        />
      </View>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    rowGap: spaces.lg,
  },
});
