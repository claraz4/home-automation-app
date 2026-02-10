import { View, StyleSheet } from "react-native";
import { Heading } from "@/src/shared/ui/Heading";
import { spaces } from "@/src/theme";
import PlugSchedules from "@/src/features/plugs/components/PlugSchedules";

export default function Schedules() {
  return (
    <View>
      <Heading
        variant="h2"
        containerStyles={styles.heading}
        hasLink={true}
        href="/schedules"
        linkPlaceholder="Show All"
      >
        Schedules
      </Heading>

      <PlugSchedules includeHeading={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    marginBottom: spaces.xs,
  },
  subContainer: {
    flexDirection: "column",
    rowGap: spaces.md,
  },
});
