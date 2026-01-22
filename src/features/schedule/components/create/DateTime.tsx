import { StyleSheet, View } from "react-native";
import { Heading } from "@/src/shared/ui/Heading";
import FeatureRow from "@/src/shared/components/FeatureRow";
import { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { spaces, colors } from "@/src/theme";
import TimeModal from "@/src/features/schedule/components/create/TimeModal";
import DateModal from "@/src/features/schedule/components/create/DateModal";
import dayjs from "dayjs";

interface DateTimeProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  selectedHour: number;
  setSelectedHour: (hour: number) => void;
  selectedMinute: number;
  setSelectedMinute: (minute: number) => void;
}

export default function DateTime({
  selectedDate,
  setSelectedDate,
  selectedHour,
  setSelectedHour,
  selectedMinute,
  setSelectedMinute,
}: DateTimeProps) {
  const [isDateClicked, setIsDateClicked] = useState(false);
  const [isTimeClicked, setIsTimeClicked] = useState(false);

  const dayjsDate = dayjs(selectedDate);
  const formattedDate = `${dayjsDate.format("dddd")}, ${dayjsDate.format("MMMM")} ${dayjsDate.format("D")}`;

  // Save time
  const saveTime = (editHour: number, editMinute: number) => {
    setSelectedHour(editHour);
    setSelectedMinute(editMinute);
    setIsTimeClicked(false);
  };

  // Save date
  const saveDate = (editDate: Date) => {
    setSelectedDate(editDate);
    setIsDateClicked(false);
  };

  return (
    <View style={{ rowGap: spaces.sm }}>
      <Heading variant="h3">Date & Time</Heading>
      <View>
        <FeatureRow
          headingText={formattedDate}
          hasStatus={false}
          hasExtra={true}
          setIsExtraClicked={setIsDateClicked}
          hasIcon={true}
          icon={<MaterialIcons name="calendar-month" size={24} color="white" />}
          containerStyles={styles.borderBottom}
        />
        <FeatureRow
          headingText={`${String(selectedHour).padStart(2, "0")}:${String(selectedMinute).padStart(2, "0")}`}
          hasStatus={false}
          hasExtra={true}
          setIsExtraClicked={setIsTimeClicked}
          hasIcon={true}
          icon={
            <MaterialIcons name="access-time-filled" size={24} color="white" />
          }
          containerStyles={styles.borderTop}
        />
        <TimeModal
          visible={isTimeClicked}
          setVisible={setIsTimeClicked}
          hour={selectedHour}
          minute={selectedMinute}
          saveTime={saveTime}
        />
        <DateModal
          visible={isDateClicked}
          setVisible={setIsDateClicked}
          selectedDate={selectedDate}
          saveDate={saveDate}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  borderTop: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  borderBottom: {
    borderBottomColor: colors.gray[200],
    borderBottomWidth: 1,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
});
