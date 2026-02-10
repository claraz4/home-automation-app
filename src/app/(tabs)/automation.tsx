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

export default function Automation() {
  const [policies, setPolicies] = useState<PolicyDTO[]>([]);
  const { getPolicies } = usePolicies();

  // Get all policies
  const fetchPolicies = useCallback(async () => {
    const res = await getPolicies();

    if (res) {
      setPolicies(res);
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
        {policies.map((policy) => (
          <PolicyBox policy={policy} />
        ))}
      </View>
    </ScreenView>
  );
}
