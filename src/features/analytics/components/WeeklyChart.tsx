import { StyleSheet, View } from "react-native";
import WeeklyBarChart from "@/src/shared/components/WeeklyBarChart";
import { borderRadius, colors, fontWeight, spaces } from "@/src/theme";
import { Heading } from "@/src/shared/ui/Heading";
import { useState } from "react";
import { AppText } from "@/src/shared/ui/AppText";
import dayjs from "dayjs";

interface WeeklyChartProps {
  data1Title: string;
  data2Title?: string;
  data1: number[];
  data2?: number[];
  unit: string;
  unitBefore?: boolean;
}

export default function WeeklyChart({
  data1Title,
  data2Title,
  data1,
  data2,
  unit,
  unitBefore = true,
}: WeeklyChartProps) {
  const day = dayjs().day();
  const mondayBasedIndex = day === 0 ? 6 : day - 1;
  const [selectedIndex, setSelectedIndex] = useState(mondayBasedIndex);

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        {data2 && data2Title !== "" && (
          <View>
            <AppText style={{ color: colors.extra.pink[400] }}>
              {data2Title}
            </AppText>
            <Heading
              variant="h2"
              style={{
                color: colors.extra.pink[500],
                fontFamily: fontWeight[700],
              }}
            >
              {unitBefore && unit}
              {selectedIndex < data2.length
                ? Math.round(data2[selectedIndex])
                : 0}
              {!unitBefore && unit}
            </Heading>
          </View>
        )}
        <View>
          <AppText style={{ color: colors.primary[400] }}>{data1Title}</AppText>
          <Heading
            variant="h2"
            style={{
              color: colors.primary[500],
              fontFamily: fontWeight[700],
            }}
          >
            {unitBefore && unit}
            {selectedIndex < data1.length
              ? Math.round(data1[selectedIndex])
              : 0}
            {!unitBefore && unit}
          </Heading>
        </View>
      </View>
      <WeeklyBarChart
        data={data1}
        data2={data2 ?? undefined}
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
