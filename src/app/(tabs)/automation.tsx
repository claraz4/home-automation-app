import React from "react";
import { StyleSheet, View } from "react-native";
import ScreenView from "@/src/shared/ui/ScreenView";
import { paddings, spaces } from "@/src/theme";
import { Heading } from "@/src/shared/ui/Heading";
import AddButton from "@/src/shared/components/AddButton";
import PolicyBox from "@/src/features/automation/components/PolicyBox";
import { router } from "expo-router";

export default function Automation() {
  const policies = [
    { name: "Policy Name 1", isActive: false, plugs: 2 },
    { name: "Policy Name 2", isActive: true, plugs: 3 },
  ];

  return (
    <ScreenView style={{ padding: paddings.page, rowGap: spaces.md }}>
      <Heading
        variant="h2"
        hasBackButton={true}
        hasCustomLinkComponent={true}
        customLinkComponent={
          <AddButton onPress={() => router.push("/automation/create")} />
        }
      >
        Automation
      </Heading>
      <View style={{ rowGap: spaces.sm }}>
        {policies.map((policy) => (
          <PolicyBox
            name={policy.name}
            status={policy.isActive}
            plugNumber={policy.plugs}
          />
        ))}
      </View>
    </ScreenView>
  );
}

const styles = StyleSheet.create({});
