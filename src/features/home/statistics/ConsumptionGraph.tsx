import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { Heading } from "@/src/shared/ui/Heading";

interface ConsumptionGraphProps {
  style?: StyleProp<ViewStyle>;
}

export default function ConsumptionGraph({ style }: ConsumptionGraphProps) {
  return (
    <View style={[styles.consumptionGraphContainer, style]}>
      <Heading variant="h5">Consumption Graph</Heading>
    </View>
  );
}

const styles = StyleSheet.create({
  consumptionGraphContainer: {},
});
