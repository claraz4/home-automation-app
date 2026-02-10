import { StyleSheet, Dimensions, Pressable } from "react-native";
import dayjs from "dayjs";
import { Heading } from "@/src/shared/ui/Heading";
import { AppText } from "@/src/shared/ui/AppText";
import { borderRadius, paddings, spaces, colors } from "@/src/theme";
import {
  DAYS_PER_VIEW,
  LIST_SEPARATOR,
} from "@/src/features/schedule/utils/daysHelper";

const SCREEN_WIDTH = Dimensions.get("window").width;
const USABLE_WIDTH =
  SCREEN_WIDTH - paddings.page * 2 - LIST_SEPARATOR * DAYS_PER_VIEW;
const ITEM_WIDTH_PX = USABLE_WIDTH / DAYS_PER_VIEW;

export interface CalendarDayProps {
  day: dayjs.Dayjs;
  onPress: () => void;
  isDisabled: boolean;
  isCurrent: boolean;
  hasSchedules: boolean;
}

export default function CalendarDay({
  day,
  onPress,
  isDisabled,
  isCurrent,
  hasSchedules = false,
}: CalendarDayProps) {
  let backgroundColor;
  let color;

  if (isDisabled) {
    backgroundColor = "transparent";
    color = colors.gray[700];
  } else if (!isCurrent) {
    backgroundColor = "white";
    color = colors.text;
  } else {
    backgroundColor = colors.primary[500];
    color = "white";
  }

  return (
    <Pressable
      onPress={!isDisabled ? onPress : () => {}}
      style={[
        styles.container,
        { backgroundColor },
        hasSchedules &&
          !isCurrent &&
          !isDisabled && {
            borderColor: colors.primary[400],
            borderWidth: 0.9 * spaces.xxxs,
          },
      ]}
    >
      <Heading variant="h4" style={{ color }}>
        {day.date()}
      </Heading>
      <AppText style={{ color }}> {day.format("ddd")}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.sm,
    width: ITEM_WIDTH_PX,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: spaces.xs,
  },
});
