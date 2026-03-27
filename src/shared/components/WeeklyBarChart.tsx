import { BarChart } from "react-native-gifted-charts";
import { spaces, colors, fontWeight } from "@/src/theme";

const idxToDay = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface WeeklyBarChartProps {
  data: number[];
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
}

const HEIGHT = 100;

export default function WeeklyBarChart({
  data,
  selectedIndex,
  setSelectedIndex,
}: WeeklyBarChartProps) {
  const barData = idxToDay.map((day, i) => ({
    value: data[i] ?? 0,
    label: day,
    frontColor: i === selectedIndex ? colors.primary[500] : colors.primary[200],
  }));
  const maxValue = Math.max(...data);

  return (
    <BarChart
      data={barData}
      barWidth={spaces.xl}
      spacing={spaces.xs}
      barBorderTopLeftRadius={4}
      barBorderTopRightRadius={4}
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
      stepHeight={HEIGHT / maxValue}
      onPress={(item: any, idx: number) => setSelectedIndex(idx)}
    />
  );
}
