import { StyleSheet, View } from "react-native";
import { Heading } from "@/src/shared/ui/Heading";
import FeatureRow from "@/src/shared/components/FeatureRow";
import { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { spaces, colors, paddings } from "@/src/theme";
import TimeModal from "@/src/features/schedule/components/create/TimeModal";
import DateModal from "@/src/features/schedule/components/create/DateModal";
import { useScheduleDateEdit } from "@/src/features/schedule/hooks/useScheduleDateEdit";

export default function DateTimeScreen() {
  const { date, mode, setDate } = useScheduleDateEdit();
  const hour = date ? date.hour() : 0;
  const minute = date ? date.minute() : 0;
  const [isDateClicked, setIsDateClicked] = useState(false);
  const [isTimeClicked, setIsTimeClicked] = useState(false);
  let formattedDate = "";

  if (date) {
    formattedDate = `${date.format("dddd")}, ${date.format(
      "MMMM",
    )} ${date.format("D")}`;
  }

  // Save date and time
  const saveTime = (h: number, m: number) => {
    if (date) {
      const updatedDate = date.hour(h).minute(m);
      setDate(updatedDate);
      setIsTimeClicked(false);
    }
  };

  const saveDate = (d: Date) => {
    if (date) {
      const updatedDate = date
        .year(d.getFullYear())
        .month(d.getMonth())
        .date(d.getDate());
      setDate(updatedDate);
      setIsDateClicked(false);
    }
  };

  return (
    <View style={{ rowGap: spaces.md, padding: paddings.page }}>
      <Heading variant="h3" hasBackButton>
        {mode === "edit" ? "Edit Date & Time" : "Choose Date & Time"}
      </Heading>

      <View>
        <FeatureRow
          headingText={formattedDate}
          hasExtra
          setIsExtraClicked={setIsDateClicked}
          hasIcon
          hasStatus={false}
          icon={<MaterialIcons name="calendar-month" size={24} color="white" />}
          containerStyles={styles.borderBottom}
        />
        <FeatureRow
          headingText={`${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`}
          hasExtra
          setIsExtraClicked={setIsTimeClicked}
          hasIcon
          hasStatus={false}
          icon={
            <MaterialIcons name="access-time-filled" size={24} color="white" />
          }
          containerStyles={styles.borderTop}
        />
      </View>

      <TimeModal
        visible={isTimeClicked}
        setVisible={setIsTimeClicked}
        hour={hour}
        minute={minute}
        saveTime={saveTime}
      />
      <DateModal
        visible={isDateClicked}
        setVisible={setIsDateClicked}
        selectedDate={date?.toDate() || new Date()}
        saveDate={saveDate}
      />
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
