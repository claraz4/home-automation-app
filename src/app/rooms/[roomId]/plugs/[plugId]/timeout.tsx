import { View } from "react-native";
import { Heading } from "@/src/shared/ui/Heading";
import FeatureRow from "@/src/shared/components/FeatureRow";
import ScreenView from "@/src/shared/ui/ScreenView";
import { paddings } from "@/src/theme";
import TimeoutOptions from "@/src/features/timeout/components/TimeoutOptions";
import { usePlug } from "@/src/features/plugs/hooks/usePlug";
import { useLocalSearchParams } from "expo-router";
import { api } from "@/src/api/api";
import { useState } from "react";

export default function TimeoutScreen() {
  const { plugId } = useLocalSearchParams<{ plugId: string }>();
  const { plugInfo, refetch } = usePlug(Number(plugId));

  const hasTimeout = !!plugInfo?.timeout;
  const [isEditing, setIsEditing] = useState(false);

  const handleToggle = async (next: boolean) => {
    if (next) {
      // User wants to enable → show options only
      setIsEditing(true);
    } else {
      // User wants to disable → delete immediately
      try {
        await api.delete(`/plugs/${plugId}/timeout`);
        await refetch();
        setIsEditing(false);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <ScreenView>
      <Heading variant="h2" hasBackButton>
        Timeout
      </Heading>

      <View style={{ padding: paddings.page }}>
        <FeatureRow
          headingText="Auto Turn Off"
          hasSwitch
          status={hasTimeout || isEditing}
          setStatus={handleToggle}
        />

        {(hasTimeout || isEditing) && (
          <TimeoutOptions
            initialTimeout={plugInfo?.timeout}
            onConfirm={async () => {
              await refetch();
              setIsEditing(false);
            }}
          />
        )}
      </View>
    </ScreenView>
  );
}
