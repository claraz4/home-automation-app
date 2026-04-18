import { View } from "react-native";
import { Heading } from "@/src/shared/ui/Heading";
import FeatureRow from "@/src/shared/components/FeatureRow";
import ScreenView from "@/src/shared/ui/ScreenView";
import { paddings, spaces } from "@/src/theme";
import TimeoutOptions from "@/src/features/timeout/components/TimeoutOptions";
import { usePlug } from "@/src/features/plugs/hooks/usePlug";
import { useLocalSearchParams } from "expo-router";
import { api } from "@/src/api/api";
import { useState } from "react";
import AppActivityIndicator from "@/src/shared/ui/AppActivityIndicator";
import StatusBox from "@/src/shared/components/StatusBox";

export default function TimeoutScreen() {
  const { plugId } = useLocalSearchParams<{ plugId: string }>();
  const {
    plugInfo,
    refetch,
    loading: loading,
    error: plugError,
  } = usePlug(Number(plugId));
  const [error, setError] = useState<string | null>(null);

  const hasTimeout = !!plugInfo?.timeout;
  const [isEditing, setIsEditing] = useState(false);

  const handleToggle = async (next: boolean) => {
    if (next) {
      // User wants to enable: show options only
      setIsEditing(true);
    } else {
      // User wants to disable: delete immediately
      try {
        await api.delete(`/plugs/${plugId}/timeout`);
        await refetch();
        setIsEditing(false);
      } catch (error) {
        setError("An error occurred while fetching room details.");
      }
    }
  };

  return (
    <ScreenView style={{ padding: paddings.page, rowGap: spaces.md }}>
      <Heading variant="h2" hasBackButton>
        Timeout
      </Heading>

      {loading && <AppActivityIndicator />}
      {error && <StatusBox message={error} />}
      {plugError && <StatusBox message={plugError} />}

      {!loading && !plugError && (
        <View>
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
              setError={setError}
            />
          )}
        </View>
      )}
    </ScreenView>
  );
}
