import { Heading } from "@/src/shared/ui/Heading";
import { View, StyleSheet } from "react-native";
import TimeoutRow from "@/src/features/plugs/components/TimeoutRow";
import AuthorizationRow from "@/src/features/plugs/components/AuthorizationRow";
import { spaces } from "@/src/theme";

interface PlugAutomationProps {
  timeout: string | null;
}

export default function PlugAutomation({ timeout }: PlugAutomationProps) {
  return (
    <View>
      <Heading variant="h3">Automation</Heading>
      <View style={styles.rowsContainer}>
        <TimeoutRow timeout={timeout} />
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
