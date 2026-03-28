import { StyleSheet, View } from "react-native";
import WeeklyBarChart from "@/src/shared/components/WeeklyBarChart";
import { borderRadius, colors, fontWeight, spaces } from "@/src/theme";
import { Heading } from "@/src/shared/ui/Heading";
import { useState } from "react";
import { AppText } from "@/src/shared/ui/AppText";

const generator = [3, 10, 6, 23, 2];
const edl = [1, 4, 2, 9, 1];

export default function WeeklyCostsChart() {
  const [selectedIndex, setSelectedIndex] = useState(generator.length - 1);

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <View>
          <AppText style={{ color: colors.extra.pink[400] }}>
            Public Electricity
          </AppText>
          <Heading
            variant="h2"
            style={{
              color: colors.extra.pink[500],
              fontFamily: fontWeight[700],
            }}
          >
            ${selectedIndex < edl.length ? edl[selectedIndex] : 0}
          </Heading>
        </View>
        <View>
          <AppText style={{ color: colors.primary[400] }}>
            Private Generator
          </AppText>
          <Heading
            variant="h2"
            style={{
              color: colors.primary[500],
              fontFamily: fontWeight[700],
            }}
          >
            ${selectedIndex < generator.length ? generator[selectedIndex] : 0}
          </Heading>
        </View>
      </View>
      <WeeklyBarChart
        data={generator}
        data2={edl}
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
