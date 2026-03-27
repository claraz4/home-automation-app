import { StyleSheet, View } from "react-native";
import WeeklyBarChart from "@/src/shared/components/WeeklyBarChart";
import { borderRadius, colors, fontWeight, spaces } from "@/src/theme";
import { Heading } from "@/src/shared/ui/Heading";
import { useState } from "react";
import { AppText } from "@/src/shared/ui/AppText";

const data = [4, 6, 7, 8, 2];

export default function SourceBarChart() {
  const [selectedIndex, setSelectedIndex] = useState(data.length - 1);

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Heading variant="h2" style={{ color: colors.gray[700] }}>
          EDL HOURS
        </Heading>
        <View style={styles.value}>
          <Heading variant="h1" style={{ color: colors.primary[500] }}>
            {selectedIndex < data.length ? data[selectedIndex] : 0}
          </Heading>
          <AppText style={styles.unit}>
            hour
            {selectedIndex < data.length && data[selectedIndex] === 1
              ? ""
              : "s"}
          </AppText>
        </View>
      </View>
      <WeeklyBarChart
        data={data}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: spaces.md,
    borderRadius: borderRadius.md,
    rowGap: spaces.md,
  },
  unit: {
    alignSelf: "flex-end",
    color: colors.primary[300],
    fontFamily: fontWeight[400],
    fontSize: 20,
    marginBottom: spaces.xs * 0.8,
  },
  value: {
    flexDirection: "row",
    columnGap: spaces.xs,
  },
  heading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});
