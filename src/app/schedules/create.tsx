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
  const [selectedHour, setSelectedHour] = useState<number>(0);
  const [selectedMinute, setSelectedMinute] = useState<number>(0);
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());

  // Remove a plug from the list
  const removePlug = (id: number, isOn: boolean) => {
    if (isOn) {
      setOnPlugs((prevState) => prevState.filter((p) => p.id !== id));
    } else {
      setOffPlugs((prevState) => prevState.filter((p) => p.id !== id));
    }
  };

  // Extract plugs ids from object
  const extractIds = (plugs: SmallBasePlug[]) => {
    return plugs.map((plug) => plug.id);
  };

  // Create a new schedule
  const createSchedule = async () => {
    try {
      const jsDate = dayjs(selectedDay)
        .hour(selectedHour)
        .minute(selectedMinute)
        .toDate();

      if (onPlugs.length === 0 && offPlugs.length === 0) {
        throw new Error("ERROR: A schedule needs at least one plug");
      }

      await api.post("/schedules", {
        name: scheduleName,
        time: jsDate,
        onPlugIds: extractIds(onPlugs),
        offPlugIds: extractIds(offPlugs),
        isActive: true,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScreenView style={{ padding: paddings.page }}>
      <Heading variant="h2" hasBackButton={true}>
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
          selectedDate={selectedDay}
          setSelectedDate={setSelectedDay}
          selectedHour={selectedHour}
          setSelectedHour={setSelectedHour}
          selectedMinute={selectedMinute}
          setSelectedMinute={setSelectedMinute}
        />
        <View style={{ rowGap: spaces.sm }}>
          <PlugsStateSchedule
            isOn={true}
            plugs={onPlugs}
            removePlug={(plug: SmallBasePlug) => removePlug(plug.id, true)}
          />
          <PlugsStateSchedule
            isOn={false}
            plugs={offPlugs}
            removePlug={(plug: SmallBasePlug) => removePlug(plug.id, false)}
          />
          <Button
            text="+ Add Plugs"
            onPress={() => setShowAddPlug(true)}
            textStyle={{ fontFamily: fontWeight[600] }}
          />
        </View>
        <Button
          text="Create Shedule"
          onPress={createSchedule}
          invertColors
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
