import { Heading } from "@/src/shared/ui/Heading";
import { StyleSheet, View } from "react-native";
import { spaces } from "@/src/theme";
import SegmentedControl from "@/src/shared/components/SegmentedControl";
import React, { useState } from "react";
import CostPerRoom from "@/src/features/analytics/components/cost/CostPerRoom";
import CostPerAppliance from "@/src/features/analytics/components/cost/CostPerAppliance";

export default function AllCosts() {
  const segmentedControlOptions = ["Rooms", "Plugs"];
  const [selectedOption, setSelectedOption] = useState(
    segmentedControlOptions[0],
  );

  return (
    <View style={styles.container}>
      <Heading variant="h3">Costs</Heading>
      <View style={{ rowGap: spaces.sm }}>
        <SegmentedControl
          options={segmentedControlOptions}
          value={selectedOption}
          onPress={setSelectedOption}
          style={{
            width: 200,
            height: 32,
            backgroundColor: "white",
          }}
        />
        {selectedOption === "Rooms" && <CostPerRoom />}
        {selectedOption === "Plugs" && <CostPerAppliance />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: spaces.md,
    marginTop: spaces.md,
  },
});
