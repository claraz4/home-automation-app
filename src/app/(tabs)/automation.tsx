import React, { useCallback, useState } from "react";
import { View } from "react-native";
import ScreenView from "@/src/shared/ui/ScreenView";
import { paddings, spaces } from "@/src/theme";
import { Heading } from "@/src/shared/ui/Heading";
import AddButton from "@/src/shared/components/AddButton";
import PolicyBox from "@/src/features/automation/components/PolicyBox";
import { router, useFocusEffect } from "expo-router";
import { PolicyDTO } from "@/src/features/automation/types/PolicyDTO";
import usePolicies from "@/src/features/automation/hooks/usePolicies";
import { AppText } from "@/src/shared/ui/AppText";
import AppActivityIndicator from "@/src/shared/ui/AppActivityIndicator";
import StatusBox from "@/src/shared/components/StatusBox";

export default function Automation() {
  const [policies, setPolicies] = useState<PolicyDTO[] | null>(null);
  const { getPolicies } = usePolicies();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get all policies
  const fetchPolicies = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getPolicies();
      setPolicies(res);
    } catch (error) {
      setError("An error occurred while fetching policies.");
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void fetchPolicies();
    }, []),
  );

  return (
    <ScreenView style={{ padding: paddings.page, rowGap: spaces.md }}>
      <Heading
        variant="h2"
        hasBackButton={true}
        hasCustomLinkComponent={true}
        customLinkComponent={
          <AddButton
            onPress={() =>
              router.push({
                pathname: "/automation/create",
                params: { mode: "create" },
              })
            }
          />
        }
      >
        Automation
      </Heading>
      <View style={{ rowGap: spaces.sm }}>
        {loading && <AppActivityIndicator />}
        {error && <StatusBox message={error} />}

        {policies &&
          (policies.length != 0 ? (
            policies.map((policy, idx) => (
              <PolicyBox key={idx} policy={policy} />
            ))
          ) : (
            <AppText variant="bodySecondary">
              No schedules are planned for this day.
            </AppText>
          ))}
      </View>
    </ScreenView>
  );
}
