import React, { useCallback, useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import ScreenView from "@/src/shared/ui/ScreenView";
import { Heading } from "@/src/shared/ui/Heading";
import { paddings, spaces } from "@/src/theme";
import CalendarDays from "@/src/features/schedule/components/CalendarDays";
import dayjs from "dayjs";
import { DaySchedulesDTO } from "@/src/features/schedule/types/DaySchedulesDTO";
import DaySchedule from "@/src/features/schedule/components/DaySchedule";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import useSchedules from "@/src/features/schedule/hooks/useSchedules";
import AddButton from "@/src/shared/components/AddButton";
import AppSingleFilter from "@/src/shared/components/AppSingleFilter";
import { DropdownOption } from "@/src/shared/types/DropdownOption";
import usePlugs from "@/src/hooks/usePlugs";
import AppActivityIndicator from "@/src/shared/ui/AppActivityIndicator";
import StatusBox from "@/src/shared/components/StatusBox";

export default function Schedules() {
  const [currentDay, setCurrentDay] = useState<dayjs.Dayjs>(
    dayjs().startOf("day"),
  );
  const [scheduledDays, setScheduledDays] = useState<string[]>([]);
  const [currentDaySchedules, setCurrentDaySchedules] =
    useState<DaySchedulesDTO | null>(null);
  const [selectedPlugs, setSelectedPlugs] = useState<DropdownOption[] | null>(
    null,
  );

  const { getScheduledDays, getCurrentDaySchedules } = useSchedules();
  const { allPlugs, getAllPlugs } = usePlugs();
  const { plugId, plugName } = useLocalSearchParams<{
    plugId?: string;
    plugName?: string;
  }>();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Add the plugId if found in the params
  useEffect(() => {
    if (plugId && plugName) {
      setSelectedPlugs([{ label: plugName, value: plugId }]);
    }
  }, [plugId]);

  // Derive the plugIds array
  const plugIds = useMemo<number[] | undefined>(() => {
    if (!selectedPlugs || selectedPlugs.some((p) => p.value === "All")) {
      return undefined;
    }

    return selectedPlugs.map((p) => Number(p.value));
  }, [selectedPlugs]);

  // Get all days with  schedules
  const fetchScheduledDays = useCallback(async () => {
    const res = await getScheduledDays(plugIds);

    if (res) {
      setScheduledDays(res.data.scheduledDates);
    }
  }, [getScheduledDays, plugIds]);

  // Get all the schedules of the selected day
  const fetchDaySchedules = useCallback(async () => {
    setLoading(true);
    const currentDayFormatted = currentDay.format("YYYY-MM-DD");

    try {
      const res = await getCurrentDaySchedules(currentDayFormatted, plugIds);
      setCurrentDaySchedules(res.data);
    } catch (error) {
      setError("An error occurred while fetching plugs.");
    } finally {
      setLoading(false);
    }
  }, [currentDay, plugIds, getCurrentDaySchedules]);

  // Fetch all plugs
  useEffect(() => {
    void getAllPlugs();
  }, [getAllPlugs]);

  // Refresh scheduled days on focus
  useFocusEffect(
    useCallback(() => {
      void fetchScheduledDays();
    }, [fetchScheduledDays]),
  );

  // Fetch schedules reactively
  useEffect(() => {
    setCurrentDaySchedules(null);
    void fetchDaySchedules();
  }, [currentDay, plugIds]);

  return (
    <ScreenView style={styles.container}>
      <Heading
        variant="h2"
        hasBackButton={true}
        hasCustomLinkComponent={true}
        customLinkComponent={
          <AddButton onPress={() => router.push("/schedules/create")} />
        }
      >
        Schedules
      </Heading>
      <CalendarDays
        currentDay={currentDay}
        setCurrentDay={setCurrentDay}
        allSchedules={scheduledDays}
      />
      <AppSingleFilter
        filterTitle="Filter Plugs"
        filterOptions={[
          { value: "All", label: "All" },
          ...allPlugs.plugs.map((plug) => ({
            value: plug.id + "",
            label: plug.name,
          })),
        ]}
        selectedOptions={selectedPlugs}
        setSelectedOptions={setSelectedPlugs}
      />

      {loading && <AppActivityIndicator />}
      {error && <StatusBox message={error} />}

      {currentDaySchedules && (
        <DaySchedule
          currentDay={currentDay}
          schedules={currentDaySchedules.schedules}
        />
      )}
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: paddings.page,
    rowGap: spaces.lg,
  },
});
