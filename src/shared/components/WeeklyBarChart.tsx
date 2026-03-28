import { BarChart } from "react-native-gifted-charts";
import { spaces, colors, fontWeight } from "@/src/theme";

const idxToDay = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface WeeklyBarChartProps {
  data: number[];
  data2?: number[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}

const HEIGHT = 100;

export default function WeeklyBarChart({
  data,
  data2,
  selectedIndex,
  setSelectedIndex,
}: WeeklyBarChartProps) {
  const isStacked = !!data2;

  const singleData = idxToDay.map((day, i) => ({
    value: data[i] ?? 0,
    label: day,
    frontColor: i === selectedIndex ? colors.primary[500] : colors.primary[200],
  }));

  const stackedData = idxToDay.map((day, i) => ({
    label: day,
    stacks: [
      {
        value: data[i] ?? 0,
        color: i === selectedIndex ? colors.primary[500] : colors.primary[200],
      },
      {
        value: data2?.[i] ?? 0,
        color:
          i === selectedIndex ? colors.extra.pink[400] : colors.extra.pink[200],
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
      },
    ],
  }));

  const maxValue = isStacked
    ? Math.max(...data.map((v, i) => (v ?? 0) + (data2?.[i] ?? 0)))
    : Math.max(...data);

  return (
    <BarChart
      data={!isStacked ? singleData : undefined}
      stackData={isStacked ? stackedData : undefined}
      barWidth={spaces.xl}
      spacing={spaces.xs}
      barBorderTopLeftRadius={!isStacked ? 4 : 0}
      barBorderTopRightRadius={!isStacked ? 4 : 0}
      hideRules
      xAxisThickness={0}
      yAxisThickness={0}
      hideYAxisText
      noOfSections={10}
      xAxisLabelTextStyle={{
        color: colors.primary[400],
        fontFamily: fontWeight[500],
      }}
      isAnimated
      maxValue={maxValue + 2}
      height={HEIGHT}
      stepHeight={!isStacked ? HEIGHT / maxValue : undefined}
      onPress={(item: any, index: number) => setSelectedIndex(index)}
    />
  );
}
