import React from "react";
import { BarChart } from "react-native-gifted-charts";
import { borderRadius, colors, spaces } from "@/src/theme";

interface ConsumptionBarChartProps {
  data: any[];
  maxValue: number;
}

export default function ConsumptionBarChart({
  data,
  maxValue,
}: ConsumptionBarChartProps) {
  return (
    <BarChart
      data={data}
      barWidth={spaces.xxl}
      height={spaces.xxxl * 3}
      spacing={spaces.lg}
      barBorderBottomLeftRadius={borderRadius.sm}
      barBorderBottomRightRadius={borderRadius.sm}
      barBorderTopLeftRadius={borderRadius.sm}
      barBorderTopRightRadius={borderRadius.sm}
      xAxisThickness={0}
      xAxisLabelTextStyle={{ color: colors.gray[500] }}
      yAxisThickness={0}
      yAxisColor={colors.gray[200]}
      yAxisTextStyle={{
        color: colors.gray[500],
      }}
      yAxisLabelSuffix={"kW"}
      yAxisLabelWidth={50}
      yAxisIndicesColor={colors.primary[500]}
      stepValue={maxValue / 2}
      maxValue={maxValue}
      rulesColor={colors.gray[300]}
      isAnimated
      animationDuration={500}
      disableScroll={false}
      adjustToWidth
    />
  );
}
