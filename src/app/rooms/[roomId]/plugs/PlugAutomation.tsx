import { Heading } from "@/src/shared/ui/Heading";
import { View, StyleSheet } from "react-native";
import TimeoutRow from "@/src/app/rooms/[roomId]/plugs/TimeoutRow";
import AuthorizationRow from "@/src/app/rooms/[roomId]/plugs/AuthorizationRow";
import { spaces } from "@/src/theme";

export default function PlugAutomation() {
  return (
    <View>
      <Heading variant="h3">Automation</Heading>
      <View style={styles.rowsContainer}>
        <TimeoutRow />
        <AuthorizationRow />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowsContainer: {
    rowGap: spaces.sm,
  },
});
