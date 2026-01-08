import ScreenView from "@/src/shared/ui/ScreenView";
import { Heading } from "@/src/shared/ui/Heading";
import { paddings, spaces } from "@/src/theme";
import { View, StyleSheet } from "react-native";
import PlugStats from "@/src/features/plugs/components/PlugStats";
import PlugAutomation from "@/src/features/plugs/components/PlugAutomation";
import PlugSchedules from "@/src/features/plugs/components/PlugSchedules";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { api } from "@/src/api/api";
import { PlugDTO } from "@/src/features/plugs/types/PlugDTO";
import PlugStatus from "@/src/features/plugs/components/PlugStatus";
import { PlugStatusCommandPayloadDTO } from "@/src/features/plugs/types/PlugStatusCommandPayloadDTO";

export default function Plug() {
  const { plugId } = useLocalSearchParams<{
    plugId: string;
  }>();
  const [plugInfo, setPlugInfo] = useState<PlugDTO | null>(null);

  useEffect(() => {
    if (!plugId) return;

    const getPlugInfo = async () => {
      try {
        const { data } = await api.get<PlugDTO>(`/plugs/${plugId}`);
        setPlugInfo(data);
      } catch (e) {
        console.error(e);
      }
    };

    void getPlugInfo();
  }, [plugId]);

  const togglePlugStatus = async (isCurrentlyOn: boolean) => {
    if (!plugId) return;

    const payload: PlugStatusCommandPayloadDTO = {
      plugId: Number(plugId),
      switchOn: !isCurrentlyOn,
    };

    setPlugInfo((prev) => (prev ? { ...prev, isOn: !isCurrentlyOn } : prev));
    try {
      await api.put("/plugs/status/set", payload);
    } catch (e) {
      console.error(e);

      // rollback on failure
      setPlugInfo((prev) => (prev ? { ...prev, isOn: isCurrentlyOn } : prev));
    }
  };

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
          <PlugAutomation />
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
