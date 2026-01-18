import { FlatList, View } from "react-native";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import {
  daysGenerator,
  isDayScheduled,
  LIST_SEPARATOR,
} from "@/src/features/schedule/utils/daysHelper";
import CalendarDay from "@/src/features/schedule/components/CalendarDay";

interface DayItem {
  key: number;
  day: dayjs.Dayjs;
}

interface CalendarDaysProps {
  currentDay: dayjs.Dayjs;
  setCurrentDay: (day: dayjs.Dayjs) => void;
  allSchedules: Set<string>;
}

export default function CalendarDays({
  currentDay,
  setCurrentDay,
  allSchedules,
}: CalendarDaysProps) {
  const [daysItems, setDaysItems] = useState<DayItem[]>([]);

  // Scroll to index
  const listRef = useRef<FlatList<DayItem>>(null);

  useEffect(() => {
    if (currentDay && daysItems.length > 0) {
      const index = daysItems.findIndex((item) =>
        item.day.isSame(currentDay, "day"),
      );
      listRef.current?.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0.5,
      });
    }
  }, [currentDay]);

  // Render the items
  const renderItem = ({ item }: { item: DayItem }) => {
    const today = dayjs().startOf("day");
    const isCurrentDay = item.day.isSame(currentDay);
    const isDisabled = item.day.isBefore(today);
    const hasSchedules = !isDisabled && isDayScheduled(item.day, allSchedules);

    return (
      <CalendarDay
        day={item.day}
        onPress={() => setCurrentDay(item.day)}
        isCurrent={isCurrentDay}
        isDisabled={isDisabled}
        hasSchedules={hasSchedules}
      />
    );
  };

  // Generate the list of days
  useEffect(() => {
    const days = daysGenerator();

    setDaysItems(
      days.map((day, idx) => ({
        key: idx,
        day,
      })),
    );
  }, []);

  return (
    <FlatList
      horizontal={true}
      data={daysItems}
      renderItem={renderItem}
      style={{ flexGrow: 0 }}
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View style={{ width: LIST_SEPARATOR }} />}
      ref={listRef}
    ></FlatList>
  );
}
