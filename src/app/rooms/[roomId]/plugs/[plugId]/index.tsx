import ScreenView from "@/src/shared/ui/ScreenView";
import { Heading } from "@/src/shared/ui/Heading";
import { paddings, spaces } from "@/src/theme";
import { View, StyleSheet } from "react-native";
import PlugStats from "@/src/features/plugs/components/PlugStats";
import PlugAutomation from "@/src/features/plugs/components/PlugAutomation";
import PlugSchedules from "@/src/features/plugs/components/PlugSchedules";
import { useLocalSearchParams } from "expo-router";
import PlugStatus from "@/src/features/plugs/components/PlugStatus";
import { usePlug } from "@/src/features/plugs/hooks/usePlug";

export default function Plug() {
  const { plugId } = useLocalSearchParams<{
    plugId: string;
  }>();
  const { plugInfo, togglePlugStatus } = usePlug(Number(plugId));

  return (
    <ScreenView>
      <Heading variant="h2" hasBackButton={true}>
        {plugInfo?.name}
      </Heading>
      {plugInfo && (
        <View style={styles.componentsContainer}>
          <PlugStatus
            plugId={Number(plugId)}
            isOn={plugInfo.isOn}
            togglePlugStatus={togglePlugStatus}
          />
          <PlugStats
            currentConsumption={plugInfo.currentConsumption}
            isDeviceConnected={plugInfo.isDeviceConnected}
          />
          <PlugAutomation timeout={plugInfo.timeout} />
          <PlugSchedules />
        </View>
      )}
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  componentsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    padding: paddings.page,
    rowGap: spaces.md,
  },
});
