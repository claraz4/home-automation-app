import { StyleSheet } from "react-native";
import { Heading } from "@/src/shared/ui/Heading";
import ScreenView from "@/src/shared/ui/ScreenView";
import React from "react";
import { paddings, spaces } from "@/src/theme";
import ProgressList from "@/src/shared/components/ProgressList";
import SourceBarChart from "@/src/features/analytics/components/consumption/SourceBarChart";
import AllConsumption from "@/src/features/analytics/components/consumption/AllConsumption";

export default function Consumption() {
  return (
    <ScreenView style={styles.container}>
      <Heading variant="h2" hasBackButton={true}>
        Consumption
      </Heading>
      <ProgressList
        data={[
          { label: "Main Grid (EDL)", value: 64 },
          { label: "Private Generator", value: 28 },
          { label: "Solar Power", value: 8 },
        ]}
      />
      <SourceBarChart />
      <AllConsumption />
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: paddings.page,
    rowGap: spaces.md,
  },
});
