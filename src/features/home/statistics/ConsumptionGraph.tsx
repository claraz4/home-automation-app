import React, { useState } from "react";
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { colors, spaces } from "@/src/theme";
import { Heading } from "@/src/shared/ui/Heading";
import {
  getMaxValue,
  getNextMultiple,
} from "@/src/features/home/utils/consumptionGraphUtils";
import { data } from "../data/consumptionData";
import ConsumptionBarChart from "./ConsumptionBarChart";

interface ConsumptionGraphProps {
  style?: StyleProp<ViewStyle>;
}

export default function ConsumptionGraph({ style }: ConsumptionGraphProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const editedData = data.map((item, index) => ({
    ...item,
    frontColor:
      selectedIndex !== index ? colors.primary[500] : colors.secondary[500],
    onPress: () => {
      setSelectedIndex(index);
    },
  }));

  const maxValue = getNextMultiple(10, getMaxValue(data));

  return (
    <View style={[style, styles.consumptionGraphContainer]}>
      <Heading variant="h3">Daily Power Consumption</Heading>
      <View>
        <Heading
          variant="h2"
          style={{ color: colors.secondary[500], marginBottom: spaces.md }}
        >
          {data[selectedIndex].label}: {data[selectedIndex].value} kW
        </Heading>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ConsumptionBarChart data={editedData} maxValue={maxValue} />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  consumptionGraphContainer: {
    width: "100%",
    rowGap: spaces.md,
    padding: spaces.lg,
    paddingLeft: spaces.md,
  },
});
