import React from "react";
import { StyleSheet, View } from "react-native";
import { colors, spaces } from "@/src/theme";
import { Heading } from "@/src/shared/ui/Heading";
import { AppText } from "@/src/shared/ui/AppText";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

export default function NoConsumptionData() {
  return (
    <View style={styles.container}>
      <FontAwesome6 name="chart-simple" size={50} color={colors.gray[300]} />
      <View>
        <Heading variant="h5" style={{ textAlign: "center" }}>
          No data yet
        </Heading>
        <AppText variant="bodySecondary" style={{ textAlign: "center" }}>
          Power consumption will appear once tracking starts
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    rowGap: spaces.sm,
  },
});
