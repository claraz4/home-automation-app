import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import ScreenView from "@/src/shared/ui/ScreenView";
import { paddings, spaces } from "@/src/theme";
import { Heading } from "@/src/shared/ui/Heading";
import AddButton from "@/src/shared/components/AddButton";
import PolicyBox from "@/src/features/automation/components/PolicyBox";
import { router, useFocusEffect } from "expo-router";
import {
  PolicyCreateDTO,
  PolicyDTO,
} from "@/src/features/automation/types/PolicyDTO";
import { api } from "@/src/api/api";

export default function Automation() {
  const [policies, setPolicies] = useState<PolicyDTO[]>([]);

  // Get all policies
  const getPolicies = async () => {
    try {
      const res = await api.get("/policy");
      setPolicies(res.data.policies);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      void getPolicies();
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

const styles = StyleSheet.create({});
