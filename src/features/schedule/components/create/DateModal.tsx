import AppModal from "@/src/shared/components/AppModal";
import { Calendar } from "react-native-calendars";
import { fontWeight, colors, spaces } from "@/src/theme";
import Button from "@/src/shared/components/Button";
import dayjs from "dayjs";
import { useState } from "react";

interface DateModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  selectedDate: Date;
  saveDate: (date: Date) => void;
}

export default function DateModal({
  visible,
  setVisible,
  selectedDate,
  saveDate,
}: DateModalProps) {
  const [currentDate, setCurrentDate] = useState<Date>(selectedDate);
  const todayKey = dayjs().format("YYYY-MM-DD");
  const currentDateKey = dayjs(currentDate).format("YYYY-MM-DD");
  const maxDateKey = dayjs().add(30, "day").format("YYYY-MM-DD");

  return (
    <AppModal
      visible={visible}
      setVisible={setVisible}
      isBottom={true}
      headingText="Select Date"
    >
      <Calendar
        theme={{
          backgroundColor: "#ffffff",
          calendarBackground: "#ffffff",
          textSectionTitleColor: "#b6c1cd",
          textSectionTitleDisabledColor: "#d9e1e8",
          selectedDayBackgroundColor: colors.primary[500],
          selectedDayTextColor: "#ffffff",
          todayTextColor: colors.text,
          dayTextColor: colors.text,
          textDisabledColor: "#d9e1e8",
          dotColor: colors.primary[500],
          selectedDotColor: "#ffffff",
          arrowColor: colors.primary[500],
          disabledArrowColor: "#d9e1e8",
          monthTextColor: colors.primary[500],
          indicatorColor: colors.primary[500],
          textDayFontFamily: fontWeight[400],
          textMonthFontFamily: fontWeight[500],
          textDayHeaderFontFamily: fontWeight[400],
        }}
        onDayPress={(day) => setCurrentDate(dayjs(day.dateString).toDate())}
        markedDates={{
          [currentDateKey]: {
            customStyles: {
              text: { color: colors.primary[500] },
            },
          },
        }}
        markingType="custom"
        minDate={todayKey}
        maxDate={maxDateKey}
      />
      <Button
        text="Save Date"
        onPress={() => saveDate(currentDate)}
        invertColors
        style={{ marginVertical: spaces.sm }}
      />
    </AppModal>
  );
}
